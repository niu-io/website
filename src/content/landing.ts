// Operator positioning; capability claims remain bounded by current supported interfaces.
export const links = {
  repo: "https://github.com/niu-io/niu",
  quickstart: "/docs/getting-started/",
  deployment: "/docs/deployment/single-container/",
  api: "/docs/api/rest/",
  benchmark: "/docs/guides/gateway-benchmarks/",
  compare: "/compare/",
  release:
    "https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md",
  dashboard: "/workspaces/default/",
};

// Same measured values as the benchmark section (ai-gateway-bench, c = 64).
export const heroStats = [
  { value: "3,239", label: "requests / second", labelZh: "请求 / 秒 (RPS)" },
  { value: "10.7×", label: "LiteLLM Proxy throughput", labelZh: "LiteLLM Proxy 吞吐倍数" },
  { value: "31.5 ms", label: "p99 latency at c = 64", labelZh: "64 并发下 p99 延迟" },
  { value: "18.2 MB", label: "idle memory (RSS)", labelZh: "空闲常驻内存 (RSS)" },
];

export const pillars = [
  {
    index: "01",
    metric: "3,239 RPS · 31.5 ms p99",
    title: "Rust gateway data plane",
    titleZh: "Rust 高性能网关数据面",
    detail:
      "10.7× LiteLLM Proxy & 3.7× New API peak throughput at c = 64, idling at 18.2 MB RSS with ACID PostgreSQL persistence.",
    detailZh:
      "64 并发下峰值吞吐达 LiteLLM Proxy 的 10.7 倍、New API 的 3.7 倍；空闲内存仅 18.2 MB RSS，并完整持久化 PostgreSQL ACID 账本。",
  },
  {
    index: "02",
    metric: "Supply ≠ Customer Tariff",
    title: "Three-way financial isolation",
    titleZh: "三方财务边界严格隔离",
    detail:
      "Price customer workspaces independently of Provider offers. Keep procurement rates private in platform administration.",
    detailZh:
      "客户工作空间售价与上游模型供应商报价完全解耦；采购成本、预算与平台毛利严格锁定在平台管理后台。",
  },
  {
    index: "03",
    metric: "Operation → Attempt → Charge",
    title: "Attempt-level request evidence",
    titleZh: "尝试级（Attempt）全链路请求证据",
    detail:
      "Trace every call across route pool candidates, upstream attempts, token counts, and explicit settled vs. unresolved charge states.",
    detailZh:
      "逐笔追踪路由池候选节点、上游调用尝试、Token 用量，以及已结算与待核实计费状态。",
  },
  {
    index: "04",
    metric: "API + Catalog + Generations",
    title: "Complete self-hosted product",
    titleZh: "完整的私有化模型服务产品",
    detail:
      "Serve OpenAI/Anthropic endpoints, a public model catalog, workspace budget caps, and saved Chat & Seedance Video workspaces.",
    detailZh:
      "开箱即用提供 OpenAI/Anthropic 兼容接口、公开模型目录、工作空间额度管控，以及持久化对话与 Seedance 视频生成工作台。",
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Route pools & Provider supply",
    titleZh: "模型路由池与供应商供给",
    description:
      "Bind customer-facing model aliases to weighted, prioritized Provider mappings while keeping upstream credentials server-side.",
    descriptionZh:
      "将面向客户的模型别名绑定到带优先级与权重的供应商路由池，上游密钥全程加密保存在服务端。",
    label: "Models & routing",
    labelZh: "模型与路由",
    href: "/docs/configuration/models/",
  },
  {
    number: "02",
    title: "Attempt-level request logs",
    titleZh: "尝试级请求日志与诊断",
    description:
      "Inspect every attempt, status code, TTFT, and token count. Uncertain mid-stream disconnects stay explicit instead of silently zeroed.",
    descriptionZh:
      "查看每次上游尝试、状态码、首字延迟（TTFT）与 Token 计数；流式中途断开的异常状态清晰可查，绝不静默清零。",
    label: "Request evidence",
    labelZh: "请求证据与日志",
    href: "/docs/concepts/execution-observation/",
  },
  {
    number: "03",
    title: "Independent customer tariffs",
    titleZh: "独立的客户销售定价体系",
    description:
      "Decouple workspace selling prices from Provider purchase offers so customer bills never expose your procurement costs or margins.",
    descriptionZh:
      "将客户工作空间销售价目与供应商采购报价完全分离，客户账单与接口永远不会泄露采购成本与平台毛利。",
    label: "Usage & billing",
    labelZh: "用量与计费",
    href: "/docs/concepts/performance-and-cost/",
  },
  {
    number: "04",
    title: "Pre-dispatch spending holds",
    titleZh: "转发前额度预占与预算风控",
    description:
      "Enforce company, workspace, and API-key spending caps before upstream dispatch—counting in-flight reservations against active limits.",
    descriptionZh:
      "在请求发往上游前强制校验企业、工作空间与 API 密钥三级额度上限，在途并发预占实时计入可用预算。",
    label: "Access & limits",
    labelZh: "权限与额度控制",
    href: "/docs/security/overview/",
  },
  {
    number: "05",
    title: "Drop-in OpenAI & Anthropic APIs",
    titleZh: "无缝兼容 OpenAI 与 Anthropic 接口",
    description:
      "Connect existing SDKs and coding agents (Claude Code, Codex) via /v1/chat/completions, /v1/responses, and scoped /v1/messages.",
    descriptionZh:
      "通过 /v1/chat/completions、/v1/responses 与 /v1/messages 直接接入现有 SDK 及 Claude Code、Codex 等编程智能体。",
    label: "API & SDK",
    labelZh: "API 与 SDK 教程",
    href: "/docs/guides/api-quickstart/",
  },
  {
    number: "06",
    title: "Saved Chat & Video workspaces",
    titleZh: "持久化生成对话与视频工作空间",
    description:
      "Give customers persistent backend-saved Chat sessions and asynchronous Seedance video job tracking with authorized result downloads.",
    descriptionZh:
      "为客户提供后端持久化的多模型对话会话、Seedance 异步视频生成任务追踪以及受权成片下载。",
    label: "Generations",
    labelZh: "生成对话与视频",
    href: "/docs/reference/generations/",
  },
];

