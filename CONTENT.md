# First-release landing content

Content baseline: 2026-09-26. This page describes the public implementation available for evaluation, not a completed or production-qualified release.

## Positioning

Niu is an open-source Agent Gateway. Agent observability and model access explain the category; Simple, Transparent and Cost-effective are its three value points. Lead with the complex-agent-task cost decision: compare models on the same task and acceptance criteria, then investigate the execution evidence. Keep simple model access independently useful. Benchmarking is part of the product direction and remains in the in-progress section until a supported workflow and measured evidence are published.

- Audience: people and teams using agents for complex, multi-step tasks, including software, professional slide decks, novels and films. These are task examples, not claims of released native authoring integrations.
- Headline: “The Agent Gateway for complex tasks.”
- Primary action: evaluate the public implementation through task investigation, model access or self-hosting.
- Secondary hero action: explore the illustrative coding-agent benchmark.
- GitHub remains in the navigation for direct source access.
- Brand: lowercase niu.io, approved assets, existing theme tokens, locally bundled Geist fonts.

## Value slider

The three values appear in a manually controlled sliding section below the hero: “Simple to use.”, “Clear to understand.” and “Cheaper to run.” Each links to the corresponding gateway, observation or benchmark section. The cost slide describes identifying qualifying lower-cost models, not guaranteed savings. Native horizontal scrolling supports touch; buttons and arrow keys provide alternatives. Reduced-motion preference disables animated scrolling. There is no automatic rotation.

## Claim sources

