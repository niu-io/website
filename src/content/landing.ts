// Agent-oriented model management; planned capabilities remain explicitly labeled.
export const capabilities = [
  {
    number: "01",
    title: "Find models for my task",
    titleZh: "为我的任务找到模型",
    description:
      "Your agent reads available models, capabilities, context limits, and pricing through MCP to shortlist candidates for your task.",
    descriptionZh:
      "Agent 通过 MCP 读取可用模型、模态能力、上下文上限与价格，按你的需求筛选候选模型。",
    label: "MCP model discovery",
    labelZh: "MCP 模型发现指南",
    href: "/docs/guides/mcp/",
  },
  {
    number: "04",
    title: "Keep access, invocation and spending in scope",
    titleZh: "明确权限、调用与支出边界",
    description:
      "Separate management grants from model invocation in browser approval, backed by workspace and API-key spending caps and Guardrails.",
    descriptionZh:
      "在浏览器审批中将管理权限与模型调用分离，配以工作空间和 API 密钥支出上限及安全护栏。",
    label: "Access and budgets",
    labelZh: "权限与预算",
    href: "/docs/security/overview/",
  },
  {
    number: "05",
    title: "Explain a slow, blocked or failed request",
    titleZh: "解释请求为什么慢、被拦截或失败",
    description:
      "Your agent inspects upstream attempts, phase timing, guardrail decisions, and connection incidents directly—no manual copy-pasting.",
    descriptionZh:
      "Agent 直接读取上游尝试、阶段耗时、护栏拦截与连接故障证据，无需你手动复制粘贴。",
    label: "Request diagnostics",
    labelZh: "请求诊断",
    href: "/docs/concepts/execution-observation/",
  },
];

export const codeExamples = [
  {
    id: "connect",
    language: "text",
    label: "Connect",
    endpoint: "Step 01 · Connect & verify scope",
    endpointZh: "第 01 步 · 连接并核验授权范围",
    code: "Install and configure Niu by following https://niu.io/docs/install.md and verify the deployment and workspace during browser authorization.\n\nAfter connecting, inspect our key grants and summarize the available models, capabilities, and published customer pricing.",
    trace:
      "Niu 0.3: Claude Code, Codex and DeepSeek Harness with browser approval.",
    traceZh:
      "Niu 0.3：支持 Claude Code、Codex 与 DeepSeek Harness 浏览器授权接入。",
  },
  {
    id: "diagnose",
    language: "text",
    label: "Diagnose",
    endpoint: "Step 02 · Diagnose requests",
    endpointZh: "第 02 步 · 诊断请求",
    code: "Use Niu request evidence to investigate our recent slow, blocked, or failed calls. Inspect upstream attempts, phase timing, guardrail status, and settled charges.\n\nExplain what the evidence establishes and identify any missing information.",
    trace:
      "Direct request diagnostics; consequential changes stay under your review.",
    traceZh: "Agent 直接读取诊断证据，重要变更交由你审核确认。",
  },
];

export const faqs = [
  {
    index: "01",
    category: "Agent integration",
    categoryZh: "Agent 接入",
    question: "How does my coding agent connect?",
    questionZh: "Coding agent 如何接入？",
    answer:
      "Give your agent the setup prompt. It checks Niu 0.3 package and deployment availability, then opens browser approval so you can sign in and scope access without changing the agent's own host model.",
    answerZh:
      "把接入提示词交给 Agent。它会检查 Niu 0.3 接入包与部署可用性，随后打开浏览器供你登录并审批权限，且不会改动 Agent 自身的宿主模型。",
    linkLabel: "Connect your agent",
    linkLabelZh: "连接 Agent",
    linkHref: "/docs/guides/personal-assistant/",
  },
  {
    index: "02",
    category: "Human review",
    categoryZh: "人工审核",
    question: "What do I approve and review as a human?",
    questionZh: "作为用户我需要审批和审核什么？",
    answer:
      "You choose the workspace, expiration, management scopes, and whether named models may be invoked (off by default). Review request results and charges in the dashboard.",
    answerZh:
      "你在浏览器中选择工作空间、有效期、管理权限范围，以及是否允许调用指定模型（默认关闭）。请求结果与费用明细均可在控制台审阅。",
    linkLabel: "Agent authority contract",
    linkLabelZh: "查看 Agent 权限规范",
    linkHref: "/docs/agents/",
  },
  {
    index: "03",
    category: "Native protocols",
    categoryZh: "原生多协议",
    question:
      "Which native inference protocols does Niu support without translating payloads?",
    questionZh: "Niu 支持哪些无需转换请求体的原生推理协议？",
    answer:
      "OpenAI Chat Completions (/v1/chat/completions), stateless Responses (/v1/responses), Anthropic Messages (/v1/messages), Google Gemini (:generateContent and :streamGenerateContent), Embeddings, and durable Seedance Video jobs (/v1/video/jobs) — plus pool/<slug> routing aliases. Keys check invocation_protocols alongside allowed_models, caller tools execute client-side, and output_config.format on /v1/messages or hosted Responses state remains unsupported.",
    answerZh:
      "支持 OpenAI Chat Completions（/v1/chat/completions）、无状态 Responses（/v1/responses）、Anthropic Messages（/v1/messages）、Google Gemini（:generateContent 与 :streamGenerateContent）、Embeddings 与持久化 Seedance 视频任务（/v1/video/jobs），并兼容 pool/<slug> 路由别名。密钥会校验 invocation_protocols 与 allowed_models，函数工具由调用方本地执行；/v1/messages 的 output_config.format 与服务端托管 Responses 状态暂不支持。",
    linkLabel: "Native inference contract",
    linkLabelZh: "查看推理协议契约",
    linkHref: "/docs/agents/inference/",
  },
  {
    index: "04",
    category: "Deployment & modes",
    categoryZh: "部署与运行模式",
    question: "Can I self-host Niu for my own team or for commercial resale?",
    questionZh: "我可以自托管 Niu 供团队自用或商业转售吗？",
    answer:
      "Yes. Self-hosted deployments default to Internal use—connect OpenRouter, FastRouter, BabelArk, Qiniu, DeepSeek, or custom endpoints with an API key and pay upstream directly, or enable Resale mode for customer tariffs and Credits.",
    answerZh:
      "可以。自托管默认采用内部自用模式——填入 API 密钥即可连接 OpenRouter、FastRouter、BabelArk、七牛云、DeepSeek 或自定义端点并由团队直接向上游结算；也可开启商业转售模式使用客户价目表与品牌 Credits。",
    linkLabel: "Self-host Niu",
    linkLabelZh: "自行部署 Niu",
    linkHref: "/docs/deployment/single-container/",
  },
];

