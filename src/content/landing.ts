// Agent-oriented model management; planned capabilities remain explicitly labeled.
export const capabilities = [
  {
    "number": "01",
    "title": "Find models for my task",
    "titleZh": "为我的任务找到模型",
    "description": "Your agent reads available models, capabilities and published customer prices through MCP, then shortlists candidates against your requirements.",
    "descriptionZh": "Agent 通过 MCP 读取可用模型、能力与已发布的客户价格，按你的需求筛选候选模型。",
    "label": "Model discovery",
    "labelZh": "模型发现",
    "href": "/docs/guides/mcp/"
  },
  {
    "number": "02",
    "title": "Compare quality, speed and cost",
    "titleZh": "比较效果、速度与成本",
    "description": "Use the same task samples to compare model outputs, timing and reported charges within an approved test budget. Judge value by accepted results, not token price alone.",
    "descriptionZh": "在已批准的测试预算内，用相同任务样本比较输出、耗时和已报告费用。性价比以合格结果为依据，不只看 Token 单价。",
    "label": "Model evaluation",
    "labelZh": "模型评估",
    "href": "/docs/guides/personal-assistant/"
  },
  {
    "number": "03",
    "title": "Build a pool around my needs",
    "titleZh": "按需求组织 model pool",
    "description": "In Niu 0.3, your authorized agent previews and manages workspace model pools. Review saved revisions and execution evidence in Niu; platform supply configuration stays separate.",
    "descriptionZh": "在 牛元 0.3 中，获得授权的 Agent 可预览并管理工作空间模型池。你在牛元审阅修订记录与执行证据；平台供给配置保持独立。",
    "label": "Model pools",
    "labelZh": "模型池配置",
    "href": "/docs/pools.md"
  },
  {
    "number": "04",
    "title": "Keep access and spending in scope",
    "titleZh": "明确权限与支出边界",
    "description": "Your agent checks the key’s grants and limits before testing. You review access and budget changes in Niu; credentials stay in secure local configuration.",
    "descriptionZh": "Agent 在测试前检查密钥权限与限制，你在 Niu 中审核权限和预算变更；凭据保留在安全的本地配置中。",
    "label": "Access and budgets",
    "labelZh": "权限与预算",
    "href": "/docs/security/overview/"
  },
  {
    "number": "05",
    "title": "Explain a slow or failed request",
    "titleZh": "解释请求为什么慢或失败",
    "description": "Your agent retrieves request evidence directly: attempts, timing, usage and customer charges. It recommends a change you can verify and keeps missing evidence explicit.",
    "descriptionZh": "Agent 直接读取请求尝试、耗时、用量和客户费用，提出可验证的调整建议，并明确指出缺失的证据。",
    "label": "Request diagnostics",
    "labelZh": "请求诊断",
    "href": "/docs/concepts/execution-observation/"
  },
  {
    "number": "06",
    "title": "Respond when conditions change",
    "titleZh": "在运行条件变化时响应",
    "description": "In Niu 0.3, agents can configure authorized notifications for model-pool changes and recorded evaluations, then retrieve evidence directly. Delivery does not guarantee an inactive agent will wake.",
    "descriptionZh": "在 牛元 0.3 中，Agent 可为模型池变化和评估记录配置已授权的事件通知，再直接读取证据。通知送达不代表休眠中的 Agent 会被唤醒。",
    "label": "Current integration scope",
    "labelZh": "当前接入范围",
    "href": "/docs/guides/mcp/"
  }
];

export const codeExamples = [
  {
    "id": "connect",
    "language": "text",
    "label": "Connect",
    "endpoint": "Agent-led Niu setup",
    "code": "Install and configure Niu by following https://niu.io/docs/install.md.",
    "trace": "Niu 0.3: Claude Code, Codex and DeepSeek Harness. Check installation availability before setup.",
    "traceZh": "牛元 0.3：Claude Code、Codex 与 DeepSeek Harness。接入前请检查安装可用性。"
  },
  {
    "id": "compare",
    "language": "text",
    "label": "Evaluate",
    "endpoint": "Compare models for a task",
    "code": "Use Niu to shortlist models for my application.\nAsk for my task samples, quality criteria, latency target\nand maximum test budget before any paid evaluation.\nCompare outputs, timing and reported customer charges.\nExplain tradeoffs and preserve unknown costs as unknown.\nPreview a workspace model pool using my explicit grants.\nReview consequential changes and verify the saved revision.",
    "trace": "Niu 0.3: evaluations and workspace pools need explicit delegated grants.",
    "traceZh": "牛元 0.3：评估与工作空间模型池需要明确委托权限。"
  },
  {
    "id": "diagnose",
    "language": "text",
    "label": "Improve",
    "endpoint": "Diagnose before changing",
    "code": "Use Niu request evidence to investigate this result.\nInspect attempts, timing, usage and customer charges\nusing the request reference already available to you.\nDo not ask me to relay JSON from the dashboard.\nExplain what the evidence establishes and what is unknown.\nPropose a bounded test of the change.\nDo not retry a possibly charged request without review.",
    "trace": "Read evidence directly. Review consequential changes with the user.",
    "traceZh": "直接读取证据；涉及重要变更时交由用户审核。"
  }
];

