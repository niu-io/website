import { useEffect, useRef, useState } from "react";
import { useLandingMotion } from "./landing-motion";
import { useLocale } from "./locale";
import {
  IconArrowRight,
  IconBell,
  IconBook,
  IconBrandGithub,
  IconChartBar,
  IconCheck,
  IconCopy,
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
  foundationFacts,
  protocolExamples,
  protocolNames,
  workflowSteps,
} from "../content/landing";

function currentDeploymentOrigin() {
  if (typeof window === "undefined") return "https://niu.io";
  return window.location.origin || "https://niu.io";
}

function buildInstallationPrompt(origin: string) {
  const deployment = origin.replace(/\/$/, "") || "https://niu.io";
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
      "POST /v1/chat/completions → model claude-sonnet-4 (upstream attempt 1 HTTP 401 not charged → attempt 2 Anthropic HTTP 200 settled $0.0180)",
    rawPreviewZh:
      "POST /v1/chat/completions → 模型 claude-sonnet-4（上游尝试 1 HTTP 401 未计费 → 尝试 2 Anthropic HTTP 200 已结算 $0.0180）",
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
      "POST /v1/chat/completions → model gpt-4.1 (structured_output validated against JSON schema, settled $0.0118).",
    rawPreviewZh:
      "POST /v1/chat/completions → 模型 gpt-4.1（结构化输出通过 JSON Schema 校验，已结算 $0.0118）。",
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
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [previewPaused, setPreviewPaused] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedLogIndex, setSelectedLogIndex] = useState(0);
  const [showVolumeChart, setShowVolumeChart] = useState(false);
  const [activeGenerationsMode, setActiveGenerationsMode] = useState<
    "chat" | "video"
  >("chat");
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

  const activeTab = previewTabs[activePreviewIndex] ?? previewTabs[0];
  const activeProtocol =
    protocolExamples[activeProtocolIndex] ?? protocolExamples[0];
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
            <span className="release-tag">Niu 0.3</span>
            <span>
              {t(
                "Native agent packages, routing and evaluations",
                "原生 Agent 接入、模型路由与评测",
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
                让 Agent 发现与评测模型、配置路由，
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
                  "把这句话交给你的 coding agent",
                )}
              </strong>
              <a href="/docs/install.md">
                {t("Niu 0.3 install contract", "Niu 0.3 接入规范")}
              </a>
            </div>
            <code className="hero-install-prompt">{installationPrompt}</code>
            <div className="hero-install-footer">
              <p>
                {t(
                  "Paste into Claude Code, Codex or DeepSeek Harness. Your agent checks availability and opens Niu for sign-in and approval.",
                  "粘贴至 Claude Code、Codex 或 DeepSeek Harness。Agent 检查可用性并打开 Niu 完成登录与授权审批。",
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
              {!sidebarCollapsed && (
                <aside
                  className="demo-context-sidebar"
                  aria-label="Section navigation"
                >
                  <div className="demo-sidebar-header">
                    <a
                      href="/workspaces/default/"
                      className="flex items-center gap-2 font-semibold"
                    >
                      <img
                        src="/site-assets/brand/niu-mark.png"
                        width="26"
                        height="26"
                        alt=""
                      />
                      Niu
                    </a>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => setActivePreviewIndex(0)}
                    >
                      <FolderKey size={18} />
                      {t("Workspace", "工作空间")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => setActivePreviewIndex(1)}
                    >
                      <IconSparkles size={18} />
                      {t("Generations", "生成对话")}
                    </Button>
                  </div>
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
                              {t(
                                "deepseek-r1 · 1h ago",
                                "deepseek-r1 · 1 小时前",
                              )}
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
                              setSelectedLogIndex((prev) =>
                                prev === 1 ? 3 : 1,
                              )
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
                                  "Model: claude-sonnet-4",
                                  "模型：claude-sonnet-4",
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
                                              {(isZh
                                                ? row.timeZh
                                                : row.time
                                              ).replace(
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
                                  ·{" "}
                                  {isZh ? selectedLog.timeZh : selectedLog.time}
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

                  {/* SURFACE 2: GENERATIONS · CHAT COMPARISON & SEEDANCE VIDEO (PlaygroundView.tsx + VideoView.tsx) */}
                  {activePreviewIndex === 1 && (
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
                                "Summarize the Q3 usage report in two sentences.",
                                "用两句话总结第三季度用量报告。",
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
                                    <small>{t("Anthropic", "Anthropic")}</small>
                                  </div>
                                </div>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  {t(
                                    "Completed · 1,180 ms",
                                    "已完成 · 1,180 ms",
                                  )}
                                </span>
                              </div>
                              <div className="demo-chat-card-body">
                                <p>
                                  {t(
                                    "Usage increased in Q3. Most requests came from support workflows.",
                                    "第三季度用量上升。大部分请求来自客服流程。",
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
                                      {t("OpenAI Direct", "OpenAI Direct")}
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
                                  {t(
                                    "Support accounted for most requests. Usage grew over the previous quarter.",
                                    "客服流程占请求量的大部分。用量比上季度有所增长。",
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
                                  <dt>
                                    {t("Workspace assets", "工作空间素材")}
                                  </dt>
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
                                <strong>
                                  {t("Video billing", "视频计费明细")}
                                </strong>
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
                      "Illustrative dashboard data · Inspect logs and generations in Niu",
                      "控制台示例数据 · 在 Niu 中查看请求日志与生成结果",
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
                  由你的 Agent 直接操作。
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
              "Niu 提供可信证据与授权能力，模型与成本取舍由 Agent 决定，重要变更由你审核。",
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
                    接入工作交给 Agent。
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
                "Works with Claude Code, Codex and DeepSeek Harness without changing the agent's own host model.",
                "支持 Claude Code、Codex 与 DeepSeek Harness，且不改动 Agent 自身的宿主模型。",
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
                  一把 Niu 密钥统一管理。
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
              "单容器加 PostgreSQL 即可运行 Niu，推理请求仍发往你配置的上游供应商。",
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
            "Niu 0.3 is a release candidate. Native host packages remain under release qualification;",
            "Niu 0.3 仍为候选版本，原生宿主接入包尚在发布准入验证中；",
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