All paths below are in the public [niu-io/niu repository](https://github.com/niu-io/niu).

| Page claim                                       | Source                                                                                  | Limit to retain                                                                                                    |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Imported task investigation and shared timelines | `docs/releases/first-release.md`, imported task and browser verification checkpoints    | Metadata import is not a native collector.                                                                         |
| Claims and validation shown separately           | `docs/architecture/execution-observation.md`                                            | A completion claim does not establish accepted task success.                                                       |
| Referenced task charges                          | `docs/releases/first-release.md`, referenced task charges checkpoint                    | Resolve explicit same-project references; unresolved costs remain unknown.                                         |
| Usage and cost reporting                         | `apps/docs/src/content/docs/reference/api.mdx`                                          | Separate cash and API-equivalent cost; do not claim complete task accounting or subscription allocation.           |
| Supplier account and quota views                 | `docs/releases/first-release.md`, supplier and browser verification checkpoints         | Registered metadata and submitted observations; no claim of automatic collection or native subscription inference. |
| Gateway chat, streaming and scoped keys          | `apps/docs/src/content/docs/getting-started.mdx`, release key and streaming checkpoints | Provider setup is server-side; compatibility is a supported subset.                                                |
| Self-hosting                                     | `apps/docs/src/content/docs/deployment/single-container.mdx`                            | Application plus PostgreSQL; production qualification remains open.                                                |

The task console is an HTML/CSS illustration with synthetic data, not a screenshot, live demo or benchmark. Its 100 ms timeline demonstrates overlapping branches; those values are not a speed claim. Cost remains unknown and validator failure remains visible.

## Coding-agent benchmark illustration

The interactive comparison is an educational example of the planned benchmark workflow, not a shipped runner or measured product result. All three model identities and all monetary amounts are hypothetical. Scenarios use 10 independent runs of one fixed task per model, a 10/10 acceptance threshold and a 10-minute per-run limit. This is an illustrative decision rule, not a statistical reliability claim.

- Bug fix: Model A costs $18 / 10 accepted = $1.80; Model B costs $7.20 / 10 = $0.72 (60% less within this example). Model C costs $6 / 4 = $1.50 but fails the acceptance bar.
- Refactor: Model A costs $24 / 10 = $2.40; Model B costs $33 / 10 = $3.30 after repair work; Model C costs $9 / 3 = $3.00 and fails the acceptance bar. Keep A.
- Edge case: Model A costs $20 / 10 = $2.00; Model B costs $12 / 8 = $1.50 but fails the acceptance bar. Model C costs $7 / 0; cost per accepted result is undefined. Keep A.

All cohort spend includes failures. Breakdowns cover initial model work, repair/retry model work, and tools/validation; human review is excluded. The component calculates totals, eligible winners and savings from integer-cent data in `src/content/benchmarks.ts`. Actual benchmark claims require representative tasks, repeated trials, matching conditions, quality and latency gates, cost coverage and uncertainty as specified by R19 in the release matrix. Observed traces alone cannot prove counterfactual savings. Viewing the example triggers no inference, replay or provider traffic.

## Release updates

Keep one explicit availability section and a short release notice. Do not repeat future-tense placeholder copy across the whole page. Move capabilities from in-progress to available only when their documented user workflow exists. A launch announcement requires published release evidence; updating marketing copy does not close acceptance gates.

Do not add unsupported savings, throughput, provider counts, customer logos, testimonials or comparative claims. Keep upstream code attribution in the existing notices. The landing page is original copy.

Update the page, shared content and this baseline together when positioning or availability changes. The build is root-mounted; product routes remain owned by the composed Niu Gateway.

## Product narrative and editions

Simple has two promises: ready-to-use models and easy coding-agent integration that preserves the user's existing coding-plan subscription. Direct providers plus optional OpenRouter fallback are planned model supply; universal model coverage and universal agent/plan compatibility are not verified claims. Additional paid API calls require explicit opt-in and do not inherit subscription entitlements.

Transparency means detailed token and time evidence at each task step, leading to task-level cost accounting. Missing instrumentation and costs remain explicit. Planned model fusion uses benchmark evidence to combine models across task stages and evaluates the complete outcome, including handoffs, repeated context, failures and validation. The existing examples compare single models; they are not evidence of fusion savings.

Open Source and Enterprise both support the self-hosting direction. The public core is independently usable without a private service or enterprise license. Enterprise scope follows the public release matrix: federation/provisioning, advanced governance/retention, private integrations and optimization policies. These extensions are planned, not a released SKU or support/SLA promise. Core security, keys, accounting, budgets and baseline routing must not be described as enterprise-only. Company-server deployment controls application/database placement and operations; external provider calls still leave that environment. Do not imply air-gapped inference or universal data residency from self-hosting alone.

## Scope clarification

Complex tasks are the product boundary; coding is a concrete benchmark example and an initial integration focus. Do not narrow the hero or core value proposition to developers or coding teams. Acceptance differs by task: tests for code, content and design review for decks, editorial criteria for novels, and creative/technical review for films. Examples of creative tasks do not imply shipped authoring tools or validated model integrations. Keep the subscription-preserving coding-agent goal explicit as a specific use case.

## Task-cost illustration

The transparency mockup exposes task → iteration → step → token usage, with time and model charges on each step. Two synthetic sequential iterations contain three and two steps respectively. The first totals 12,000 tokens, 180 seconds and $0.24; the repair adds 4,000 tokens, 80 seconds and $0.08. Combined: 16,000 tokens, 260 seconds and $0.32 in modeled model charges. This is not a measured result or complete task cost. Tool, rendering, subscription and human-review costs are excluded. Actual money depends on model-specific input/output/cache rates; elapsed time follows the execution schedule, not the sum of overlapping durations. Do not present iteration count × step count × token count as a universally exact cost formula.

## Fusion tradeoff illustration

The third value mockup compares three invented accepted executions of the same task: expensive-only (1 iteration, 3 steps, 12k tokens, 3 minutes, $1.20), cheap-only (3 iterations, 9 steps, 36k tokens, 9 minutes, $0.36), and mixed (2 iterations, 5 steps, 21k tokens, 5 minutes, $0.48). Illustrative blended rates are $0.10/1k and $0.01/1k; the mixed run has 3k expensive and 18k cheap tokens. Under a 6-minute and $0.60 limit, only the mix meets both constraints and the quality threshold. It is neither the fastest nor the cheapest unconditionally. This is synthetic model-only accounting, not fusion evidence. A higher-priced model is not guaranteed to take fewer steps, and acceptance is a defined threshold rather than a claim of identical output quality.

### Surface design

Use whitespace and typography to separate page sections. Group related content
with soft neutral surfaces rather than outlined boxes. Keep the existing niu.io
colors and Geist typography. Shared radii are 16px for outer surfaces, 12px for
nested panels, and 10px for controls. Reserve subtle dividers for data rows and
interactive lists; preserve keyboard focus outlines. Orange-tinted surfaces and
explicit labels identify selected or recommended options without relying on
color alone.

## Persuasion review

Lead with the user's decision: a cheaper model may require more attempts; a
stronger model may save time while increasing spend. Keep “Agent Gateway for
complex tasks” as the category, then connect model access to task evidence and
the planned benchmark/fusion workflow. Quality is an acceptance threshold;
time and spend are the tradeoff within that threshold.

The primary action opens the development quickstart directly. State current
availability beside it so visitors can distinguish what they can evaluate now
from the illustrative future workflow. Translate accounting and quota language
into questions a user can answer, without upgrading the implementation claims.

Evidence still needed before a convincing production launch:

- A reproducible task case study with real model identities, dated rates,
  acceptance criteria, repeated runs, elapsed time, and all relevant costs.
- A recording of the implemented task investigation workflow, clearly separate
  from concept mockups, with a public sample import visitors can reproduce.
- A verified agent/plan compatibility list explaining subscription behavior and
  explicit paid fallback. Keep unverified integrations labeled as goals.

Do not substitute synthetic percentages, customer logos, or unsupported
integration promises for this evidence. The current landing invites evaluation
of the public development build; it does not announce production readiness.

Typography uses a 14px minimum for supporting text and 16px for primary body
copy. Do not reintroduce decorative section eyebrows or numbered captions above
headings. Keep release status, synthetic-example disclosures, and comparison
assumptions visible and readable; remove redundant labels instead of shrinking
them to fit. Tables may scroll horizontally on small screens.
