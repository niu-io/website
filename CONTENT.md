# Landing content and public claim rules

Reviewed October 14, 2026. This baseline follows the public [Niu product focus](https://github.com/niu-io/niu/blob/main/docs/product/product-focus.md).

## Positioning

Niu serves developers and teams using model APIs in applications. Lead with model access, clear usage and accountable spending. Lower-cost access through qualified Supplier offers is the commercial direction; it is not evidence that an offer is currently cheaper or that every model is available.

The main workflow is connect model supply → issue a workspace key → make a model request → inspect usage/customer charges. Include saved Chat and Video management, supported video job status and authorized result access. Niu handles model requests; external applications own their tasks, tools and outcomes.

Product name: Niu. Keep niu.io only in actual domain URLs/configuration. Primary action: Get started. Secondary: Browse models. Docs, API, SDK and Compare remain separate navigation entries alongside Models.

## Current capability evidence

| Subject | Public source | Scope |
| --- | --- | --- |
| Supplier configuration and model routes | Niu README and configuration/models guide | Actual access depends on enabled routes and supported protocols |
| Workspace/key budgets and financial hierarchy | docs/product/backend-capability-checklist.md | Company funds, independent caps and reservations; documented financial qualification boundaries remain |
| Request usage and customer charges | execution-observation guide and backend capability checklist | Reported usage, timing and customer charges; unknown evidence remains unknown |
| Text/video generation management | generations/video guides and docs/releases/video-result-dashboard-verification.md | Saved histories and supported jobs/results; no claim all video models or commercial workflows are qualified |
| REST/SDK reference | Public OpenAPI contract and JavaScript SDK source | Generated interface reference does not prove live model conformance |
| Self-hosting | deployment/single-container guide | Public application plus PostgreSQL; external inference still reaches the configured upstream |

## Exclusions and claims

Do not advertise Agent Ops, task imports, external agent collectors, task outcomes, agent benchmarks, model fusion, subscription inference/pooling or preserved coding-plan entitlements. Historical source modules are not a reason to put those features back on the landing page.

Do not invent discounts, benchmarks, customer logos, model counts, throughput, availability or production qualification. Price comparisons need a specific model/workload, billing categories, currency, source and effective offer date. Supplier costs and margins stay confidential; customer-facing copy and reports concern customer charges.

Keep the first-release qualification statement concise and link to the public acceptance matrix. Marketing changes do not close release gates.

## Public shell

Landing, Models, Docs, API, SDK and Compare use the same navigation definition, controls and header height. Marketing pages center the navigation inside the existing page container; Docs and the catalog retain their full-width navigation shell. Header backgrounds remain full width. Desktop is one row; narrow viewports use a hamburger and a floating menu. No second navigation row and no decorative diagonal arrows on links/buttons. Docs has its article tree within the floating menu. Theme preference survives section navigation; the public search entry opens Docs search.

Marketing source stays in this repository. Docs/catalog import Niu's canonical public shell styles and navigation; this website ships a checked snapshot, with no build dependency on an adjacent public checkout.
