// Operator positioning; capability claims remain bounded by current supported interfaces.
export const links = {
  repo: "https://github.com/niu-io/niu",
  quickstart: "/docs/getting-started/",
  deployment: "/docs/deployment/single-container/",
  api: "/docs/api/rest/",
  sdk: "/docs/api/sdk/",
  models: "/models/",
  benchmark: "/docs/guides/gateway-benchmarks/",
  compare: "/compare/",
  release:
    "https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md",
  releaseDocs: "/docs/releases/first-release/",
  dashboard: "/workspaces/default/",
};

// Three primary competitive dimensions surfaced in the first viewport ledger.
export const heroPillars = [
  {
    id: "open-source",
    tag: "Full-Stack MIT",
    tagZh: "全栈开源",
    title: "Gateway + Console + Catalog + Studio",
    titleZh: "网关、后台、模型目录与工作台一体交付",
    detail:
      "One container + PostgreSQL ships the entire platform under MIT—zero license servers or proprietary SaaS lock-in.",
    detailZh:
      "单个容器连接 PostgreSQL 即可完整运行整套平台，MIT 协议开源，无外部授权依赖、不被卡脖子。",
  },
  {
    id: "performance",
    tag: "3,239 RPS · 18.2 MB",
    tagZh: "10 倍性能",
    title: "10.7× LiteLLM · 3.7× New API in Rust",
    titleZh: "Rust 原生 3,239 RPS 吞吐，空闲内存仅 18 MB",
    detail:
      "31.5 ms p99 latency at 64 concurrency even with full PostgreSQL ACID admission and batched settlement turned on.",
    detailZh:
      "即使全程开启数据库准入与扣费结算，64 并发 p99 延迟仍低至 31.5 ms，吞吐达 LiteLLM 的 10.7 倍。",
  },
  {
    id: "commercial",
    tag: "Commercial-Ready",
    tagZh: "丰富商业化功能",
    title: "Model Pools, private margins & 3-tier holds",
    titleZh: "智能模型池、进销价格分离与多级余额风控",
    detail:
      "Route across Providers by request traits, price retail independently from cost, and prevent concurrent balance overruns.",
    detailZh:
      "多渠道归一模型池条件分流，采购底价与对客售价彻底解耦，发往上游前实时锁住预算防刷穿。",
  },
];

// Four-stage architectural pipeline for a single request.
export const pipelineStages = [
  {
    protocol: "OpenAI & Anthropic APIs",
    title: "Unified protocol admission",
    titleZh: "原生多协议统一接入",
    detail:
      "Accept OpenAI and Anthropic requests directly from apps, Claude Code, or Codex without client wrappers.",
    detailZh:
      "原生兼容 OpenAI 与 Anthropic 核心接口，现有应用、Claude Code 与 Codex 改一行地址直接连入。",
  },
  {
    protocol: "PostgreSQL CTE · Quota Hold",
    title: "3-tier quota reservation",
    titleZh: "转发前三级额度预占",
    detail:
      "Atomically check and reserve company, workspace, and API-key budgets before dispatching a single upstream token.",
    detailZh:
      "请求发往上游前，在单条 SQL 事务中完成企业、工作空间、密钥三级限额校验与在途资金冻结。",
  },
  {
    protocol: "Model Pool · Trait Failover",
    title: "Trait-aware routing & failover",
    titleZh: "模型池条件分流与秒级容灾",
    detail:
      "Match candidate Providers by context length, vision, thinking, or tools, with automatic failover on upstream 429/5xx.",
    detailZh:
      "按上下文长度、视觉、思考或工具调用自动选路；主渠道限流报错时毫秒级无感切往备用供应商。",
  },
  {
    protocol: "Retail Tariff ≠ Provider Cost",
    title: "Dual-ledger settlement",
    titleZh: "进销双账本独立结算",
    detail:
      "Settle customer bills at published retail tariffs while keeping upstream Provider costs and net margins private in Admin.",
    detailZh:
      "工作空间账单按对客零售价透明扣费，管理后台独立核算渠道采购支出与净毛利，断流异常诚实标记。",
  },
];

