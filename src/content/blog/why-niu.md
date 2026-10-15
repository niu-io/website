---
title: "Why Niu? A Financial-Grade Rust Core with a Composable Plugin Host"
chineseTitle: "为什么选择 Niu 牛元？金融级极简内核 + 可组合插件架构"
description: "Why Niu pairs a minimalist, financial-grade Rust and PostgreSQL core with a strongly-typed Plugin Host with explicit process boundaries (niu.plugin.v1) instead of building another monolithic proxy."
publishedAt: "2026-10-15"
readingTime: "8 min read"
category: "Architecture"
author: "Niu Engineering"
---

## 1. Core Thesis: "Best" Does Not Mean the Most Bloated Monolith

When teams evaluate open-source LLM gateways and aggregation platforms—such as LiteLLM, New API / One API, Bifrost, or Portkey—the conventional comparison is a feature checklist: _who has the most built-in enterprise toggles, check-in widgets, or third-party integrations stuffed into one repository?_

**Niu (Niu 牛元) takes the opposite architectural stance:**

- An AI gateway's core job is **deterministic model access, verifiable financial accounting, and consumption observability**.
- Everything that varies by organization, industry, or deployment model—custom SSO/SCIM, industry DLP redaction, regional tax invoicing, SIEM audit streaming, or proprietary route scoring—belongs behind **strongly-typed Plugin contracts**, with process isolation for services and explicit trust for hooks in the core transaction path.
- By combining a **minimalist, financial-grade Rust core** with a **unified Plugin Host (`niu.plugin.v1`)**, Niu keeps the core focused and auditable while allowing deployment-specific extensions at explicit boundaries.

---

## 2. Why First-Generation Open-Source Gateways Hit an Architectural Ceiling

Different gateway designs optimize for different needs. LiteLLM, New API / One API, Bifrost, and Portkey are useful comparison points, but a feature checklist alone does not explain where accounting authority and extension boundaries live. The table below compares architectural choices rather than asserting a benchmark or a universal limitation of another product.

| Dimension                    | Proxy-centered design question                                                            | Niu's architectural choice                                                                                                                   |
| :--------------------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Runtime & footprint**      | Which runtime and backing services does the deployment require?                           | Rust (`axum` + `tokio`) gateway with PostgreSQL; configured upstream model services remain external.                                         |
| **Financial precision**      | Are usage estimates, procurement costs, customer charges, and Provider earnings separate? | Integer nanounits (`10⁻⁹`), with independent `cost_entries`, `customer_charges` / `customer_media_charges`, and `provider_earnings` records. |
| **Crash & timeout safety**   | What happens when upstream execution is uncertain?                                        | Atomic priced admission and explicit `not_sent`, `may_have_executed`, `confirmed_completed`, and `confirmed_not_executed` states.            |
| **Commercial data boundary** | Can customer responses expose procurement prices or margins?                              | Customer serialization and authorization boundaries separate retail records from procurement data.                                           |
| **Extensibility**            | Which extensions share the gateway process, and which run separately?                     | Typed in-process hooks plus supervised Unix-socket services, signed request context, and transactional outbox delivery.                      |

No latency ranking is claimed here. A useful performance comparison needs the same workload, upstream behavior, hardware, concurrency, and measurement method. The goal of Niu's design is to make accounting authority and failure handling inspectable rather than treating a fast proxy response as proof of financial correctness.

---

## 3. Pillar 1: An Uncompromising, Financial-Grade Core

What belongs in the open-source core (`niu-io/niu`) is implemented to financial-ledger standards rather than "best-effort proxy" standards:

### 1. Three Strictly Independent Ledgers in Integer Nanounits (`10⁻⁹`)

Every billable event is recorded in exact integer nanounits (`10⁻⁹`) across three separate accounting ledgers:

- **`cost_entries`**: Installation upstream procurement cost for calls dispatched to external Providers.
- **`customer_charges` & `customer_media_charges`**: Workspace retail charges covering both text token consumption and durable video/media generation jobs.
- **`provider_earnings`**: Revenue share owed to external Providers where settlement applies.

No ledger is derived by approximation from another. Crucially, the commercial boundary is enforced at the serialization and authorization layer: customer workspace APIs, dashboards, and exports physically omit upstream Provider purchase prices and installation margins.

### 2. Atomic Priced Admission & Execution Certainty

Before a single byte is sent to an upstream Provider, Niu commits the entire admission envelope in **one PostgreSQL transaction**:

- The operation and attempt records
- The immutable published route generation
- Token and media bounds
- Any active guardrail receipt
- The effective customer tariff and Provider offer
- The prepaid balance or credit reservation across company, workspace, and workspace-key caps

Once admitted, each attempt advances through a strict **4-state execution certainty machine**:

1. `not_sent` — Admitted locally, prior to upstream transmission.
2. `may_have_executed` — Dispatched over the network; awaiting deterministic outcome.
3. `confirmed_completed` — Upstream execution verified and settled against the reservation.
4. `confirmed_not_executed` — Guaranteed pre-execution rejection; reservation safely released.

If a network drop or process restart occurs before upstream confirmation, the recovery scheduler preserves unresolved execution as `may_have_executed`. Ambiguous calls are never silently treated as free, and Niu never blindly replays an uncertain non-idempotent request to cause double execution or double billing.

### 3. Immutable Route Publications

Database-configured routes and static TOML routes compile into a single validated generation (`routing_publications`). Each publication supports priority tiers, weighted load distribution, and live credential/cooldown checks—giving operators deterministic routing auditability without freezing time-dependent health state into static configuration files.

---

## 4. Pillar 2: The Unified Plugin Host (`niu.plugin.v1`)

