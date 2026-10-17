---
title: "Why Niu? Build a Model API Business People Trust"
description: "Reliable model delivery, clear accounts, and customers who can help themselves. Why we are building Niu for people operating model API services."
status: "published"
pinned: true
pinOrder: 0
publishedAt: "2026-10-15"
updatedAt: "2026-10-17"
category: "Product"
author: "Niu"
---

Connecting a customer to a model is the beginning of an API business. Keeping that customer takes more: requests that arrive reliably, bills you can explain, and a service they can use without asking you for help.

An upstream connection drops halfway through a response. Several requests compete for the last of a customer's balance. A customer asks why a timed-out call appears on their bill. These are everyday operating questions, and they cross the boundaries between routing, accounting, and support.

Niu is being built for people who operate model aggregation and forwarding services. Our goal is to bring reliable delivery, clear financial records, and customer self-service into one product, on an open-source foundation you can run yourself.

## Deliver a service you can account for

Your customers buy model access from you. When a request fails, they need you to explain what happened, even when the problem began upstream.

Niu separates the model names your applications use from the Provider credentials and model mappings behind them. Workspace keys give applications scoped access while upstream credentials stay on the server. Configured route pools let operators organize authorized supply. A route being configured does not prove that its model is available; operators still need to qualify the routes they offer.

Request history connects the customer request to its recorded attempts, reported usage, timing, and charge state. That gives support a place to begin: was the request rejected before dispatch, did an upstream service return an error, or did the connection end with execution still uncertain?

That distinction matters for retries. Sending an uncertain request again can repeat upstream work and create another charge. Niu preserves that uncertainty; its current failover support is bounded. See the [routing and model configuration guide](/docs/configuration/models/) and [request evidence guide](/docs/concepts/execution-observation/) for the supported behavior.

Gateway performance matters too. We have published a [Niu, New API, and LiteLLM Proxy benchmark](/docs/guides/gateway-benchmarks/) covering throughput, tail latency, streaming, simulated multi-turn sessions, and memory. It records historical versions against a deterministic mock upstream. Current end-to-end performance remains unverified by those measurements; qualify capacity and recovery with your actual workload.

## Know what was charged and what is still unresolved

A usage chart alone cannot explain a model API business. Customer charges, upstream procurement costs, and Provider earnings answer different questions. A settled debit and an amount still waiting for evidence must remain distinguishable.

Niu manages customer tariffs separately from Provider offers. Supported priced requests reserve spending capacity before dispatch, so concurrent work counts toward the applicable limits. Saved pricing context and request evidence provide a basis for explaining the resulting charge. Missing usage remains unknown rather than becoming an invented zero.

Consider a response that completes upstream while accounting is interrupted. Repeating the inference is not an accounting repair. Recovery needs to work from durable request evidence. This is why Niu uses PostgreSQL for saved records and keeps delivery state separate from charge settlement.

Permissions follow the same boundary. Customers see their usage and customer-facing charges. Procurement rates and platform margins belong in platform administration. A Provider should see only its own agreed rates and settlements. Clear customer bills do not require exposing your commercial arrangements.

The [usage and cost guide](/docs/concepts/performance-and-cost/) describes these records and their limits. They are tools for running and reconciling the service; they do not guarantee profitability or complete commercial readiness.

## Give customers a service they can use themselves

Each confusing setup step becomes a support conversation. Each unexplained charge makes the next payment harder to earn.

Niu brings the model catalog, API documentation, workspace keys, spending controls, and request records together. Customers can connect applications through supported model APIs, set workspace and key spending limits, and investigate recorded usage and charges.

Saved Chat and Video workflows also give customers a way to use supported models directly. Sessions and messages are stored on the backend. Supported video workflows retain inputs and job history, track status, and provide authorized access to available results. Generation success and result availability remain separate: an expired download does not mean the model failed to generate it.

Payment must connect to this experience as well: a customer pays, receives usable balance, and can find the record afterward. A payment adapter by itself does not prove that a merchant is active or funds have arrived. That complete journey belongs in commercial qualification, alongside delivery and accounting.

## An open foundation you can operate

The public Niu product includes the gateway, dashboard, catalog, and documentation, and runs with PostgreSQL. Community operation does not require private source or a license service. Niu-owned public code is MIT licensed; reused modules retain their own licenses and attribution.

That gives operators a foundation they can inspect, deploy, and adapt. Commercial and enterprise extensions use explicit plugin boundaries. Publishing source is one part of the promise; usable workflows, qualified integrations, and dependable operation still have to be demonstrated.

## Evaluate the whole customer journey

Niu is available for evaluation. Tagged releases do not mean the first feature-complete release has finished qualification. The [release acceptance matrix](/docs/releases/first-release/) tracks the remaining model, performance, recovery, payment, Provider settlement, and video lifecycle work.

Start with one authorized model route and one customer workspace:

1. [Deploy Niu](/docs/deployment/single-container/) and configure your Provider credentials and model mapping.
2. Issue a workspace key and make a [real model request](/docs/guides/api-quickstart/).
3. Follow the request through its saved usage, charge, and spending records.
4. Check the experience your customer receives, including failures and recovery.

Compare that journey with the service you want to run. That is the standard Niu should earn: delivery you can investigate, accounts you can explain, and customers who can use your service with confidence.
