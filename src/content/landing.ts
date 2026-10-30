// Token management for developers and teams consuming model APIs.
export const capabilities = [
  {
    "number": "01",
    "title": "Model routing & bounded failover",
    "titleZh": "模型路由与有界故障切换",
    "description": "Use one model entry point across configured routes. Inspect each attempt and understand when a fallback occurred.",
    "descriptionZh": "通过统一模型入口使用已配置的路由，查看每次尝试，了解故障切换发生的原因。",
    "label": "Models & routing",
    "labelZh": "了解模型池与路由",
    "href": "/docs/configuration/models/"
  },
  {
    "number": "02",
    "title": "Request logs & usage evidence",
    "titleZh": "调用日志与用量凭证",
    "description": "Inspect request status, token counts, timing and charges without stitching together separate dashboards.",
    "descriptionZh": "集中查看请求状态、词元 数量、耗时与费用，减少在多个控制台之间切换。",
    "label": "Request evidence",
    "labelZh": "查看日志与诊断机制",
    "href": "/docs/concepts/execution-observation/"
  },
  {
    "number": "03",
    "title": "Clear usage & spending",
    "titleZh": "清晰的用量与费用",
    "description": "Review the price of a model and the charge for each request. Keep missing or unresolved billing evidence visible.",
    "descriptionZh": "查看模型价格与逐次请求费用，明确区分已确认费用和仍待核实的计费凭证。",
    "label": "Usage & spending",
    "labelZh": "了解用量与费用",
    "href": "/docs/concepts/performance-and-cost/"
  },
  {
    "number": "04",
    "title": "Workspace & API-key budgets",
    "titleZh": "工作空间与密钥预算",
    "description": "Set scoped API keys and spending caps for your applications and team, with in-flight budget reservations.",
    "descriptionZh": "为应用与团队设置具有明确权限的 API 密钥和消费上限，通过在途预占管理预算。",
    "label": "Access & limits",
    "labelZh": "了解权限与额度风控",
    "href": "/docs/security/overview/"
  },
  {
    "number": "05",
    "title": "Drop-in for SDKs & coding agents",
    "titleZh": "改一行地址，无缝接入现有应用",
    "description": "Native OpenAI (/v1/chat/completions, /v1/responses) and Anthropic (/v1/messages) compatibility. Change one Base URL to connect Claude Code, Codex, or your app.",
    "descriptionZh": "原生兼容 OpenAI（/v1/chat/completions、/v1/responses）与 Anthropic（/v1/messages）接口，改一行 Base URL 即可丝滑接入 Claude Code、Codex 与各类应用。",
    "label": "API & SDK",
    "labelZh": "查看 API 与接入指南",
    "href": "/docs/guides/api-quickstart/"
  },
  {
    "number": "06",
    "title": "Saved Chat & Video workspaces",
    "titleZh": "可回访的对话与视频工作台",
    "description": "Try models in Chat and manage supported video jobs. Saved sessions and authorized results stay available across visits.",
    "descriptionZh": "在对话中试用模型，管理受支持的视频任务，跨次访问已保存的会话与有权查看的结果。",
    "label": "Generations",
    "labelZh": "了解对话与视频工作台",
    "href": "/docs/reference/generations/"
  }
];

export const codeExamples = [
  {
    "id": "curl",
    "language": "bash",
    "label": "cURL · SSE",
    "endpoint": "POST /v1/chat/completions",
    "code": "curl http://localhost:2555/v1/chat/completions \\\n  -H \"Authorization: Bearer $NIU_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"model\": \"claude-sonnet-4\",\n    \"messages\": [{\"role\": \"user\", \"content\": \"Check Q3 p99.\"}],\n    \"stream\": true\n  }'",
    "trace": "Operation → Attempt #1 (Anthropic 200 OK) → 40 SSE tok → Settled Customer Charge ($0.018)",
    "traceZh": "Operation → Attempt #1 (Anthropic 200 OK) → 40 SSE词元→ 客户费率已结算 ($0.018)"
  },
  {
    "id": "sdk",
    "language": "typescript",
    "label": "TypeScript SDK",
    "endpoint": "@niu/sdk · NiuClient",
    "code": "import { NiuClient } from \"@niu/sdk\";\n\nconst niu = new NiuClient({\n  baseUrl: \"https://niu.io\",\n  apiKey: process.env.NIU_API_KEY,\n});\n\nconst stream = await niu.chat.completions.create({\n  model: \"claude-sonnet-4\",\n  messages: [{ role: \"user\", content: \"Summarize our Q3 API latency.\" }],\n  stream: true,\n});",
    "trace": "Typed SSE iterator · Scoped workspace key · Pre-dispatch hold reserved in PostgreSQL",
    "traceZh": "强类型 SSE 流式迭代器 · 工作空间作用域密钥 · PostgreSQL 转发前额度预占"
  },
  {
    "id": "agents",
    "language": "bash",
    "label": "Claude Code & Codex",
    "endpoint": "POST /v1/messages & /v1/responses",
    "code": "export ANTHROPIC_BASE_URL=\"http://localhost:2555\"\nexport ANTHROPIC_API_KEY=\"$NIU_WORKSPACE_KEY\"\n\nexport OPENAI_BASE_URL=\"http://localhost:2555/v1\"\nexport OPENAI_API_KEY=\"$NIU_WORKSPACE_KEY\"\n\n# Launch coding agents directly against your Niu route pool\nclaude \"Refactor the billing ledger retry handler\"",
    "trace": "Native /v1/messages & /v1/responses · Multi-turn tool calls · Per-key budget cap enforced",
    "traceZh": "原生兼容 /v1/messages 与 /v1/responses · 多轮工具调用 · 密钥级预算上限强约束"
  }
];