export const heroStats = [
  {
    value: "3,239",
    label: "requests / second",
    labelZh: "单机峰值并发 (RPS)",
  },
  {
    value: "10.7×",
    label: "faster than LiteLLM",
    labelZh: "吞吐性能超越 LiteLLM",
  },
  {
    value: "31.5 ms",
    label: "p99 tail latency",
    labelZh: "64 并发 p99 延迟",
  },
  {
    value: "18.2 MB",
    label: "idle RAM footprint",
    labelZh: "极低空闲内存占用",
  },
];

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

export const pillars = [
  {
    index: "01",
    metric: "Agent-friendly",
    metricZh: "面向智能体",
    title: "Let your agent work directly with Niu",
    titleZh: "让智能体直接使用 Niu",
    detail:
      "Connect via native plugins and MCP with browser approval. Your agent discovers and configures; you set goals and authority.",
    detailZh:
      "通过原生插件与 MCP 接入并在浏览器中审批。智能体负责发现与配置，你设定目标与权限边界。",
  },
  {
    index: "02",
    metric: "Cost-efficient",
    metricZh: "追求性价比",
    title: "Track model usage and cost",
    titleZh: "查看模型用量与费用",
    detail: "Review model usage, request outcomes, and customer charges.",
    detailZh: "查看模型用量、请求结果与客户费用。",
  },
  {
    index: "03",
    metric: "High-performance",
    metricZh: "高性能",
    title: "Keep model calls fast and observable",
    titleZh: "让模型调用高效且可观测",
    detail:
      "Route calls through Niu’s low-overhead Rust gateway and inspect latency, failures, and settled charges in one place.",
    detailZh:
      "通过低开销 Rust 网关转发调用，集中检视分阶段延迟、失败原因与已结算费用。",
  },
];

export const requestExample =
  'curl http://localhost:2555/v1/chat/completions \\\n  -H "Authorization: Bearer $NIU_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "model": "claude-sonnet-4",\n    "messages": [{"role": "user", "content": "Check Q3 p99."}],\n    "stream": true\n  }\'';