// Same measured values as the benchmark section (ai-gateway-bench, c = 64).
export const heroStats = [
  { value: "3,239", label: "requests / second", labelZh: "单机峰值并发 (RPS)" },
  {
    value: "10.7×",
    label: "faster than LiteLLM",
    labelZh: "吞吐性能超越 LiteLLM",
  },
  { value: "31.5 ms", label: "p99 tail latency", labelZh: "64 并发 p99 延迟" },
  {
    value: "18.2 MB",
    label: "idle RAM footprint",
    labelZh: "极低空闲内存占用",
  },
];

export const pillars = [
  {
    index: "01",
    metric: "3,239 RPS · 18.2 MB RAM",
    metricZh: "3,239 RPS · 18 MB 内存",
    title: "10× throughput, tiny footprint",
    titleZh: "10 倍吞吐性能，极低资源占用",
    detail:
      "3,239 RPS at c = 64—10.7× LiteLLM Proxy and 3.7× New API—while idling at just 18.2 MB RAM with full PostgreSQL persistence.",
    detailZh:
      "单机 64 并发实测达 3,239 RPS，吞吐量是 LiteLLM 的 10.7 倍、New API 的 3.7 倍；空闲内存仅 18 MB，高峰流量稳如磐石。",
  },
  {
    index: "02",
    metric: "Cost ≠ Retail Price",
    metricZh: "采购底价 ≠ 客户售价",
    title: "Buy low, price freely",
    titleZh: "进销价格分离，守住平台毛利",
    detail:
      "Set customer selling prices independently from upstream Provider costs. Price model pools as custom models or pass through per-route rates—without ever exposing your margins.",
    detailZh:
      "上游渠道采购底价与面向客户的销售价完全解耦。支持作为自定义模型统一定价或按命中模型分别计费，客户永远看不到您的底价与利润率。",
  },
  {
    index: "03",
    metric: "Zero Mystery Bills",
    metricZh: "笔笔可查 · 拒绝糊涂账",
    title: "Every call & charge accounted for",
    titleZh: "每笔调用与扣费都算得明白",
    detail:
      "See every routing attempt, failover hop, TTFT, and token count. Interrupted streams stay explicitly flagged rather than silently billed or zeroed out.",
    detailZh:
      "从首次尝试、故障自动切换到最终 Token 结算全程留痕；流式中途断连的异常请求明确标记待核实，绝不偷偷扣费或伪造 0 元糊涂账。",
  },
  {
    index: "04",
    metric: "Gateway + Console + Studio",
    metricZh: "网关 + 控制台 + 工作台",
    title: "Full-stack open source, ready on day one",
    titleZh: "全栈开源交付，开箱即用",
    detail:
      "More than a bare CLI proxy—ship the gateway, operator console, public model catalog, customer workspaces, and saved Chat & Video studio from one container.",
    detailZh:
      "不只是简陋的命令行转发工具——单个容器即完整交付高性能网关、管理后台、公开模型目录、多租户工作空间，以及在线对话与视频工作台。",
  },
];

