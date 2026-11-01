# Landing content and public claim rules

Reviewed October 31, 2026. This baseline follows the public [Niu product focus](https://github.com/niu-io/niu/blob/main/docs/product/product-focus.md).

## Positioning

**The Model Platform for Agents**

Discover and evaluate models, build model pools, and manage performance and cost—all through your agent.

Follow the public [agent-oriented principles](https://github.com/niu-io/niu/blob/main/docs/product/agent-oriented-principles.md), agreed 2026-10-31. Coding agents already seek to complete tasks while improving value. Niu supplies trustworthy information and authorized management capabilities; the agent owns task quality, model choices and cost/performance tradeoffs. Do not promise an optimal model, guaranteed savings or task success.

Model invocation is one part of management. Landing scenarios should show agents retrieving model capabilities and customer prices, comparing samples, proposing model pools, inspecting grants and budgets, diagnosing requests and responding to resource events where implemented. Explain the evidence and controls Niu supplies, without teaching generic optimization or assigning Niu the agent's decisions.

MCP remains the documented integration for the published deployment. The unpublished 0.3 candidate implements native Claude Code, Codex and DeepSeek Harness packages, pool administration and scoped event subscriptions. Native packages share the same contracts and add host-specific setup and lifecycle integration. Candidate implementation and fixture verification do not establish published availability; the installation document checks the package and deployment before setup. Distinguish host hooks, platform events and server-side plugins.

People need only a short orientation and an agent-led onboarding workflow. They set goals and authority, review important changes, and can explore model trials, saved results, performance and customer charges directly. Other references primarily serve coding agents. Do not require people to relay raw tool results or read a manual to begin.

Lead the landing with agent tasks and a working entry point; put manual API examples and gateway benchmarks after the workflow as supporting evidence. Keep existing trial and review surfaces. Primary action: copy `Install and configure Niu by following https://niu.io/docs/install.md.` into Claude Code or Codex. Human signs in and approves access in Niu; the agent handles setup and verification. Build with Niu and Open dashboard remain secondary entry points. Navigation retains one Docs entry alongside Blog, Models and Compare. Keep Niu as the product name and niu.io only in URLs/configuration. Existing Provider, administration and commercial data boundaries remain intact.

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

Use Niu as the primary product name in all languages. 牛元 may appear only as an explanatory Chinese annotation, not a competing product name. Retain Token in Chinese copy to avoid translation overhead. The Chinese headline is “面向 Agent 的模型平台”.

## Blog translations and covers

Blog articles use English Markdown in `src/content/blog` and matching Simplified Chinese Markdown in `src/content/blog-translations`, with the same file ID. Both collections use the same metadata schema and publication policy. Preserve section order between translations so a language change can retain the corresponding linked section. Missing translations fall back to English. The existing header language choice controls article metadata, contents and body, and also localizes the landing-page previews.

Set `cover` on the English article to a website-owned `/site-assets/blog/` image; the index, article and social metadata reuse it. Prefer text-free abstract editorial artwork using Niu colors. Do not put explanatory labels, fabricated charts or benchmark results into cover art. Generation provenance belongs in the website source, alongside the article assets.

The 0.3 preview hero links installation availability explicitly. Workspace pool management and pool/evaluation event notifications exist in the candidate; native-host final acceptance remains a release gate. Do not imply deployment or publication while the release is held.
