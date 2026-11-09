import { useEffect, useRef, useState } from "react";
import { CountUp, useLandingMotion } from "./landing-motion";
import { useLocale } from "./locale";
import {
  IconArrowRight,
  IconBook,
  IconBrandGithub,
  IconCheck,
  IconCoins,
  IconCopy,
  IconHistory,
  IconListSearch,
  IconMessageChatbot,
  IconPlugConnected,
  IconRoute,
  IconSearch,
  IconShieldLock,
  IconSparkles,
} from "@tabler/icons-react";
import {
  Activity,
  BarChart3,
  ChevronsUpDown,
  Film,
  FolderKey,
  KeyRound,
  List,
  PanelLeft,
  Plus,
  RefreshCw,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  links,
  capabilities,
  faqs,
  codeExamples,
  heroStats,
} from "../content/landing";

function currentDeploymentOrigin() {
  if (typeof window === "undefined") return "https://niu.io";
  return window.location.origin || "https://niu.io";
}

function buildInstallationPrompt(origin: string) {
  const deployment = origin.replace(/\/$/, "") || "https://niu.io";
  return `Install and configure Niu for ${deployment} by following https://niu.io/docs/install.md. Verify the deployment and workspace during authorization.`;
}

const capabilityIcons = [
  IconRoute,
  IconListSearch,
  IconCoins,
  IconShieldLock,
  IconPlugConnected,
  IconMessageChatbot,
];

interface LandingPost {
  href: string;
  title: string;
  chineseTitle?: string;
  chineseDescription?: string;
  chineseCategory?: string;
  chineseDateLabel?: string;
  chineseReadingTime?: string;
  description: string;
  category: string;
  publishedAt: string;
  dateLabel: string;
  readingTime: string;
  highlights?: string[];
}

const previewTabs = [
  {
    id: "logs",
    label: "Workspace · Logs",
    labelZh: "工作空间 · 请求日志",
    breadcrumb: "Default workspace / Logs",
    breadcrumbZh: "默认工作空间 / 请求日志",
    railArea: "workspace" as const,
  },
  {
    id: "routing",
    label: "Workspace · Routing & Evaluations",
    labelZh: "工作空间 · 路由与评估",
    breadcrumb: "Default workspace / Routing",
    breadcrumbZh: "默认工作空间 / 模型路由",
    railArea: "workspace" as const,
  },
  {
    id: "generations",
    label: "Generations · Chat & Video",
    labelZh: "生成对话 · 对话与视频",
    breadcrumb: "Generations / Chat & Video",
    breadcrumbZh: "生成对话 / 对话与视频",
    railArea: "generations" as const,
  },
];