export const capabilities = [
  {
    number: "01",
    group: "supply",
    proof: "/api/v1/pools · pool_tariff / candidate_tariff",
    proofZh: "支持统一定价 / 按命中模型计费 · 内置毛利审计",
    title: "Smart Model Pools & auto-failover",
    titleZh: "智能模型池与主备无感容灾",
    description:
      "Combine multiple Providers behind one callable model name with conditional routing rules (context length, vision, thinking, tools), weighted failover, and built-in strategy & margin auditing.",
    descriptionZh:
      "把多个供应商渠道组合成一个对外模型名，支持按上下文长度、视觉、深度思考或工具调用自动分流；上游报错秒级切换，还能一键审计各渠道命中率、延迟与净毛利。",
    label: "Models & routing",
    labelZh: "了解模型池与路由",
    href: "/docs/configuration/models/",
  },
  {
    number: "02",
    group: "supply",
    proof: "Retail tariff ≠ Provider purchase rate",
    proofZh: "客户只见零售账单 · 采购底价与毛利仅后台可见",
    title: "Decoupled retail pricing & private margins",
    titleZh: "进销价格解耦与底价严格保密",
    description:
      "Charge custom model rates, workspace Credits, or per-candidate pass-through tariffs. Upstream Provider identities, purchase costs, and platform margins never enter customer responses.",
    descriptionZh:
      "支持自定义模型零售价、工作空间额度（Credits）或按命中模型分别计费；上游供应商身份、采购底价与平台毛利严格锁定在管理员后台，对客账单干净透明。",
    label: "Usage & billing",
    labelZh: "了解定价与计费体系",
    href: "/docs/concepts/performance-and-cost/",
  },
  {
    number: "03",
    group: "risk",
    proof: "Company → Workspace → API Key holds",
    proofZh: "企业 → 工作空间 → API 密钥三级在途预占",
    title: "Multi-level quota & spend protection",
    titleZh: "三级预算风控，杜绝并发刷穿余额",
    description:
      "Enforce company, workspace, and API-key spending caps with real-time in-flight holds before upstream dispatch—stopping concurrent bursts from overrunning balances.",
    descriptionZh:
      "支持企业、工作空间、API 密钥三级消费上限；请求发往上游前实时冻结最大可能扣费敞口，彻底防止高并发抢跑把账户余额刷成负数。",
    label: "Access & limits",
    labelZh: "了解权限与额度风控",
    href: "/docs/security/overview/",
  },
  {
    number: "04",
    group: "risk",
    proof: "Operation → Attempts · Unresolved stream state",
    proofZh: "每次重试独立留痕 · 断流异常明确标记「待核实」",
    title: "Attempt-level logs & honest stream accounting",
    titleZh: "全链路留痕与诚实的流式对账",
    description:
      "Inspect every failed hop, failover reason, TTFT, and token charge at a glance. Interrupted SSE streams stay explicitly marked unresolved instead of producing mystery bills.",
    descriptionZh:
      "哪家上游报错、为什么触发切换、首字延迟（TTFT）多少、扣了多少钱一目了然；中途意外断流的请求独立标记「待核实」，绝不乱扣费或伪造 0 元成功账单。",
    label: "Request evidence",
    labelZh: "查看日志与对账机制",
    href: "/docs/concepts/execution-observation/",
  },
  {
    number: "05",
    group: "delivery",
    proof: "/models/ · Self-serve workspace keys & usage",
    proofZh: "公开模型目录 · 多租户工作空间与自助密钥管理",
    title: "Public model catalog & drop-in API gateway",
    titleZh: "品牌化模型目录与无缝多协议兼容",
    description:
      "Publish approved models to a clean public directory while giving each customer workspace scoped API keys, usage ledgers, and native OpenAI + Anthropic compatibility.",
    descriptionZh:
      "一键生成对外公开模型目录页，并为每个客户工作空间提供独立作用域密钥、用量明细及原生 OpenAI / Anthropic 接口兼容。",
    label: "API quickstart",
    labelZh: "查看 API 接入指南",
    href: "/docs/guides/api-quickstart/",
  },
  {
    number: "06",
    group: "delivery",
    proof: "Server-persisted Chat + Seedance Video tasks",
    proofZh: "服务端持久化对话会话 + Seedance 异步视频生成",
    title: "Built-in Chat & Video workspace",
    titleZh: "自带多模型对话与视频生成工作台",
    description:
      "Give customers a ready-to-use, server-persisted Chat playground and Seedance video studio right inside the same deployment—no extra frontend wrapper to maintain.",
    descriptionZh:
      "无需额外部署和维护第三方套壳前端，同一套系统直接为客户提供云端同步的多模型对话与 Seedance 视频生成工作台，开箱即可试用与交付。",
    label: "Generations studio",
    labelZh: "了解对话与视频工作台",
    href: "/docs/reference/generations/",
  },
];