export const faqs = [
  {
    index: "01",
    category: "Architecture",
    categoryZh: "系统架构",
    question: "How does Niu differ from LiteLLM Proxy and New API?",
    questionZh: "Niu 牛元与 LiteLLM Proxy、New API 有何核心区别？",
    answer:
      "LiteLLM Proxy is a Python developer proxy (~302 RPS at c=64, 158 MB idle RSS); New API is a Go channel relay (~866 RPS peak, shared user/channel quota model). Niu is a Rust AI gateway (3,238.7 RPS at c=64, 18.2 MB idle RSS) purpose-built for model API businesses—separating Provider offers from customer tariffs, enforcing pre-dispatch spending holds, and shipping saved Chat and Video workspaces.",
    answerZh:
      "LiteLLM Proxy 是面向开发者的 Python 代理（64 并发约 302 RPS，空闲内存 158 MB）；New API 是 Go 渠道转发程序（峰值约 866 RPS，采用共享额度模型）。Niu 牛元是专为模型 API 商业化运营打造的 Rust 网关（64 并发达 3,238.7 RPS，空闲内存仅 18.2 MB），原生实现供应商采购价与客户售价隔离、转发前预算预占，并内置持久化对话与视频工作台。",
    linkLabel: "Compare gateways",
    linkLabelZh: "查看网关详细对比",
    linkHref: "/compare/",
  },
  {
    index: "02",
    category: "Commercial boundary",
    categoryZh: "商业数据边界",
    question: "Can customers see my upstream Provider prices or margins?",
    questionZh: "客户能否看到我的上游供应商采购价或平台利润？",
    answer:
      "No. Customer workspace reports, logs, and API responses only expose customer-facing tariffs and charges. Provider purchase rates, procurement budgets, and platform margins are restricted to platform administration.",
    answerZh:
      "绝不会。客户工作空间的报表、请求日志和 API 响应仅展示面向客户的销售价格与扣费金额。供应商采购单价、采购预算及平台毛利严格限制在平台管理后台。",
    linkLabel: "Usage & billing boundary",
    linkLabelZh: "了解计费与商业边界",
    linkHref: "/docs/concepts/performance-and-cost/",
  },
  {
    index: "03",
    category: "Stream reliability",
    categoryZh: "流式计费可靠性",
    question: "What happens when an upstream stream drops mid-response?",
    questionZh: "当上游流式响应中途意外断开时会发生什么？",
    answer:
      "Niu records pre-dispatch admission in PostgreSQL and never blindly replays an uncertain request that may have already executed upstream. If usage evidence is missing after a disconnect, the attempt and charge remain explicitly unresolved rather than fabricating a $0 bill.",
    answerZh:
      "Niu 牛元在转发前即于 PostgreSQL 记录准入状态，绝不盲目重放可能已在上游执行的非幂等请求。若流式中断后缺失用量证据，该次尝试与费用会明确标记为待核实状态，而不会伪造 0 元账单。",
    linkLabel: "Request evidence contract",
    linkLabelZh: "了解请求证据机制",
    linkHref: "/docs/concepts/execution-observation/",
  },
  {
    index: "04",
    category: "Self-hosting",
    categoryZh: "私有化自托管",
    question: "Can I self-host the entire stack without private dependencies?",
    questionZh: "能否在不依赖任何私有服务的情况下完整自托管？",
    answer:
      "Yes. The public gateway, dashboard, model catalog, and documentation run together against a single PostgreSQL database. Niu-owned public code is MIT-licensed and requires no external license service.",
    answerZh:
      "可以。公共网关、控制台、模型目录与文档站点只需连接单个 PostgreSQL 数据库即可完整运行。Niu 牛元开源核心采用 MIT 许可证，无需连接任何外部授权服务器。",
    linkLabel: "Single-container deployment",
    linkLabelZh: "单容器部署指南",
    linkHref: "/docs/deployment/single-container/",
  },
  {
    index: "05",
    category: "Extensibility",
    categoryZh: "插件与扩展性",
    question:
      "How do plugins and commercial extensions integrate without bloating the core?",
    questionZh: "插件与商业扩展如何在不拖慢核心网关的前提下集成？",
    answer:
      "Niu keeps its Rust data plane lean and extensible through the open niu-plugin-api contract and niu-plugin-sdk. Plugins run as supervised Unix-socket services verified with short-lived Ed25519 JWS request contexts, isolating custom policies, webhooks, and enterprise modules from core inference latency.",
    answerZh:
      "Niu 牛元通过开放的 niu-plugin-api 契约与 niu-plugin-sdk 保持 Rust 核心数据面的精简。插件以受控的 Unix Socket 进程运行，并通过短效 Ed25519 JWS 签名上下文进行校验，将自定义策略与企业级模块同核心推理延迟完全隔离。",
    linkLabel: "Architecture overview",
    linkLabelZh: "查看架构概览",
    linkHref: "/docs/concepts/architecture/",
  },
  {
    index: "06",
    category: "Release scope",
    categoryZh: "版本准入范围",
    question: "What is ready to evaluate today vs. still under qualification?",
    questionZh: "当前版本哪些能力已可投入评估，哪些仍在准入验证？",
    answer:
      "Model route pools, workspace API keys, spending caps, request/charge accounting, and saved Chat & Video interfaces are available in the current build. Full first-release qualification across all commercial payment, Provider settlement, and recovery gates is tracked in the release matrix.",
    answerZh:
      "模型路由池、工作空间 API 密钥、预算上限、请求/费用账本以及持久化对话与视频工作台均已在当前版本提供。商业支付、供应商结算与故障恢复的完整准入矩阵在发布清单中持续追踪。",
    linkLabel: "Release acceptance matrix",
    linkLabelZh: "查看发布准入矩阵",
    linkHref:
      "https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md",
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
    id: "curl",
    language: "bash",
    label: "cURL · SSE",
    endpoint: "POST /v1/chat/completions",
    code: requestExample,
    trace:
      "Operation → Attempt #1 (Anthropic 200 OK) → 40 SSE tok → Settled Customer Charge ($0.018)",
    traceZh:
      "Operation → Attempt #1 (Anthropic 200 OK) → 40 SSE Token → 客户费率已结算 ($0.018)",
  },
  {
    id: "sdk",
    language: "typescript",
    label: "TypeScript SDK",
    endpoint: "@niu/sdk · NiuClient",
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
    trace:
      "Typed SSE iterator · Scoped workspace key · Pre-dispatch hold reserved in PostgreSQL",
    traceZh:
      "强类型 SSE 流式迭代器 · 工作空间作用域密钥 · PostgreSQL 转发前额度预占",
  },
  {
    id: "agents",
    language: "bash",
    label: "Claude Code & Codex",
    endpoint: "POST /v1/messages & /v1/responses",
    code: `export ANTHROPIC_BASE_URL="http://localhost:2555"
export ANTHROPIC_API_KEY="$NIU_WORKSPACE_KEY"

export OPENAI_BASE_URL="http://localhost:2555/v1"
export OPENAI_API_KEY="$NIU_WORKSPACE_KEY"

# Launch coding agents directly against your Niu route pool
claude "Refactor the billing ledger retry handler"`,
    trace:
      "Native /v1/messages & /v1/responses · Multi-turn tool calls · Per-key budget cap enforced",
    traceZh:
      "原生兼容 /v1/messages 与 /v1/responses · 多轮工具调用 · 密钥级预算上限强约束",
  },
];
