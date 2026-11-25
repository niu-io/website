import { useEffect, useRef, useState } from "react";
import { useLandingMotion } from "./landing-motion";
import { useLocale } from "./locale";
import {
  IconAdjustmentsHorizontal,
  IconArrowRight,
  IconArrowUp,
  IconBell,
  IconBook,
  IconBrandGithub,
  IconChartBar,
  IconChartLine,
  IconCheck,
  IconCopy,
  IconCpu,
  IconHistory,
  IconKey,
  IconLayoutDashboard,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconList,
  IconListSearch,
  IconMessageChatbot,
  IconPaperclip,
  IconPhoto,
  IconPlugConnected,
  IconPlus,
  IconRefresh,
  IconRoute,
  IconSearch,
  IconSelector,
  IconSettings,
  IconShieldCheck,
  IconShieldLock,
  IconSparkles,
  IconVideo,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  links,
  capabilities,
  foundationFacts,
  protocolExamples,
  protocolNames,
  workflowSteps,
} from "../content/landing";

function currentDeploymentOrigin() {
  if (typeof window === "undefined") return "https://niu.io";
  return window.location.origin || "https://niu.io";
}

function buildInstallationPrompt(origin: string, isZh = false) {
  const deployment = origin.replace(/\/$/, "") || "https://niu.io";
  if (isZh) {
    return `请按照 ${deployment}/docs/install.md 为 ${deployment} 安装并配置 Niu，并在授权时核验部署地址与工作空间。`;
  }
  return `Install and configure Niu for ${deployment} by following ${deployment}/docs/install.md. Verify the deployment and workspace during authorization.`;
}

// Order matches `capabilities` in content/landing.ts.
const capabilityIcons = [
  IconSearch,
  IconChartBar,
  IconRoute,
  IconShieldLock,
  IconListSearch,
  IconBell,
];

type DemoSectionId =
  | "overview"
  | "generations"
  | "models"
  | "keys"
  | "logs"
  | "usage"
  | "settings";

type ModelsSubTab = "models" | "routing" | "evaluations";
type UsageSubTab = "usage" | "spending" | "statements" | "rates";
type SettingsSubTab = "general" | "guardrails" | "events";

const previewScenarios = [
  {
    id: "models",
    label: "Models & Trial",
    labelZh: "模型目录与试用",
    section: "models" as DemoSectionId,
    modelsTab: "models" as ModelsSubTab,
  },
  {
    id: "routing",
    label: "Routing & Evaluations",
    labelZh: "模型路由与评测",
    section: "models" as DemoSectionId,
    modelsTab: "routing" as ModelsSubTab,
  },
  {
    id: "generations",
    label: "Generations Studio",
    labelZh: "多模态生成",
    section: "generations" as DemoSectionId,
  },
  {
    id: "logs",
    label: "Logs & Guardrails",
    labelZh: "请求诊断与护栏",
    section: "logs" as DemoSectionId,
  },
];

const demoSidebarNav: Array<{
  id: DemoSectionId;
  label: string;
  labelZh: string;
  icon: typeof IconLayoutDashboard;
}> = [
  {
    id: "overview",
    label: "Overview",
    labelZh: "概览",
    icon: IconLayoutDashboard,
  },
  {
    id: "generations",
    label: "Generations",
    labelZh: "多模态生成",
    icon: IconSparkles,
  },
  { id: "models", label: "Models", labelZh: "模型", icon: IconCpu },
  { id: "keys", label: "Keys", labelZh: "密钥", icon: IconKey },
  { id: "logs", label: "Logs", labelZh: "请求日志", icon: IconList },
  { id: "usage", label: "Usage", labelZh: "用量", icon: IconChartLine },
  {
    id: "settings",
    label: "Workspace settings",
    labelZh: "工作空间设置",
    icon: IconSettings,
  },
];

type DemoCatalogModel = {
  id: string;
  title: string;
  providerBadge: string;
  providerTone: "anthropic" | "deepseek" | "openai" | "video";
  free?: boolean;
  kind: "chat" | "video";
  tags: Array<{ en: string; zh: string; filterKey: string }>;
  description: string;
  descriptionZh: string;
  rates: string[];
  ratesZh: string[];
  context: string;
  contextZh: string;
};

const demoCatalogModels: DemoCatalogModel[] = [
  {
    id: "anthropic/claude-sonnet-4-5",
    title: "Claude Sonnet 4.5",
    providerBadge: "A",
    providerTone: "anthropic",
    kind: "chat",
    tags: [
      { en: "Text input", zh: "文本输入", filterKey: "text" },
      { en: "Image input", zh: "图像输入", filterKey: "image" },
      { en: "Text output", zh: "文本输出", filterKey: "text" },
      { en: "Tool calling", zh: "工具调用", filterKey: "tools" },
    ],
    description:
      "Frontier coding and agentic tool-use model with prompt caching, extended thinking, and native Messages / Chat Completions support.",
    descriptionZh:
      "面向编码与复杂工具调用的主力模型，支持提示词缓存、扩展推理及 Messages / Chat Completions 双协议。",
    rates: ["$3.00/M input tokens", "$15.00/M output tokens"],
    ratesZh: ["$3.00 / 百万输入 Token", "$15.00 / 百万输出 Token"],
    context: "200K context",
    contextZh: "200K 上下文",
  },
  {
    id: "qiniu/deepseek-v4.1-flash",
    title: "DeepSeek-V4.1-Flash",
    providerBadge: "DS",
    providerTone: "deepseek",
    free: true,
    kind: "chat",
    tags: [
      { en: "Text input", zh: "文本输入", filterKey: "text" },
      { en: "Image input", zh: "图像输入", filterKey: "image" },
      { en: "Text output", zh: "文本输出", filterKey: "text" },
      { en: "Tool calling", zh: "工具调用", filterKey: "tools" },
    ],
    description:
      "High-throughput multimodal flash model supporting 1M context window and up to 384K output tokens for fast triage and long-context code review.",
    descriptionZh:
      "高吞吐多模态主力轻量模型，支持 1M 上下文窗口与最大 384K 输出，适合高频任务分流与长代码库审阅。",
    rates: ["Free"],
    ratesZh: ["免费"],
    context: "1M context",
    contextZh: "1M 上下文",
  },
  {
    id: "openai/gpt-5",
    title: "GPT-5",
    providerBadge: "OA",
    providerTone: "openai",
    kind: "chat",
    tags: [
      { en: "Text input", zh: "文本输入", filterKey: "text" },
      { en: "Image input", zh: "图像输入", filterKey: "image" },
      { en: "Structured output", zh: "结构化输出", filterKey: "tools" },
      { en: "Reasoning", zh: "深度推理", filterKey: "text" },
    ],
    description:
      "Flagship reasoning and Responses API model with strict JSON Schema output enforcement, multimodal vision, and configurable reasoning effort.",
    descriptionZh:
      "旗舰推理与 Responses API 原生模型，支持严格 JSON Schema 结构化输出、多模态视觉理解与可调推理强度。",
    rates: ["$1.25/M input tokens", "$10.00/M output tokens"],
    ratesZh: ["$1.25 / 百万输入 Token", "$10.00 / 百万输出 Token"],
    context: "400K context",
    contextZh: "400K 上下文",
  },
  {
    id: "qiniu/seedance-1-5-pro",
    title: "Seedance 1.5 Pro",
    providerBadge: "SD",
    providerTone: "video",
    kind: "video",
    tags: [
      { en: "Text input", zh: "文本输入", filterKey: "text" },
      { en: "Image input", zh: "图像输入", filterKey: "image" },
      { en: "Video output", zh: "视频输出", filterKey: "video" },
    ],
    description:
      "Asynchronous 1080p text-to-video and first/last-frame reference generation with workspace asset verification and pre-submit cost estimates.",
    descriptionZh:
      "异步 1080p 文生视频与首尾帧参考生成模型，支持工作空间素材库绑定、伴音生成与提交前费用估算。",
    rates: ["Estimated per video spec"],
    ratesZh: ["按视频规格估算计费"],
    context: "5s–10s · 1080p",
    contextZh: "5–10 秒 · 1080p",
  },
];

const demoRoutingPolicies = [
  {
    slug: "coding-default",
    name: "Coding & tool-use default",
    nameZh: "编码与工具调用默认策略",
    revision: 4,
    enabled: true,
    rule: "Require tool_calling; keep prompts > 120K on 1M-context fallback when primary cools down",
    ruleZh:
      "要求支持工具调用；主候选冷却或超长上下文时自动切换至 1M 上下文备选模型",
    dryRun:
      "Dry-run verified: 16K tool-call request selects anthropic/claude-sonnet-4-5 ($3.00 / $15.00 per M tokens)",
    dryRunZh:
      "预演验证通过：16K 工具调用请求命中 anthropic/claude-sonnet-4-5（$3.00 / $15.00 每百万 Token）",
    candidates: [
      {
        alias: "anthropic/claude-sonnet-4-5",
        title: "Claude Sonnet 4.5",
        tier: "Priority 1",
        tierZh: "优先级 1",
        weight: 80,
        price: "$3.00 / $15.00",
        primary: true,
      },
      {
        alias: "openai/gpt-5",
        title: "GPT-5",
        tier: "Priority 1",
        tierZh: "优先级 1",
        weight: 20,
        price: "$1.25 / $10.00",
        primary: false,
      },
      {
        alias: "qiniu/deepseek-v4.1-flash",
        title: "DeepSeek-V4.1-Flash",
        tier: "Fallback",
        tierZh: "故障回退",
        weight: 100,
        price: "Free / 免费",
        primary: false,
      },
    ],
  },
  {
    slug: "fast-triage",
    name: "Issue & log triage",
    nameZh: "工单与日志快速分流",
    revision: 2,
    enabled: true,
    rule: "Low-latency classification with structured JSON output fallback",
    ruleZh: "低延迟分类分流，并在上游限流时自动回退至结构化输出备选模型",
    dryRun:
      "Dry-run verified: 4K classification prompt selects qiniu/deepseek-v4.1-flash (Free)",
    dryRunZh:
      "预演验证通过：4K 分类提示词命中 qiniu/deepseek-v4.1-flash（免费）",
    candidates: [
      {
        alias: "qiniu/deepseek-v4.1-flash",
        title: "DeepSeek-V4.1-Flash",
        tier: "Priority 1",
        tierZh: "优先级 1",
        weight: 100,
        price: "Free / 免费",
        primary: true,
      },
      {
        alias: "openai/gpt-5",
        title: "GPT-5",
        tier: "Fallback",
        tierZh: "故障回退",
        weight: 100,
        price: "$1.25 / $10.00",
        primary: false,
      },
    ],
  },
];

const demoEvaluationRuns = [
  {
    model: "anthropic/claude-sonnet-4-5",
    sampleSet: "repo-refactor-20 · sha256:9f3c…81a2",
    passed: "19 / 20",
    medianLatency: "1,180 ms",
    charge: "$0.3420",
    chargeZh: "$0.3420（已结算）",
    tone: "completed" as const,
  },
  {
    model: "openai/gpt-5",
    sampleSet: "repo-refactor-20 · sha256:9f3c…81a2",
    passed: "19 / 20",
    medianLatency: "1,420 ms",
    charge: "$0.2680",
    chargeZh: "$0.2680（已结算）",
    tone: "completed" as const,
  },
  {
    model: "qiniu/deepseek-v4.1-flash",
    sampleSet: "repo-refactor-20 · sha256:9f3c…81a2",
    passed: "17 / 20",
    medianLatency: "610 ms",
    charge: "Free ($0.0000)",
    chargeZh: "免费（$0.0000）",
    tone: "completed" as const,
  },
  {
    model: "deepseek/deepseek-r1",
    sampleSet: "repo-refactor-20 · sha256:9f3c…81a2",
    passed: "18 / 20 (1 interrupted)",
    medianLatency: "2,940 ms",
    charge: "Unknown (1 unresolved stream)",
    chargeZh: "费用未知（1 条流中断，如实保留）",
    tone: "uncertain" as const,
  },
];

