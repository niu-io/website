// Operator positioning; capability claims remain bounded by current supported interfaces.
export const links = {
  repo: 'https://github.com/niu-io/niu',
  quickstart: '/docs/getting-started/',
  deployment: '/docs/deployment/single-container/',
  api: '/docs/api/rest/',
  benchmark: '/docs/guides/gateway-benchmarks/',
  compare: '/compare/',
  release: 'https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md',
  dashboard: '/workspaces/default/',
};

// Same measured values as the benchmark section (ai-gateway-bench, c = 64).
export const heroStats = [
  { value: '3,239', label: 'requests / second' },
  { value: '10.7×', label: 'LiteLLM Proxy throughput' },
  { value: '31.5 ms', label: 'p99 latency at c = 64' },
  { value: '18.2 MB', label: 'idle memory (RSS)' },
];

export const pillars = [
  {
    index: '01',
    metric: '3,239 RPS · 31.5 ms p99',
    title: 'Rust gateway data plane',
    detail: '10.7× LiteLLM Proxy & 3.7× New API peak throughput at c = 64, idling at 18.2 MB RSS with ACID PostgreSQL persistence.',
  },
  {
    index: '02',
    metric: 'Supply ≠ Customer Tariff',
    title: 'Three-way financial isolation',
    detail: 'Price customer workspaces independently of Provider offers. Keep procurement rates private in platform administration.',
  },
  {
    index: '03',
    metric: 'Operation → Attempt → Charge',
    title: 'Attempt-level request evidence',
    detail: 'Trace every call across route pool candidates, upstream attempts, token counts, and explicit settled vs. unresolved charge states.',
  },
  {
    index: '04',
    metric: 'API + Catalog + Generations',
    title: 'Complete self-hosted product',
    detail: 'Serve OpenAI/Anthropic endpoints, a public model catalog, workspace budget caps, and saved Chat & Seedance Video workspaces.',
  },
];

export const capabilities = [
  {
    number: '01',
    title: 'Route pools & Provider supply',
    description: 'Bind customer-facing model aliases to weighted, prioritized Provider mappings while keeping upstream credentials server-side.',
    label: 'Models & routing',
    href: '/docs/configuration/models/',
  },
  {
    number: '02',
    title: 'Attempt-level request logs',
    description: 'Inspect every attempt, status code, TTFT, and token count. Uncertain mid-stream disconnects stay explicit instead of silently zeroed.',
    label: 'Request evidence',
    href: '/docs/concepts/execution-observation/',
  },
  {
    number: '03',
    title: 'Independent customer tariffs',
    description: 'Decouple workspace selling prices from Provider purchase offers so customer bills never expose your procurement costs or margins.',
    label: 'Usage & billing',
    href: '/docs/concepts/performance-and-cost/',
  },
  {
    number: '04',
    title: 'Pre-dispatch spending holds',
    description: 'Enforce company, workspace, and API-key spending caps before upstream dispatch—counting in-flight reservations against active limits.',
    label: 'Access & limits',
    href: '/docs/security/overview/',
  },
  {
    number: '05',
    title: 'Drop-in OpenAI & Anthropic APIs',
    description: 'Connect existing SDKs and coding agents (Claude Code, Codex) via /v1/chat/completions, /v1/responses, and scoped /v1/messages.',
    label: 'API & SDK',
    href: '/docs/guides/api-quickstart/',
  },
  {
    number: '06',
    title: 'Saved Chat & Video workspaces',
    description: 'Give customers persistent backend-saved Chat sessions and asynchronous Seedance video job tracking with authorized result downloads.',
    label: 'Generations',
    href: '/docs/reference/generations/',
  },
];