export const faqs = [
  {
    "index": "01",
    "category": "Why Niu",
    "categoryZh": "核心选型对比",
    "question": "Who is Niu for?",
    "questionZh": "Niu 牛元适合谁？",
    "answer": "Niu is a token management platform for developers and teams using model APIs. Access models, manage workspace keys and budgets, and inspect usage and request charges from one workspace.",
    "answerZh": "Niu 牛元是面向模型 API 使用者的 词元管理平台，帮助开发者与团队接入模型、管理工作空间密钥和预算，并集中查看用量与调用费用。",
    "linkLabel": "Browse models",
    "linkLabelZh": "浏览模型",
    "linkHref": "/models/"
  },
  {
    "index": "02",
    "category": "Economy",
    "categoryZh": "经济性",
    "question": "How can I control token spending?",
    "questionZh": "如何控制词元支出？",
    "answer": "Check the listed model price, review actual token usage and charges, and set workspace and key-level budgets. Prices and availability depend on the configured offers; Niu does not promise every model is cheaper.",
    "answerZh": "先查看模型标价，再结合实际词元用量和费用设置工作空间与密钥预算。价格与可用性取决于已配置的模型报价，不承诺每个模型都更便宜。",
    "linkLabel": "Usage & budgets",
    "linkLabelZh": "了解用量与预算",
    "linkHref": "/docs/concepts/performance-and-cost/"
  },
  {
    "index": "03",
    "category": "Billing accuracy",
    "categoryZh": "流式计费准确性",
    "question": "What happens if an upstream stream drops halfway through?",
    "questionZh": "如果上游流式输出到一半意外断开了，会不会乱扣费？",
    "answer": "No mystery charges and no fake $0 bills. Niu records pre-dispatch state in PostgreSQL and never blindly replays a request that may have already run upstream. If a stream drops without usage evidence, the call is explicitly flagged as unresolved for review.",
    "answerZh": "不会乱扣费，更不会算糊涂账。Niu 牛元在转发前会先记录准入状态，绝不盲目重试可能已经产生费用的请求。如果流式响应中途意外断开且缺少用量凭证，系统会将其明确标记为「待核实」状态，既不会多扣客户钱，也不会伪造 0 元成功账单。",
    "linkLabel": "Request evidence contract",
    "linkLabelZh": "了解请求与对账机制",
    "linkHref": "/docs/concepts/execution-observation/"
  },
  {
    "index": "04",
    "category": "Full-stack open source",
    "categoryZh": "全栈开源与自托管",
    "question": "Is the full stack truly open source for self-hosting?",
    "questionZh": "真的是全栈开源吗？私有化部署会不会被卡脖子？",
    "answer": "Yes. The Rust gateway, admin console, customer workspace dashboard, model catalog, and docs are all MIT-licensed and run together against a single PostgreSQL database—with zero license servers or private dependencies.",
    "answerZh": "真正全栈开源。核心 Rust 网关、管理后台、客户工作空间控制台、模型目录和文档站点全部采用 MIT 开源协议，只需连接一个标准 PostgreSQL 数据库即可单容器完整运行，不需要连接任何外部授权服务器。",
    "linkLabel": "Single-container deployment",
    "linkLabelZh": "查看单容器部署指南",
    "linkHref": "/docs/deployment/single-container/"
  },
  {
    "index": "05",
    "category": "Integration",
    "categoryZh": "接入方式",
    "question": "Can I use Niu with my existing applications?",
    "questionZh": "可以接入现有应用和编程工具吗？",
    "answer": "Use a scoped workspace API key with the documented OpenAI-compatible and Anthropic-compatible endpoints. Check the model capabilities and supported protocol before switching your application.",
    "answerZh": "使用工作空间 API 密钥，按文档配置 OpenAI 兼容或 Anthropic 兼容端点。切换应用前，请核对模型能力与所支持的协议。",
    "linkLabel": "API quickstart",
    "linkLabelZh": "API 快速开始",
    "linkHref": "/docs/guides/api-quickstart/"
  },
  {
    "index": "06",
    "category": "Production readiness",
    "categoryZh": "功能就绪度",
    "question": "Which capabilities can I use?",
    "questionZh": "目前有哪些可使用的能力？",
    "answer": "Niu includes model access, workspace API keys and budgets, request logs, and saved Chat and supported Video workflows. Availability depends on configured models and permissions. Consult the release matrix for qualification limits.",
    "answerZh": "Niu 牛元提供模型接入、工作空间密钥与预算、请求日志，以及可保存的对话和受支持的视频流程。实际可用范围取决于模型配置与权限；验证边界见发布准入清单。",
    "linkLabel": "Release acceptance matrix",
    "linkLabelZh": "查看发布准入矩阵",
    "linkHref": "https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md"
  }
];