const demoChatPresets = [
  {
    prompt:
      "Summarize the upstream failover and billing outcome for request #1428 in two concise bullets.",
    promptZh: "用两条要点总结请求 #1428 的上游故障切换过程与计费结果。",
    replies: {
      "anthropic/claude-sonnet-4-5": {
        en: "• Attempt 1 on OpenRouter returned HTTP 401 before streaming, so Niu placed that route in a 60s auth cooldown with zero customer charge.\n• Attempt 2 succeeded on Anthropic in 1,180 ms (TTFT 318 ms, 128 output tokens) and settled $0.0180 against the workspace balance.",
        zh: "• 第 1 次尝试（OpenRouter）在流开始前返回 HTTP 401，Niu 将该路由置入 60 秒鉴权冷却，未产生客户扣费。\n• 第 2 次尝试切换至 Anthropic 并在 1,180 ms 内完成（TTFT 318 ms，128 输出 Token），按工作空间价目表结算 $0.0180。",
        meta: "412 input · 128 output Token · TTFT 318 ms · $0.0180",
        metaZh: "412 输入 · 128 输出 Token · 首字 318 ms · 客户费用 $0.0180",
      },
      "qiniu/deepseek-v4.1-flash": {
        en: "• Pre-stream HTTP 401 on candidate 1 triggered automatic route cooldown and transferred the budget hold without charging.\n• Candidate 2 completed streaming normally; only the delivered attempt was billed.",
        zh: "• 候选路由 1 在流输出前返回 HTTP 401，自动触发鉴权冷却并无损转移预留额度，未计费。\n• 候选路由 2 正常完成流式响应，仅对实际交付成功的尝试结算。",
        meta: "412 input · 104 output Token · TTFT 184 ms · Free",
        metaZh: "412 输入 · 104 输出 Token · 首字 184 ms · 免费",
      },
      "openai/gpt-5": {
        en: "• Failover safety: pre-stream 401 rejection on OpenRouter incurred $0.00 and quarantined the failing credential for 60s.\n• Settlement integrity: Anthropic completed Attempt 2 in 1.18s and settled $0.0180 with full phase-timing evidence.",
        zh: "• 故障隔离：OpenRouter 流前 401 拒绝未产生任何扣费，问题凭据自动隔离冷却 60 秒。\n• 结算完整：Anthropic 完成第 2 次尝试（耗时 1.18s），按客户费率结算 $0.0180 并保留分阶段耗时证据。",
        meta: "412 input · 118 output Token · TTFT 290 ms · $0.0124",
        metaZh: "412 输入 · 118 输出 Token · 首字 290 ms · 客户费用 $0.0124",
      },
    },
  },
  {
    prompt:
      "Propose a dry-run check before switching pool/coding-default to prioritize GPT-5 for JSON Schema requests.",
    promptZh:
      "在把 pool/coding-default 的 JSON Schema 请求切到 GPT-5 之前，给出预演核查步骤。",
    replies: {
      "anthropic/claude-sonnet-4-5": {
        en: "• Run preview_pool with structured_output=true and 16K input tokens to confirm openai/gpt-5 is selected and within your workspace cap.\n• Compare repo-refactor-20 fingerprinted evaluation runs before publishing revision 5.",
        zh: "• 使用 structured_output=true 与 16K 输入参数调用 preview_pool 预演，确认命中 openai/gpt-5 且符合工作空间额度边界。\n• 在发布版本 5 前对比 repo-refactor-20 带指纹样本评测的通过率与已结算费用。",
        meta: "368 input · 112 output Token · TTFT 296 ms · $0.0158",
        metaZh: "368 输入 · 112 输出 Token · 首字 296 ms · 客户费用 $0.0158",
      },
      "qiniu/deepseek-v4.1-flash": {
        en: "• Execute preview_pool against your current workspace grants—dry runs never dispatch upstream calls or incur charges.\n• Verify fallback candidate readiness in case structured_output rate limits spike.",
        zh: "• 基于当前工作空间授权执行 preview_pool 预演——预演不会发起上游推理或产生费用。\n• 同时核验备选候选模型的结构化输出能力，防止突发限流。",
        meta: "368 input · 96 output Token · TTFT 172 ms · Free",
        metaZh: "368 输入 · 96 输出 Token · 首字 172 ms · 免费",
      },
      "openai/gpt-5": {
        en: "• Call preview_pool with response_format=json_schema to validate candidate eligibility and effective customer rates ($1.25 / $10.00 per M tokens).\n• Subscribe to pool.changed so connected agents reload revision 5 automatically.",
        zh: "• 携带 response_format=json_schema 调用 preview_pool，核验候选资格与生效客户费率（$1.25 / $10.00 每百万 Token）。\n• 启用 pool.changed 签名事件订阅，使已连接智能体自动感知版本 5 变更。",
        meta: "368 input · 108 output Token · TTFT 274 ms · $0.0116",
        metaZh: "368 输入 · 108 输出 Token · 首字 274 ms · 客户费用 $0.0116",
      },
    },
  },
];

const demoWorkspaceKeys = [
  {
    name: "claude-code-device",
    source: "Browser /connect · Claude Code",
    sourceZh: "浏览器 /connect 审批 · Claude Code",
    invocation: "Off (management only: pools:write, evaluations:write)",
    invocationZh:
      "模型调用已关闭（仅管理权限：pools:write, evaluations:write）",
    budget: "Expires in 7h 42m",
    budgetZh: "7 小时 42 分后过期",
    status: "Active",
    statusZh: "有效",
  },
  {
    name: "Playground",
    source: "Workspace interactive trial key",
    sourceZh: "工作空间交互式试用密钥",
    invocation: "All callable workspace models",
    invocationZh: "允许调用工作空间全部可用模型",
    budget: "$25.00 monthly cap",
    budgetZh: "月度上限 $25.00",
    status: "Active",
    statusZh: "有效",
  },
  {
    name: "prod-backend",
    source: "Service key · Chat, Responses & Messages",
    sourceZh: "服务端密钥 · Chat、Responses 与 Messages",
    invocation:
      "pool/coding-default, anthropic/claude-sonnet-4-5, openai/gpt-5",
    invocationZh:
      "pool/coding-default、anthropic/claude-sonnet-4-5、openai/gpt-5",
    budget: "$200.00 monthly cap · $18.42 used",
    budgetZh: "月度上限 $200.00 · 已用 $18.42",
    status: "Active",
    statusZh: "有效",
  },
];

const demoLogRecords = [
  {
    time: "14:22:08",
    timeZh: "14:22:08",
    model: "anthropic/claude-sonnet-4-5",
    providerSub: "Anthropic · pool/coding-default",
    providerBadge: "A",
    status: "Completed",
    statusZh: "已完成",
    statusTone: "completed" as const,
    duration: "1,180 ms",
    inputTokens: "412",
    cachedTokens: "256",
    outputTokens: "128",
    reasoningTokens: "0",
    charge: "$0.0180",
    chargeZh: "$0.0180",
    deliveryStatus: "Attempt 2 of 2 · Customer tariff settled",
    deliveryStatusZh: "第 2/2 次尝试 · 已按客户费率结算",
    throughput: "128 output Token · 148.8 tok/s",
    throughputZh: "128 输出 Token · 148.8 tok/s",
    phases: [
      {
        label: "Preparation",
        labelZh: "请求准入与准备",
        duration: "2.1 ms",
        pct: 6,
        tone: "prep" as const,
      },
      {
        label: "First output wait (TTFT)",
        labelZh: "首字等待 (TTFT)",
        duration: "318 ms",
        pct: 27,
        tone: "ttft" as const,
      },
      {
        label: "Output stream",
        labelZh: "输出流生成",
        duration: "860 ms",
        pct: 67,
        tone: "stream" as const,
      },
    ],
    rawPreview:
      "POST /v1/chat/completions → pool/coding-default (attempt 1 HTTP 401 not charged → attempt 2 anthropic/claude-sonnet-4-5 HTTP 200 settled $0.0180)",
    rawPreviewZh:
      "POST /v1/chat/completions → pool/coding-default（尝试 1 HTTP 401 未计费 → 尝试 2 anthropic/claude-sonnet-4-5 HTTP 200 已结算 $0.0180）",
  },
  {
    time: "14:22:07",
    timeZh: "14:22:07",
    model: "openrouter/claude-sonnet-4-5",
    providerSub: "OpenRouter · Attempt 1 cooldown",
    providerBadge: "OR",
    status: "Failed · HTTP 401",
    statusZh: "失败 · HTTP 401",
    statusTone: "failed" as const,
    duration: "3.2 ms",
    inputTokens: "0",
    cachedTokens: "0",
    outputTokens: "0",
    reasoningTokens: "0",
    charge: "Not charged",
    chargeZh: "未计费",
    deliveryStatus: "Pre-stream rejection · Hold transferred to Attempt 2",
    deliveryStatusZh: "流开始前拒绝 · 预留额度转交第 2 次尝试",
    throughput: "0 output Token · 60s auth cooldown",
    throughputZh: "0 输出 Token · 触发 60 秒鉴权冷却",
    phases: [
      {
        label: "Preparation",
        labelZh: "请求准入与准备",
        duration: "1.8 ms",
        pct: 56,
        tone: "prep" as const,
      },
      {
        label: "First output wait (TTFT)",
        labelZh: "首字等待 (TTFT)",
        duration: "1.4 ms",
        pct: 44,
        tone: "failed" as const,
      },
      {
        label: "Output stream",
        labelZh: "输出流生成",
        duration: "—",
        pct: 0,
        tone: "stream" as const,
      },
    ],
    rawPreview:
      "Upstream HTTP 401 on OpenRouter credential; route entered 60s auth cooldown and failed over cleanly with zero charge.",
    rawPreviewZh:
      "上游 OpenRouter 凭据返回 HTTP 401；该路由进入 60 秒鉴权冷却并自动切换至下一候选，未产生客户扣费。",
  },
  {
    time: "14:19:41",
    timeZh: "14:19:41",
    model: "deepseek/deepseek-r1",
    providerSub: "DeepSeek · Stream interrupted",
    providerBadge: "DS",
    status: "Uncertain",
    statusZh: "状态未定",
    statusTone: "uncertain" as const,
    duration: "4,820 ms",
    inputTokens: "620",
    cachedTokens: "0",
    outputTokens: "—",
    reasoningTokens: "194",
    charge: "Unresolved",
    chargeZh: "待核对",
    deliveryStatus: "SSE dropped mid-stream · Never fabricated as $0.00",
    deliveryStatusZh: "流传输中途断开 · 绝不伪造为 $0.00 正常完成",
    throughput: "Partial stream · Preserved for reconciliation",
    throughputZh: "部分流输出 · 显式保留待核对状态",
    phases: [
      {
        label: "Preparation",
        labelZh: "请求准入与准备",
        duration: "2.4 ms",
        pct: 5,
        tone: "prep" as const,
      },
      {
        label: "First output wait (TTFT)",
        labelZh: "首字等待 (TTFT)",
        duration: "610 ms",
        pct: 18,
        tone: "ttft" as const,
      },
      {
        label: "Output stream",
        labelZh: "输出流生成",
        duration: "4,207 ms",
        pct: 77,
        tone: "uncertain" as const,
      },
    ],
    rawPreview:
      "SSE stream closed before terminal usage chunk; recorded as Uncertain / Unresolved so statements never fake a $0 completion.",
    rawPreviewZh:
      "SSE 流在收到最终用量分块前断开；系统如实记录为状态未定 / 待核对，避免账单伪造 $0.00 正常完成。",
  },
  {
    time: "14:18:12",
    timeZh: "14:18:12",
    model: "openai/gpt-5",
    providerSub: "Guardrail revision #3",
    providerBadge: "OA",
    status: "Blocked · Guardrail",
    statusZh: "已拦截 · 安全护栏",
    statusTone: "failed" as const,
    duration: "4.1 ms",
    inputTokens: "0",
    cachedTokens: "0",
    outputTokens: "0",
    reasoningTokens: "0",
    charge: "Not charged",
    chargeZh: "未计费",
    deliveryStatus: "Denied before upstream dispatch · Hold released",
    deliveryStatusZh: "转发前被安全护栏拦截 · 预留额度已释放",
    throughput: "Rule: secret-credential-pattern",
    throughputZh: "命中规则：secret-credential-pattern",
    phases: [
      {
        label: "Preparation",
        labelZh: "请求准入与准备",
        duration: "4.1 ms",
        pct: 100,
        tone: "failed" as const,
      },
      {
        label: "First output wait (TTFT)",
        labelZh: "首字等待 (TTFT)",
        duration: "—",
        pct: 0,
        tone: "ttft" as const,
      },
      {
        label: "Output stream",
        labelZh: "输出流生成",
        duration: "—",
        pct: 0,
        tone: "stream" as const,
      },
    ],
    rawPreview:
      "Pre-dispatch workspace guardrail denied private key material in prompt; reservation released without upstream call or charge.",
    rawPreviewZh:
      "转发前工作空间安全护栏拦截了提示词中的私钥凭据片段；预留额度立即释放，未发起上游调用且未产生扣费。",
  },
  {
    time: "14:16:44",
    timeZh: "14:16:44",
    model: "qiniu/seedance-1-5-pro",
    providerSub: "Video job · 1080p · 5s",
    providerBadge: "SD",
    status: "Completed",
    statusZh: "已完成",
    statusTone: "completed" as const,
    duration: "42.0 s",
    inputTokens: "—",
    cachedTokens: "—",
    outputTokens: "1080p MP4",
    reasoningTokens: "—",
    charge: "$0.2400",
    chargeZh: "$0.2400",
    deliveryStatus: "Async video job succeeded · Pre-submit quote matched",
    deliveryStatusZh: "异步视频任务已完成 · 与提交前预估报价一致",
    throughput: "1920×1080 · 24 fps · Audio",
    throughputZh: "1920×1080 · 24 fps · 含伴音",
    phases: [
      {
        label: "Preparation & asset check",
        labelZh: "准入与参考素材核验",
        duration: "0.4 s",
        pct: 4,
        tone: "prep" as const,
      },
      {
        label: "Queue wait",
        labelZh: "队列等待",
        duration: "3.6 s",
        pct: 10,
        tone: "ttft" as const,
      },
      {
        label: "Video rendering",
        labelZh: "视频渲染生成",
        duration: "38.0 s",
        pct: 86,
        tone: "stream" as const,
      },
    ],
    rawPreview:
      "POST /v1/video/jobs → model qiniu/seedance-1-5-pro (first-frame asset verified, quote $0.2400 settled $0.2400).",
    rawPreviewZh:
      "POST /v1/video/jobs → 模型 qiniu/seedance-1-5-pro（首帧参考素材核验通过，预估 $0.2400，已结算 $0.2400）。",
  },
  {
    time: "14:15:30",
    timeZh: "14:15:30",
    model: "openai/gpt-5",
    providerSub: "OpenAI · Responses JSON Schema",
    providerBadge: "OA",
    status: "Completed",
    statusZh: "已完成",
    statusTone: "completed" as const,
    duration: "840 ms",
    inputTokens: "380",
    cachedTokens: "192",
    outputTokens: "96",
    reasoningTokens: "64",
    charge: "$0.0118",
    chargeZh: "$0.0118",
    deliveryStatus: "Completed · Structured JSON Schema verified",
    deliveryStatusZh: "已完成 · JSON Schema 结构化输出校验通过",
    throughput: "96 output Token · 168.4 tok/s",
    throughputZh: "96 输出 Token · 168.4 tok/s",
    phases: [
      {
        label: "Preparation",
        labelZh: "请求准入与准备",
        duration: "1.9 ms",
        pct: 5,
        tone: "prep" as const,
      },
      {
        label: "First output wait (TTFT)",
        labelZh: "首字等待 (TTFT)",
        duration: "268 ms",
        pct: 32,
        tone: "ttft" as const,
      },
      {
        label: "Output stream",
        labelZh: "输出流生成",
        duration: "570 ms",
        pct: 63,
        tone: "stream" as const,
      },
    ],
    rawPreview:
      "POST /v1/responses → model openai/gpt-5 (json_schema strict output validated, settled $0.0118).",
    rawPreviewZh:
      "POST /v1/responses → 模型 openai/gpt-5（严格 JSON Schema 输出校验通过，已结算 $0.0118）。",
  },
];