export const capabilityGroups = [
  {
    id: "supply",
    title: "Supply routing & margin control",
    titleZh: "渠道调度与毛利掌控",
    summary:
      "Aggregate multiple Providers behind clean public model names without tying your retail prices to upstream cost fluctuations.",
    summaryZh:
      "把多家上游供应商统一收敛为稳定的对外模型服务，灵活设定零售价，实时看清每条渠道的真实毛利。",
  },
  {
    id: "risk",
    title: "Spend protection & auditability",
    titleZh: "资金风控与清晰对账",
    summary:
      "Protect balances before upstream tokens burn, and give both operators and customers indisputable request evidence.",
    summaryZh:
      "在调用发生前锁住风险敞口，在调用结束后保留完整重试链路与结算凭证，客诉排查不再盲人摸象。",
  },
  {
    id: "delivery",
    title: "Turnkey customer experience",
    titleZh: "开箱即用的对客产品体验",
    summary:
      "Ship a complete model service—catalog, workspace console, API gateway, and generative studio—from day one.",
    summaryZh:
      "从模型目录、多租户自助控制台到在线对话与视频生成工作台一次配齐，当天即可正式对外营业。",
  },
];

export const stackComponents = [
  {
    module: "niu-gateway (Rust)",
    role: "High-concurrency data plane",
    roleZh: "高并发数据面网关",
    detail:
      "Axum + Tokio zero-copy SSE forwarding, Model Pool rule evaluation, AES-256-GCM Provider secret handling, and batched PostgreSQL settlement.",
    detailZh:
      "基于 Axum + Tokio 的零拷贝 SSE 转发、模型池条件规则计算、AES-256-GCM 渠道密钥加密与 PostgreSQL 批量结算。",
  },
  {
    module: "Admin & Workspace Console",
    role: "Separated operator & customer portals",
    roleZh: "运营后台与客户工作空间分离",
    detail:
      "Platform admins manage Providers, Model Pools, tariffs, and P&L; customer workspaces manage API keys, guardrails, logs, and billing.",
    detailZh:
      "管理员独立管理供应商、模型池、定价与财务损益；客户在各自工作空间自助管理 API 密钥、预算护栏、请求日志与账单。",
  },
  {
    module: "Public Catalog & Docs",
    role: "Self-hosted discovery & developer docs",
    roleZh: "公开模型目录与开发者文档",
    detail:
      "Publish selected models and capabilities at /models/ alongside bilingual API & SDK documentation under your own domain.",
    detailZh:
      "在自有域名下自动呈现 /models/ 公开模型目录与中英双语 API / SDK 文档，绝不泄露上游渠道与采购底价。",
  },
  {
    module: "Generations & Plugin SDK",
    role: "Chat/Video studio & Unix-socket extensions",
    roleZh: "对话/视频工作台与插件扩展",
    detail:
      "Server-persisted multi-model Chat & Seedance video studio, plus Ed25519-verified Unix-socket plugins (niu-plugin-sdk) for custom auth & billing.",
    detailZh:
      "内置云端持久化的多模型对话与 Seedance 视频工作台，并提供基于本地套接字与 Ed25519 签名的开放插件 SDK。",
  },
];