export const faqs = [
  {
    index: '01',
    category: 'Architecture',
    question: 'How does Niu differ from LiteLLM Proxy and New API?',
    answer: 'LiteLLM Proxy is a Python developer proxy (~302 RPS at c=64, 158 MB idle RSS); New API is a Go channel relay (~866 RPS peak, shared user/channel quota model). Niu is a Rust AI gateway (3,238.7 RPS at c=64, 18.2 MB idle RSS) purpose-built for model API businesses—separating Provider offers from customer tariffs, enforcing pre-dispatch spending holds, and shipping saved Chat and Video workspaces.',
    linkLabel: 'Compare gateways',
    linkHref: '/compare/',
  },
  {
    index: '02',
    category: 'Commercial boundary',
    question: 'Can customers see my upstream Provider prices or margins?',
    answer: 'No. Customer workspace reports, logs, and API responses only expose customer-facing tariffs and charges. Provider purchase rates, procurement budgets, and platform margins are restricted to platform administration.',
    linkLabel: 'Usage & billing boundary',
    linkHref: '/docs/concepts/performance-and-cost/',
  },
  {
    index: '03',
    category: 'Stream reliability',
    question: 'What happens when an upstream stream drops mid-response?',
    answer: 'Niu records pre-dispatch admission in PostgreSQL and never blindly replays an uncertain request that may have already executed upstream. If usage evidence is missing after a disconnect, the attempt and charge remain explicitly unresolved rather than fabricating a $0 bill.',
    linkLabel: 'Request evidence contract',
    linkHref: '/docs/concepts/execution-observation/',
  },
  {
    index: '04',
    category: 'Self-hosting',
    question: 'Can I self-host the entire stack without private dependencies?',
    answer: 'Yes. The public gateway, dashboard, model catalog, and documentation run together against a single PostgreSQL database. Niu-owned public code is MIT-licensed and requires no external license service.',
    linkLabel: 'Single-container deployment',
    linkHref: '/docs/deployment/single-container/',
  },
  {
    index: '05',
    category: 'Extensibility',
    question: 'How do plugins and commercial extensions integrate without bloating the core?',
    answer: 'Niu keeps its Rust data plane lean and extensible through the open niu-plugin-api contract and niu-plugin-sdk. Plugins run as supervised Unix-socket services verified with short-lived Ed25519 JWS request contexts, isolating custom policies, webhooks, and enterprise modules from core inference latency.',
    linkLabel: 'Architecture overview',
    linkHref: '/docs/concepts/architecture/',
  },
  {
    index: '06',
    category: 'Release scope',
    question: 'What is ready to evaluate today vs. still under qualification?',
    answer: 'Model route pools, workspace API keys, spending caps, request/charge accounting, and saved Chat & Video interfaces are available in the current build. Full first-release qualification across all commercial payment, Provider settlement, and recovery gates is tracked in the release matrix.',
    linkLabel: 'Release acceptance matrix',
    linkHref: 'https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md',
  },
];

export const requestExample = `curl http://localhost:2555/v1/chat/completions \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4",
    "messages": [{"role": "user", "content": "Check Q3 p99."}],
    "stream": true
  }'`;

export const codeExamples = [
  {
    id: 'curl',
    label: 'cURL · SSE',
    endpoint: 'POST /v1/chat/completions',
    code: requestExample,
    trace: 'Operation → Attempt #1 (Anthropic 200 OK) → 40 SSE tok → Settled Customer Charge ($0.018)',
  },
  {
    id: 'sdk',
    label: 'TypeScript SDK',
    endpoint: '@niu/sdk · NiuClient',
    code: `import { NiuClient } from "@niu/sdk";

const niu = new NiuClient({
  baseUrl: "https://niu.io",
  apiKey: process.env.NIU_API_KEY,
});

const stream = await niu.chat.completions.create({
  model: "claude-sonnet-4",
  messages: [{ role: "user", content: "Summarize our Q3 API latency." }],
  stream: true,
});`,
    trace: 'Typed SSE iterator · Scoped workspace key · Pre-dispatch hold reserved in PostgreSQL',
  },
  {
    id: 'agents',
    label: 'Claude Code & Codex',
    endpoint: 'POST /v1/messages & /v1/responses',
    code: `export ANTHROPIC_BASE_URL="http://localhost:2555"
export ANTHROPIC_API_KEY="$NIU_WORKSPACE_KEY"

export OPENAI_BASE_URL="http://localhost:2555/v1"
export OPENAI_API_KEY="$NIU_WORKSPACE_KEY"

# Launch coding agents directly against your Niu route pool
claude "Refactor the billing ledger retry handler"`,
    trace: 'Native /v1/messages & /v1/responses · Multi-turn tool calls · Per-key budget cap enforced',
  },
];