const volumeHistogramBars = [
  34, 42, 38, 51, 64, 72, 68, 84, 92, 78, 88, 96, 82, 74, 89, 94, 100, 86, 79,
  91, 85, 76, 88, 95,
];

export default function LandingContent({
  highlightedProtocols,
}: {
  highlightedProtocols: string[];
}) {
  const { isZh, t } = useLocale();
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<DemoSectionId>("models");
  const [modelsSubTab, setModelsSubTab] = useState<ModelsSubTab>("models");
  const [usageSubTab, setUsageSubTab] = useState<UsageSubTab>("usage");
  const [settingsSubTab, setSettingsSubTab] =
    useState<SettingsSubTab>("guardrails");
  const [modelSearch, setModelSearch] = useState("");
  const [modelCapabilityFilter, setModelCapabilityFilter] =
    useState<string>("all");
  const [selectedPolicySlug, setSelectedPolicySlug] =
    useState("coding-default");
  const [userPinned, setUserPinned] = useState(false);
  const [pointerHovered, setPointerHovered] = useState(false);
  const previewPaused = userPinned || pointerHovered;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedLogIndex, setSelectedLogIndex] = useState(0);
  const [showVolumeChart, setShowVolumeChart] = useState(false);
  const [activeGenerationsMode, setActiveGenerationsMode] = useState<
    "chat" | "video"
  >("chat");
  const [selectedChatModel, setSelectedChatModel] = useState<
    "anthropic/claude-sonnet-4-5" | "qiniu/deepseek-v4.1-flash" | "openai/gpt-5"
  >("anthropic/claude-sonnet-4-5");
  const [activeChatPresetIndex, setActiveChatPresetIndex] = useState(0);
  const [composerDraft, setComposerDraft] = useState("");
  const [genSessionsOpen, setGenSessionsOpen] = useState(false);
  const [genAssetsOpen, setGenAssetsOpen] = useState(false);
  const [copiedDemoAction, setCopiedDemoAction] = useState<string | null>(null);
  const [activeProtocolIndex, setActiveProtocolIndex] = useState(0);
  const [deploymentOrigin, setDeploymentOrigin] = useState("https://niu.io");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [installCopyError, setInstallCopyError] = useState(false);
  const [copiedProtocol, setCopiedProtocol] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useLandingMotion(mainRef);
  const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

  useEffect(() => {
    setDeploymentOrigin(currentDeploymentOrigin());
  }, []);

  const installationPrompt = buildInstallationPrompt(deploymentOrigin, isZh);

  const applyScenario = (index: number) => {
    const scenario = previewScenarios[index] ?? previewScenarios[0];
    setActiveScenarioIndex(index);
    setActiveSection(scenario.section);
    if (scenario.modelsTab) {
      setModelsSubTab(scenario.modelsTab);
    }
  };

  useEffect(() => {
    if (previewPaused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      const next = (activeScenarioIndex + 1) % previewScenarios.length;
      applyScenario(next);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [previewPaused, activeScenarioIndex]);

  const openSection = (section: DemoSectionId) => {
    setUserPinned(true);
    setActiveSection(section);
    if (section === "models") {
      setActiveScenarioIndex(modelsSubTab === "models" ? 0 : 1);
    } else if (section === "generations") {
      setActiveScenarioIndex(2);
    } else if (section === "logs") {
      setActiveScenarioIndex(3);
    } else {
      setActiveScenarioIndex(-1);
    }
  };

  const triggerDemoCopy = (key: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedDemoAction(key);
    window.setTimeout(() => {
      setCopiedDemoAction((curr) => (curr === key ? null : curr));
    }, 1800);
  };

  const copyInstallationPrompt = () => {
    setInstallCopyError(false);
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setInstallCopyError(true);
      return;
    }
    void navigator.clipboard
      .writeText(installationPrompt)
      .then(() => setCopiedInstall(true))
      .catch(() => setInstallCopyError(true));
  };

  const handleCopyProtocol = () => {
    const example = protocolExamples[activeProtocolIndex];
    const snippet = example
      ? example.code.replaceAll("https://niu.io", deploymentOrigin)
      : undefined;
    if (!snippet || typeof navigator === "undefined" || !navigator.clipboard)
      return;
    void navigator.clipboard.writeText(snippet).then(() => {
      setCopiedProtocol(true);
      window.setTimeout(() => setCopiedProtocol(false), 1800);
    });
  };

  const handleTryModel = (model: DemoCatalogModel) => {
    setUserPinned(true);
    setActiveSection("generations");
    setActiveScenarioIndex(2);
    if (model.kind === "video") {
      setActiveGenerationsMode("video");
    } else {
      setActiveGenerationsMode("chat");
      if (
        model.id === "anthropic/claude-sonnet-4-5" ||
        model.id === "qiniu/deepseek-v4.1-flash" ||
        model.id === "openai/gpt-5"
      ) {
        setSelectedChatModel(model.id);
      }
    }
  };

  const filteredModels = demoCatalogModels.filter((model) => {
    const query = modelSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      model.title.toLowerCase().includes(query) ||
      model.id.toLowerCase().includes(query) ||
      model.description.toLowerCase().includes(query) ||
      model.descriptionZh.includes(query);
    const matchesCap =
      modelCapabilityFilter === "all" ||
      (modelCapabilityFilter === "free" && Boolean(model.free)) ||
      model.tags.some((tag) => tag.filterKey === modelCapabilityFilter);
    return matchesSearch && matchesCap;
  });

  const selectedPolicy =
    demoRoutingPolicies.find((p) => p.slug === selectedPolicySlug) ??
    demoRoutingPolicies[0];
  const activeChatPreset =
    demoChatPresets[activeChatPresetIndex] ?? demoChatPresets[0];
  const activeChatReply =
    activeChatPreset.replies[selectedChatModel] ??
    activeChatPreset.replies["anthropic/claude-sonnet-4-5"];
  const activeProtocol =
    protocolExamples[activeProtocolIndex] ?? protocolExamples[0];
  const selectedLog = demoLogRecords[selectedLogIndex] ?? demoLogRecords[0];

  const singleCrumbTitle: Record<
    Exclude<DemoSectionId, "models" | "usage" | "settings" | "generations">,
    { en: string; zh: string }
  > = {
    overview: { en: "Overview", zh: "概览" },
    keys: { en: "Keys", zh: "密钥" },
    logs: { en: "Logs", zh: "请求日志" },
  };

  return (
    <main id="main" ref={mainRef}>
      {/* 1. HERO + INTERACTIVE NIU 0.4 PRODUCT PREVIEW */}
      <section className="hero-stage" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true">
          <span className="hero-grid" />
          <span className="hero-glow" />
        </div>
        <div className="hero container">
          <a
            className="release-link hero-enter"
            style={stagger(0)}
            href="#product"
          >
            <span>
              {t(
                "Device-approved agent access, routing and evaluations",
                "设备授权智能体接入、模型路由与样本评测",
              )}
            </span>
            <IconArrowRight size={14} aria-hidden="true" />
          </a>
          <h1 id="hero-title" className="hero-enter" style={stagger(1)}>
            {isZh ? (
              <>
                面向智能体的
                <br />
                <span className="accent">模型平台</span>
              </>
            ) : (
              <>
                The Model Platform
                <br />
                <span className="accent">for Agents</span>
              </>
            )}
          </h1>
          <p className="hero-description hero-enter" style={stagger(2)}>
            {isZh ? (
              <>
                让智能体发现与评测模型、配置路由，
                <span className="demo-nowrap">并核查性能与费用。</span>
              </>
            ) : (
              "Discover and evaluate models, configure routing, and manage performance and cost—all through your agent."
            )}
          </p>
          <div className="hero-install code-card hero-enter" style={stagger(3)}>
            <div className="code-heading">
              <strong>
                {t(
                  "Give this to your coding agent",
                  "把这句话交给你的编码智能体",
                )}
              </strong>
              <a href="/docs/install.md">
                {t("Installation guide", "接入指南")}
              </a>
            </div>
            <code className="hero-install-prompt">{installationPrompt}</code>
            <div className="hero-install-footer">
              <p>
                {t(
                  "Paste into Claude Code, Codex, Cursor, OpenCode, DeepSeek Harness or any coding agent. Your agent checks the deployment and opens Niu for sign-in and scope approval.",
                  "粘贴至 Claude Code、Codex、Cursor、OpenCode 或 DeepSeek Harness 等编码智能体。智能体核验部署地址并打开 Niu 牛元完成登录与权限审批。",
                )}
              </p>
              <Button
                size="lg"
                className="cta-primary"
                onClick={copyInstallationPrompt}
              >
                {copiedInstall ? (
                  <IconCheck aria-hidden="true" />
                ) : (
                  <IconCopy aria-hidden="true" />
                )}
                <span aria-live="polite">
                  {copiedInstall
                    ? t("Copied", "已复制")
                    : t("Copy setup prompt", "复制接入提示词")}
                </span>
              </Button>
            </div>
            {installCopyError && (
              <p className="hero-install-error" role="status">
                {t(
                  "Select the prompt above to copy it manually.",
                  "请选择上方提示词手动复制。",
                )}
              </p>
            )}
          </div>
          <div className="actions hero-actions hero-enter" style={stagger(3)}>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-secondary"
            >
              <a href="/docs/guides/personal-assistant/">
                <IconPlugConnected aria-hidden="true" />
                {t("Build with Niu", "用 Niu 牛元开发")}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-secondary"
            >
              <a href={links.dashboard}>{t("Open dashboard", "打开控制台")}</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="cta-ghost">
              <a href={links.repo}>
                <IconBrandGithub aria-hidden="true" />
                {t("Star on GitHub", "GitHub Star")}
              </a>
            </Button>
          </div>

          {/* Interactive Product UI Preview Window — Niu 0.4 Workspace Shell */}
          <div
            id="review-title"
            className="preview-frame hero-enter"
            style={stagger(4)}
            data-paused={previewPaused ? "true" : undefined}
            onMouseEnter={() => setPointerHovered(true)}
            onMouseLeave={() => setPointerHovered(false)}
          >
            {/* Outer Guided Tour Strip (keeps internal dashboard chrome 100% authentic) */}
            <div className="demo-tour-bar">
              <div
                className="demo-tour-pills"
                role="tablist"
                aria-label={t(
                  "Interactive workspace scenarios",
                  "交互式控制台场景",
                )}
              >
                {previewScenarios.map((scenario, idx) => {
                  const selected = activeScenarioIndex === idx;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      className={`demo-tour-pill${selected ? " is-active" : ""}`}
                      onClick={() => {
                        setUserPinned(true);
                        applyScenario(idx);
                      }}
                    >
                      <span>{isZh ? scenario.labelZh : scenario.label}</span>
                      {selected && !previewPaused && (
                        <i
                          className="preview-tab-progress"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <span className="demo-tour-hint">
                {t(
                  "Click any sidebar menu, tab or Try button",
                  "可自由点击左侧导航、顶部标签或「试用」按钮",
                )}
              </span>
            </div>

            <div
              className={`product-preview demo-dashboard-shell${sidebarCollapsed ? " is-sidebar-collapsed" : ""}`}
              aria-label={t(
                "Interactive Niu workspace preview",
                "Niu 牛元交互式工作空间预览",
              )}
            >
              {/* Authentic Niu 0.4 Single Left Sidebar (ShellNavigation.tsx + ShellAccount) */}
              {!sidebarCollapsed && (
                <aside
                  className="demo-sidebar"
                  aria-label={t("Workspace navigation", "工作空间导航")}
                >
                  <div className="demo-sidebar-top">
                    <button
                      type="button"
                      className="demo-ws-switcher"
                      onClick={() => openSection("overview")}
                      title={t("Default workspace", "Default 工作空间")}
                    >
                      <img
                        src="/site-assets/brand/niu-mark.png"
                        width="20"
                        height="20"
                        alt=""
                      />
                      <span className="demo-ws-label">Default</span>
                      <IconSelector size={14} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="demo-collapse-btn"
                      aria-label={t("Collapse navigation", "收起导航")}
                      title={t("Collapse navigation", "收起导航")}
                      onClick={() => setSidebarCollapsed(true)}
                    >
                      <IconLayoutSidebarLeftCollapse size={16} />
                    </button>
                  </div>

                  <nav
                    className="demo-sidebar-menu"
                    aria-label={t("Main navigation", "主导航")}
                  >
                    {demoSidebarNav.map((item) => {
                      const NavIcon = item.icon;
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`demo-nav-btn${isActive ? " is-active" : ""}`}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => openSection(item.id)}
                        >
                          <NavIcon size={16} stroke={1.85} aria-hidden="true" />
                          <span>{isZh ? item.labelZh : item.label}</span>
                        </button>
                      );
                    })}
                  </nav>

                  <div className="demo-sidebar-bottom">
                    <button
                      type="button"
                      className="demo-nav-btn"
                      onClick={() => triggerDemoCopy("mcp", installationPrompt)}
                    >
                      {copiedDemoAction === "mcp" ? (
                        <IconCheck size={16} aria-hidden="true" />
                      ) : (
                        <IconPlugConnected size={16} aria-hidden="true" />
                      )}
                      <span>
                        {copiedDemoAction === "mcp"
                          ? t("Copied prompt", "已复制接入指令")
                          : t("Install MCP", "安装 MCP")}
                      </span>
                    </button>
                    <a
                      href="/docs/"
                      className="demo-nav-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(
                        "Docs (opens in a new tab)",
                        "文档（在新标签页打开）",
                      )}
                    >
                      <IconBook size={16} aria-hidden="true" />
                      <span>{t("Docs", "文档")}</span>
                    </a>
                    <a href={links.dashboard} className="demo-nav-btn">
                      <IconShieldLock size={16} aria-hidden="true" />
                      <span>{t("Admin", "管理后台")}</span>
                    </a>
                    <div className="demo-account-row">
                      <span className="demo-account-avatar" aria-hidden="true">
                        D
                      </span>
                      <span className="demo-account-name">Demo</span>
                      <span className="demo-account-role">
                        {t("Owner", "所有者")}
                      </span>
                    </div>
                  </div>
                </aside>
              )}

              {/* Main Workspace Column */}
              <div className="demo-main-column">
                {/* Mobile / Compact Nav Strip (shown when viewport <= 960px) */}
                <div
                  className="demo-mobile-rail"
                  role="navigation"
                  aria-label={t("Mobile workspace menu", "移动端工作空间菜单")}
                >
                  {demoSidebarNav.map((item) => {
                    const NavIcon = item.icon;
                    const active = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`demo-mobile-chip${active ? " is-active" : ""}`}
                        onClick={() => openSection(item.id)}
                      >
                        <NavIcon size={14} aria-hidden="true" />
                        <span>{isZh ? item.labelZh : item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Authentic Niu 0.4 Top Header Bar (ShellHeader + #dashboard-page-tabs / GenerationsLayout toolbar) */}
                <header className="demo-topbar">
                  <div className="demo-topbar-left">
                    {sidebarCollapsed && (
                      <button
                        type="button"
                        className="demo-expand-btn"
                        aria-label={t("Expand navigation", "展开导航")}
                        title={t("Expand navigation", "展开导航")}
                        onClick={() => setSidebarCollapsed(false)}
                      >
                        <img
                          src="/site-assets/brand/niu-mark.png"
                          width="18"
                          height="18"
                          alt=""
                        />
                        <IconLayoutSidebarLeftExpand size={15} />
                      </button>
                    )}

                    {activeSection === "generations" ? (
                      <div className="demo-gen-header-left">
                        <button
                          type="button"
                          className="demo-ghost-pill"
                          aria-pressed={genSessionsOpen}
                          onClick={() => {
                            setGenSessionsOpen((v) => !v);
                            setGenAssetsOpen(false);
                          }}
                        >
                          <IconHistory size={15} aria-hidden="true" />
                          <span>{t("Sessions", "会话")}</span>
                        </button>
                        <span className="demo-gen-title">
                          {activeGenerationsMode === "chat"
                            ? t(
                                "Failover & routing audit",
                                "故障切换与路由核查",
                              )
                            : t(
                                "Harbor dusk tracking shot",
                                "港口黄昏航拍镜头",
                              )}
                        </span>
                        <button
                          type="button"
                          className="demo-ws-pill"
                          onClick={() => openSection("overview")}
                        >
                          Default
                        </button>
                      </div>
                    ) : activeSection === "models" ? (
                      <div className="demo-header-with-tabs">
                        <button
                          type="button"
                          className="demo-crumb-link"
                          onClick={() => openSection("overview")}
                        >
                          Default
                        </button>
                        <span className="demo-crumb-sep" aria-hidden="true">
                          /
                        </span>
                        <div
                          className="demo-header-tabs"
                          role="tablist"
                          aria-label={t(
                            "Model catalog and policy sections",
                            "模型与策略页面",
                          )}
                        >
                          {(
                            [
                              { id: "models", en: "Models", zh: "模型" },
                              { id: "routing", en: "Routing", zh: "模型路由" },
                              {
                                id: "evaluations",
                                en: "Evaluations",
                                zh: "评估",
                              },
                            ] as const
                          ).map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              role="tab"
                              aria-selected={modelsSubTab === tab.id}
                              className={`demo-header-tab${modelsSubTab === tab.id ? " is-active" : ""}`}
                              onClick={() => {
                                setUserPinned(true);
                                setModelsSubTab(tab.id);
                                setActiveScenarioIndex(
                                  tab.id === "models" ? 0 : 1,
                                );
                              }}
                            >
                              {isZh ? tab.zh : tab.en}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : activeSection === "usage" ? (
                      <div className="demo-header-with-tabs">
                        <button
                          type="button"
                          className="demo-crumb-link"
                          onClick={() => openSection("overview")}
                        >
                          Default
                        </button>
                        <span className="demo-crumb-sep" aria-hidden="true">
                          /
                        </span>
                        <div
                          className="demo-header-tabs"
                          role="tablist"
                          aria-label={t(
                            "Usage and billing sections",
                            "用量与账单页面",
                          )}
                        >
                          {(
                            [
                              { id: "usage", en: "Usage", zh: "用量" },
                              { id: "spending", en: "Spending", zh: "支出" },
                              {
                                id: "statements",
                                en: "Statements",
                                zh: "账单",
                              },
                              { id: "rates", en: "Rates", zh: "费率" },
                            ] as const
                          ).map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              role="tab"
                              aria-selected={usageSubTab === tab.id}
                              className={`demo-header-tab${usageSubTab === tab.id ? " is-active" : ""}`}
                              onClick={() => setUsageSubTab(tab.id)}
                            >
                              {isZh ? tab.zh : tab.en}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : activeSection === "settings" ? (
                      <div className="demo-header-with-tabs">
                        <button
                          type="button"
                          className="demo-crumb-link"
                          onClick={() => openSection("overview")}
                        >
                          Default
                        </button>
                        <span className="demo-crumb-sep" aria-hidden="true">
                          /
                        </span>
                        <div
                          className="demo-header-tabs"
                          role="tablist"
                          aria-label={t(
                            "Workspace settings sections",
                            "工作空间设置页面",
                          )}
                        >
                          {(
                            [
                              { id: "general", en: "General", zh: "常规设置" },
                              {
                                id: "guardrails",
                                en: "Guardrails",
                                zh: "安全护栏",
                              },
                              { id: "events", en: "Events", zh: "事件订阅" },
                            ] as const
                          ).map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              role="tab"
                              aria-selected={settingsSubTab === tab.id}
                              className={`demo-header-tab${settingsSubTab === tab.id ? " is-active" : ""}`}
                              onClick={() => setSettingsSubTab(tab.id)}
                            >
                              {isZh ? tab.zh : tab.en}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="demo-breadcrumb">
                        <button
                          type="button"
                          className="demo-crumb-link"
                          onClick={() => openSection("overview")}
                        >
                          Default
                        </button>
                        <span className="demo-crumb-sep" aria-hidden="true">
                          /
                        </span>
                        <strong className="demo-crumb-current">
                          {isZh
                            ? singleCrumbTitle[activeSection].zh
                            : singleCrumbTitle[activeSection].en}
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* Right Header Actions */}
                  <div className="demo-topbar-right">
                    {activeSection === "overview" && (
                      <button
                        type="button"
                        className="demo-primary-btn"
                        onClick={() => openSection("generations")}
                      >
                        <IconSparkles size={14} aria-hidden="true" />
                        <span>{t("Open Generations", "开始生成")}</span>
                      </button>
                    )}

                    {activeSection === "models" &&
                      modelsSubTab === "routing" && (
                        <>
                          <button
                            type="button"
                            className="demo-outline-btn"
                            onClick={() =>
                              triggerDemoCopy(
                                "routing-prompt",
                                "Inspect workspace models, customer prices, and evaluation evidence in Niu, then propose and dry-run a routing policy for pool/coding-default.",
                              )
                            }
                          >
                            {copiedDemoAction === "routing-prompt" ? (
                              <IconCheck size={14} aria-hidden="true" />
                            ) : (
                              <IconCopy size={14} aria-hidden="true" />
                            )}
                            <span>
                              {copiedDemoAction === "routing-prompt"
                                ? t("Copied", "已复制")
                                : t("Copy agent prompt", "复制智能体提示词")}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="demo-outline-btn"
                            onClick={() =>
                              setSelectedPolicySlug((curr) =>
                                curr === "coding-default"
                                  ? "fast-triage"
                                  : "coding-default",
                              )
                            }
                          >
                            <IconRoute size={14} aria-hidden="true" />
                            <span>{t("Switch policy", "切换策略")}</span>
                          </button>
                        </>
                      )}

                    {activeSection === "models" &&
                      modelsSubTab === "evaluations" && (
                        <button
                          type="button"
                          className="demo-outline-btn"
                          onClick={() =>
                            triggerDemoCopy(
                              "eval-prompt",
                              "Run a fingerprinted sample evaluation in Niu and compare latency, pass rate, and settled customer charges.",
                            )
                          }
                        >
                          {copiedDemoAction === "eval-prompt" ? (
                            <IconCheck size={14} aria-hidden="true" />
                          ) : (
                            <IconCopy size={14} aria-hidden="true" />
                          )}
                          <span>
                            {copiedDemoAction === "eval-prompt"
                              ? t("Copied", "已复制")
                              : t("Copy evaluation prompt", "复制评测提示词")}
                          </span>
                        </button>
                      )}

                    {activeSection === "generations" && (
                      <>
                        <div
                          className="demo-choice-group"
                          role="group"
                          aria-label={t("Generation mode", "生成模式")}
                        >
                          <button
                            type="button"
                            className="demo-choice-btn"
                            aria-pressed={activeGenerationsMode === "chat"}
                            onClick={() => setActiveGenerationsMode("chat")}
                          >
                            <IconMessageChatbot size={14} aria-hidden="true" />
                            <span>{t("Chat", "对话")}</span>
                          </button>
                          <button
                            type="button"
                            className="demo-choice-btn"
                            aria-pressed={activeGenerationsMode === "video"}
                            onClick={() => setActiveGenerationsMode("video")}
                          >
                            <IconVideo size={14} aria-hidden="true" />
                            <span>{t("Video", "视频")}</span>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="demo-outline-btn"
                          onClick={() => openSection("keys")}
                          title={t(
                            "Inspect workspace keys",
                            "查看工作空间密钥",
                          )}
                        >
                          <IconKey size={13} aria-hidden="true" />
                          <span>Playground</span>
                        </button>
                        <button
                          type="button"
                          className="demo-ghost-pill"
                          aria-pressed={genAssetsOpen}
                          onClick={() => {
                            setGenAssetsOpen((v) => !v);
                            setGenSessionsOpen(false);
                          }}
                        >
                          <IconPhoto size={15} aria-hidden="true" />
                          <span>{t("Assets", "素材库")}</span>
                        </button>
                      </>
                    )}

                    {activeSection === "keys" && (
                      <button
                        type="button"
                        className="demo-primary-btn"
                        onClick={() =>
                          triggerDemoCopy(
                            "connect-url",
                            `${deploymentOrigin}/connect`,
                          )
                        }
                      >
                        <IconPlus size={14} aria-hidden="true" />
                        <span>
                          {copiedDemoAction === "connect-url"
                            ? t("Copied /connect", "已复制 /connect")
                            : t("Create API key", "创建密钥")}
                        </span>
                      </button>
                    )}

                    {activeSection === "logs" && (
                      <>
                        <button
                          type="button"
                          className="demo-outline-btn"
                          aria-pressed={showVolumeChart}
                          onClick={() => setShowVolumeChart((v) => !v)}
                        >
                          <IconChartBar size={14} aria-hidden="true" />
                          <span>{t("Request volume", "请求趋势")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-outline-btn"
                          onClick={() =>
                            setSelectedLogIndex((prev) => (prev === 1 ? 3 : 1))
                          }
                        >
                          <IconShieldCheck size={14} aria-hidden="true" />
                          <span>{t("Blocked & failed", "拦截与失败")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-icon-btn"
                          aria-label={t("Next request sample", "切换请求样本")}
                          onClick={() =>
                            setSelectedLogIndex(
                              (prev) => (prev + 1) % demoLogRecords.length,
                            )
                          }
                        >
                          <IconRefresh size={14} aria-hidden="true" />
                        </button>
                      </>
                    )}

                    {activeSection === "settings" &&
                      settingsSubTab === "guardrails" && (
                        <button
                          type="button"
                          className="demo-outline-btn"
                          onClick={() => {
                            openSection("logs");
                            setSelectedLogIndex(3);
                          }}
                        >
                          <IconShieldCheck size={14} aria-hidden="true" />
                          <span>
                            {t("Blocked requests (1)", "拦截记录 (1)")}
                          </span>
                        </button>
                      )}
                  </div>
                </header>

                {/* Canvas Body */}
                <div className="demo-canvas-body">
                  {/* 1. MODELS | ROUTING | EVALUATIONS */}
                  {activeSection === "models" && modelsSubTab === "models" && (
                    <div className="demo-page-surface">
                      <div className="demo-models-toolbar">
                        <label className="demo-search-box">
                          <IconSearch size={15} aria-hidden="true" />
                          <input
                            type="search"
                            value={modelSearch}
                            onChange={(e) => setModelSearch(e.target.value)}
                            placeholder={t(
                              "Search by model name or ID...",
                              "按模型名称或 ID 搜索...",
                            )}
                            aria-label={t(
                              "Search by model name or ID",
                              "按模型名称或 ID 搜索",
                            )}
                          />
                        </label>
                        <div
                          className="demo-cap-filters"
                          role="group"
                          aria-label={t("Capability filters", "能力筛选")}
                        >
                          <span className="demo-filter-icon" aria-hidden="true">
                            <IconAdjustmentsHorizontal size={14} />
                          </span>
                          {(
                            [
                              { id: "all", en: "All", zh: "全部" },
                              {
                                id: "tools",
                                en: "Tool calling",
                                zh: "工具调用",
                              },
                              { id: "image", en: "Vision", zh: "图像输入" },
                              { id: "video", en: "Video", zh: "视频输出" },
                              { id: "free", en: "Free", zh: "免费" },
                            ] as const
                          ).map((chip) => (
                            <button
                              key={chip.id}
                              type="button"
                              className="demo-choice-btn"
                              aria-pressed={modelCapabilityFilter === chip.id}
                              onClick={() => setModelCapabilityFilter(chip.id)}
                            >
                              {isZh ? chip.zh : chip.en}
                            </button>
                          ))}
                        </div>
                      </div>

                      <p className="demo-models-count">
                        {isZh
                          ? `${filteredModels.length} 个模型`
                          : `${filteredModels.length} ${filteredModels.length === 1 ? "model" : "models"}`}
                      </p>

                      {filteredModels.length > 0 ? (
                        <div className="demo-models-grid">
                          {filteredModels.map((model) => (
                            <article key={model.id} className="demo-model-card">
                              <div className="demo-model-card-head">
                                <span
                                  className={`demo-model-logo is-${model.providerTone}`}
                                  aria-hidden="true"
                                >
                                  {model.providerBadge}
                                </span>
                                <div className="demo-model-identity">
                                  <div className="demo-model-title-row">
                                    <strong>{model.title}</strong>
                                    {model.free && (
                                      <span className="demo-model-tag is-free">
                                        {t("Free", "免费")}
                                      </span>
                                    )}
                                  </div>
                                  <div className="demo-model-tags">
                                    {model.tags.map((tag) => (
                                      <span
                                        key={tag.en}
                                        className="demo-model-tag"
                                      >
                                        {isZh ? tag.zh : tag.en}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <p className="demo-model-desc">
                                {isZh ? model.descriptionZh : model.description}
                              </p>

                              <div className="demo-model-foot">
                                <div className="demo-model-rates">
                                  {(isZh ? model.ratesZh : model.rates).map(
                                    (rate) => (
                                      <span key={rate}>{rate}</span>
                                    ),
                                  )}
                                  <span>
                                    {isZh ? model.contextZh : model.context}
                                  </span>
                                </div>
                                <div className="demo-model-meta">
                                  <code title={model.id}>{model.id}</code>
                                  <button
                                    type="button"
                                    className="demo-try-btn"
                                    onClick={() => handleTryModel(model)}
                                  >
                                    <span>{t("Try", "试用")}</span>
                                  </button>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      ) : (
                        <div className="demo-empty-state">
                          <strong>
                            {t("No matching models", "没有符合筛选条件的模型")}
                          </strong>
                          <p>
                            {t(
                              "Clear the search query or capability filter to inspect all workspace models.",
                              "清除搜索词或能力筛选条件以查看全部工作空间模型。",
                            )}
                          </p>
                          <button
                            type="button"
                            className="demo-outline-btn"
                            onClick={() => {
                              setModelSearch("");
                              setModelCapabilityFilter("all");
                            }}
                          >
                            {t("Reset filters", "重置筛选")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeSection === "models" && modelsSubTab === "routing" && (
                    <div className="demo-page-surface">
                      <div className="demo-table-scroll">
                        <table
                          className="comparison-matrix demo-data-table"
                          aria-label={t("Routing policies", "模型路由策略")}
                        >
                          <thead>
                            <tr>
                              <th>{t("Name", "策略名称")}</th>
                              <th>{t("Model ID", "模型 ID")}</th>
                              <th>{t("State", "状态")}</th>
                              <th>{t("Candidates", "候选模型")}</th>
                              <th className="is-right">
                                {t("Revision", "版本")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {demoRoutingPolicies.map((policy) => {
                              const selected =
                                policy.slug === selectedPolicy.slug;
                              return (
                                <tr
                                  key={policy.slug}
                                  className={`demo-clickable-row${selected ? " matrix-selected" : ""}`}
                                  onClick={() =>
                                    setSelectedPolicySlug(policy.slug)
                                  }
                                >
                                  <td>
                                    <strong>
                                      {isZh ? policy.nameZh : policy.name}
                                    </strong>
                                  </td>
                                  <td className="demo-mono-cell">
                                    pool/{policy.slug}
                                  </td>
                                  <td>
                                    <span className="demo-status-pill is-completed">
                                      <i className="demo-status-dot" />
                                      {t("Enabled", "已启用")}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="demo-candidate-pills">
                                      {policy.candidates.map((cand) => (
                                        <span
                                          key={cand.alias}
                                          className="demo-candidate-pill"
                                        >
                                          {cand.title}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="is-right">
                                    v{policy.revision}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="demo-policy-detail">
                        <div className="demo-policy-detail-head">
                          <div>
                            <span className="demo-drawer-eyebrow">
                              pool/{selectedPolicy.slug} ·{" "}
                              {t(
                                `Revision ${selectedPolicy.revision}`,
                                `版本 ${selectedPolicy.revision}`,
                              )}
                            </span>
                            <h3>
                              {isZh
                                ? selectedPolicy.nameZh
                                : selectedPolicy.name}
                            </h3>
                            <p>
                              {isZh
                                ? selectedPolicy.ruleZh
                                : selectedPolicy.rule}
                            </p>
                          </div>
                          <span className="demo-dryrun-badge">
                            <IconCheck size={13} aria-hidden="true" />
                            <span>
                              {t(
                                "preview_pool passed",
                                "preview_pool 预演通过",
                              )}
                            </span>
                          </span>
                        </div>

                        <div className="demo-pool-candidates-grid">
                          {selectedPolicy.candidates.map((cand) => (
                            <div
                              key={cand.alias}
                              className={`demo-candidate-card${cand.primary ? " is-primary-tier" : ""}`}
                            >
                              <div className="demo-candidate-card-top">
                                <strong>{cand.title}</strong>
                                <span className="demo-outline-badge">
                                  {isZh ? cand.tierZh : cand.tier}
                                </span>
                              </div>
                              <code className="demo-candidate-id">
                                {cand.alias}
                              </code>
                              <div className="demo-candidate-meta">
                                <span>
                                  {t("Weight", "权重")} {cand.weight}
                                </span>
                                <strong>{cand.price}</strong>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="demo-drawer-code">
                          <code>
                            {isZh
                              ? selectedPolicy.dryRunZh
                              : selectedPolicy.dryRun}
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "models" &&
                    modelsSubTab === "evaluations" && (
                      <div className="demo-page-surface">
                        <div className="demo-eval-banner">
                          <div>
                            <strong>
                              {t(
                                "Fingerprinted sample set · repo-refactor-20",
                                "带指纹任务样本集 · repo-refactor-20",
                              )}
                            </strong>
                            <p>
                              {t(
                                "Recorded by Claude Code via evaluations:write. Interrupted streams keep unknown charges explicitly.",
                                "由 Claude Code 通过 evaluations:write 写入；流中断样本如实保留「费用未知」，不做估算或清零。",
                              )}
                            </p>
                          </div>
                          <code className="demo-outline-badge">
                            sha256:9f3c…81a2
                          </code>
                        </div>

                        <div className="demo-table-scroll">
                          <table
                            className="comparison-matrix demo-data-table"
                            aria-label={t(
                              "Fingerprinted evaluation runs",
                              "样本评测记录",
                            )}
                          >
                            <thead>
                              <tr>
                                <th>{t("Candidate model", "候选模型")}</th>
                                <th>{t("Sample acceptance", "样本通过数")}</th>
                                <th>{t("Median latency", "中位延迟")}</th>
                                <th className="is-right">
                                  {t("Customer charge", "客户费用")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {demoEvaluationRuns.map((run) => (
                                <tr key={run.model}>
                                  <td className="demo-mono-cell">
                                    <strong>{run.model}</strong>
                                  </td>
                                  <td>
                                    <span
                                      className={`demo-status-pill is-${run.tone}`}
                                    >
                                      <i className="demo-status-dot" />
                                      {run.passed}
                                    </span>
                                  </td>
                                  <td>{run.medianLatency}</td>
                                  <td className="is-right">
                                    <strong
                                      className={`demo-charge-text is-${run.tone}`}
                                    >
                                      {isZh ? run.chargeZh : run.charge}
                                    </strong>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                  {/* 2. GENERATIONS STUDIO (GenerationsLayout + GenerationComposer + VideoSessionView) */}
                  {activeSection === "generations" && (
                    <div className="demo-gen-canvas">
                      {genSessionsOpen && (
                        <div className="demo-gen-drawer">
                          <div className="demo-gen-drawer-head">
                            <strong>{t("Saved sessions", "历史会话")}</strong>
                            <button
                              type="button"
                              className="demo-outline-btn"
                              onClick={() => {
                                setActiveChatPresetIndex(
                                  (i) => (i + 1) % demoChatPresets.length,
                                );
                                setGenSessionsOpen(false);
                              }}
                            >
                              <IconPlus size={13} aria-hidden="true" />
                              <span>{t("New generation", "新建生成")}</span>
                            </button>
                          </div>
                          <div className="demo-gen-drawer-list">
                            <button
                              type="button"
                              className={`demo-session-chip${activeGenerationsMode === "chat" ? " is-active" : ""}`}
                              onClick={() => {
                                setActiveGenerationsMode("chat");
                                setGenSessionsOpen(false);
                              }}
                            >
                              <IconMessageChatbot size={14} />
                              <span>
                                {t(
                                  "Failover & routing audit · 2m ago",
                                  "故障切换与路由核查 · 2 分钟前",
                                )}
                              </span>
                            </button>
                            <button
                              type="button"
                              className={`demo-session-chip${activeGenerationsMode === "video" ? " is-active" : ""}`}
                              onClick={() => {
                                setActiveGenerationsMode("video");
                                setGenSessionsOpen(false);
                              }}
                            >
                              <IconVideo size={14} />
                              <span>
                                {t(
                                  "Harbor dusk tracking shot · 6m ago",
                                  "港口黄昏航拍镜头 · 6 分钟前",
                                )}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      {genAssetsOpen && (
                        <div className="demo-gen-drawer">
                          <div className="demo-gen-drawer-head">
                            <strong>
                              {t(
                                "Workspace assets · 2 verified references",
                                "工作空间素材库 · 2 个已核验参考素材",
                              )}
                            </strong>
                            <span className="demo-outline-badge">
                              {t("Ready for video", "可用于视频参考")}
                            </span>
                          </div>
                          <div className="demo-gen-drawer-list">
                            <span className="demo-asset-pill">
                              harbor-first-frame-1080p.png · 1920×1080
                            </span>
                            <span className="demo-asset-pill">
                              crane-lighting-ref.webp · 1920×1080
                            </span>
                          </div>
                        </div>
                      )}

                      {activeGenerationsMode === "chat" ? (
                        <div className="demo-gen-chat-stage">
                          <div className="demo-gen-preset-row">
                            {demoChatPresets.map((preset, idx) => (
                              <button
                                key={preset.prompt}
                                type="button"
                                className="demo-choice-btn"
                                aria-pressed={activeChatPresetIndex === idx}
                                onClick={() => setActiveChatPresetIndex(idx)}
                              >
                                {idx === 0
                                  ? t(
                                      "Sample 1: Failover & billing",
                                      "示例 1：故障切换与计费",
                                    )
                                  : t(
                                      "Sample 2: Routing dry-run",
                                      "示例 2：路由变更预演",
                                    )}
                              </button>
                            ))}
                          </div>

                          <div className="demo-chat-thread">
                            <div className="demo-user-bubble">
                              {isZh
                                ? activeChatPreset.promptZh
                                : activeChatPreset.prompt}
                            </div>

                            <div className="demo-assistant-turn">
                              <div className="demo-assistant-head">
                                <span className="demo-outline-badge">
                                  {selectedChatModel}
                                </span>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  {t("Settled", "已结算")}
                                </span>
                              </div>
                              <p className="demo-assistant-text">
                                {isZh ? activeChatReply.zh : activeChatReply.en}
                              </p>
                              <div className="demo-assistant-meta">
                                <span>
                                  {isZh
                                    ? activeChatReply.metaZh
                                    : activeChatReply.meta}
                                </span>
                                <button
                                  type="button"
                                  className="demo-inline-link"
                                  onClick={() => {
                                    openSection("logs");
                                    setSelectedLogIndex(0);
                                  }}
                                >
                                  {t("Inspect in Logs →", "在请求日志中查看 →")}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Authentic GenerationComposer.tsx surface */}
                          <form
                            className="demo-composer"
                            onSubmit={(e) => {
                              e.preventDefault();
                              setActiveChatPresetIndex(
                                (i) => (i + 1) % demoChatPresets.length,
                              );
                              setComposerDraft("");
                            }}
                          >
                            <textarea
                              rows={2}
                              value={composerDraft}
                              onChange={(e) => setComposerDraft(e.target.value)}
                              placeholder={t(
                                "Send a message to test this model...",
                                "输入消息试用当前模型，按右侧按钮切换示例回合…",
                              )}
                              aria-label={t("Message prompt", "对话输入")}
                              className="demo-composer-input"
                            />
                            <div className="demo-composer-bar">
                              <div className="demo-composer-leading">
                                <span className="demo-composer-chip">
                                  <IconPaperclip size={13} aria-hidden="true" />
                                  <span>{t("Attach", "附件")}</span>
                                </span>
                                {(
                                  [
                                    {
                                      id: "anthropic/claude-sonnet-4-5",
                                      label: "Claude Sonnet 4.5",
                                    },
                                    {
                                      id: "qiniu/deepseek-v4.1-flash",
                                      label: "DeepSeek-V4.1-Flash",
                                    },
                                    { id: "openai/gpt-5", label: "GPT-5" },
                                  ] as const
                                ).map((m) => (
                                  <button
                                    key={m.id}
                                    type="button"
                                    className="demo-choice-btn"
                                    aria-pressed={selectedChatModel === m.id}
                                    onClick={() => setSelectedChatModel(m.id)}
                                  >
                                    {m.label}
                                  </button>
                                ))}
                              </div>
                              <button
                                type="submit"
                                className="demo-composer-submit"
                                aria-label={t("Send prompt", "发送消息")}
                              >
                                <IconArrowUp size={16} aria-hidden="true" />
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <div className="demo-gen-video-stage">
                          <div className="demo-video-studio-grid">
                            <div className="demo-video-preview-canvas">
                              <div className="demo-video-badge-row">
                                <span className="demo-video-pill">
                                  qiniu/seedance-1-5-pro
                                </span>
                                <span className="demo-video-pill">
                                  1080p · 16:9 · 5s · 24 fps
                                </span>
                                <span className="demo-video-pill">
                                  {t("Audio generated", "已生成伴音")}
                                </span>
                              </div>
                              <div className="demo-video-play-center">
                                <IconVideo size={20} aria-hidden="true" />
                                <span>
                                  {t(
                                    "MP4 artifact saved · 1920×1080 · 42.0s",
                                    "MP4 结果已保存 · 1920×1080 · 耗时 42.0 秒",
                                  )}
                                </span>
                              </div>
                              <div className="demo-video-prompt-overlay">
                                <small>
                                  {t(
                                    "SAVED VIDEO INSTRUCTION",
                                    "已保存视频生成指令",
                                  )}
                                </small>
                                <p>
                                  {t(
                                    "“Aerial dusk tracking shot over an illuminated container port, wet asphalt reflections, coastal fog, smooth gimbal motion.”",
                                    "“黄昏时分灯火通明的集装箱港口航拍跟拍镜头，湿润路面电影感倒影，海岸薄雾，平滑云台运镜。”",
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="demo-timing-card">
                              <div className="demo-timing-header">
                                <strong>
                                  {t(
                                    "Task & billing summary",
                                    "任务与计费摘要",
                                  )}
                                </strong>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  {t("Succeeded", "已成功")}
                                </span>
                              </div>
                              <dl className="demo-drawer-dl">
                                <div>
                                  <dt>
                                    {t("First-frame asset", "首帧参考素材")}
                                  </dt>
                                  <dd>harbor-first-frame-1080p.png</dd>
                                </div>
                                <div>
                                  <dt>
                                    {t("Pre-submit estimate", "提交前预估")}
                                  </dt>
                                  <dd>$0.2400</dd>
                                </div>
                                <div>
                                  <dt>
                                    {t("Settled charge", "已结算客户费用")}
                                  </dt>
                                  <dd>
                                    <strong>$0.2400</strong>
                                  </dd>
                                </div>
                                <div>
                                  <dt>{t("Workspace key", "工作空间密钥")}</dt>
                                  <dd className="demo-mono-cell">Playground</dd>
                                </div>
                              </dl>
                            </div>
                          </div>

                          <div className="demo-composer">
                            <div className="demo-composer-static">
                              {t(
                                "Describe subject, motion, lighting, or attach a workspace reference frame…",
                                "描述画面主体、动作与运镜，或从工作空间素材库绑定首尾帧参考图…",
                              )}
                            </div>
                            <div className="demo-composer-bar">
                              <div className="demo-composer-leading">
                                <span className="demo-composer-chip">
                                  <IconPhoto size={13} aria-hidden="true" />
                                  <span>{t("First frame", "首帧参考")}</span>
                                </span>
                                <span className="demo-composer-chip">
                                  Seedance 1.5 Pro
                                </span>
                                <span className="demo-composer-chip">16:9</span>
                                <span className="demo-composer-chip">
                                  1080p
                                </span>
                                <span className="demo-composer-chip">5s</span>
                              </div>
                              <div className="demo-composer-trailing">
                                <span className="demo-estimate-pill">
                                  {t("Est. $0.2400", "预估 $0.2400")}
                                </span>
                                <button
                                  type="button"
                                  className="demo-composer-submit"
                                  aria-label={t(
                                    "Switch to Chat mode",
                                    "切换至对话模式",
                                  )}
                                  onClick={() =>
                                    setActiveGenerationsMode("chat")
                                  }
                                >
                                  <IconArrowUp size={16} aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. LOGS & REQUEST DETAILS (GatewayActivity + RequestTiming) */}
                  {activeSection === "logs" && (
                    <div className="demo-page-surface">
                      {showVolumeChart && (
                        <div
                          className="demo-volume-strip"
                          aria-label={t(
                            "Request volume over last 24 hours",
                            "过去 24 小时请求量趋势",
                          )}
                        >
                          <div className="demo-volume-header">
                            <span>
                              {t(
                                "Request volume · Last 24 hours",
                                "请求量趋势 · 过去 24 小时",
                              )}
                            </span>
                            <span>
                              {t(
                                "1 failover recovered · 1 unresolved stream · 1 guardrail block",
                                "1 次故障自动切换 · 1 条流中断待核对 · 1 次护栏拦截",
                              )}
                            </span>
                          </div>
                          <div className="demo-volume-bars">
                            {volumeHistogramBars.map((val, idx) => (
                              <span
                                key={idx}
                                className={`demo-vol-bar${idx === 21 ? " has-warn" : ""}`}
                                style={{ height: `${val}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="demo-logs-split">
                        <div className="demo-logs-table-pane">
                          <div className="demo-table-scroll">
                            <table
                              className="comparison-matrix demo-data-table"
                              aria-label={t(
                                "Workspace request logs",
                                "工作空间请求日志",
                              )}
                            >
                              <thead>
                                <tr>
                                  <th>{t("Model & time", "模型与时间")}</th>
                                  <th>{t("Status", "状态")}</th>
                                  <th className="is-right">
                                    {t("Charge & latency", "客户费用与延迟")}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {demoLogRecords.map((row, idx) => {
                                  const isSelected = idx === selectedLogIndex;
                                  return (
                                    <tr
                                      key={`${row.time}-${row.model}`}
                                      className={`demo-clickable-row${isSelected ? " matrix-selected" : ""}`}
                                      onClick={() => setSelectedLogIndex(idx)}
                                    >
                                      <td>
                                        <div className="demo-model-cell">
                                          <span className="demo-provider-avatar">
                                            {row.providerBadge}
                                          </span>
                                          <div>
                                            <strong>{row.model}</strong>
                                            <small>
                                              {isZh ? row.timeZh : row.time} ·{" "}
                                              {row.providerSub}
                                            </small>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <span
                                          className={`demo-status-pill is-${row.statusTone}`}
                                        >
                                          <i className="demo-status-dot" />
                                          {isZh ? row.statusZh : row.status}
                                        </span>
                                      </td>
                                      <td className="is-right">
                                        <strong
                                          className={`demo-charge-text is-${row.statusTone}`}
                                        >
                                          {isZh ? row.chargeZh : row.charge}
                                        </strong>
                                        <small>{row.duration}</small>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <aside
                          className="demo-request-drawer"
                          aria-label={t("Request details", "请求详情")}
                        >
                          <div className="demo-drawer-header">
                            <div>
                              <span className="demo-drawer-eyebrow">
                                {t("Request details", "请求详情")} ·{" "}
                                {isZh ? selectedLog.timeZh : selectedLog.time}
                              </span>
                              <h3>{selectedLog.model}</h3>
                            </div>
                            <span
                              className={`demo-status-pill is-${selectedLog.statusTone}`}
                            >
                              <i className="demo-status-dot" />
                              {isZh ? selectedLog.statusZh : selectedLog.status}
                            </span>
                          </div>

                          <div className="demo-drawer-metrics">
                            <div>
                              <span>{t("Gateway latency", "网关延迟")}</span>
                              <strong>{selectedLog.duration}</strong>
                            </div>
                            <div>
                              <span>{t("Customer charge", "客户费用")}</span>
                              <strong>
                                {isZh
                                  ? selectedLog.chargeZh
                                  : selectedLog.charge}
                              </strong>
                            </div>
                            <div>
                              <span>{t("Input Token", "输入 Token")}</span>
                              <strong>
                                {selectedLog.inputTokens}{" "}
                                <small>
                                  {t("Cached", "缓存")}{" "}
                                  {selectedLog.cachedTokens}
                                </small>
                              </strong>
                            </div>
                            <div>
                              <span>{t("Output Token", "输出 Token")}</span>
                              <strong>
                                {selectedLog.outputTokens}{" "}
                                <small>
                                  {t("Reason", "推理")}{" "}
                                  {selectedLog.reasoningTokens}
                                </small>
                              </strong>
                            </div>
                          </div>

                          <div className="demo-timing-card">
                            <div className="demo-timing-header">
                              <strong>
                                {t("Request timing", "请求耗时分解")}
                              </strong>
                              <span>
                                {isZh
                                  ? selectedLog.throughputZh
                                  : selectedLog.throughput}
                              </span>
                            </div>
                            <div className="demo-timing-rows">
                              {selectedLog.phases.map((phase) => (
                                <div
                                  key={phase.label}
                                  className="demo-timing-row"
                                >
                                  <div className="demo-timing-label">
                                    <span>
                                      {isZh ? phase.labelZh : phase.label}
                                    </span>
                                    <strong>{phase.duration}</strong>
                                  </div>
                                  <div className="demo-timing-track">
                                    <span
                                      className={`demo-timing-bar is-${phase.tone}`}
                                      style={{ width: `${phase.pct}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <dl className="demo-drawer-dl">
                            <div>
                              <dt>{t("Delivery & billing", "交付与计费")}</dt>
                              <dd>
                                {isZh
                                  ? selectedLog.deliveryStatusZh
                                  : selectedLog.deliveryStatus}
                              </dd>
                            </div>
                          </dl>

                          <div className="demo-drawer-code">
                            <code>
                              {isZh
                                ? selectedLog.rawPreviewZh
                                : selectedLog.rawPreview}
                            </code>
                          </div>
                        </aside>
                      </div>
                    </div>
                  )}

                  {/* 4. OVERVIEW (overview/page.tsx) */}
                  {activeSection === "overview" && (
                    <div className="demo-page-surface">
                      <div className="demo-overview-cards">
                        <button
                          type="button"
                          className="demo-overview-stat"
                          onClick={() => {
                            openSection("models");
                            setModelsSubTab("models");
                          }}
                        >
                          <div>
                            <span>{t("Available models", "可用模型")}</span>
                            <strong>4</strong>
                          </div>
                          <small>{t("Browse →", "查看 →")}</small>
                        </button>
                        <button
                          type="button"
                          className="demo-overview-stat"
                          onClick={() => openSection("keys")}
                        >
                          <div>
                            <span>{t("Active API keys", "有效 API 密钥")}</span>
                            <strong>3</strong>
                          </div>
                          <small>{t("Manage →", "管理 →")}</small>
                        </button>
                        <button
                          type="button"
                          className="demo-overview-stat"
                          onClick={() => {
                            openSection("usage");
                            setUsageSubTab("spending");
                          }}
                        >
                          <div>
                            <span>{t("Credits & billing", "额度与账单")}</span>
                            <strong>$181.58</strong>
                          </div>
                          <small>{t("Open →", "查看 →")}</small>
                        </button>
                      </div>

                      <div className="demo-eval-banner">
                        <div>
                          <strong>
                            {t(
                              "Connected coding agent · claude-code-device",
                              "已连接编码智能体 · claude-code-device",
                            )}
                          </strong>
                          <p>
                            {t(
                              "Approved via /connect with pools:write and evaluations:write. Direct model invocation remains off unless explicitly enabled.",
                              "已通过 /connect 浏览器审批授予 pools:write 与 evaluations:write；命名模型调用保持默认关闭。",
                            )}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="demo-outline-btn"
                          onClick={() => {
                            openSection("models");
                            setModelsSubTab("routing");
                          }}
                        >
                          {t("Review routing", "审阅路由")}
                        </button>
                      </div>

                      <div className="demo-table-scroll">
                        <table
                          className="comparison-matrix demo-data-table"
                          aria-label={t("Recent requests", "最近请求")}
                        >
                          <thead>
                            <tr>
                              <th>{t("Recent request", "最近请求")}</th>
                              <th>{t("Status", "状态")}</th>
                              <th className="is-right">
                                {t("Customer charge", "客户费用")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {demoLogRecords.slice(0, 3).map((row, idx) => (
                              <tr
                                key={row.time}
                                className="demo-clickable-row"
                                onClick={() => {
                                  openSection("logs");
                                  setSelectedLogIndex(idx);
                                }}
                              >
                                <td>
                                  <strong>{row.model}</strong>{" "}
                                  <small>· {row.providerSub}</small>
                                </td>
                                <td>
                                  <span
                                    className={`demo-status-pill is-${row.statusTone}`}
                                  >
                                    <i className="demo-status-dot" />
                                    {isZh ? row.statusZh : row.status}
                                  </span>
                                </td>
                                <td className="is-right">
                                  <strong>
                                    {isZh ? row.chargeZh : row.charge}
                                  </strong>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 5. KEYS (/workspaces/:workspace/keys) */}
                  {activeSection === "keys" && (
                    <div className="demo-page-surface">
                      <div className="demo-table-scroll">
                        <table
                          className="comparison-matrix demo-data-table"
                          aria-label={t("Workspace keys", "工作空间密钥")}
                        >
                          <thead>
                            <tr>
                              <th>{t("Key & origin", "密钥与来源")}</th>
                              <th>
                                {t(
                                  "Authorized scope & models",
                                  "授权边界与模型范围",
                                )}
                              </th>
                              <th className="is-right">
                                {t("Cap / expiry", "限额与有效期")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {demoWorkspaceKeys.map((item) => (
                              <tr key={item.name}>
                                <td>
                                  <strong>{item.name}</strong>
                                  <small>
                                    {isZh ? item.sourceZh : item.source}
                                  </small>
                                </td>
                                <td>
                                  {isZh ? item.invocationZh : item.invocation}
                                </td>
                                <td className="is-right">
                                  <strong>
                                    {isZh ? item.budgetZh : item.budget}
                                  </strong>
                                  <small>
                                    {isZh ? item.statusZh : item.status}
                                  </small>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 6. USAGE | SPENDING | STATEMENTS | RATES */}
                  {activeSection === "usage" && (
                    <div className="demo-page-surface">
                      <div className="demo-overview-cards">
                        <div className="demo-overview-stat is-static">
                          <div>
                            <span>
                              {t("Settled spend (30d)", "近 30 日已结算支出")}
                            </span>
                            <strong>$18.42</strong>
                          </div>
                          <small>{t("1,428 requests", "1,428 条请求")}</small>
                        </div>
                        <div className="demo-overview-stat is-static">
                          <div>
                            <span>
                              {t("Available credits", "工作空间可用余额")}
                            </span>
                            <strong>$181.58</strong>
                          </div>
                          <small>
                            {t("Cap: $200.00 / mo", "月度上限 $200.00")}
                          </small>
                        </div>
                        <div className="demo-overview-stat is-static">
                          <div>
                            <span>
                              {t("Unresolved streams", "待核对流中断请求")}
                            </span>
                            <strong>1</strong>
                          </div>
                          <small>
                            {t("Held out of totals", "未计入已结算总额")}
                          </small>
                        </div>
                      </div>

                      <div className="demo-table-scroll">
                        <table
                          className="comparison-matrix demo-data-table"
                          aria-label={t(
                            "Usage and tariff breakdown",
                            "用量与费率明细",
                          )}
                        >
                          <thead>
                            <tr>
                              <th>{t("Model", "模型")}</th>
                              <th>
                                {usageSubTab === "rates"
                                  ? t(
                                      "Published customer rate",
                                      "已发布客户费率",
                                    )
                                  : t("Settled usage", "已结算用量")}
                              </th>
                              <th className="is-right">
                                {usageSubTab === "rates"
                                  ? t("Context", "上下文")
                                  : t("Customer charge", "客户费用")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="demo-mono-cell">
                                anthropic/claude-sonnet-4-5
                              </td>
                              <td>
                                {usageSubTab === "rates"
                                  ? t(
                                      "$3.00 / $15.00 per M tokens",
                                      "$3.00 / $15.00 每百万 Token",
                                    )
                                  : "2.14M input · 0.38M output Token"}
                              </td>
                              <td className="is-right">
                                <strong>
                                  {usageSubTab === "rates" ? "200K" : "$12.12"}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="demo-mono-cell">openai/gpt-5</td>
                              <td>
                                {usageSubTab === "rates"
                                  ? t(
                                      "$1.25 / $10.00 per M tokens",
                                      "$1.25 / $10.00 每百万 Token",
                                    )
                                  : "1.92M input · 0.34M output Token"}
                              </td>
                              <td className="is-right">
                                <strong>
                                  {usageSubTab === "rates" ? "400K" : "$5.82"}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="demo-mono-cell">
                                qiniu/seedance-1-5-pro
                              </td>
                              <td>
                                {usageSubTab === "rates"
                                  ? t(
                                      "Estimated per video spec",
                                      "按视频规格估算计费",
                                    )
                                  : t(
                                      "2 rendered 1080p videos",
                                      "2 条 1080p 视频任务",
                                    )}
                              </td>
                              <td className="is-right">
                                <strong>
                                  {usageSubTab === "rates" ? "1080p" : "$0.48"}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 7. WORKSPACE SETTINGS: GENERAL | GUARDRAILS | EVENTS */}
                  {activeSection === "settings" && (
                    <div className="demo-page-surface">
                      {settingsSubTab === "events" ? (
                        <div className="demo-table-scroll">
                          <table
                            className="comparison-matrix demo-data-table"
                            aria-label={t(
                              "Signed event subscriptions",
                              "签名事件订阅",
                            )}
                          >
                            <thead>
                              <tr>
                                <th>{t("Endpoint", "接收端点")}</th>
                                <th>{t("Subscribed events", "订阅事件")}</th>
                                <th className="is-right">
                                  {t("Last delivery", "最近投递")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="demo-mono-cell">
                                  https://ci.example.com/hooks/niu
                                </td>
                                <td>
                                  <code>pool.changed</code>,{" "}
                                  <code>evaluation.recorded</code>
                                </td>
                                <td className="is-right">
                                  <span className="demo-status-pill is-completed">
                                    <i className="demo-status-dot" />
                                    HTTP 200 · HMAC-SHA256
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : settingsSubTab === "general" ? (
                        <div className="demo-timing-card">
                          <dl className="demo-drawer-dl">
                            <div>
                              <dt>{t("Workspace name", "工作空间名称")}</dt>
                              <dd>Default</dd>
                            </div>
                            <div>
                              <dt>{t("Workspace slug", "工作空间标识")}</dt>
                              <dd className="demo-mono-cell">default</dd>
                            </div>
                            <div>
                              <dt>
                                {t(
                                  "Default agent invocation",
                                  "智能体默认模型调用",
                                )}
                              </dt>
                              <dd>
                                {t(
                                  "Off unless approved on /connect",
                                  "默认关闭（需在 /connect 显式开启）",
                                )}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      ) : (
                        <div className="demo-table-scroll">
                          <table
                            className="comparison-matrix demo-data-table"
                            aria-label={t(
                              "Workspace guardrails",
                              "安全护栏规则",
                            )}
                          >
                            <thead>
                              <tr>
                                <th>{t("Guardrail rule", "护栏规则")}</th>
                                <th>{t("Stage & action", "阶段与动作")}</th>
                                <th className="is-right">
                                  {t("Revision", "版本")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>secret-credential-pattern</strong>
                                  <small>
                                    {t(
                                      "Blocks PEM private keys & bearer tokens before upstream dispatch",
                                      "转发前拦截提示词中的私钥与凭据片段，立即释放预留额度",
                                    )}
                                  </small>
                                </td>
                                <td>
                                  <span className="demo-status-pill is-completed">
                                    <i className="demo-status-dot" />
                                    {t(
                                      "Pre-dispatch · Deny",
                                      "请求转发前 · 拒绝",
                                    )}
                                  </span>
                                </td>
                                <td className="is-right">v3</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>pii-email-redaction</strong>
                                  <small>
                                    {t(
                                      "Masks customer email addresses in non-exempt support keys",
                                      "对客服密钥自动脱敏客户邮箱字段",
                                    )}
                                  </small>
                                </td>
                                <td>
                                  <span className="demo-status-pill is-completed">
                                    <i className="demo-status-dot" />
                                    {t("Input · Redact", "输入检查 · 脱敏")}
                                  </span>
                                </td>
                                <td className="is-right">v3</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="preview-caption">
                  <span>
                    {t(
                      "Illustrative workspace data · Explore models, routing, generations and logs in Niu",
                      "工作空间示例数据 · 在 Niu 牛元中体验模型目录、路由策略、多模态生成与请求诊断",
                    )}
                  </span>
                  <Button asChild size="sm" className="cta-primary cta-compact">
                    <a href={links.dashboard}>
                      {t("Open workspace dashboard", "进入工作空间控制台")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT YOUR AGENT CAN DO WITH NIU */}
      <section
        className="section container"
        id="product"
        aria-labelledby="product-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">{t("CAPABILITIES", "核心能力")}</p>
            <h2 id="product-title">
              {isZh ? (
                <>
                  模型管理的完整闭环，
                  <br />
                  由你的智能体直接操作。
                </>
              ) : (
                <>
                  The full model workflow,
                  <br />
                  operated by your agent.
                </>
              )}
            </h2>
          </div>
          <p>
            {t(
              "Niu supplies the evidence and authorized controls. Your agent makes the model and cost decisions; you review what matters.",
              "Niu 牛元提供可信证据与授权能力，模型与成本取舍由智能体决定，重要变更由你审核。",
            )}
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const CapabilityIcon = capabilityIcons[index] ?? IconSparkles;
            return (
              <article
                key={item.href}
                className="capability"
                data-reveal
                style={stagger(index % 3)}
              >
                <div className="capability-top">
                  <span className="capability-icon" aria-hidden="true">
                    <CapabilityIcon size={20} stroke={1.75} />
                  </span>
                </div>
                <h3>{isZh ? item.titleZh : item.title}</h3>
                <p>{isZh ? item.descriptionZh : item.description}</p>
                <a className="text-link" href={item.href}>
                  {t("Learn more", "了解更多")}{" "}
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section
        className="gateway-section"
        id="workflow"
        aria-labelledby="workflow-title"
      >
        <div className="container section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">{t("HOW IT WORKS", "使用流程")}</p>
              <h2 id="workflow-title">
                {isZh ? (
                  <>
                    三步开始，
                    <br />
                    接入工作交给智能体。
                  </>
                ) : (
                  <>
                    Three steps.
                    <br />
                    Your agent does the setup.
                  </>
                )}
              </h2>
            </div>
            <p>
              {t(
                "Works with Claude Code, Codex, Cursor, OpenCode, DeepSeek Harness and MCP clients—without changing the agent's own host model.",
                "支持 Claude Code、Codex、Cursor、OpenCode、DeepSeek Harness 及 MCP 客户端，且不改动智能体自身的宿主模型。",
              )}
            </p>
          </div>
          <ol className="landing-steps">
            {workflowSteps.map((item, index) => (
              <li key={item.step} data-reveal style={stagger(index)}>
                <span className="landing-step-number">{item.step}</span>
                <h3>{isZh ? item.titleZh : item.title}</h3>
                <p>{isZh ? item.detailZh : item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. NATIVE PROTOCOLS, ONE KEY */}
      <section
        className="section container protocols-section"
        id="protocols"
        aria-labelledby="protocols-title"
      >
        <div className="gateway-grid">
          <div className="gateway-copy" data-reveal>
            <p className="eyebrow">{t("NATIVE PROTOCOLS", "原生协议")}</p>
            <h2 id="protocols-title">
              {isZh ? (
                <>
                  沿用 SDK 原生协议，
                  <br />
                  一把牛元密钥统一管理。
                </>
              ) : (
                <>
                  Keep your SDK&apos;s protocol.
                  <br />
                  Use one Niu key.
                </>
              )}
            </h2>
            <p className="section-description">
              {t(
                "Send requests in their native format—no payload translation. Workspace keys control which models and protocols each caller may use.",
                "按原生格式发送请求，无需转换请求体。工作空间密钥决定每个调用方可使用的模型与协议。",
              )}
            </p>
            <ul className="landing-protocol-list">
              {protocolNames.map((name) => (
                <li key={name.en}>
                  <IconCheck size={16} aria-hidden="true" />
                  {isZh ? name.zh : name.en}
                </li>
              ))}
            </ul>
            <div className="gateway-links">
              <a className="text-link" href="/docs/agents/inference/">
                {t("Inference contract", "推理协议契约")}{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <Tabs
            className="code-card"
            data-reveal
            style={stagger(1)}
            value={activeProtocol.id}
            onValueChange={(value) => {
              const idx = protocolExamples.findIndex(
                (item) => item.id === value,
              );
              setActiveProtocolIndex(idx >= 0 ? idx : 0);
              setCopiedProtocol(false);
            }}
          >
            <div className="code-heading">
              <TabsList
                className="code-tabs"
                variant="line"
                aria-label={t("Inference protocol examples", "推理协议示例")}
              >
                {protocolExamples.map((example) => (
                  <TabsTrigger key={example.id} value={example.id}>
                    {isZh ? example.labelZh : example.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button
                variant="ghost"
                type="button"
                className="code-copy-btn"
                onClick={handleCopyProtocol}
                aria-label={t("Copy curl example", "复制 curl 示例")}
              >
                {copiedProtocol ? (
                  <IconCheck size={14} aria-hidden="true" />
                ) : (
                  <IconCopy size={14} aria-hidden="true" />
                )}
                <span>
                  {copiedProtocol ? t("Copied", "已复制") : t("Copy", "复制")}
                </span>
              </Button>
            </div>
            <div className="code-subbar">
              <span>
                {isZh ? activeProtocol.endpointZh : activeProtocol.endpoint}
              </span>
            </div>
            {protocolExamples.map((example, idx) => (
              <TabsContent
                key={example.id}
                value={example.id}
                className="highlighted-example"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlightedProtocols[idx] ?? "",
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* 5. FOUNDATION: OPEN SOURCE, OPERATING MODES, PERFORMANCE */}
      <section
        className="section container"
        id="foundation"
        aria-labelledby="foundation-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">{t("FOUNDATION", "技术底座")}</p>
            <h2 id="foundation-title">
              {isZh ? (
                <>
                  开源、可自托管，
                  <br />
                  轻量的 Rust 网关。
                </>
              ) : (
                <>
                  Open source, self-hosted,
                  <br />
                  and built on a lean Rust gateway.
                </>
              )}
            </h2>
          </div>
          <p>
            {t(
              "Run Niu as a single container with PostgreSQL. Inference still reaches the upstream Providers you configure.",
              "单容器加 PostgreSQL 即可运行牛元，推理请求仍发往你配置的上游供应商。",
            )}
          </p>
        </div>
        <div className="landing-facts">
          {foundationFacts.map((fact, index) => (
            <article key={fact.title} data-reveal style={stagger(index)}>
              <p className="landing-fact-value">
                {isZh ? fact.valueZh : fact.value}
              </p>
              <h3>{isZh ? fact.titleZh : fact.title}</h3>
              <p>{isZh ? fact.detailZh : fact.detail}</p>
              <a className="text-link" href={fact.href}>
                {isZh ? fact.linkZh : fact.link}{" "}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
        <p className="landing-release-note" data-reveal>
          {t(
            "For the current status of native host packages,",
            "了解各宿主接入包的发布状态，",
          )}{" "}
          <a href={links.release}>
            {t("see the acceptance matrix", "查看发布准入矩阵")}
          </a>
          {t(".", "。")}
        </p>
      </section>

      {/* 6. CLOSING CTA */}
      <section
        className="closing-stage container"
        aria-labelledby="closing-title"
      >
        <div className="closing" data-reveal>
          <span className="closing-glow" aria-hidden="true" />
          <h2 id="closing-title">
            {isZh ? (
              <>
                把下一个任务，
                <br />
                <span className="accent">交给连接了 Niu 牛元的智能体。</span>
              </>
            ) : (
              <>
                Bring your next task.
                <br />
                <span className="accent">Connect your agent to Niu.</span>
              </>
            )}
          </h2>
          <div className="actions hero-actions">
            <Button
              size="lg"
              className="cta-primary"
              onClick={copyInstallationPrompt}
            >
              {copiedInstall ? (
                <IconCheck aria-hidden="true" />
              ) : (
                <IconCopy aria-hidden="true" />
              )}
              <span aria-live="polite">
                {copiedInstall
                  ? t("Copied", "已复制")
                  : t("Copy setup prompt", "复制接入提示词")}
              </span>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-secondary"
            >
              <a href={links.dashboard}>{t("Open dashboard", "打开控制台")}</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="cta-ghost">
              <a href={links.repo}>
                <IconBrandGithub aria-hidden="true" />
                {t("Star on GitHub", "GitHub Star")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