const demoLogRecords = [
  {
    time: "Oct 19, 14:22:08",
    timeZh: "10月19日 14:22:08",
    model: "claude-sonnet-4",
    providerSub: "Anthropic · claude-sonnet-4-20250514",
    providerBadge: "A",
    status: "Completed",
    statusZh: "已完成",
    statusTone: "completed" as const,
    duration: "1,180 ms",
    durationSub: "Attempt 2 of 2 · failover",
    durationSubZh: "第 2/2 次尝试 · 故障切换",
    inputTokens: "412",
    cachedTokens: "256",
    outputTokens: "128",
    reasoningTokens: "0",
    charge: "$0.0180",
    chargeZh: "$0.0180",
    chargeSub: "Settled tariff",
    chargeSubZh: "已按价目表结算",
    apiKey: "prod-backend",
    finishReason: "stop",
    deliveryStatus: "Completed · Customer tariff settled",
    deliveryStatusZh: "已完成 · 客户费率已结算",
    providerStatus: "HTTP 200 OK",
    providerStatusZh: "HTTP 200 OK",
    throughput: "128 output tokens · 148.8 tok/s",
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
        label: "First output wait",
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
      "POST /v1/chat/completions → policy claude-sonnet-4 (attempt 1 HTTP 401 not charged → attempt 2 Anthropic HTTP 200 settled $0.0180)",
    rawPreviewZh:
      "POST /v1/chat/completions → 路由策略 claude-sonnet-4（尝试 1 HTTP 401 未计费 → 尝试 2 Anthropic HTTP 200 已结算 $0.0180）",
  },
  {
    time: "Oct 19, 14:22:07",
    timeZh: "10月19日 14:22:07",
    model: "claude-sonnet-4",
    providerSub: "OpenRouter · anthropic/claude-sonnet-4",
    providerBadge: "OR",
    status: "Failed · HTTP 401",
    statusZh: "失败 · HTTP 401",
    statusTone: "failed" as const,
    duration: "3.2 ms",
    durationSub: "Attempt 1 · route cooldown",
    durationSubZh: "第 1 次尝试 · 路由冷却",
    inputTokens: "0",
    cachedTokens: "0",
    outputTokens: "0",
    reasoningTokens: "0",
    charge: "Not charged",
    chargeZh: "未计费",
    chargeSub: "Pre-stream rejection",
    chargeSubZh: "流开始前拒绝",
    apiKey: "prod-backend",
    finishReason: "upstream_auth_error",
    deliveryStatus: "Not executed · Hold transferred to Attempt 2",
    deliveryStatusZh: "未执行 · 预留额度转交第 2 次尝试",
    providerStatus: "HTTP 401 Unauthorized",
    providerStatusZh: "HTTP 401 鉴权失败",
    throughput: "0 output tokens · Failover triggered",
    throughputZh: "0 输出 Token · 已触发故障切换",
    phases: [
      {
        label: "Preparation",
        labelZh: "请求准入与准备",
        duration: "1.8 ms",
        pct: 56,
        tone: "prep" as const,
      },
      {
        label: "First output wait",
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
      "Upstream HTTP 401 on candidate claude-sonnet-4-openrouter; route entered 60s auth cooldown and request failed over to claude-sonnet-4-anthropic.",
    rawPreviewZh:
      "候选路由 claude-sonnet-4-openrouter 返回上游 HTTP 401；该路由进入 60 秒鉴权冷却并自动切换至 claude-sonnet-4-anthropic。",
  },
  {
    time: "Oct 19, 14:19:41",
    timeZh: "10月19日 14:19:41",
    model: "deepseek-r1",
    providerSub: "OpenRouter · deepseek/deepseek-r1",
    providerBadge: "DS",
    status: "Uncertain",
    statusZh: "状态未定",
    statusTone: "uncertain" as const,
    duration: "4,820 ms",
    durationSub: "Stream dropped mid-flight",
    durationSubZh: "流传输中途断开",
    inputTokens: "620",
    cachedTokens: "0",
    outputTokens: "—",
    reasoningTokens: "194",
    charge: "Unresolved",
    chargeZh: "待核对",
    chargeSub: "Explicitly unbilled",
    chargeSubZh: "显式保留未计费",
    apiKey: "eval-runner",
    finishReason: "stream_interrupted",
    deliveryStatus: "Uncertain · Never fabricated as $0.00",
    deliveryStatusZh: "状态未定 · 绝不伪造为 $0.00 完成",
    providerStatus: "HTTP 200 (SSE interrupted)",
    providerStatusZh: "HTTP 200（SSE 流中断）",
    throughput: "Partial stream · Reconciliation required",
    throughputZh: "部分流输出 · 需对账核实",
    phases: [
      {
        label: "Preparation",
        labelZh: "请求准入与准备",
        duration: "2.4 ms",
        pct: 5,
        tone: "prep" as const,
      },
      {
        label: "First output wait",
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
      "SSE stream closed before terminal usage chunk; recorded as Uncertain / Unresolved so customer bills never fake a $0 completion.",
    rawPreviewZh:
      "SSE 流在收到最终用量分块前断开；系统记录为状态未定 / 待核对，避免账单伪造 $0.00 正常完成。",
  },
  {
    time: "Oct 19, 14:18:12",
    timeZh: "10月19日 14:18:12",
    model: "gpt-4.1-mini",
    providerSub: "OpenAI · gpt-4.1-mini-2025-04-14",
    providerBadge: "OA",
    status: "Blocked · Guardrail",
    statusZh: "已拦截 · 护栏",
    statusTone: "failed" as const,
    duration: "4.1 ms",
    durationSub: "Input policy enforcement",
    durationSubZh: "输入安全护栏拦截",
    inputTokens: "0",
    cachedTokens: "0",
    outputTokens: "0",
    reasoningTokens: "0",
    charge: "Not charged",
    chargeZh: "未计费",
    chargeSub: "Blocked before dispatch",
    chargeSubZh: "转发前拦截未计费",
    apiKey: "support-agent",
    finishReason: "guardrail_denied",
    deliveryStatus: "Denied by workspace guardrail · Reservation released",
    deliveryStatusZh: "被工作空间安全护栏拦截 · 预留额度已释放",
    providerStatus: "Not dispatched",
    providerStatusZh: "未向上游转发",
    throughput: "0 output tokens · Guardrail rule #2",
    throughputZh: "0 输出 Token · 命中护栏规则 #2",
    phases: [
      {
        label: "Preparation",
        labelZh: "请求准入与准备",
        duration: "4.1 ms",
        pct: 100,
        tone: "failed" as const,
      },
      {
        label: "First output wait",
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
      "Pre-dispatch guardrail denied secret pattern in prompt; reservation released without upstream call or charge.",
    rawPreviewZh:
      "转发前安全护栏拦截了提示词中的敏感凭据模式；预留额度已释放，未发起上游调用且未产生扣费。",
  },
  {
    time: "Oct 19, 14:15:30",
    timeZh: "10月19日 14:15:30",
    model: "gpt-4.1",
    providerSub: "OpenAI · gpt-4.1-2025-04-14",
    providerBadge: "OA",
    status: "Completed",
    statusZh: "已完成",
    statusTone: "completed" as const,
    duration: "840 ms",
    durationSub: "Attempt 1 · structured JSON",
    durationSubZh: "第 1 次尝试 · 结构化 JSON",
    inputTokens: "380",
    cachedTokens: "192",
    outputTokens: "96",
    reasoningTokens: "0",
    charge: "$0.0118",
    chargeZh: "$0.0118",
    chargeSub: "Settled tariff",
    chargeSubZh: "已按价目表结算",
    apiKey: "prod-backend",
    finishReason: "stop",
    deliveryStatus: "Completed · JSON schema verified",
    deliveryStatusZh: "已完成 · JSON Schema 校验通过",
    providerStatus: "HTTP 200 OK",
    providerStatusZh: "HTTP 200 OK",
    throughput: "96 output tokens · 168.4 tok/s",
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
        label: "First output wait",
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
      "POST /v1/chat/completions → policy gpt-4.1 (structured_output validated against JSON schema, settled $0.0118).",
    rawPreviewZh:
      "POST /v1/chat/completions → 路由策略 gpt-4.1（结构化输出通过 JSON Schema 校验，已结算 $0.0118）。",
  },
];

const demoRoutePools = [
  {
    alias: "claude-sonnet-4",
    revision: "Revision 4",
    revisionZh: "修订版 4",
    scopeBadge: "tools · vision · <=64k",
    scopeBadgeZh: "工具 · 视觉 · <=64k",
    scopeSub: "Updated by Claude Code · dry-run verified",
    scopeSubZh: "由 Claude Code 更新 · 已通过预览验证",
    enabledSummary: "96% eval acceptance ($0.0142/accepted)",
    enabledSummaryZh: "评估合格率 96%（$0.0142/合格样本）",
    status: "Enabled",
    statusZh: "已启用",
    maxAttempts: "Max 2 attempts · Pre-stream failover",
    maxAttemptsZh: "最多 2 次尝试 · 流前故障切换",
    candidates: [
      {
        alias: "claude-sonnet-4-anthropic",
        provider: "Anthropic Direct",
        priority: 100,
        weight: 800,
        tierShare: "80% primary share",
        tierShareZh: "主层占比 80%",
        sharePct: 80,
        status: "Primary",
        statusZh: "主路由",
        isPrimary: true,
      },
      {
        alias: "claude-sonnet-4-openrouter",
        provider: "OpenRouter Enterprise",
        priority: 100,
        weight: 200,
        tierShare: "20% primary share",
        tierShareZh: "主层占比 20%",
        sharePct: 20,
        status: "Primary",
        statusZh: "主路由",
        isPrimary: true,
      },
      {
        alias: "claude-sonnet-4-vertex",
        provider: "Google Vertex AI",
        priority: 50,
        weight: 1000,
        tierShare: "Standby (P50)",
        tierShareZh: "备用层 (P50)",
        sharePct: 100,
        status: "Standby",
        statusZh: "备用路由",
        isPrimary: false,
      },
    ],
  },
  {
    alias: "gpt-4.1",
    revision: "Revision 2",
    revisionZh: "修订版 2",
    scopeBadge: "chat · structured JSON",
    scopeBadgeZh: "对话 · 结构化 JSON",
    scopeSub: "Updated by Codex · matched vs baseline",
    scopeSubZh: "由 Codex 更新 · 已完成基线对比",
    enabledSummary: "92% eval acceptance ($0.0118/accepted)",
    enabledSummaryZh: "评估合格率 92%（$0.0118/合格样本）",
    status: "Enabled",
    statusZh: "已启用",
    maxAttempts: "Max 2 attempts · Pre-stream failover",
    maxAttemptsZh: "最多 2 次尝试 · 流前故障切换",
    candidates: [
      {
        alias: "gpt-4.1-openai-direct",
        provider: "OpenAI Direct",
        priority: 100,
        weight: 900,
        tierShare: "90% primary share",
        tierShareZh: "主层占比 90%",
        sharePct: 90,
        status: "Primary",
        statusZh: "主路由",
        isPrimary: true,
      },
      {
        alias: "gpt-4.1-azure-east",
        provider: "Azure OpenAI",
        priority: 50,
        weight: 1000,
        tierShare: "Standby (P50)",
        tierShareZh: "备用层 (P50)",
        sharePct: 100,
        status: "Standby",
        statusZh: "备用路由",
        isPrimary: false,
      },
    ],
  },
  {
    alias: "deepseek-r1",
    revision: "Revision 5",
    revisionZh: "修订版 5",
    scopeBadge: "reasoning = high · <=128k",
    scopeBadgeZh: "深度推理 · <=128k",
    scopeSub: "Updated by DeepSeek Harness · 0 unknown charges",
    scopeSubZh: "由 DeepSeek Harness 更新 · 0 笔未知费用",
    enabledSummary: "94% eval acceptance ($0.0064/accepted)",
    enabledSummaryZh: "评估合格率 94%（$0.0064/合格样本）",
    status: "Enabled",
    statusZh: "已启用",
    maxAttempts: "Max 2 attempts · Pre-stream failover",
    maxAttemptsZh: "最多 2 次尝试 · 流前故障切换",
    candidates: [
      {
        alias: "deepseek-r1-volcengine",
        provider: "Volcengine Ark",
        priority: 100,
        weight: 700,
        tierShare: "70% primary share",
        tierShareZh: "主层占比 70%",
        sharePct: 70,
        status: "Primary",
        statusZh: "主路由",
        isPrimary: true,
      },
      {
        alias: "deepseek-r1-openrouter",
        provider: "OpenRouter Enterprise",
        priority: 100,
        weight: 300,
        tierShare: "30% primary share",
        tierShareZh: "主层占比 30%",
        sharePct: 30,
        status: "Primary",
        statusZh: "主路由",
        isPrimary: true,
      },
      {
        alias: "deepseek-r1-together",
        provider: "Together AI",
        priority: 50,
        weight: 1000,
        tierShare: "Standby (P50)",
        tierShareZh: "备用层 (P50)",
        sharePct: 100,
        status: "Standby",
        statusZh: "备用路由",
        isPrimary: false,
      },
    ],
  },
];

const volumeHistogramBars = [
  34, 42, 38, 51, 64, 72, 68, 84, 92, 78, 88, 96, 82, 74, 89, 94, 100, 86, 79,
  91, 85, 76, 88, 95,
];

const gatewaySteps = [
  { step: "01", title: "Let your agent connect Niu", titleZh: "让 Agent 连接 Niu",
    detail: "Share the setup prompt, approve workspace access in your browser, and verify the connection.",
    detailZh: "发送接入提示词，在浏览器中审批工作空间权限并验证连接。" },
  { step: "02", title: "Describe the outcome and constraints", titleZh: "说明目标与约束",
    detail: "Provide task samples, quality criteria, latency targets, and a test budget.",
    detailZh: "给出任务样本、质量标准、延迟目标与测试预算。" },
  { step: "03", title: "Review routing policies and evidence", titleZh: "审阅路由策略与证据",
    detail: "Inspect evaluations, routing revisions, and request logs in Niu while your agent handles the details.",
    detailZh: "在 Niu 中审阅评估结果、路由修订与请求日志，细节查询交由 Agent 处理。" },
];

export default function LandingContent({
  latestPosts,
  highlightedCode,
}: {
  latestPosts: LandingPost[];
  highlightedCode: string[];
}) {
  const { isZh, t } = useLocale();
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [previewPaused, setPreviewPaused] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedLogIndex, setSelectedLogIndex] = useState(0);
  const [showVolumeChart, setShowVolumeChart] = useState(false);
  const [selectedPoolIndex, setSelectedPoolIndex] = useState(0);
  const [activeGenerationsMode, setActiveGenerationsMode] = useState<
    "chat" | "video"
  >("chat");
  const [activeCodeIndex, setActiveCodeIndex] = useState(0);
  const [deploymentOrigin, setDeploymentOrigin] = useState("https://niu.io");
  const [copiedInstall,setCopiedInstall]=useState(false);
  const [installCopyError,setInstallCopyError]=useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useLandingMotion(mainRef);
  const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

  useEffect(() => {
    setDeploymentOrigin(currentDeploymentOrigin());
  }, []);

  const installationPrompt = buildInstallationPrompt(deploymentOrigin);

  useEffect(() => {
    if (previewPaused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      setActivePreviewIndex((prev) => (prev + 1) % previewTabs.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [previewPaused, activePreviewIndex]);

  const handleCopyCode = () => {
    const snippet = codeExamples[activeCodeIndex]?.code;
    if (!snippet || typeof navigator === "undefined" || !navigator.clipboard)
      return;
    void navigator.clipboard.writeText(snippet).then(() => {
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 1800);
    });
  };

  const activeTab = previewTabs[activePreviewIndex] ?? previewTabs[0];
  const selectedLog = demoLogRecords[selectedLogIndex] ?? demoLogRecords[0];

  return (
    <main id="main" ref={mainRef}>
      {/* 1. HERO + INTERACTIVE PRODUCT PREVIEW + 4 CORE COMPETITIVE PILLARS */}
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
            <span className="release-tag">{t("Why Niu", "核心优势")}</span>
            <span>
              {t(
                "Discover · Evaluate · Route",
                "发现 · 评估 · 路由",
              )}
            </span>
            <IconArrowRight size={14} aria-hidden="true" />
          </a>
          <h1 id="hero-title" className="hero-enter" style={stagger(1)}>
            {isZh ? (
              <>
                面向 Agent 的
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
                Niu（牛元）让你通过 Agent，发现与评估模型、配置模型路由，
                <span className="demo-nowrap">管理性能与成本。</span>
              </>
            ) : (
              "Discover and evaluate models, configure routing, and manage performance and cost—all through your agent."
            )}
          </p>
          <div className="hero-install code-card hero-enter" style={stagger(3)}>
            <div className="code-heading"><strong>{t("Give this to your coding agent", "把这句话交给你的 coding agent")}</strong><a href="/docs/install.md">{t("Niu 0.3 install contract", "Niu 0.3 接入规范")}</a></div>
            <code className="hero-install-prompt">{installationPrompt}</code>
            <div className="hero-install-footer">
              <p>{t("Paste into Claude Code, Codex or DeepSeek Harness. Your agent checks availability and opens Niu for sign-in and approval.", "粘贴至 Claude Code、Codex 或 DeepSeek Harness。Agent 检查可用性并打开 Niu 完成登录与授权审批。")}</p>
              <Button size="lg" className="cta-primary" onClick={()=>{setInstallCopyError(false);if(!navigator.clipboard){setInstallCopyError(true);return;}void navigator.clipboard.writeText(installationPrompt).then(()=>setCopiedInstall(true)).catch(()=>setInstallCopyError(true));}}>
                {copiedInstall?<IconCheck aria-hidden="true"/>:<IconCopy aria-hidden="true"/>}<span aria-live="polite">{copiedInstall?t("Copied", "已复制"):t("Copy setup prompt", "复制接入提示词")}</span>
              </Button>
            </div>
            {installCopyError&&<p className="hero-install-error" role="status">{t("Select the prompt above to copy it manually.", "请选择上方提示词手动复制。")}</p>}
          </div>
          <div className="actions hero-actions hero-enter" style={stagger(3)}>
            <Button asChild size="lg" variant="outline" className="cta-secondary">
              <a href="/docs/guides/personal-assistant/">
                <IconPlugConnected aria-hidden="true" />
                {t("Build with Niu", "用 Niu 开发")}
                <IconArrowRight className="cta-arrow" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-secondary"
            >
              <a href={links.dashboard}>
                {t("Open dashboard", "打开控制台")}
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="cta-ghost">
              <a href={links.repo}>
                <IconBrandGithub aria-hidden="true" />
                {t("Star on GitHub", "GitHub Star")}
              </a>
            </Button>
          </div>

          {/* Interactive Product UI Preview Window — Niu 0.3 Workspace Review & Generations */}
          <div
            id="review-title"
            className="preview-frame"
            data-paused={previewPaused ? "true" : undefined}
            data-reveal
            onMouseEnter={() => setPreviewPaused(true)}
            onMouseLeave={() => setPreviewPaused(false)}
            onFocusCapture={() => setPreviewPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPreviewPaused(false);
              }
            }}
          >
            <div
              className={`product-preview demo-dashboard-shell${sidebarCollapsed ? " is-sidebar-collapsed" : ""}`}
              aria-label="Interactive Niu dashboard preview"
            >
              {/* 1. Left Product Rail (AppLayout.tsx .app-rail) */}
              <aside
                className="mock-nav-rail demo-app-rail"
                aria-label="Product rail navigation"
              >
                <button
                  type="button"
                  className="mock-nav-home"
                  title="Niu Dashboard"
                  onClick={() => setActivePreviewIndex(0)}
                >
                  <img
                    src="/site-assets/brand/niu-mark.png"
                    alt="Niu"
                    width="26"
                    height="26"
                  />
                </button>
                <div className="mock-nav-items">
                  <button
                    type="button"
                    className={`mock-rail-btn${activeTab.railArea === "workspace" ? " is-active" : ""}`}
                    aria-label={t("Workspace", "工作空间")}
                    title={t("Workspace · Logs & Routing", "工作空间 · 日志与路由")}
                    onClick={() => setActivePreviewIndex(0)}
                  >
                    <FolderKey size={18} />
                  </button>
                  <button
                    type="button"
                    className={`mock-rail-btn${activeTab.railArea === "generations" ? " is-active" : ""}`}
                    aria-label={t("Generations", "生成对话")}
                    title={t("Generations · Chat & Video", "生成对话 · 对话与视频")}
                    onClick={() => setActivePreviewIndex(2)}
                  >
                    <IconSparkles size={19} stroke={1.75} />
                  </button>
                </div>
                <div className="demo-rail-footer">
                  <span className="demo-rail-avatar" title={t("Your account", "当前账户")}>
                    H
                  </span>
                </div>
              </aside>

              {/* 2. Contextual Second-Level Sidebar (AppLayout.tsx .niu-workspace-sidebar) */}
              {!sidebarCollapsed && (
                <aside
                  className="demo-context-sidebar"
                  aria-label="Section navigation"
                >
                  {activeTab.railArea === "workspace" && (
                    <>
                      <div className="demo-sidebar-header">
                        <button
                          type="button"
                          className="demo-workspace-switcher"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <span className="demo-ws-badge">D</span>
                          <span className="demo-ws-name">
                            {t("Default workspace", "默认工作空间")}
                          </span>
                          <ChevronsUpDown size={13} aria-hidden="true" />
                        </button>
                      </div>
                      <nav
                        className="demo-sidebar-nav"
                        aria-label="Workspace menu"
                      >
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <Activity size={15} />
                          <span>{t("Overview", "概览")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <KeyRound size={15} />
                          <span>{t("API keys", "API 密钥")}</span>
                        </button>
                        <button
                          type="button"
                          className={`demo-sidebar-item${activePreviewIndex === 0 ? " is-active" : ""}`}
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <List size={15} />
                          <span>{t("Logs", "请求日志")}</span>
                        </button>
                        <button
                          type="button"
                          className={`demo-sidebar-item${activePreviewIndex === 1 ? " is-active" : ""}`}
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <IconRoute size={15} />
                          <span>{t("Routing", "模型路由")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <IconListSearch size={15} />
                          <span>{t("Evaluations", "评估")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <IconPlugConnected size={15} />
                          <span>{t("Event subscriptions", "事件订阅")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => {
                            setActivePreviewIndex(0);
                            setSelectedLogIndex(3);
                          }}
                        >
                          <ShieldAlert size={15} />
                          <span>{t("Guardrails", "安全护栏")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <Settings size={15} />
                          <span>{t("Settings", "设置")}</span>
                        </button>
                      </nav>
                      <div className="demo-sidebar-footer">
                        <a href="/docs/" className="demo-sidebar-item">
                          <IconBook size={15} />
                          <span>{t("Docs", "开发文档")}</span>
                        </a>
                      </div>
                    </>
                  )}

                  {activeTab.railArea === "generations" && (
                    <>
                      <div className="demo-sidebar-header demo-sidebar-header-gen">
                        <span className="demo-sidebar-title">
                          {t("Generations", "生成对话")}
                        </span>
                        <button
                          type="button"
                          className="demo-new-gen-btn"
                          onClick={() =>
                            setActiveGenerationsMode(
                              activeGenerationsMode === "chat"
                                ? "video"
                                : "chat",
                            )
                          }
                        >
                          <Plus size={13} />
                          <span>{t("New generation", "新建会话")}</span>
                        </button>
                      </div>
                      <nav
                        className="demo-sidebar-nav"
                        aria-label="Saved generation sessions"
                      >
                        <button
                          type="button"
                          className={`demo-session-item${activeGenerationsMode === "chat" ? " is-active" : ""}`}
                          onClick={() => setActiveGenerationsMode("chat")}
                        >
                          <IconMessageChatbot size={15} />
                          <div>
                            <strong>
                              {t(
                                "Production API architecture",
                                "生产级 API 架构设计",
                              )}
                            </strong>
                            <small>
                              {t(
                                "claude-sonnet-4 + gpt-4.1 · 2m ago",
                                "claude-sonnet-4 + gpt-4.1 · 2 分钟前",
                              )}
                            </small>
                          </div>
                        </button>
                        <button
                          type="button"
                          className={`demo-session-item${activeGenerationsMode === "video" ? " is-active" : ""}`}
                          onClick={() => setActiveGenerationsMode("video")}
                        >
                          <Film size={15} />
                          <div>
                            <strong>
                              {t(
                                "Seedance 1.5 Pro studio",
                                "Seedance 1.5 Pro 视频工作台",
                              )}
                            </strong>
                            <small>
                              {t(
                                "seedance-1-5-pro · 1080p · 6m ago",
                                "seedance-1-5-pro · 1080p · 6 分钟前",
                              )}
                            </small>
                          </div>
                        </button>
                        <button
                          type="button"
                          className="demo-session-item"
                          onClick={() => setActiveGenerationsMode("chat")}
                        >
                          <IconMessageChatbot size={15} />
                          <div>
                            <strong>
                              {t(
                                "Guardrail & retry audit",
                                "安全护栏与重试审计",
                              )}
                            </strong>
                            <small>
                              {t("deepseek-r1 · 1h ago", "deepseek-r1 · 1 小时前")}
                            </small>
                          </div>
                        </button>
                      </nav>
                      <div className="demo-sidebar-footer">
                        <span className="demo-sidebar-muted">
                          {t(
                            "PostgreSQL session sync active",
                            "PostgreSQL 会话实时同步已启用",
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </aside>
              )}

              {/* 3. Main Content Column (Header Bar + Implemented Page Canvas + Footer Bar) */}
              <div className="mock-workspace demo-main-column">
                <div className="preview-toolbar demo-topbar">
                  <div className="preview-brand demo-breadcrumb-bar">
                    <button
                      type="button"
                      className="demo-sidebar-toggle"
                      aria-label={
                        sidebarCollapsed
                          ? t("Expand sidebar", "展开侧边栏")
                          : t("Collapse sidebar", "收起侧边栏")
                      }
                      title={
                        sidebarCollapsed
                          ? t("Expand sidebar", "展开侧边栏")
                          : t("Collapse sidebar", "收起侧边栏")
                      }
                      onClick={() => setSidebarCollapsed((prev) => !prev)}
                    >
                      <PanelLeft size={15} />
                    </button>
                    <span className="demo-topbar-sep" aria-hidden="true" />
                    <span className="status-dot is-live" aria-hidden="true" />
                    <span className="demo-breadcrumb-text">
                      {isZh ? activeTab.breadcrumbZh : activeTab.breadcrumb}
                    </span>
                  </div>
                  <div
                    className="preview-tabs"
                    role="tablist"
                    aria-label="Product surface views"
                  >
                    {previewTabs.map((tab, i) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activePreviewIndex === i}
                        onClick={() => setActivePreviewIndex(i)}
                      >
                        <span>{isZh ? tab.labelZh : tab.label}</span>
                        {activePreviewIndex === i && (
                          <i
                            className="preview-tab-progress"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="preview-body demo-canvas-body">
                  {/* SURFACE 0: WORKSPACE / LOGS & REQUEST DETAILS SHEET (GatewayActivity.tsx + RequestTiming.tsx) */}
                  {activePreviewIndex === 0 && (
                    <div className="investigation demo-page-surface">
                      <div className="demo-page-header">
                        <div>
                          <div className="demo-page-title-row">
                            <h2>{t("Logs", "请求日志")}</h2>
                            <span className="demo-count-badge">
                              {t("1,428 requests", "1,428 条请求")}
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            {t(
                              "Inspect every workspace operation, upstream routing attempt, phase latency, guardrail decision, and settled customer charge.",
                              "检视工作空间的每一次请求操作、上游路由尝试、分阶段延迟、安全护栏决策与已结算的客户费用。",
                            )}
                          </p>
                        </div>
                        <div className="demo-header-actions">
                          <button
                            type="button"
                            className="demo-action-btn"
                            onClick={() => setShowVolumeChart((v) => !v)}
                          >
                            <BarChart3 size={13} />
                            <span>
                              {showVolumeChart
                                ? t("Hide volume", "隐藏趋势")
                                : t("Request volume", "请求趋势")}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="demo-action-btn"
                            onClick={() =>
                              setSelectedLogIndex((prev) => (prev === 1 ? 3 : 1))
                            }
                          >
                            <ShieldAlert size={13} />
                            <span>{t("Blocked & failed", "拦截与失败")}</span>
                          </button>
                          <button
                            type="button"
                            className="demo-icon-btn"
                            aria-label={t("Refresh requests", "刷新请求")}
                            onClick={() =>
                              setSelectedLogIndex(
                                (prev) => (prev + 1) % demoLogRecords.length,
                              )
                            }
                          >
                            <RefreshCw size={13} />
                          </button>
                        </div>
                      </div>

                      {showVolumeChart && (
                        <div
                          className="demo-volume-strip"
                          aria-label="Request volume over last 24 hours"
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
                                "99.8% completed · 2 bounded failovers · 1 uncertain stream",
                                "99.8% 已完成 · 2 次有界故障转移 · 1 次状态未定流",
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
                        {/* Left: Gateway Request Table */}
                        <div className="demo-logs-table-pane">
                          <div className="demo-subtoolbar">
                            <div className="demo-subtoolbar-left">
                              <span
                                className="demo-toolbar-icon-pill"
                                title={t("Filter requests", "筛选请求")}
                              >
                                <IconSearch size={13} />
                              </span>
                              <span className="demo-filter-chip is-active">
                                {t("All statuses", "全部状态")}
                              </span>
                              <span className="demo-filter-chip">
                                {t(
                                  "Policy: claude-sonnet-4",
                                  "路由策略：claude-sonnet-4",
                                )}
                              </span>
                            </div>
                            <div className="demo-subtoolbar-right">
                              <span className="demo-filter-chip">
                                {t("All time", "全部时间")}
                              </span>
                              <span
                                className="demo-toolbar-icon-pill"
                                title={t("Columns", "显示列")}
                              >
                                <SlidersHorizontal size={13} />
                              </span>
                            </div>
                          </div>

                          <div className="comparison-scroll demo-table-scroll">
                            <table
                              className="comparison-matrix demo-data-table"
                              aria-label="Workspace request logs"
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
                                      key={`${row.time}-${row.status}`}
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
                                              {(isZh ? row.timeZh : row.time).replace(
                                                /^Oct 19, |^10月19日 /,
                                                "",
                                              )}{" "}
                                              ·{" "}
                                              {row.providerSub.split(" · ")[0]}
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

                        {/* Right: Request Details Drawer (GatewayActivity.tsx Sheet + RequestTiming.tsx) */}
                        <aside
                          className="demo-request-drawer"
                          aria-label="Request details"
                        >
                          <div className="demo-drawer-header">
                            <div>
                              <span className="demo-drawer-eyebrow">
                                {t("Request details", "请求详情")}
                              </span>
                              <h3>
                                <span className="demo-nowrap">
                                  {selectedLog.model}
                                </span>{" "}
                                <small>
                                  · {isZh ? selectedLog.timeZh : selectedLog.time}
                                </small>
                              </h3>
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
                                {isZh ? selectedLog.chargeZh : selectedLog.charge}
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

                          {/* RequestTiming.tsx component replica */}
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
                              <dt>{t("Provider model", "供应商模型")}</dt>
                              <dd>{selectedLog.providerSub}</dd>
                            </div>
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

                  {/* SURFACE 1: WORKSPACE / ROUTING, EVALUATIONS & EVENTS (features/agent-review/page.tsx) */}
                  {activePreviewIndex === 1 && (
                    <div className="investigation demo-page-surface">
                      <div className="demo-page-header">
                        <div>
                          <div className="demo-page-title-row">
                            <h2>{t("Routing & Evaluations", "模型路由与评估")}</h2>
                            <span className="demo-count-badge">
                              {t("3 saved policies · 25 eval samples", "3 条已存策略 · 25 个评估样本")}
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            {t(
                              "Review workspace routing policies, fingerprinted evaluations, and signed event deliveries.",
                              "审阅工作空间路由策略、带指纹的任务评估结果及签名事件通知状态。",
                            )}
                          </p>
                        </div>
                        <div className="demo-header-actions">
                          <button
                            type="button"
                            className="demo-action-btn"
                            onClick={() => setActivePreviewIndex(0)}
                          >
                            <List size={13} />
                            <span>{t("Selection logs", "路由命中日志")}</span>
                          </button>
                          <button
                            type="button"
                            className="demo-action-btn is-primary"
                            onClick={() =>
                              setSelectedPoolIndex(
                                (prev) => (prev + 1) % demoRoutePools.length,
                              )
                            }
                          >
                            <IconHistory size={13} />
                            <span>{t("Cycle policy", "切换策略")}</span>
                          </button>
                        </div>
                      </div>

                      <div className="demo-kpi-grid is-three-col">
                        <article className="demo-kpi-card is-highlighted">
                          <div className="demo-kpi-top">
                            <span>
                              {t("Matched evaluation", "同样本对比评估")}
                            </span>
                            <span className="demo-outline-badge">
                              {t("25 samples", "25 个样本")}
                            </span>
                          </div>
                          <strong>{t("96.0% accepted", "96.0% 合格率")}</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge is-positive">
                              {t("$0.0142 / accepted", "$0.0142 / 合格样本")}
                            </span>
                          </div>
                        </article>
                        <article className="demo-kpi-card">
                          <div className="demo-kpi-top">
                            <span>
                              {t("Delegated authority", "Agent 委托权限")}
                            </span>
                            <span className="demo-outline-badge">
                              {t("Task-scoped", "按任务授权")}
                            </span>
                          </div>
                          <strong>{t("Management only", "仅管理权限")}</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge">
                              {t("Model invocation: Off", "模型调用：默认关闭")}
                            </span>
                          </div>
                        </article>
                        <article className="demo-kpi-card">
                          <div className="demo-kpi-top">
                            <span>
                              {t("Event notifications", "签名事件通知")}
                            </span>
                            <span className="demo-outline-badge">
                              {t("Active", "运行中")}
                            </span>
                          </div>
                          <strong>{t("100% delivered", "100% 已送达")}</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge is-positive">
                              {t("0 open connection incidents", "0 个未决连接故障")}
                            </span>
                          </div>
                        </article>
                      </div>

                      <div className="comparison-scroll demo-table-scroll">
                        <table
                          className="comparison-matrix demo-data-table"
                          aria-label="Workspace routing policies"
                        >
                          <thead>
                            <tr>
                              <th>{t("Routing policy", "路由策略")}</th>
                              <th>{t("Match conditions", "匹配条件")}</th>
                              <th>{t("Candidate tiers & evaluation", "候选分层与评估结果")}</th>
                              <th>{t("Status", "状态")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {demoRoutePools.map((pool, idx) => {
                              const isSelected = idx === selectedPoolIndex;
                              return (
                                <tr
                                  key={pool.alias}
                                  className={`demo-clickable-row${isSelected ? " matrix-selected" : ""}`}
                                  onClick={() => setSelectedPoolIndex(idx)}
                                >
                                  <td>
                                    <div className="demo-pool-alias-cell">
                                      <IconRoute size={15} />
                                      <div>
                                        <strong>{pool.alias}</strong>
                                        <small>
                                          {isZh ? pool.revisionZh : pool.revision}
                                        </small>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="demo-outline-badge">
                                      {isZh ? pool.scopeBadgeZh : pool.scopeBadge}
                                    </span>
                                    <small>
                                      {isZh ? pool.scopeSubZh : pool.scopeSub}
                                    </small>
                                  </td>
                                  <td>
                                    <div className="demo-candidate-pills">
                                      {pool.candidates.map((cand) => (
                                        <span
                                          key={cand.alias}
                                          className="demo-candidate-pill"
                                        >
                                          <strong>{cand.alias}</strong>
                                          <span>
                                            P{cand.priority} · W{cand.weight}
                                          </span>
                                        </span>
                                      ))}
                                    </div>
                                    <small>
                                      {isZh
                                        ? pool.enabledSummaryZh
                                        : pool.enabledSummary}
                                    </small>
                                  </td>
                                  <td>
                                    <span className="demo-status-pill is-completed">
                                      <i className="demo-status-dot" />
                                      {isZh ? pool.statusZh : pool.status}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* SURFACE 2: GENERATIONS · CHAT COMPARISON & SEEDANCE VIDEO (PlaygroundView.tsx + VideoView.tsx) */}
                  {activePreviewIndex === 2 && (
                    <div className="investigation demo-page-surface">
                      <div className="demo-page-header">
                        <div>
                          <div className="demo-page-title-row">
                            <h2>
                              {activeGenerationsMode === "chat"
                                ? t("Chat comparison", "多模型对话对比")
                                : t(
                                    "Video · Seedance 1.5 Pro",
                                    "视频生成 · Seedance 1.5 Pro",
                                  )}
                            </h2>
                            <span className="demo-count-badge">
                              {activeGenerationsMode === "chat"
                                ? t("2 models side-by-side", "双模型并排对比")
                                : t("Async video studio", "异步视频工作台")}
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            {activeGenerationsMode === "chat"
                              ? t(
                                  "Compare models side-by-side with live streaming throughput, token counts, and settled customer charges persisted in PostgreSQL.",
                                  "并排对比多个模型的实时流式吞吐、Token 用量与持久化至 PostgreSQL 的已结算客户费用。",
                                )
                              : t(
                                  "Submit text-to-video and image-to-video tasks with Volcengine Seedance 1.5 Pro, manage materials, and track settled video charges.",
                                  "使用火山引擎 Seedance 1.5 Pro 提交文生视频与图生视频任务，管理素材资产并追踪已结算视频费用。",
                                )}
                          </p>
                        </div>
                        <div className="demo-header-actions">
                          <div
                            className="demo-mode-segmented"
                            role="group"
                            aria-label="Generations mode"
                          >
                            <button
                              type="button"
                              className={
                                activeGenerationsMode === "chat"
                                  ? "is-active"
                                  : undefined
                              }
                              onClick={() => setActiveGenerationsMode("chat")}
                            >
                              <IconMessageChatbot size={14} />
                              <span>{t("Chat comparison", "对话对比")}</span>
                            </button>
                            <button
                              type="button"
                              className={
                                activeGenerationsMode === "video"
                                  ? "is-active"
                                  : undefined
                              }
                              onClick={() => setActiveGenerationsMode("video")}
                            >
                              <Film size={14} />
                              <span>
                                {t("Seedance video", "Seedance 视频")}
                              </span>
                            </button>
                          </div>
                          <span className="demo-filter-chip">
                            {t("Key: prod-backend", "密钥：prod-backend")}
                          </span>
                        </div>
                      </div>

                      {activeGenerationsMode === "chat" ? (
                        <>
                          <div className="demo-chat-prompt-bar">
                            <span className="demo-prompt-role">
                              {t("User prompt", "用户输入提示词")}
                            </span>
                            <p>
                              {t(
                                "Compare bounded routing failover vs unconditional retries when an upstream Provider returns HTTP 401 before streaming starts.",
                                "对比当上游供应商在流式输出开始前返回 HTTP 401 时，有界路由故障切换与无条件重试的区别。",
                              )}
                            </p>
                          </div>

                          <div className="demo-chat-compare-grid">
                            <article className="demo-chat-model-card is-primary">
                              <div className="demo-chat-card-header">
                                <div className="demo-model-cell">
                                  <span className="demo-provider-avatar">
                                    A
                                  </span>
                                  <div>
                                    <strong>claude-sonnet-4</strong>
                                    <small>
                                      {t(
                                        "Anthropic · Policy revision 4",
                                        "Anthropic · 路由策略修订版 4",
                                      )}
                                    </small>
                                  </div>
                                </div>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  {t("Completed · 1,180 ms", "已完成 · 1,180 ms")}
                                </span>
                              </div>
                              <div className="demo-chat-card-body">
                                <p>
                                  {isZh ? (
                                    <>
                                      <strong>有界故障切换</strong>仅在上游拒绝发生于任何
                                      SSE 响应体字节发出之前时才触发重试。遇到{" "}
                                      <code>HTTP 401</code> 时，Niu 将失败候选路由置入
                                      60 秒鉴权冷却并自动调度第 2 次尝试，不会对工作空间重复扣费。
                                    </>
                                  ) : (
                                    <>
                                      <strong>Bounded failover</strong> only retries
                                      when the upstream rejection occurs before any
                                      SSE body bytes are committed. On{" "}
                                      <code>HTTP 401</code>, Niu places the failing
                                      candidate route into a 60s auth cooldown and
                                      dispatches Attempt 2 without double-charging
                                      the workspace.
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="demo-chat-card-footer">
                                <span>
                                  {t(
                                    "412 prompt → 128 output tokens",
                                    "412 输入 → 128 输出 Token",
                                  )}
                                </span>
                                <span>148.8 tok/s</span>
                                <strong>
                                  {t(
                                    "Customer charge: $0.0180",
                                    "客户费用：$0.0180",
                                  )}
                                </strong>
                              </div>
                            </article>

                            <article className="demo-chat-model-card">
                              <div className="demo-chat-card-header">
                                <div className="demo-model-cell">
                                  <span className="demo-provider-avatar">
                                    OA
                                  </span>
                                  <div>
                                    <strong>gpt-4.1</strong>
                                    <small>
                                      {t(
                                        "OpenAI Direct · Policy revision 2",
                                        "OpenAI Direct · 路由策略修订版 2",
                                      )}
                                    </small>
                                  </div>
                                </div>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  {t("Completed · 940 ms", "已完成 · 940 ms")}
                                </span>
                              </div>
                              <div className="demo-chat-card-body">
                                <p>
                                  {isZh ? (
                                    <>
                                      <strong>流开始前 vs 流传输中：</strong>流开始前的{" "}
                                      <code>401/429/503</code> 错误可在路由策略的{" "}
                                      <code>max_attempts</code> 上限内安全切换；若已发出部分
                                      Token 后流中断，Niu 会将其记录为{" "}
                                      <code>状态未定 / 待核对</code>。
                                    </>
                                  ) : (
                                    <>
                                      <strong>Pre-stream vs mid-stream:</strong>{" "}
                                      Pre-stream <code>401/429/503</code> errors can
                                      safely fail over within the routing policy’s{" "}
                                      <code>max_attempts</code> cap. If a stream
                                      drops after tokens are emitted, Niu records
                                      the state as{" "}
                                      <code>Uncertain / Unresolved</code>.
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="demo-chat-card-footer">
                                <span>
                                  {t(
                                    "412 prompt → 116 output tokens",
                                    "412 输入 → 116 输出 Token",
                                  )}
                                </span>
                                <span>162.4 tok/s</span>
                                <strong>
                                  {t(
                                    "Customer charge: $0.0142",
                                    "客户费用：$0.0142",
                                  )}
                                </strong>
                              </div>
                            </article>
                          </div>
                        </>
                      ) : (
                        <div className="demo-video-studio-grid">
                          <div className="demo-video-stage-card">
                            <div className="demo-video-preview-canvas">
                              <div className="demo-video-badge-row">
                                <span className="demo-video-pill">
                                  seedance-1-5-pro
                                </span>
                                <span className="demo-video-pill">
                                  1080p · 16:9 · 5s · 24 fps
                                </span>
                                <span className="demo-video-pill">
                                  {t("Audio generated", "已生成伴音")}
                                </span>
                              </div>
                              <div className="demo-video-play-center">
                                <Film size={24} />
                                <span>
                                  {t(
                                    "Rendered MP4 ready · 1920×1080 · 42.0s generation time",
                                    "MP4 渲染就绪 · 1920×1080 · 生成耗时 42.0 秒",
                                  )}
                                </span>
                              </div>
                              <div className="demo-video-prompt-overlay">
                                <small>
                                  {t(
                                    "SAVED PROMPT & CAMERA DIRECTION",
                                    "已保存提示词与运镜指令",
                                  )}
                                </small>
                                <p>
                                  {t(
                                    "“Aerial dusk tracking shot over an illuminated container port, cinematic reflections on wet asphalt, volumetric coastal fog, smooth gimbal motion.”",
                                    "“黄昏时分灯火通明的集装箱港口航拍跟拍镜头，湿润沥青路面呈现电影感倒影，海岸体积雾，平滑云台运镜。”",
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="demo-video-controls-bar">
                              <span className="demo-filter-chip is-active">
                                {t(
                                  "Model: seedance-1-5-pro",
                                  "模型：seedance-1-5-pro",
                                )}
                              </span>
                              <span className="demo-filter-chip">
                                {t("Resolution: 1080p", "分辨率：1080p")}
                              </span>
                              <span className="demo-filter-chip">
                                {t("Aspect: 16:9", "画幅：16:9")}
                              </span>
                              <span className="demo-filter-chip">
                                {t("Duration: 5s", "时长：5 秒")}
                              </span>
                              <span className="demo-filter-chip">
                                {t(
                                  "Assets: 4 approved materials",
                                  "素材库：4 个已审核素材",
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="demo-video-side-cards">
                            <div className="demo-timing-card">
                              <div className="demo-timing-header">
                                <strong>
                                  {t("Video lifecycle", "视频任务生命周期")}
                                </strong>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  {t("Succeeded", "已成功")}
                                </span>
                              </div>
                              <dl className="demo-drawer-dl">
                                <div>
                                  <dt>{t("Submitted", "提交时间")}</dt>
                                  <dd>
                                    {t("Oct 19, 14:16:02", "10月19日 14:16:02")}
                                  </dd>
                                </div>
                                <div>
                                  <dt>{t("Completed", "完成时间")}</dt>
                                  <dd>
                                    {t(
                                      "Oct 19, 14:16:44 (42.0s)",
                                      "10月19日 14:16:44（42.0 秒）",
                                    )}
                                  </dd>
                                </div>
                                <div>
                                  <dt>{t("Workspace assets", "工作空间素材")}</dt>
                                  <dd>
                                    {t(
                                      "Materials & safety check verified",
                                      "素材库与安全核验已通过",
                                    )}
                                  </dd>
                                </div>
                              </dl>
                            </div>

                            <div className="demo-timing-card">
                              <div className="demo-timing-header">
                                <strong>{t("Video billing", "视频计费明细")}</strong>
                                <span>{t("Tariff settled", "费率已结算")}</span>
                              </div>
                              <dl className="demo-drawer-dl">
                                <div>
                                  <dt>{t("Billing status", "计费状态")}</dt>
                                  <dd>{t("Settled debit", "已结算扣款")}</dd>
                                </div>
                                <div>
                                  <dt>{t("Quoted estimate", "预估报价")}</dt>
                                  <dd>$0.2400</dd>
                                </div>
                                <div>
                                  <dt>
                                    {t(
                                      "Settled customer charge",
                                      "已结算客户费用",
                                    )}
                                  </dt>
                                  <dd>
                                    <strong>$0.2400</strong>
                                  </dd>
                                </div>
                                <div>
                                  <dt>{t("API key", "API 密钥")}</dt>
                                  <dd className="demo-mono-cell">
                                    prod-backend
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="preview-caption">
                  <span>
                    {t(
                      "Illustrative dashboard data · Inspect logs, routing policies, evaluations and generations in Niu",
                      "控制台示例数据 · 在 Niu 中审阅请求日志、路由策略、评估运行与生成结果",
                    )}
                  </span>
                  <Button asChild size="sm" className="cta-primary cta-compact">
                    <a href={links.dashboard}>
                      {t("Open workspace dashboard", "进入工作空间控制台")}
                      <IconArrowRight
                        className="cta-arrow"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIX CORE CAPABILITIES */}
      <section
        className="section container"
        id="product"
        aria-labelledby="product-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              {t("AGENT SCENARIOS", "AGENT 使用场景")}
            </p>
            <h2 id="product-title">
              {isZh ? (
                <>
                  告诉 Agent 你的需求，
                  <br />
                  让它与 Niu 一起完成。
                </>
              ) : (
                <>
                  Start with what
                  <br />
                  you want to achieve.
                </>
              )}
            </h2>
          </div>
          <p>
            {t(
              "Your agent gets the evidence and controls to configure Niu: evaluate candidates, configure routing around your workload, and refine quality, latency and cost from real execution feedback.",
              "Agent 获取决策证据与管理能力，按任务负载评估候选模型并配置 Niu 的路由策略，再根据实际运行反馈持续改善质量、延迟与成本。",
            )}
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const CapabilityIcon = capabilityIcons[index];
            return (
              <article
                key={item.href}
                className="capability"
                data-reveal
                data-spotlight
                style={stagger(index % 3)}
              >
                <div className="capability-top">
                  <span className="capability-icon" aria-hidden="true">
                    <CapabilityIcon size={20} stroke={1.75} />
                  </span>
                  <span className="feature-number">{item.number}</span>
                </div>
                <h3>{isZh ? item.titleZh : item.title}</h3>
                <p>{isZh ? item.descriptionZh : item.description}</p>
                <a className="text-link" href={item.href}>
                  {isZh ? item.labelZh : item.label}{" "}
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. DROP-IN API QUICKSTART */}
      <section
        className="gateway-section"
        id="gateway"
        aria-labelledby="gateway-title"
      >
        <div className="container section gateway-grid">
          <div className="gateway-copy" data-reveal>
            <p className="eyebrow">
              {t("START WITH YOUR AGENT", "从你的 AGENT 开始")}
            </p>
            <h2 id="gateway-title">
              {isZh ? (
                <>
                  说清你想做什么，
                  <br />
                  接入工作交给 Agent。
                </>
              ) : (
                <>
                  Give your agent a goal.
                  <br />
                  Let it handle the setup.
                </>
              )}
            </h2>
            <p className="section-description">
              {t(
                "Connect Claude Code, Codex or DeepSeek Harness without changing your agent's own host model.",
                "连接 Claude Code、Codex 或 DeepSeek Harness，且无需改动 Agent 自身的宿主模型。",
              )}
            </p>
            <ul className="gateway-features">
              {gatewaySteps.map((item) => (
                <li key={item.step}>
                  <span className="gateway-step-badge">{item.step}</span>
                  <div>
                    <strong>{isZh ? item.titleZh : item.title}</strong>
                    <p>{isZh ? item.detailZh : item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="gateway-links">
              <a className="text-link" href="/docs/guides/personal-assistant/">
                {t("Build with Niu", "用 Niu 开发")}{" "}
                <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="https://github.com/niu-io/niu/tree/main/examples/personal-assistant">
                {t("Runnable example", "可运行源码示例")}{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <Tabs className="code-card" data-reveal style={stagger(1)}
            value={codeExamples[activeCodeIndex].id}
            onValueChange={(value) => { setActiveCodeIndex(codeExamples.findIndex((item) => item.id === value)); setCopiedCode(false); }}
          >
            <div className="code-heading">
              <TabsList className="code-tabs" variant="line" aria-label="Agent task prompts">
                {codeExamples.map((example, idx) => (
                  <TabsTrigger key={example.id} value={example.id}>
                    {t(example.label, ["连接", "评估", "改进"][idx])}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button
                variant="ghost"
                type="button"
                className="code-copy-btn"
                onClick={handleCopyCode}
                aria-label={t("Copy agent prompt", "复制 Agent 提示词")}
              >
                {copiedCode ? (
                  <IconCheck size={14} aria-hidden="true" />
                ) : (
                  <IconCopy size={14} aria-hidden="true" />
                )}
                <span>
                  {copiedCode ? t("Copied", "已复制") : t("Copy", "复制")}
                </span>
              </Button>
            </div>
            <div className="code-subbar">
              <span>{isZh ? codeExamples[activeCodeIndex].endpointZh : codeExamples[activeCodeIndex].endpoint}</span>
              <span>{t("Prompt for your agent", "交给 Agent 的提示词")}</span>
            </div>
            {/* Build-time Shiki HTML from maintained task prompts. */}
            {codeExamples.map((example, idx) => (
              <TabsContent key={example.id} value={example.id} className="highlighted-example">
                <div dangerouslySetInnerHTML={{ __html: highlightedCode[idx] }} />
              </TabsContent>
            ))}
            <div className="code-footnote">
              <span className="status-dot is-live"></span>
              <span>
                {t("Scope:", "能力范围：")}{" "}
                <strong>
                  {isZh
                    ? codeExamples[activeCodeIndex].traceZh
                    : codeExamples[activeCodeIndex].trace}
                </strong>
              </span>
            </div>
          </Tabs>
        </div>
      </section>

      {/* 2. PERFORMANCE BENCHMARK (VISUAL CARDS + VERDICT) */}
      <section
        className="section container benchmark-section"
        id="benchmark"
        aria-labelledby="benchmark-title"
      >
        <div className="benchmark-heading" data-reveal>
          <div>
            <p className="eyebrow">
              {t(
                "HISTORICAL GATEWAY BENCHMARKS",
                "历史网关基准测试",
              )}
            </p>
            <h2 id="benchmark-title">
              {isZh ? (
                <>
                  单机 3,239 RPS 峰值吞吐，
                  <br />
                  10.7 倍于 LiteLLM · 3.7 倍于 New API。
                </>
              ) : (
                <>
                  3,239 RPS in Rust.
                  <br />
                  10.7× LiteLLM. 3.7× New API.
                </>
              )}
            </h2>
          </div>
          <p>
            {isZh ? (
              <>
                以下是 Niu v0.2.4 在指定配置下的历史结果，使用基准工具{" "}
                <code>ai-gateway-bench</code>{" "}
                在 Apple M4 与 PostgreSQL 17.11 上测量。这些数据不代表 Niu 0.3 或你的实际模型任务表现。
              </>
            ) : (
              <>
                Historical Niu v0.2.4 results, measured with <code>ai-gateway-bench</code> on Apple M4 with
                PostgreSQL 17.11, Niu sustains 3,239 RPS with full database
                accounting and 18.2 MB idle RAM in this configuration. These are not Niu 0.3 or application task measurements.
              </>
            )}
          </p>
        </div>
          <dl className="hero-stats" aria-label="Measured gateway results">
            {heroStats.map((stat, i) => (
              <div key={stat.label} data-reveal style={stagger(i)}>
                <dt>{isZh ? stat.labelZh : stat.label}</dt>
                <dd>
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>

        <div className="benchmark-method benchmark-method-compact" data-reveal>
          <p>
            {isZh ? (
              <>
                <strong>测试基线：</strong> Niu v0.2.4 开启完整 PostgreSQL ACID 转发前准入与批量完成结算；New API (45fbb14) 开启{" "}
                <code>MEMORY_CACHE_ENABLED=true</code>；LiteLLM Proxy (v1.104.0) 运行于无状态 <code>master_key</code> 模式。
              </>
            ) : (
              <>
                <strong>Test baseline:</strong> Niu v0.2.4 ran with full ACID PostgreSQL pre-dispatch admission and batched completion; New API (45fbb14) ran with{" "}
                <code>MEMORY_CACHE_ENABLED=true</code>; LiteLLM Proxy (v1.104.0) ran in stateless <code>master_key</code> mode.
              </>
            )}
          </p>
          <div className="benchmark-links">
            <a className="text-link" href={links.benchmark}>
              {t(
                "Full benchmark report & methodology",
                "完整基准测试报告与方法论",
              )}{" "}
              <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="/compare/#performance">
              {t("Side-by-side matrix", "横向对比矩阵")}{" "}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. SELF-HOSTED ARCHITECTURE & EVALUATION SCOPE */}
      <section
        className="section container"
        id="release"
        aria-labelledby="release-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              {t(
                "FULL-STACK OPEN SOURCE · SELF-HOSTED",
                "全栈开源 · 私有化自托管",
              )}
            </p>
            <h2 id="release-title">
              {isZh ? (
                <>
                  全栈代码开源可控，
                  <br />
                  单容器连上数据库即可上线。
                </>
              ) : (
                <>
                  Full-stack open source.
                  <br />
                  Deploy with a single PostgreSQL database.
                </>
              )}
            </h2>
          </div>
          <p>
            {t(
              "The gateway, dashboard, and docs are MIT-licensed with zero black-box dependencies or license servers—your data stays 100% yours.",
              "网关、管理控制台与文档站点全部采用 MIT 开源许可，无黑盒依赖、无外部授权服务器，业务数据 100% 掌握在您自己手中。",
            )}
          </p>
        </div>
        <div className="release-grid">
          <article className="release-card" data-reveal data-spotlight>
            <span className="phase available">
              <span className="status-dot is-live"></span>
              {t("READY TO DEPLOY TODAY", "开箱即用 · 立即部署")}
            </span>
            <h3>
              {t("Included in the open-source stack", "全栈开源版本已内置能力")}
            </h3>
            <ul>
              <li>
                {t(
                  "Rust gateway (/v1/chat/completions, /v1/responses, /v1/messages) with MCP and Claude Code, Codex, and DeepSeek Harness packages",
                  "Rust 高性能网关（兼容 /v1/chat/completions、/v1/responses、/v1/messages），内置 MCP 及 Claude Code、Codex、DeepSeek Harness 接入包",
                )}
              </li>
              <li>
                {t(
                  "Internal use mode by default (connect OpenRouter, FastRouter, BabelArk, Qiniu, or DeepSeek with an API key), plus optional Resale mode with customer tariffs and Credits",
                  "默认采用零门槛内部自用模式（填入 API 密钥即可连接 OpenRouter、FastRouter、BabelArk、七牛云、DeepSeek），亦可开启商业转售模式与品牌 Credits",
                )}
              </li>
              <li>
                {t(
                  "Workspace routing policies, fingerprinted task evaluations, and signed webhook event notifications",
                  "工作空间模型路由策略、带指纹的任务样本评估与签名 Webhook 事件通知",
                )}
              </li>
              <li>
                {t(
                  "Task-scoped browser approval, spending caps, Guardrails, phase-timed request logs, and Chat & Seedance Video studio",
                  "按任务范围的浏览器审批、预算上限、安全护栏、分阶段请求日志，以及多模型对话与 Seedance 视频工作台",
                )}
              </li>
            </ul>
            <a className="text-link" href={links.deployment}>
              {t("Single-container deployment guide", "查看单容器部署指南")}{" "}
              <span aria-hidden="true">→</span>
            </a>
          </article>
          <article
            className="release-card upcoming"
            data-reveal
            data-spotlight
            style={stagger(1)}
          >
            <span className="phase">
              {t("CONTINUOUS PRODUCTION QUALIFICATION", "生产级准入持续演进")}
            </span>
            <h3>
              {t(
                "Transparent engineering roadmap",
                "公开透明的生产准入与演进清单",
              )}
            </h3>
            <ul>
              <li>
                {t(
                  "End-to-end v0.3.0 native host package publication and browser consent verification",
                  "v0.3.0 原生宿主接入包正式发布与端到端浏览器授权核验",
                )}
              </li>
              <li>
                {t(
                  "Expanded Provider protocol, streaming, and commercial settlement reconciliation",
                  "持续扩展上游供应商流式协议准入与商业对账结算能力",
                )}
              </li>
              <li>
                {t(
                  "Multi-node high availability, crash recovery, and zero-downtime upgrade verification",
                  "多节点高可用部署、故障自动恢复与零停机平滑升级验证",
                )}
              </li>
            </ul>
            <a className="text-link" href={links.release}>
              {t("Release acceptance matrix", "查看发布准入矩阵")}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </section>

      {/* 6. LATEST BLOG POSTS */}
      {latestPosts.length > 0 && (
        <section
          className="section container landing-blog"
          aria-labelledby="landing-blog-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                {t("FROM THE NIU BLOG", "来自 Niu 博客")}
              </p>
              <h2 id="landing-blog-title">
                {isZh ? (
                  <>
                    来自网关工程团队的
                    <br />
                    架构与产品实践笔记。
                  </>
                ) : (
                  <>
                    Engineering notes from
                    <br />
                    the gateway team.
                  </>
                )}
              </h2>
            </div>
            <div className="landing-blog-intro">
              <p>
                {t(
                  "Model access, token usage and reliable API integration in practice.",
                  "分享模型接入、Token 用量管理与调用可靠性的工程实践。",
                )}
              </p>
              <a className="text-link" href="/blog/">
                {t("All articles", "全部文章")}{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div
            className={`landing-blog-list${latestPosts.length === 1 ? " is-single" : ""}`}
          >
            {latestPosts.map((post, index) => (
              <a
                key={post.href}
                className="landing-blog-card"
                href={post.href}
                data-reveal
                data-spotlight
                style={stagger(index)}
              >
                <div className="landing-blog-main">
                  <div className="landing-blog-meta">
                    <span className="landing-blog-category">
                      {isZh && post.chineseCategory ? post.chineseCategory : post.category}
                    </span>
                    <time dateTime={post.publishedAt}>{isZh && post.chineseDateLabel ? post.chineseDateLabel : post.dateLabel}</time>
                    <span>{isZh && post.chineseReadingTime ? post.chineseReadingTime : post.readingTime}</span>
                  </div>
                  <h3>
                    {isZh && post.chineseTitle ? post.chineseTitle : post.title}
                  </h3>
                  <p>{isZh && post.chineseDescription ? post.chineseDescription : post.description}</p>
                  <span className="text-link">
                    {t("Read article", "阅读全文")}{" "}
                    <IconArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 7. CONCISE FAQ */}
      <section
        className="section container faq-section"
        aria-labelledby="faq-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              {t("FREQUENTLY ASKED QUESTIONS", "常见问题解答 (FAQ)")}
            </p>
            <h2 id="faq-title">
              {isZh ? (
                <>
                  在投入生产环境前
                  <br />
                  最受关注的核心问题。
                </>
              ) : (
                <>
                  Key questions before
                  <br />
                  you run in production.
                </>
              )}
            </h2>
          </div>
          <div className="faq-intro">
            <p>
              {t(
                "How agents connect, what they can do today, and where your review is needed.",
                "了解 Agent 如何接入、目前能做什么，以及哪些环节需要你审核。",
              )}
            </p>
            <div className="faq-intro-links">
              <a className="text-link" href="/docs/">
                {t("Read the docs", "阅读技术文档")}{" "}
                <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href={`${links.repo}/issues`}>
                {t("Ask on GitHub", "在 GitHub 提问")}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                <span className="faq-meta">
                  <span className="faq-index">{faq.index}</span>
                  <span className="faq-category">
                    {isZh ? faq.categoryZh : faq.category}
                  </span>
                </span>
                <span className="faq-question">
                  {isZh ? faq.questionZh : faq.question}
                </span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>{isZh ? faq.answerZh : faq.answer}</p>
                <a className="text-link faq-doc-link" href={faq.linkHref}>
                  {isZh ? faq.linkLabelZh : faq.linkLabel}{" "}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 8. CLOSING CTA */}
      <section
        className="closing-stage container"
        aria-labelledby="closing-title"
      >
        <div className="closing" data-reveal>
          <span className="closing-glow" aria-hidden="true" />
          <p className="eyebrow">
            {t(
              "AGENT-FRIENDLY · COST-EFFICIENT · HIGH-PERFORMANCE",
              "面向智能体 · 追求性价比 · 高性能",
            )}
          </p>
          <h2 id="closing-title">
            {isZh ? (
              <>
                把你的需求，
                <br />
                <span className="accent">交给连接了 Niu 的 Agent。</span>
              </>
            ) : (
              <>
                Bring your next task.
                <br />
                <span className="accent">Connect your agent to Niu.</span>
              </>
            )}
          </h2>
          <p className="closing-copy">
            {t(
              "Use the guided workflow and runnable example. Your agent handles setup and reads the references; you review the results.",
              "从引导流程和可运行示例开始。Agent 负责接入并按需查阅参考文档，你负责审阅结果。",
            )}
          </p>
          <div className="actions hero-actions">
            <Button asChild size="lg" className="cta-primary">
              <a href="/docs/guides/personal-assistant/">
                <IconPlugConnected aria-hidden="true" />
                {t("Build with Niu", "用 Niu 开发")}
                <IconArrowRight className="cta-arrow" aria-hidden="true" />
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
        </div>
      </section>
    </main>
  );
}