export const faqs = [
  {
    index: "01",
    category: "Why Niu",
    categoryZh: "核心选型对比",
    question: "Why choose Niu over LiteLLM Proxy or New API?",
    questionZh: "为什么选择 Niu 牛元，而不是 LiteLLM 或 New API？",
    answer:
      "LiteLLM Proxy is a Python developer tool (~302 RPS at c=64, 158 MB idle RAM) without independent retail pricing; New API is a Go channel relay (~866 RPS peak) with shared multiplier quotas. Niu is a full-stack Rust gateway (3,239 RPS, 18.2 MB idle RAM) built for commercial model services—with separated cost vs. retail tariffs, conditional Model Pools, pre-dispatch balance protection, and built-in Chat & Video workspaces.",
    answerZh:
      "LiteLLM 是面向开发者的 Python 转发工具（64 并发仅约 302 RPS，空闲内存 158 MB），缺乏独立的商业销售定价体系；New API 是 Go 渠道中转程序（峰值约 866 RPS），采购价与售价混用倍率。Niu 牛元是用 Rust 从头构建的全栈开源商业网关（实测 3,239 RPS、空闲内存仅 18 MB），原生支持进销价格分离、条件模型池、并发余额防刷穿，并自带对话与视频工作台。",
    linkLabel: "Compare gateways",
    linkLabelZh: "查看网关详细对比",
    linkHref: "/compare/",
  },
  {
    index: "02",
    category: "Profit & privacy",
    categoryZh: "底价与利润保密",
    question: "Can customers ever see my upstream costs or profit margins?",
    questionZh: "我的上游采购底价和渠道利润会被客户看到吗？",
    answer:
      "Never. Customer workspaces, usage logs, and API responses only show your customer-facing prices and charges. Upstream Provider identities, purchase rates, and platform margins remain strictly locked in the admin console—enforced in backend serialization, not just hidden in CSS.",
    answerZh:
      "绝对不会。客户在工作空间控制台、账单明细和 API 响应中，只能看到您对外设定的模型售价和实际扣费金额。上游供应商是谁、采购底价多少、平台赚了多少毛利，全部在后端接口序列化层严格隔离，仅管理员后台可见。",
    linkLabel: "Usage & billing boundary",
    linkLabelZh: "了解计费与商业边界",
    linkHref: "/docs/concepts/performance-and-cost/",
  },
  {
    index: "03",
    category: "Billing accuracy",
    categoryZh: "流式计费准确性",
    question: "What happens if an upstream stream drops halfway through?",
    questionZh: "如果上游流式输出到一半意外断开了，会不会乱扣费？",
    answer:
      "No mystery charges and no fake $0 bills. Niu records pre-dispatch state in PostgreSQL and never blindly replays a request that may have already run upstream. If a stream drops without usage evidence, the call is explicitly flagged as unresolved for review.",
    answerZh:
      "不会乱扣费，更不会算糊涂账。Niu 牛元在转发前会先记录准入状态，绝不盲目重试可能已经产生费用的请求。如果流式响应中途意外断开且缺少用量凭证，系统会将其明确标记为「待核实」状态，既不会多扣客户钱，也不会伪造 0 元成功账单。",
    linkLabel: "Request evidence contract",
    linkLabelZh: "了解请求与对账机制",
    linkHref: "/docs/concepts/execution-observation/",
  },
  {
    index: "04",
    category: "Full-stack open source",
    categoryZh: "全栈开源与自托管",
    question: "Is the full stack truly open source for self-hosting?",
    questionZh: "真的是全栈开源吗？私有化部署会不会被卡脖子？",
    answer:
      "Yes. The Rust gateway, admin console, customer workspace dashboard, model catalog, and docs are all MIT-licensed and run together against a single PostgreSQL database—with zero license servers or private dependencies.",
    answerZh:
      "真正全栈开源。核心 Rust 网关、管理后台、客户工作空间控制台、模型目录和文档站点全部采用 MIT 开源协议，只需连接一个标准 PostgreSQL 数据库即可单容器完整运行，不需要连接任何外部授权服务器。",
    linkLabel: "Single-container deployment",
    linkLabelZh: "查看单容器部署指南",
    linkHref: "/docs/deployment/single-container/",
  },
  {
    index: "05",
    category: "Extensibility",
    categoryZh: "插件与定制扩展",
    question: "How can we extend Niu for custom billing or internal systems?",
    questionZh: "如果需要对接自有计费或企业内部系统，如何定制扩展？",
    answer:
      "Niu provides an open plugin contract (niu-plugin-api and niu-plugin-sdk). Plugins run as supervised Unix-socket processes verified with short-lived Ed25519 JWS tokens—letting you add custom auth, webhooks, and enterprise policies without slowing down core routing.",
    answerZh:
      "Niu 牛元提供开放的插件接口（niu-plugin-api 与 niu-plugin-sdk）。插件作为独立受控进程通过高速本地套接字（Unix Socket）与网关通信，并使用短效 Ed25519 令牌验签，既能灵活挂载自定义鉴权、回调和企业策略，又不会拖慢核心网关性能。",
    linkLabel: "Architecture overview",
    linkLabelZh: "查看插件架构说明",
    linkHref:
      "https://github.com/niu-io/niu/blob/main/docs/architecture/enterprise-composition.md",
  },
  {
    index: "06",
    category: "Production readiness",
    categoryZh: "功能就绪度",
    question: "What is ready to deploy today?",
    questionZh: "现在可以直接部署上线吗？哪些商业功能已经就绪？",
    answer:
      "Model Pools (with conditional routing & strategy margin audit), workspace API keys, independent customer pricing, 3-tier budget holds, attempt-level logs, and saved Chat & Video workspaces are ready to deploy today. Ongoing payment gateway and multi-node qualification is tracked transparently in our public release matrix.",
    answerZh:
      "多渠道智能模型池（含条件路由与毛利审计）、工作空间与 API 密钥管理、独立客户定价、三级预算防刷穿风控、全链路请求日志，以及在线对话和 Seedance 视频工作台均已就绪并可立即部署上线。更多支付渠道与多节点高可用验收进度在公开版本矩阵中透明更新。",
    linkLabel: "Release acceptance matrix",
    linkLabelZh: "查看发布准入矩阵",
    linkHref: "/docs/releases/first-release/",
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
    labelZh: "cURL · 流式调用",
    endpoint: "POST /v1/chat/completions",
    code: requestExample,
    trace:
      "Pool claude-sonnet-4 → Hold $0.048 → Attempt #1 (Anthropic 200 OK) → Settled retail charge ($0.018)",
    traceZh:
      "命中模型池 claude-sonnet-4 → 预占额度 $0.048 → Anthropic 200 OK → 按对客零售价结算 ($0.018)",
  },
  {
    id: "agents",
    language: "bash",
    label: "Claude Code & Codex",
    labelZh: "Claude Code 与 Codex",
    endpoint: "POST /v1/messages & /v1/responses",
    code: `export ANTHROPIC_BASE_URL="http://localhost:2555"
export ANTHROPIC_API_KEY="$NIU_WORKSPACE_KEY"

export OPENAI_BASE_URL="http://localhost:2555/v1"
export OPENAI_API_KEY="$NIU_WORKSPACE_KEY"

# Point coding agents at a Niu Model Pool
claude --model claude-sonnet-4 "Audit billing retry logic"`,
    trace:
      "Native /v1/messages & /v1/responses · Conditional >128k context routing · Per-key spend cap enforced",
    traceZh:
      "原生兼容 /v1/messages 与 /v1/responses · >128k 长上下文自动路由直连渠道 · 密钥级预算上限强约束",
  },
  {
    id: "sdk",
    language: "typescript",
    label: "TypeScript SDK",
    labelZh: "TypeScript SDK",
    endpoint: "@niu/sdk · NiuClient",
    code: `import { NiuClient } from "@niu/sdk";

const niu = new NiuClient({
  baseUrl: "https://niu.io",
  apiKey: process.env.NIU_API_KEY,
});

const stream = await niu.chat.completions.create({
  model: "claude-sonnet-4",
  messages: [{ role: "user", "content": "Summarize Q3 latency." }],
  stream: true,
});`,
    trace:
      "Typed SSE iterator · Scoped workspace key · Zero upstream Provider or cost fields exposed to client",
    traceZh:
      "强类型 SSE 异步流迭代器 · 工作空间作用域密钥 · 客户端响应严禁泄露上游供应商与采购底价",
  },
  {
    id: "docker",
    language: "bash",
    label: "Docker Self-Host",
    labelZh: "Docker 单容器部署",
    endpoint: "ghcr.io/niu-io/niu · MIT",
    code: `docker run -d --name niu \\
  -p 2555:2555 \\
  -e DATABASE_URL="postgres://niu:secret@postgres:5432/niu" \\
  -e NIU_ADMIN_TOKEN="$NIU_ADMIN_TOKEN" \\
  -e NIU_VENDOR_ENCRYPTION_KEY="$NIU_32CHAR_MASTER_KEY" \\
  ghcr.io/niu-io/niu:latest`,
    trace:
      "Single container serves Gateway (:2555/v1), Console (/workspaces), Public Catalog (/models), and Docs (/docs)",
    traceZh:
      "单个容器同时交付高性能网关 (:2555/v1)、管理与客户控制台 (/workspaces)、模型目录 (/models) 与文档 (/docs)",
  },
];