export const heroStats = [
  {
    "value": "3,239",
    "label": "requests / second",
    "labelZh": "单机峰值并发 (RPS)"
  },
  {
    "value": "10.7×",
    "label": "faster than LiteLLM",
    "labelZh": "吞吐性能超越 LiteLLM"
  },
  {
    "value": "31.5 ms",
    "label": "p99 tail latency",
    "labelZh": "64 并发 p99 延迟"
  },
  {
    "value": "18.2 MB",
    "label": "idle RAM footprint",
    "labelZh": "极低空闲内存占用"
  }
];

export const links = {
  "repo": "https://github.com/niu-io/niu",
  "quickstart": "/docs/getting-started/",
  "deployment": "/docs/deployment/single-container/",
  "api": "/docs/api/rest/",
  "benchmark": "/docs/guides/gateway-benchmarks/",
  "compare": "/compare/",
  "release": "https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md",
  "dashboard": "/workspaces/default/"
};

export const pillars = [
  {
    "index": "01",
    "metric": "Performance",
    "metricZh": "性能",
    "title": "Fast model access",
    "titleZh": "高效调用模型",
    "detail": "A Rust gateway with streaming support and measured proxy performance. Connect applications and coding tools through compatible API endpoints.",
    "detailZh": "Rust 网关支持流式输出，并提供可查验的代理性能实测。通过兼容的 API 接入应用和编程工具。"
  },
  {
    "index": "02",
    "metric": "Reliability",
    "metricZh": "可靠性",
    "title": "See what happened to every request",
    "titleZh": "每次调用都有据可查",
    "detail": "Model routing, bounded failover and attempt-level logs help you understand failures. Unresolved usage stays explicit.",
    "detailZh": "模型路由、有界故障切换与逐次尝试日志帮助定位失败；缺少凭证的用量明确保留为待核实。"
  },
  {
    "index": "03",
    "metric": "Economy",
    "metricZh": "经济性",
    "title": "Keep token spending visible",
    "titleZh": "让词元支出清晰可控",
    "detail": "Review model prices, token usage and request charges. Set workspace and API-key budgets before usage grows.",
    "detailZh": "查看模型价格、词元 用量与逐次调用费用，通过工作空间和 API 密钥预算管理支出。"
  },
  {
    "index": "04",
    "metric": "API + Chat + Video",
    "metricZh": "API + 对话 + 视频",
    "title": "One workspace for your model usage",
    "titleZh": "在一个工作空间管理模型使用",
    "detail": "Use APIs in your applications, compare models in Chat, and revisit saved conversations and supported video results.",
    "detailZh": "在应用中调用 API，在对话中比较模型，并随时回访已保存的会话与受支持的视频结果。"
  }
];

export const requestExample = "curl http://localhost:2555/v1/chat/completions \\\n  -H \"Authorization: Bearer $NIU_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"model\": \"claude-sonnet-4\",\n    \"messages\": [{\"role\": \"user\", \"content\": \"Check Q3 p99.\"}],\n    \"stream\": true\n  }'";