export const protocolExamples = [
  {
    id: "responses",
    language: "bash",
    label: "Responses",
    labelZh: "Responses",
    endpoint: "POST /v1/responses · Stateless agent runtime",
    endpointZh: "POST /v1/responses · 无状态 Agent 运行时",
    code: `curl -sS https://niu.io/v1/responses \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5",
    "store": false,
    "reasoning": { "effort": "medium" },
    "tools": [{
      "type": "function",
      "name": "lookup_policy",
      "parameters": { "type": "object", "properties": { "slug": { "type": "string" } }, "required": ["slug"] }
    }],
    "text": { "format": { "type": "json_object" } },
    "input": "Check the routing policy summary."
  }'`,
    trace:
      "Stateless input items, reasoning deltas, client function tools, and structured outputs. No server-stored previous_response_id, background jobs, or hosted tools.",
    traceZh:
      "支持无状态 input 序列、推理增量、客户端函数工具与结构化输出；不提供服务端 previous_response_id、后台任务或托管工具。",
  },
  {
    id: "messages",
    language: "bash",
    label: "Messages",
    labelZh: "Messages",
    endpoint: "POST /v1/messages · Anthropic SDK compatible",
    endpointZh: "POST /v1/messages · 兼容 Anthropic SDK",
    code: `curl -sS https://niu.io/v1/messages \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "anthropic-beta: prompt-caching-2024-07-31,interleaved-thinking-2025-05-14" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-5",
    "max_tokens": 1024,
    "thinking": { "type": "enabled", "budget_tokens": 2048 },
    "system": [{ "type": "text", "text": "Audit this diff.", "cache_control": { "type": "ephemeral" } }],
    "messages": [{ "role": "user", "content": "List concurrency risks." }]
  }'`,
    trace:
      "Curated anthropic-beta allowlist (strips claude-code-20250219), thinking blocks, cache_control, and array tool_result. output_config.format is rejected when unsupported.",
    traceZh:
      "内置受控 anthropic-beta 白名单（自动剥离 claude-code-20250219）、思考块、cache_control 与数组化 tool_result；不支持 output_config.format。",
  },
  {
    id: "gemini",
    language: "bash",
    label: "Gemini",
    labelZh: "Gemini",
    endpoint: "POST /v1beta/models/{model}:streamGenerateContent?alt=sse",
    endpointZh: "POST /v1beta/models/{model}:streamGenerateContent?alt=sse",
    code: `curl -sS "https://niu.io/v1beta/models/pool%2Fcoding-default:streamGenerateContent?alt=sse" \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{ "role": "user", "parts": [{ "text": "Inspect recent gateway latency." }] }],
    "tools": [{ "functionDeclarations": [{ "name": "query_logs", "parameters": { "type": "object" } }] }],
    "generationConfig": {
      "thinkingConfig": { "thinkingBudget": 1024 },
      "responseMimeType": "application/json"
    }
  }'`,
    trace:
      "Native JSON array streams or ?alt=sse with functionDeclarations, thinkingConfig, responseMimeType, and URL-encoded pool/<slug> aliases. Auth uses Authorization or x-niu-api-key, never x-goog-api-key.",
    traceZh:
      "支持原生 JSON 数组流或 ?alt=sse、functionDeclarations、thinkingConfig、responseMimeType 与 URL 编码的 pool/<slug> 别名；鉴权使用 Authorization 或 x-niu-api-key（不接受 x-goog-api-key）。",
  },
  {
    id: "chat",
    language: "bash",
    label: "Chat",
    labelZh: "Chat",
    endpoint: "POST /v1/chat/completions · Capability-gated pools",
    endpointZh: "POST /v1/chat/completions · 能力过滤路由池",
    code: `curl -sS https://niu.io/v1/chat/completions \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "pool/coding-default",
    "response_format": { "type": "json_object" },
    "stream": true,
    "stream_options": { "include_usage": true },
    "messages": [{ "role": "user", "content": "Summarize active model capabilities." }]
  }'`,
    trace:
      "Dynamic pool/<slug> routing filters candidates by required protocol and traits at runtime, checks caller allowed_models, and tracks Uncertain stream outcomes without fabricating charges.",
    traceZh:
      "pool/<slug> 动态路由会在请求时按协议与能力特征过滤候选模型并校验 allowed_models；流式结果未明（Uncertain）时会如实记录，绝不伪造 $0 账单。",
  },
];

export const protocolHighlights = [
  {
    step: "01",
    title: "Native OpenAI Responses & Chat",
    titleZh: "原生 OpenAI Responses 与 Chat",
    detail:
      "Send stateless /v1/responses inputs with reasoning, client function tools, and structured outputs, or use /v1/chat/completions and /v1/embeddings under one key.",
    detailZh:
      "使用同一密钥调用无状态 /v1/responses（推理、客户端函数工具与结构化输出），或标准 /v1/chat/completions 与 /v1/embeddings。",
  },
  {
    step: "02",
    title: "Native Anthropic Messages",
    titleZh: "原生 Anthropic Messages",
    detail:
      "Point Claude Code and Anthropic SDKs at /v1/messages with thinking blocks, cache_control, and a safety-filtered anthropic-beta header allowlist.",
    detailZh:
      "将 Claude Code 与 Anthropic SDK 直接指向 /v1/messages，支持思考块、cache_control 与受控的 anthropic-beta 请求头白名单。",
  },
  {
    step: "03",
    title: "Native Google Gemini Streams",
    titleZh: "原生 Google Gemini 流式协议",
    detail:
      "Call /v1beta/models/{model}:generateContent and :streamGenerateContent (?alt=sse or JSON array) with URL-encoded pool/<slug> aliases and Niu key auth.",
    detailZh:
      "调用 /v1beta/models/{model}:generateContent 与 :streamGenerateContent（支持 ?alt=sse 与 JSON 数组流），兼容 URL 编码的 pool/<slug> 别名与 Niu 统一鉴权。",
  },
  {
    step: "04",
    title: "Capability-Gated Pools & Accounting",
    titleZh: "能力门控路由与可信记账",
    detail:
      "Workspace keys scope permitted endpoints via invocation_protocols, routing pools filter protocol-capable candidates, and truncated streams fail closed.",
    detailZh:
      "工作空间密钥通过 invocation_protocols 约束可用协议，路由池按能力特征过滤候选上游，异常截断流按未明状态严格关口。",
  },
];