Niu defines a **Plugin Host** through `crates/plugin-api` and `crates/plugin-sdk`. The public composition contract describes both the target architecture and a transitional runtime slice; the breakdown below explains those boundaries, rather than claiming every integration has completed release qualification. Typed hooks run in process and must be trusted; Unix-socket HTTP and event services run out of process.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                         Niu Core (niu-io/niu)                              │
│   Rust (axum + tokio) · Single-Transaction Priced Admission · PostgreSQL   │
│   cost_entries │ customer_charges │ provider_earnings │ routing_publications│
└──────────┬───────────────────┬─────────────────────┬──────────────────┬────┘
           │                   │                     │                  │
           ▼                   ▼                     ▼                  ▼
  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────────┐ ┌──────────────┐
  │ 1. Data-Plane   │ │ 2. Event        │ │ 3. Supervised     │ │ 4. Dashboard │
  │    Hooks        │ │    Observers    │ │    Unix-Socket    │ │    UI Slots  │
  │                 │ │                 │ │    HTTP Routes    │ │              │
  │ • IdentityFed   │ │ • Metering      │ │ • /run/niu/       │ │ • Build-time │
  │ • PolicyHook    │ │   Observer      │ │   plugins/*.sock  │ │   routes &   │
  │ • Provider/     │ │ • Transactional │ │ • Ed25519 JWS     │ │   settings   │
  │   PaymentAdapter│ │   Outbox        │ │ • 4 Auth Modes +  │ │   extensions │
  │ • RouteSelector │ │   Delivery      │ │   SSE Streaming   │ │              │
  └─────────────────┘ └─────────────────┘ └───────────────────┘ └──────────────┘
```

### Four Cohesive Capability Facets per Plugin

1. **Data-Plane Hooks (`hooks`)**:
   - `IdentityFederation`: Maps external identity assertions into verified claims without allowing privilege elevation.
   - `PolicyHook`: Evaluates request and response content under a cryptographic `PolicyBinding` (SHA-256 input digest, stage, revision, expiry) and applies atomic JSON Pointer redactions (`PolicyDecision::Redact`).
   - `ProviderAdapter` & `PaymentAdapter`: Normalizes upstream model protocols (including stateful `ProviderStreamValidator` for SSE frames) and payment channels while core transport validation blocks path traversal and credential-header injection.
   - `RouteSelector`: Reorders eligible route candidates (for example, by lowest cost or SLA telemetry), while the core re-verifies every grant, capability, and budget bound before dispatch.
2. **Asynchronous Event Observers (`observers`)**:
   - `MeteringObserver` and Unix-socket transactional outbox delivery (`/_niu/plugins/v1/outbox/events`) with idempotent `OutboxDeliveryReceipt` (`accepted` / `duplicate`). Plugin services use public contracts rather than querying or mutating core PostgreSQL tables.
3. **Supervised Unix-Socket HTTP Routes (`routes`)**:
   - Out-of-process services listen on `/run/niu/plugins/{plugin_id}.sock` and are exposed under neutral `/api/plugins/v1/{plugin_id}/…` routes.
   - Supports **4 route authentication modes**: `operator` (workspace role matrix), `installation_admin`, `workspace_key` (`Bearer sk-…`), and `public_callback` (bounded webhook ingress), plus `streaming: true` SSE forwarding.
   - Every proxied request strips client-supplied `X-Niu-*` headers and replaces `Authorization` with a short-lived Gateway-signed **Ed25519 JWS** bound to the target plugin `aud`, actor, workspace scope, HTTP method, path, and SHA-256 body digest.
4. **Dashboard UI Contributions (`ui`)**:
   - Build-time frontend routes and settings extensions that integrate cleanly into the workspace dashboard.

### Built-in Open-Source Plugins Included in `niu-io/niu`

The public repository includes three reference plugins illustrating the extension contracts:

- **`plugins/hello-echo`**: Reference Unix-socket service demonstrating Ed25519 JWS verification, `operator` + `public_callback` routes, and idempotent outbox consumption.
- **`plugins/request-tagger`**: Reference in-process `PolicyHook` paired with a lowest-cost `RouteSelector`.
- **`plugins/webhook-audit`**: Reference `MeteringObserver` paired with an `installation_admin` audit inspection endpoint.

### Clean Open-Core & Distribution Boundary

This architecture makes Niu's open-core boundary explicit and verifiable:

- **Community deployments** run `niu-io/niu` standalone with a single Rust binary and PostgreSQL, with zero private dependencies or license servers.
- **Hosted SaaS (`niu-io/cloud` on `niu.io`) and self-hosted Enterprise (`niu-io/enterprise`)** compose pinned core and plugin commits behind one public listener. Enterprise excludes hosted-only commercial settlement and supply-margin plugins; each distribution selects its own manifest.

## Implementation references and qualification

“Financial-grade” describes the accounting design, not a certification or a completed production acceptance gate. The first release remains under qualification; architecture contracts and source code alone do not verify a deployed integration.

- [Plugin composition and current runtime scope](https://github.com/niu-io/niu/blob/main/docs/architecture/enterprise-composition.md)
- [Public Plugin API](https://github.com/niu-io/niu/tree/main/crates/plugin-api) and [SDK](https://github.com/niu-io/niu/tree/main/crates/plugin-sdk)
- [Financial recovery coordination and its evidence limits](https://github.com/niu-io/niu/blob/main/docs/reference/financial-recovery-coordination.md)
- [Repository and distribution ownership](https://github.com/niu-io/niu/blob/main/docs/architecture/repository-ownership.md)
- [Current release acceptance matrix](/docs/releases/first-release/)
