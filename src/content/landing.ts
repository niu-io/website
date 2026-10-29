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
    title: "Smart Model Pools & auto-failover",
    titleZh: "智能模型池与主备无感容灾",
    description:
      "Combine multiple Providers behind one callable model name with conditional routing rules, weighted failover, and built-in strategy & margin auditing.",
    descriptionZh:
      "把多个供应商渠道组合成一个对外模型名，支持按上下文长度、视觉或工具调用自动分流，上游报错秒级切换，还能一键审计各渠道延迟与净毛利。",
    label: "Models & routing",
    labelZh: "了解模型池与路由",
    href: "/docs/configuration/models/",
  },
  {
    number: "02",
    title: "Full-trace logs & instant debugging",
    titleZh: "全链路日志与客诉秒级定位",
    description:
      "See which Provider failed, why failover triggered, exact TTFT, and token charges at a glance—making customer support and upstream debugging effortless.",
    descriptionZh:
      "哪家上游报错、为什么触发重试、首字延迟（TTFT）多少、扣了多少钱一目了然；异常断流独立标记，排查问题不再盲人摸象。",
    label: "Request evidence",
    labelZh: "查看日志与诊断机制",
    href: "/docs/concepts/execution-observation/",
  },
  {
    number: "03",
    title: "Flexible pricing & private margins",
    titleZh: "灵活加价销售与底价保密",
    description:
      "Charge custom model rates, workspace Credits, or per-candidate pass-through tariffs. Upstream purchase costs and platform margins stay strictly in admin view.",
    descriptionZh:
      "支持自定义模型零售价、工作空间额度（Credits）或按命中模型分别计费；采购底价与平台毛利仅管理员可见，对客账单清晰透明。",
    label: "Usage & billing",
    labelZh: "了解定价与计费体系",
    href: "/docs/concepts/performance-and-cost/",
  },
  {
    number: "04",
    title: "Multi-level quota & spend protection",
    titleZh: "多级预算风控，杜绝余额刷穿",
    description:
      "Enforce company, workspace, and API-key spending caps with real-time in-flight holds before upstream dispatch—preventing concurrent balance overruns.",
    descriptionZh:
      "支持企业、工作空间、API 密钥三级消费上限；请求发往上游前实时锁定在途预占额度，彻底防止高并发下账户余额被刷穿。",
    label: "Access & limits",
    labelZh: "了解权限与额度风控",
    href: "/docs/security/overview/",
  },
  {
    number: "05",
    title: "Drop-in for SDKs & coding agents",
    titleZh: "改一行地址，无缝接入现有应用",
    description:
      "Native OpenAI (/v1/chat/completions, /v1/responses) and Anthropic (/v1/messages) compatibility. Change one Base URL to connect Claude Code, Codex, or your app.",
    descriptionZh:
      "原生兼容 OpenAI（/v1/chat/completions、/v1/responses）与 Anthropic（/v1/messages）接口，改一行 Base URL 即可丝滑接入 Claude Code、Codex 与各类应用。",
    label: "API & SDK",
    labelZh: "查看 API 与接入指南",
    href: "/docs/guides/api-quickstart/",
  },
  {
    number: "06",
    title: "Built-in Chat & Video workspace",
    titleZh: "自带多模型对话与视频工作台",
    description:
      "Give customers a ready-to-use, server-persisted Chat playground and Seedance video studio without deploying a separate frontend wrapper.",
    descriptionZh:
      "无需额外部署套壳前端，直接为客户提供云端同步的多模型对话与 Seedance 视频生成工作台，开箱即可体验、测试与交付。",
    label: "Generations",
    labelZh: "了解对话与视频工作台",
    href: "/docs/reference/generations/",
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
      "LiteLLM Proxy is a Python developer tool (~302 RPS at c=64, 158 MB idle RAM) without independent retail pricing; New API is a Go channel relay (~866 RPS peak) with shared multiplier quotas. Niu is a full-stack Rust gateway (3,239 RPS, 18.2 MB idle RAM) built for commercial model services—with separated cost vs. retail tariffs, conditional model pools, pre-dispatch balance protection, and built-in Chat & Video workspaces.",
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
      "Never. Customer workspaces, usage logs, and API responses only show your customer-facing prices and charges. Upstream Provider identities, purchase rates, and platform margins remain strictly locked in the admin console.",
    answerZh:
      "绝对不会。客户在工作空间控制台、账单明细和 API 响应中，只能看到您对外设定的模型售价和实际扣费金额。上游供应商是谁、采购底价多少、平台赚了多少毛利，全部严格锁定在管理员后台。",
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
      "Niu 牛元提供开放的插件接口（niu-plugin-api 与 niu-plugin-sdk）。插件作为独立受控进程通过高速本地套接字（Unix Socket）与网关通信，既能灵活挂载自定义鉴权、回调和企业级策略，又不会拖慢核心网关的转发性能。",
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
      "Model pools (with conditional routing & strategy audit), workspace API keys, independent customer pricing, budget holds, attempt-level logs, and saved Chat & Video workspaces are ready to deploy today. Ongoing payment gateway and multi-node qualification is tracked in our public release matrix.",
    answerZh:
      "多渠道模型池（含条件路由与毛利审计）、工作空间与 API 密钥管理、独立客户定价、预算防超支风控、全链路请求日志，以及在线对话和 Seedance 视频工作台均已就绪并可立即部署。更多商业支付渠道与多节点高可用验收进度可在发布准入清单中实时查看。",
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
