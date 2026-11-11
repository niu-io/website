// Agent-oriented model management; planned capabilities remain explicitly labeled.
export const capabilities = [
  {
    "number": "01",
    "title": "Find models for my task",
    "titleZh": "为我的任务找到模型",
    "description": "Your agent reads available models, capabilities, context limits, and pricing through MCP to shortlist candidates for your task.",
    "descriptionZh": "Agent 通过 MCP 读取可用模型、模态能力、上下文上限与价格，按你的需求筛选候选模型。",
    "label": "MCP model discovery",
    "labelZh": "MCP 模型发现指南",
    "href": "/docs/guides/mcp/"
  },
  {
    "number": "04",
    "title": "Keep access, invocation and spending in scope",
    "titleZh": "明确权限、调用与支出边界",
    "description": "Separate management grants from model invocation in browser approval, backed by workspace and API-key spending caps and Guardrails.",
    "descriptionZh": "在浏览器审批中将管理权限与模型调用分离，配以工作空间和 API 密钥支出上限及安全护栏。",
    "label": "Access and budgets",
    "labelZh": "权限与预算",
    "href": "/docs/security/overview/"
  },
  {
    "number": "05",
    "title": "Explain a slow, blocked or failed request",
    "titleZh": "解释请求为什么慢、被拦截或失败",
    "description": "Your agent inspects upstream attempts, phase timing, guardrail decisions, and connection incidents directly—no manual copy-pasting.",
    "descriptionZh": "Agent 直接读取上游尝试、阶段耗时、护栏拦截与连接故障证据，无需你手动复制粘贴。",
    "label": "Request diagnostics",
    "labelZh": "请求诊断",
    "href": "/docs/concepts/execution-observation/"
  },

];

export const codeExamples = [
  {
    "id": "connect",
    "language": "text",
    "label": "Connect",
    "endpoint": "Step 01 · Connect & verify scope",
    "endpointZh": "第 01 步 · 连接并核验授权范围",
    "code": "Install and configure Niu by following https://niu.io/docs/install.md and verify the deployment and workspace during browser authorization.\n\nAfter connecting, inspect our key grants and summarize the available models, capabilities, and published customer pricing.",
    "trace": "Niu 0.3: Claude Code, Codex and DeepSeek Harness with browser approval.",
    "traceZh": "Niu 0.3：支持 Claude Code、Codex 与 DeepSeek Harness 浏览器授权接入。"
  },
  {
    "id": "diagnose",
    "language": "text",
    "label": "Diagnose",
    "endpoint": "Step 02 · Diagnose requests",
    "endpointZh": "第 02 步 · 诊断请求",
    "code": "Use Niu request evidence to investigate our recent slow, blocked, or failed calls. Inspect upstream attempts, phase timing, guardrail status, and settled charges.\n\nExplain what the evidence establishes and identify any missing information.",
    "trace": "Direct request diagnostics; consequential changes stay under your review.",
    "traceZh": "Agent 直接读取诊断证据，重要变更交由你审核确认。"
  }
];

export const faqs = [
  {
    "index": "01",
    "category": "Agent integration",
    "categoryZh": "Agent 接入",
    "question": "How does my coding agent connect?",
    "questionZh": "Coding agent 如何接入？",
    "answer": "Give your agent the setup prompt. It checks Niu 0.3 package and deployment availability, then opens browser approval so you can sign in and scope access without changing the agent's own host model.",
    "answerZh": "把接入提示词交给 Agent。它会检查 Niu 0.3 接入包与部署可用性，随后打开浏览器供你登录并审批权限，且不会改动 Agent 自身的宿主模型。",
    "linkLabel": "Connect your agent",
    "linkLabelZh": "连接 Agent",
    "linkHref": "/docs/guides/personal-assistant/"
  },
  {
    "index": "02",
    "category": "Human review",
    "categoryZh": "人工审核",
    "question": "What do I approve and review as a human?",
    "questionZh": "作为用户我需要审批和审核什么？",
    "answer": "You choose the workspace, expiration, management scopes, and whether named models may be invoked (off by default). Review request results and charges in the dashboard.",
    "answerZh": "你在浏览器中选择工作空间、有效期、管理权限范围，以及是否允许调用指定模型（默认关闭）。请求结果与费用明细均可在控制台审阅。",
    "linkLabel": "Agent authority contract",
    "linkLabelZh": "查看 Agent 权限规范",
    "linkHref": "/docs/agents/"
  },
  {
    "index": "04",
    "category": "Deployment & modes",
    "categoryZh": "部署与运行模式",
    "question": "Can I self-host Niu for my own team or for commercial resale?",
    "questionZh": "我可以自托管 Niu 供团队自用或商业转售吗？",
    "answer": "Yes. Self-hosted deployments default to Internal use—connect OpenRouter, FastRouter, BabelArk, Qiniu, DeepSeek, or custom endpoints with an API key and pay upstream directly, or enable Resale mode for customer tariffs and Credits.",
    "answerZh": "可以。自托管默认采用内部自用模式——填入 API 密钥即可连接 OpenRouter、FastRouter、BabelArk、七牛云、DeepSeek 或自定义端点并由团队直接向上游结算；也可开启商业转售模式使用客户价目表与品牌 Credits。",
    "linkLabel": "Self-host Niu",
    "linkLabelZh": "自行部署 Niu",
    "linkHref": "/docs/deployment/single-container/"
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
    "metric": "Agent-friendly",
    "metricZh": "面向智能体",
    "title": "Let your agent work directly with Niu",
    "titleZh": "让智能体直接使用 Niu",
    "detail": "Connect via native plugins and MCP with browser approval. Your agent discovers and configures; you set goals and authority.",
    "detailZh": "通过原生插件与 MCP 接入并在浏览器中审批。智能体负责发现与配置，你设定目标与权限边界。"
  },
  {
    "index": "02",
    "metric": "Cost-efficient",
    "metricZh": "追求性价比",
    "title": "Track model usage and cost",
    "titleZh": "查看模型用量与费用",
    "detail": "Review model usage, request outcomes, and customer charges.",
    "detailZh": "查看模型用量、请求结果与客户费用。"
  },
  {
    "index": "03",
    "metric": "High-performance",
    "metricZh": "高性能",
    "title": "Keep model calls fast and observable",
    "titleZh": "让模型调用高效且可观测",
    "detail": "Route calls through Niu’s low-overhead Rust gateway and inspect latency, failures, and settled charges in one place.",
    "detailZh": "通过低开销 Rust 网关转发调用，集中检视分阶段延迟、失败原因与已结算费用。"
  }
];

export const requestExample = "curl http://localhost:2555/v1/chat/completions \\\n  -H \"Authorization: Bearer $NIU_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"model\": \"claude-sonnet-4\",\n    \"messages\": [{\"role\": \"user\", \"content\": \"Check Q3 p99.\"}],\n    \"stream\": true\n  }'";
