// Landing content for the Niu 0.3 line. Follow CONTENT.md claim rules:
// Niu supplies evidence and authorized controls; the agent owns decisions.

export const capabilities = [
  {
    title: "Discover models",
    titleZh: "发现模型",
    description:
      "Your agent reads available models, capabilities, context limits and customer prices to shortlist candidates.",
    descriptionZh:
      "智能体读取可用模型、能力、上下文上限与客户价格，筛选候选模型。",
    href: "/docs/agents/capabilities/",
  },
  {
    title: "Evaluate on your samples",
    titleZh: "用真实样本评测",
    description:
      "Record fingerprinted evaluations of task samples. Unknown charges stay unknown instead of being guessed.",
    descriptionZh:
      "对任务样本记录带指纹的评测结果，未知费用如实保留，不做估算。",
    href: "/docs/agents/evaluations/",
  },
  {
    title: "Configure routing",
    titleZh: "配置模型路由",
    description:
      "Propose routing policies with priority and weight, and preview them with a dry run before they take effect.",
    descriptionZh: "提出带优先级与权重的路由策略，并在生效前预演验证。",
    href: "/docs/agents/pools/",
  },
  {
    title: "Scoped access and budgets",
    titleZh: "权限与预算边界",
    description:
      "Browser approval separates management from model invocation, which is off by default. Spending caps and guardrails apply.",
    descriptionZh:
      "浏览器审批将管理权限与模型调用分离，调用默认关闭，并受支出上限与安全护栏约束。",
    href: "/docs/agents/",
  },
  {
    title: "Diagnose requests",
    titleZh: "诊断请求",
    description:
      "Inspect upstream attempts, phase timing, guardrail decisions and connection incidents—without copy-pasting logs.",
    descriptionZh:
      "直接读取上游尝试、阶段耗时、护栏决策与连接故障，无需手动复制日志。",
    href: "/docs/concepts/execution-observation/",
  },
  {
    title: "React to events",
    titleZh: "响应资源事件",
    description:
      "Subscribe to signed events when routing policies change or evaluations are recorded.",
    descriptionZh: "订阅签名事件，在路由策略变更或评测记录生成时及时响应。",
    href: "/docs/agents/events/",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Connect your agent",
    titleZh: "连接智能体",
    detail:
      "Paste the setup prompt. Your agent checks the deployment and opens Niu for sign-in.",
    detailZh: "粘贴接入提示词，智能体检查部署并打开 Niu 牛元供你登录。",
  },
  {
    step: "02",
    title: "Approve its scope",
    titleZh: "审批权限范围",
    detail:
      "Choose the workspace, expiry and permissions, including whether named models may be invoked.",
    detailZh: "选择工作空间、有效期与权限，以及是否允许调用指定模型。",
  },
  {
    step: "03",
    title: "Set goals, review results",
    titleZh: "设定目标，审阅结果",
    detail:
      "Describe the task and constraints. Review requests, usage and charges in the dashboard.",
    detailZh: "说明任务与约束，在控制台审阅请求、用量与费用。",
  },
];

export const protocolNames = [
  {
    en: "OpenAI Chat Completions & Responses",
    zh: "OpenAI Chat Completions 与 Responses",
  },
  { en: "Anthropic Messages", zh: "Anthropic Messages" },
  { en: "Google Gemini", zh: "Google Gemini" },
  { en: "Embeddings and video jobs", zh: "Embeddings 与视频任务" },
];

export const protocolExamples = [
  {
    id: "responses",
    language: "bash",
    label: "Responses",
    labelZh: "Responses",
    endpoint: "POST /v1/responses",
    endpointZh: "POST /v1/responses",
    code: `curl https://niu.io/v1/responses \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5",
    "store": false,
    "input": "Summarize the routing policy."
  }'`,
  },
  {
    id: "messages",
    language: "bash",
    label: "Messages",
    labelZh: "Messages",
    endpoint: "POST /v1/messages",
    endpointZh: "POST /v1/messages",
    code: `curl https://niu.io/v1/messages \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-5",
    "max_tokens": 1024,
    "messages": [{ "role": "user", "content": "List concurrency risks." }]
  }'`,
  },
  {
    id: "gemini",
    language: "bash",
    label: "Gemini",
    labelZh: "Gemini",
    endpoint: "POST /v1beta/models/{model}:generateContent",
    endpointZh: "POST /v1beta/models/{model}:generateContent",
    code: `curl "https://niu.io/v1beta/models/gemini-2.5-pro:generateContent" \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{ "role": "user", "parts": [{ "text": "Explain this stack trace." }] }]
  }'`,
  },
  {
    id: "chat",
    language: "bash",
    label: "Chat",
    labelZh: "Chat",
    endpoint: "POST /v1/chat/completions",
    endpointZh: "POST /v1/chat/completions",
    code: `curl https://niu.io/v1/chat/completions \\
  -H "Authorization: Bearer $NIU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "pool/coding-default",
    "stream": true,
    "messages": [{ "role": "user", "content": "Summarize model capabilities." }]
  }'`,
  },
];

export const foundationFacts = [
  {
    value: "MIT",
    valueZh: "MIT",
    title: "Open source and self-hosted",
    titleZh: "开源与自托管",
    detail:
      "Gateway, dashboard and docs are open source. Deploy one container with PostgreSQL.",
    detailZh: "网关、控制台与文档全部开源，单容器加 PostgreSQL 即可部署。",
    link: "Deployment guide",
    linkZh: "部署指南",
    href: "/docs/deployment/single-container/",
  },
  {
    value: "Internal · Resale",
    valueZh: "自用 · 转售",
    title: "Two operating modes",
    titleZh: "两种运行模式",
    detail:
      "Use your own Provider keys and pay upstream directly, or enable Resale for customer pricing and Credits.",
    detailZh:
      "使用自有供应商密钥直接向上游结算，或开启转售模式提供客户定价与 Credits。",
    link: "Provider setup",
    linkZh: "供应商配置",
    href: "/docs/admin/suppliers/",
  },
  {
    value: "3,239 RPS",
    valueZh: "3,239 RPS",
    title: "Low-overhead Rust gateway",
    titleZh: "低开销 Rust 网关",
    detail:
      "Historical v0.2.4 result on one Apple M4 with full PostgreSQL accounting; not a measure of model performance.",
    detailZh:
      "v0.2.4 在单台 Apple M4 上开启完整 PostgreSQL 计费时的历史结果，不代表模型本身性能。",
    link: "Benchmark method",
    linkZh: "基准测试方法",
    href: "/docs/guides/gateway-benchmarks/",
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