export const faqs = [
  {
    "index": "01",
    "category": "Agent integration",
    "categoryZh": "Agent 接入",
    "question": "How does my coding agent connect?",
    "questionZh": "Coding agent 如何接入？",
    "answer": "Give your agent the setup prompt. Niu 0.3 includes Claude Code, Codex and DeepSeek Harness packages with browser authorization; the installation document checks package and deployment availability before setup. Setup verifies release artifacts and deployment capabilities before authorization.",
    "answerZh": "把接入提示词交给 Agent。牛元 0.3 包含 Claude Code、Codex 和 DeepSeek Harness 接入包及浏览器授权；安装文档会先检查包与部署是否可用。安装前会验证发布产物和部署能力。",
    "linkLabel": "Connect your agent",
    "linkLabelZh": "连接 Agent",
    "linkHref": "/docs/guides/personal-assistant/"
  },
  {
    "index": "02",
    "category": "Model value",
    "categoryZh": "模型性价比",
    "question": "How does an agent choose a model?",
    "questionZh": "Agent 怎样选模型？",
    "answer": "Start with task requirements and an approved evaluation budget. Compare candidate outputs, latency, reliability and reported customer charges. A lower token price does not guarantee a lower cost per acceptable result.",
    "answerZh": "从任务需求和批准的评估预算出发，比较候选模型输出、延迟、可靠性与已报告的客户费用。更低的 Token 单价不代表更低的合格结果成本。",
    "linkLabel": "Evaluate with Niu",
    "linkLabelZh": "使用 Niu 评估",
    "linkHref": "/docs/guides/personal-assistant/"
  },
  {
    "index": "03",
    "category": "Human review",
    "categoryZh": "人工审核",
    "question": "What do I still need to review?",
    "questionZh": "我还需要审核什么？",
    "answer": "You set goals, access and spending boundaries and review important changes. In Niu 0.3, explicitly delegated agents can manage workspace pools, evaluations and resource subscriptions. Key creation and budget changes still require the appropriate Niu member authority.",
    "answerZh": "你确定目标、权限与支出边界，并审核重要变更。牛元 0.3 中，获得明确授权的 Agent 可管理工作空间模型池、评估和资源订阅。创建密钥、修改预算仍需相应的牛元成员权限。",
    "linkLabel": "Review the workflow",
    "linkLabelZh": "查看审核流程",
    "linkHref": "/docs/guides/personal-assistant/"
  },
  {
    "index": "04",
    "category": "Model pools",
    "categoryZh": "模型池",
    "question": "Can my agent build and update model pools?",
    "questionZh": "Agent 能构建和更新 model pool 吗？",
    "answer": "In Niu 0.3, an agent with pools:read/write can inspect, preview and update workspace model pools. Revision conflicts must be reconciled. Human members review saved policy and execution evidence; platform supply pools remain separate.",
    "answerZh": "牛元 0.3 中，具有 pools:read/write 权限的 Agent 可检查、预览并更新工作空间模型池，修订冲突需要先核对。成员审阅保存的策略与执行证据；平台供给池保持独立。",
    "linkLabel": "Pool configuration",
    "linkLabelZh": "模型池配置",
    "linkHref": "/docs/pools.md"
  },
  {
    "index": "05",
    "category": "Events and plugins",
    "categoryZh": "事件与插件",
    "question": "Can Niu notify my agent and let it adapt?",
    "questionZh": "Niu 能通知 Agent 并让它自动调整吗？",
    "answer": "Niu 0.3 supports signed notifications for pool changes and recorded evaluations. An authorized receiver must verify signatures, deduplicate and reconcile delivery. Receipt does not guarantee an inactive host wakes, nor authorize paid work or automatic policy changes.",
    "answerZh": "牛元 0.3支持模型池变化和评估记录的签名通知。接收端需要获得授权、验证签名、去重并核对投递。送达不保证唤醒休眠宿主，也不构成付费工作或自动变更策略的授权。",
    "linkLabel": "Current MCP capabilities",
    "linkLabelZh": "当前 MCP 能力",
    "linkHref": "/docs/guides/mcp/"
  },
  {
    "index": "06",
    "category": "Deployment",
    "categoryZh": "部署",
    "question": "Can I run Niu myself?",
    "questionZh": "可以自行部署 Niu 吗？",
    "answer": "The public gateway, dashboard, model catalog and docs are MIT-licensed. Self-host with PostgreSQL and configure the model access you need. Availability still depends on configured routes and permissions.",
    "answerZh": "公开网关、控制台、模型目录和文档采用 MIT 许可。你可以配合 PostgreSQL 自行部署并配置所需模型；实际可用范围取决于路由配置和权限。",
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
    "titleZh": "让智能体直接使用牛元",
    "detail": "Connect through native plugins and MCP. Your agent discovers, configures and verifies; you set goals and approve access.",
    "detailZh": "通过原生插件和 MCP 接入。智能体直接发现、配置并验证；你设定目标、审核权限。"
  },
  {
    "index": "02",
    "metric": "Cost-efficient",
    "metricZh": "追求性价比",
    "title": "Build the model pool your task needs",
    "titleZh": "为具体任务配置合适的模型池",
    "detail": "Give your agent model information, evaluation evidence and authorized controls to configure pools and routing around your quality, latency and budget requirements.",
    "detailZh": "让智能体获取模型信息与评估证据，并获得授权的管理能力，按任务质量、延迟和预算要求配置模型池与路由。"
  },
  {
    "index": "03",
    "metric": "High-performance",
    "metricZh": "高性能",
    "title": "Keep model calls fast and observable",
    "titleZh": "让模型调用高效且可观测",
    "detail": "Route requests through Niu’s gateway and inspect latency, failures, usage and customer charges. Feed measurements back to your agent’s model pool.",
    "detailZh": "通过牛元网关路由请求，查看延迟、失败、用量与客户费用，再将测量结果反馈给智能体的模型池。"
  }
];

export const requestExample = "curl http://localhost:2555/v1/chat/completions \\\n  -H \"Authorization: Bearer $NIU_API_KEY\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"model\": \"claude-sonnet-4\",\n    \"messages\": [{\"role\": \"user\", \"content\": \"Check Q3 p99.\"}],\n    \"stream\": true\n  }'";
