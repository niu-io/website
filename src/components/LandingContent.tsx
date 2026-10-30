import { useEffect, useRef, useState } from "react";
import { CountUp, useLandingMotion } from "./landing-motion";
import { useLocale } from "./locale";
import {
  IconArrowRight,
  IconBolt,
  IconBook,
  IconBrandGithub,
  IconChartLine,
  IconCheck,
  IconCoins,
  IconCopy,
  IconHistory,
  IconLayoutDashboard,
  IconListSearch,
  IconMessageChatbot,
  IconPlugConnected,
  IconRoute,
  IconScale,
  IconSearch,
  IconServerBolt,
  IconShieldLock,
  IconSparkles,
  IconTimeline,
} from "@tabler/icons-react";
import {
  Activity,
  BarChart3,
  ChevronsUpDown,
  CreditCard,
  Film,
  FolderKey,
  KeyRound,
  List,
  Palette,
  PanelLeft,
  Plus,
  Receipt,
  RefreshCw,
  ScrollText,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  links,
  pillars,
  capabilities,
  faqs,
  codeExamples,
  heroStats,
} from "../content/landing";
import { benchmarkSteps, benchmarkSuites } from "../content/benchmarks";

const pillarIcons = [IconBolt, IconScale, IconTimeline, IconServerBolt];
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
    label: "Admin · Route pools",
    labelZh: "管理后台 · 路由池",
    breadcrumb: "Admin / Route pools",
    breadcrumbZh: "管理后台 / 路由池",
    railArea: "admin" as const,
  },
  {
    id: "billing",
    label: "Admin · Financial statements",
    labelZh: "管理后台 · 财务报表",
    breadcrumb: "Admin / Financial statements",
    breadcrumbZh: "管理后台 / 财务报表",
    railArea: "admin" as const,
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
    model: "claude-sonnet-4",
    providerSub: "Anthropic · claude-sonnet-4-20250514",
    providerBadge: "A",
    status: "Completed",
    statusTone: "completed" as const,
    duration: "1,180 ms",
    durationSub: "Attempt 2 of 2 · failover",
    inputTokens: "412",
    cachedTokens: "256",
    outputTokens: "128",
    reasoningTokens: "0",
    charge: "$0.0180",
    chargeSub: "Settled tariff",
    apiKey: "prod-backend",
    finishReason: "stop",
    deliveryStatus: "Completed · Customer tariff settled",
    providerStatus: "HTTP 200 OK",
    throughput: "128 output tokens · 148.8 tok/s",
    phases: [
      {
        label: "Preparation",
        duration: "2.1 ms",
        pct: 6,
        tone: "prep" as const,
      },
      {
        label: "First output wait",
        duration: "318 ms",
        pct: 27,
        tone: "ttft" as const,
      },
      {
        label: "Output stream",
        duration: "860 ms",
        pct: 67,
        tone: "stream" as const,
      },
    ],
    rawPreview:
      "POST /v1/chat/completions → pool claude-sonnet-4 (attempt 1 HTTP 401 not charged → attempt 2 Anthropic HTTP 200 settled $0.0180)",
  },
  {
    time: "Oct 19, 14:22:07",
    model: "claude-sonnet-4",
    providerSub: "OpenRouter · anthropic/claude-sonnet-4",
    providerBadge: "OR",
    status: "Failed · HTTP 401",
    statusTone: "failed" as const,
    duration: "3.2 ms",
    durationSub: "Attempt 1 · route cooldown",
    inputTokens: "0",
    cachedTokens: "0",
    outputTokens: "0",
    reasoningTokens: "0",
    charge: "Not charged",
    chargeSub: "Pre-stream rejection",
    apiKey: "prod-backend",
    finishReason: "upstream_auth_error",
    deliveryStatus: "Not executed · Hold transferred to Attempt 2",
    providerStatus: "HTTP 401 Unauthorized",
    throughput: "0 output tokens · Failover triggered",
    phases: [
      {
        label: "Preparation",
        duration: "1.8 ms",
        pct: 56,
        tone: "prep" as const,
      },
      {
        label: "First output wait",
        duration: "1.4 ms",
        pct: 44,
        tone: "failed" as const,
      },
      {
        label: "Output stream",
        duration: "—",
        pct: 0,
        tone: "stream" as const,
      },
    ],
    rawPreview:
      "Upstream HTTP 401 on candidate claude-sonnet-4-openrouter; route entered 60s auth cooldown and request failed over to claude-sonnet-4-anthropic.",
  },
  {
    time: "Oct 19, 14:19:41",
    model: "deepseek-r1",
    providerSub: "OpenRouter · deepseek/deepseek-r1",
    providerBadge: "DS",
    status: "Uncertain",
    statusTone: "uncertain" as const,
    duration: "4,820 ms",
    durationSub: "Stream dropped mid-flight",
    inputTokens: "620",
    cachedTokens: "0",
    outputTokens: "—",
    reasoningTokens: "194",
    charge: "Unresolved",
    chargeSub: "Explicitly unbilled",
    apiKey: "eval-runner",
    finishReason: "stream_interrupted",
    deliveryStatus: "Uncertain · Never fabricated as $0.00",
    providerStatus: "HTTP 200 (SSE interrupted)",
    throughput: "Partial stream · Reconciliation required",
    phases: [
      {
        label: "Preparation",
        duration: "2.4 ms",
        pct: 5,
        tone: "prep" as const,
      },
      {
        label: "First output wait",
        duration: "610 ms",
        pct: 18,
        tone: "ttft" as const,
      },
      {
        label: "Output stream",
        duration: "4,207 ms",
        pct: 77,
        tone: "uncertain" as const,
      },
    ],
    rawPreview:
      "SSE stream closed before terminal usage chunk; recorded as Uncertain / Unresolved so customer bills never fake a $0 completion.",
  },
];

const demoRoutePools = [
  {
    alias: "claude-sonnet-4",
    revision: "Revision 4",
    scopeBadge: "Shared pool",
    scopeSub: "Shared across workspaces",
    enabledSummary: "3 of 3 candidates enabled",
    status: "Enabled",
    maxAttempts: "Max 2 attempts per request",
    candidates: [
      {
        alias: "claude-sonnet-4-anthropic",
        provider: "Anthropic Direct",
        priority: 100,
        weight: 800,
        tierShare: "80% primary tier share",
        sharePct: 80,
        cooldown: "No active cooldown · 0 / 3 auth failures in 60s",
        status: "Enabled · Primary",
        isPrimary: true,
      },
      {
        alias: "claude-sonnet-4-openrouter",
        provider: "OpenRouter Enterprise",
        priority: 100,
        weight: 200,
        tierShare: "20% primary tier share",
        sharePct: 20,
        cooldown: "No active cooldown · 0 / 3 auth failures in 60s",
        status: "Enabled · Primary",
        isPrimary: true,
      },
      {
        alias: "claude-sonnet-4-vertex",
        provider: "Google Vertex AI",
        priority: 50,
        weight: 1000,
        tierShare: "100% standby tier (P50)",
        sharePct: 100,
        cooldown: "Standby failover ready · 0 / 3 in 60s",
        status: "Enabled · Standby",
        isPrimary: false,
      },
    ],
  },
  {
    alias: "gpt-4.1",
    revision: "Revision 2",
    scopeBadge: "Shared pool",
    scopeSub: "Shared across workspaces",
    enabledSummary: "2 of 2 candidates enabled",
    status: "Enabled",
    maxAttempts: "Max 2 attempts per request",
    candidates: [
      {
        alias: "gpt-4.1-openai-direct",
        provider: "OpenAI Direct",
        priority: 100,
        weight: 900,
        tierShare: "90% primary tier share",
        sharePct: 90,
        cooldown: "No active cooldown · 0 / 3 auth failures in 60s",
        status: "Enabled · Primary",
        isPrimary: true,
      },
      {
        alias: "gpt-4.1-azure-east",
        provider: "Azure OpenAI",
        priority: 50,
        weight: 1000,
        tierShare: "100% standby tier (P50)",
        sharePct: 100,
        cooldown: "Standby failover ready · 0 / 3 in 60s",
        status: "Enabled · Standby",
        isPrimary: false,
      },
    ],
  },
  {
    alias: "deepseek-r1",
    revision: "Revision 5",
    scopeBadge: "Organization pool",
    scopeSub: "Private to Acme Robotics",
    enabledSummary: "3 of 3 candidates enabled",
    status: "Enabled",
    maxAttempts: "Max 2 attempts per request",
    candidates: [
      {
        alias: "deepseek-r1-volcengine",
        provider: "Volcengine Ark",
        priority: 100,
        weight: 700,
        tierShare: "70% primary tier share",
        sharePct: 70,
        cooldown: "No active cooldown · 0 / 3 auth failures in 60s",
        status: "Enabled · Primary",
        isPrimary: true,
      },
      {
        alias: "deepseek-r1-openrouter",
        provider: "OpenRouter Enterprise",
        priority: 100,
        weight: 300,
        tierShare: "30% primary tier share",
        sharePct: 30,
        cooldown: "No active cooldown · 0 / 3 auth failures in 60s",
        status: "Enabled · Primary",
        isPrimary: true,
      },
      {
        alias: "deepseek-r1-together",
        provider: "Together AI",
        priority: 50,
        weight: 1000,
        tierShare: "100% standby tier (P50)",
        sharePct: 100,
        cooldown: "Standby failover ready · 0 / 3 in 60s",
        status: "Enabled · Standby",
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
  {
    step: "01",
    title: "Choose a model for your application",
    titleZh: "第一步：选择适合应用的模型",
    detail:
      "Browse available models, check capabilities and prices, and choose the model that fits your workload.",
    detailZh:
      "浏览可用模型，核对能力与价格，选择适合实际工作负载的模型。",
  },
  {
    step: "02",
    title: "Issue workspace API keys with model & budget limits",
    titleZh: "第二步：为应用配置密钥与预算",
    detail:
      "Create a workspace API key, limit its model access, and set a spending cap for your application.",
    detailZh:
      "创建工作空间 API 密钥，限制可调用的模型范围，并为应用设置消费上限。",
  },
  {
    step: "03",
    title: "Change one Base URL—Niu handles failover and billing",
    titleZh: "第三步：改一行地址直接调用，自动完成扣费与对账",
    detail:
      "Clients stream responses with zero code changes while Niu handles automatic failover, token metering, and real-time billing.",
    detailZh:
      "按文档接入流式调用，集中查看请求状态、Token 用量、耗时与费用。",
  },
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
  const [showVolumeChart, setShowVolumeChart] = useState(true);
  const [activeLogTab, setActiveLogTab] = useState<
    "response" | "request" | "raw"
  >("response");
  const [selectedPoolIndex, setSelectedPoolIndex] = useState(0);
  const [activeFinancialTab, setActiveFinancialTab] = useState<
    "pnl" | "providers"
  >("pnl");
  const [activeGenerationsMode, setActiveGenerationsMode] = useState<
    "chat" | "video"
  >("chat");
  const [activeSuiteIndex, setActiveSuiteIndex] = useState(0);
  const [activeCodeIndex, setActiveCodeIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useLandingMotion(mainRef);
  const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

  useEffect(() => {
    if (previewPaused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      setActivePreviewIndex((prev) => prev === 0 ? 3 : 0);
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
  const selectedPool = demoRoutePools[selectedPoolIndex] ?? demoRoutePools[0];

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
                "Performance · Reliability · Economy",
                "性能 · 可靠性 · 经济性",
              )}
            </span>
            <IconArrowRight size={14} aria-hidden="true" />
          </a>
          <h1 id="hero-title" className="hero-enter" style={stagger(1)}>
            {isZh ? (
              <>
                让每一份 Token，
                <br />
                <span className="accent">发挥更大价值。</span>
              </>
            ) : (
              <>
                Make every
                <br />
                <span className="accent">token count.</span>
              </>
            )}
          </h1>
          <p className="hero-description hero-enter" style={stagger(2)}>
            {t(
              "The Token Platform for developers and teams. Access models with performance and reliability, and keep token usage and spending under control.",
              "面向开发者与团队的 Token 平台。高效、可靠地接入模型，集中管理密钥、用量与预算，让每次调用和支出都有据可查。",
            )}
          </p>
          <div className="actions hero-actions hero-enter" style={stagger(3)}>
            <Button asChild size="lg" className="cta-primary">
              <a href={links.dashboard}>
                <IconLayoutDashboard aria-hidden="true" />
                {t("Open dashboard", "打开控制台")}
                <IconArrowRight className="cta-arrow" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-secondary"
            >
              <a href={links.quickstart}>{t("Get started", "快速入门")}</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="cta-ghost">
              <a href={links.repo}>
                <IconBrandGithub aria-hidden="true" />
                {t("Star on GitHub", "GitHub Star")}
              </a>
            </Button>
          </div>
          <p className="hero-sublinks hero-enter" style={stagger(4)}>
            <a href={links.compare}>{t("Compare gateways", "网关对比")}</a>
            <span aria-hidden="true">·</span>
            <a href="/models/">{t("Browse models", "浏览模型目录")}</a>
            <span aria-hidden="true">·</span>
            <a href="/blog/why-niu/">{t("Why Niu?", "为什么选择牛元？")}</a>
          </p>

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

          {/* Interactive Product UI Preview Window — Actual Niu Dashboard v0.2.23 Replica */}
          <div
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
                    aria-label="Workspace"
                    title="Workspace · Logs"
                    onClick={() => setActivePreviewIndex(0)}
                  >
                    <FolderKey size={18} />
                  </button>
                  <button
                    type="button"
                    className={`mock-rail-btn${activeTab.railArea === "generations" ? " is-active" : ""}`}
                    aria-label="Generations"
                    title="Generations · Chat & Video"
                    onClick={() => setActivePreviewIndex(3)}
                  >
                    <IconSparkles size={19} stroke={1.75} />
                  </button>
                  <button
                    type="button"
                    className="mock-rail-btn"
                    aria-label="Activity & Logs"
                    title="Workspace · Logs & Timing"
                    onClick={() => setActivePreviewIndex(0)}
                  >
                    <IconChartLine size={19} stroke={1.75} />
                  </button>

                </div>
                <div className="demo-rail-footer">


                  <span className="demo-rail-avatar" title="Your account">
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
                          className="demo-sidebar-item is-active"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <List size={15} />
                          <span>{t("Logs", "请求日志")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => {
                            setActivePreviewIndex(3);
                            setActiveGenerationsMode("video");
                          }}
                        >
                          <Film size={15} />
                          <span>{t("Video", "视频生成")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <ShieldAlert size={15} />
                          <span>{t("Guardrails", "安全护栏")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <BarChart3 size={15} />
                          <span>{t("Activity", "活动监控")}</span>
                        </button>

                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <Users size={15} />
                          <span>{t("Users", "成员管理")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <Settings size={15} />
                          <span>{t("Settings", "工作空间设置")}</span>
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

                  {activeTab.railArea === "admin" && (
                    <>
                      <div className="demo-sidebar-header">
                        <span className="demo-sidebar-title">
                          {t("Admin", "管理后台")}
                        </span>
                      </div>
                      <nav className="demo-sidebar-nav" aria-label="Admin menu">
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <IconPlugConnected size={15} />
                          <span>{t("Providers", "模型供应商")}</span>
                        </button>
                        <button
                          type="button"
                          className={`demo-sidebar-item${activePreviewIndex === 1 ? " is-active" : ""}`}
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <IconRoute size={15} />
                          <span>{t("Route pools", "路由池")}</span>
                        </button>
                        <button
                          type="button"
                          className={`demo-sidebar-item${activePreviewIndex === 2 ? " is-active" : ""}`}
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <IconCoins size={15} />
                          <span>{t("Financial statements", "财务报表")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <Users size={15} />
                          <span>{t("Customer accounts", "客户账户")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <Receipt size={15} />
                          <span>{t("Customer pricing", "客户定价")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <CreditCard size={15} />
                          <span>{t("Payment gateways", "支付网关")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <Palette size={15} />
                          <span>{t("Branding & theme", "品牌与主题")}</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <ScrollText size={15} />
                          <span>{t("Audit logs", "审计日志")}</span>
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
                            <small>claude-sonnet-4 + gpt-4.1 · 2m</small>
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
                            <small>seedance-1-5-pro · 1080p · 6m</small>
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
                            <small>deepseek-r1 · 1h ago</small>
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
                        sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                      }
                      title={
                        sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
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
                    {previewTabs.map((tab, i) => ({tab, i})).filter(({i}) => i === 0 || i === 3).map(({tab, i}) => (
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
                              "Inspect every workspace operation, upstream route-pool attempt, phase latency, and settled customer tariff.",
                              "检视工作空间的每一次请求操作、上游路由池尝试、分阶段延迟与已结算的客户费率。",
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
                            onClick={() => setSelectedLogIndex(1)}
                          >
                            <ShieldAlert size={13} />
                            <span>{t("Blocked & failed", "拦截与失败")}</span>
                          </button>
                          <button
                            type="button"
                            className="demo-icon-btn"
                            aria-label="Refresh requests"
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
                                title="Filter requests"
                              >
                                <IconSearch size={13} />
                              </span>
                              <span className="demo-filter-chip is-active">
                                {t("All statuses", "全部状态")}
                              </span>
                              <span className="demo-filter-chip">
                                {t(
                                  "Pool: claude-sonnet-4",
                                  "路由池：claude-sonnet-4",
                                )}
                              </span>
                            </div>
                            <div className="demo-subtoolbar-right">
                              <span className="demo-filter-chip">
                                {t("All time", "全部时间")}
                              </span>
                              <span
                                className="demo-toolbar-icon-pill"
                                title="Columns"
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
                                              {row.time.replace("Oct 19, ", "")}{" "}
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
                                          {row.status}
                                        </span>
                                      </td>
                                      <td className="is-right">
                                        <strong
                                          className={`demo-charge-text is-${row.statusTone}`}
                                        >
                                          {row.charge}
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
                                <small>· {selectedLog.time}</small>
                              </h3>
                            </div>
                            <span
                              className={`demo-status-pill is-${selectedLog.statusTone}`}
                            >
                              <i className="demo-status-dot" />
                              {selectedLog.status}
                            </span>
                          </div>

                          <div className="demo-drawer-metrics">
                            <div>
                              <span>{t("Gateway latency", "网关延迟")}</span>
                              <strong>{selectedLog.duration}</strong>
                            </div>
                            <div>
                              <span>{t("Customer charge", "客户费用")}</span>
                              <strong>{selectedLog.charge}</strong>
                            </div>
                            <div>
                              <span>{t("Input tokens", "输入 Token")}</span>
                              <strong>
                                {selectedLog.inputTokens}{" "}
                                <small>
                                  {t("Cached", "缓存")}{" "}
                                  {selectedLog.cachedTokens}
                                </small>
                              </strong>
                            </div>
                            <div>
                              <span>{t("Output tokens", "输出 Token")}</span>
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
                                {t("Gateway latency:", "网关延迟：")}{" "}
                                {selectedLog.duration}
                              </span>
                            </div>
                            <div className="demo-timing-rows">
                              {selectedLog.phases.map((phase) => (
                                <div
                                  key={phase.label}
                                  className="demo-timing-row"
                                >
                                  <div className="demo-timing-label">
                                    <span>{phase.label}</span>
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
                            <div className="demo-timing-footer">
                              <span>{selectedLog.throughput}</span>
                              <span>
                                {t("Total:", "总计：")} {selectedLog.duration}
                              </span>
                            </div>
                          </div>

                          <dl className="demo-drawer-dl">
                            <div>
                              <dt>{t("Provider model", "供应商模型")}</dt>
                              <dd>{selectedLog.providerSub}</dd>
                            </div>
                            <div>
                              <dt>{t("Provider status", "上游状态")}</dt>
                              <dd>{selectedLog.providerStatus}</dd>
                            </div>
                            <div>
                              <dt>{t("Delivery & billing", "交付与计费")}</dt>
                              <dd>{selectedLog.deliveryStatus}</dd>
                            </div>
                            <div>
                              <dt>{t("API key", "API 密钥")}</dt>
                              <dd className="demo-mono-cell">
                                {selectedLog.apiKey}
                              </dd>
                            </div>
                          </dl>

                          <div className="demo-drawer-tabs">
                            {(["response", "request", "raw"] as const).map(
                              (tabKey) => (
                                <button
                                  key={tabKey}
                                  type="button"
                                  className={
                                    activeLogTab === tabKey
                                      ? "is-active"
                                      : undefined
                                  }
                                  onClick={() => setActiveLogTab(tabKey)}
                                >
                                  {tabKey === "response"
                                    ? t("Response", "响应")
                                    : tabKey === "request"
                                      ? t("Request", "请求")
                                      : t("Raw trace", "原始追踪")}
                                </button>
                              ),
                            )}
                          </div>
                          <div className="demo-drawer-code">
                            {activeLogTab === "response" && (
                              <code>{selectedLog.rawPreview}</code>
                            )}
                            {activeLogTab === "request" && (
                              <code>{`POST /v1/chat/completions · model: "${selectedLog.model}" · stream: true · key: ${selectedLog.apiKey}`}</code>
                            )}
                            {activeLogTab === "raw" && (
                              <code>{`finish_reason: "${selectedLog.finishReason}" · status: "${selectedLog.status}" · charge: "${selectedLog.charge}"`}</code>
                            )}
                          </div>
                        </aside>
                      </div>
                    </div>
                  )}

                  {/* SURFACE 1: ADMIN / ROUTE POOLS (features/route-pools/page.tsx) */}
                  {activePreviewIndex === 1 && (
                    <div className="investigation demo-page-surface">
                      <div className="demo-page-header">
                        <div>
                          <div className="demo-page-title-row">
                            <h2>{t("Route pools", "路由池")}</h2>
                            <span className="demo-count-badge">
                              {t("3 active pools", "3 个活跃路由池")}
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            {t(
                              "Group multiple Provider model mappings under a single Niu alias with priority tiers and weighted selection. Highest eligible priority wins, with weighted selection inside that tier.",
                              "将多个供应商模型映射聚合在单一 Niu 别名下，按优先级分层与权重分配流量：最高可用优先级胜出，同层内按权重均衡。",
                            )}
                          </p>
                        </div>
                        <div className="demo-header-actions">
                          <button
                            type="button"
                            className="demo-action-btn"
                            onClick={() => setActivePreviewIndex(2)}
                          >
                            <IconPlugConnected size={13} />
                            <span>{t("Providers", "模型供应商")}</span>
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
                            <Plus size={13} />
                            <span>{t("Create route pool", "新建路由池")}</span>
                          </button>
                        </div>
                      </div>

                      <div className="demo-subtoolbar">
                        <div className="demo-subtoolbar-left">
                          <span
                            className="demo-toolbar-icon-pill"
                            title="Search route pools"
                          >
                            <IconSearch size={13} />
                          </span>
                          <span className="demo-filter-chip is-active">
                            {t("All scopes (3)", "全部范围 (3)")}
                          </span>
                          <span className="demo-filter-chip">
                            {t("Shared pools (2)", "共享路由池 (2)")}
                          </span>
                          <span className="demo-filter-chip">
                            {t("Organization pools (1)", "组织路由池 (1)")}
                          </span>
                        </div>
                        <div className="demo-subtoolbar-right">
                          <span className="demo-toolbar-meta">
                            {t(
                              "Click a route pool to inspect candidate priority & weights",
                              "点击路由池以检视候选路由的优先级与权重",
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="comparison-scroll demo-table-scroll">
                        <table
                          className="comparison-matrix demo-data-table"
                          aria-label="Model route pools"
                        >
                          <thead>
                            <tr>
                              <th>{t("Pool alias", "路由池别名")}</th>
                              <th>{t("Scope", "共享范围")}</th>
                              <th>{t("Candidate routes", "候选路由")}</th>
                              <th>{t("Status", "状态")}</th>
                              <th>{t("Actions", "操作")}</th>
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
                                        <small>{pool.revision}</small>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="demo-outline-badge">
                                      {pool.scopeBadge}
                                    </span>
                                    <small>{pool.scopeSub}</small>
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
                                    <small>{pool.enabledSummary}</small>
                                  </td>
                                  <td>
                                    <span className="demo-status-pill is-completed">
                                      <i className="demo-status-dot" />
                                      {pool.status}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="demo-row-actions">
                                      <button
                                        type="button"
                                        className="demo-action-btn is-sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedPoolIndex(idx);
                                        }}
                                      >
                                        Edit pool
                                      </button>
                                      <span
                                        className="demo-toolbar-icon-pill"
                                        title="Revision history"
                                      >
                                        <IconHistory size={13} />
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Selected Pool Candidate Route Inspector */}
                      <div className="demo-pool-inspector">
                        <div className="demo-pool-inspector-header">
                          <div>
                            <span className="demo-drawer-eyebrow">
                              Candidate routes · {selectedPool.alias} (
                              {selectedPool.revision})
                            </span>
                            <h3>
                              Priority tier weights &amp; temporary auth
                              cooldown state
                            </h3>
                          </div>
                          <span className="demo-outline-badge">
                            {selectedPool.maxAttempts}
                          </span>
                        </div>
                        <div className="demo-pool-candidates-grid">
                          {selectedPool.candidates.map((cand) => (
                            <div
                              key={cand.alias}
                              className={`demo-candidate-card${cand.isPrimary ? " is-primary-tier" : ""}`}
                            >
                              <div className="demo-candidate-card-top">
                                <strong>{cand.alias}</strong>
                                <span className="demo-outline-badge">
                                  Priority {cand.priority}
                                </span>
                              </div>
                              <p className="demo-candidate-provider">
                                {cand.provider}
                              </p>
                              <div className="route-weight-cell">
                                <span>
                                  Weight {cand.weight} · {cand.tierShare}
                                </span>
                                <i className="route-weight-bar">
                                  <b
                                    style={{
                                      width: `${cand.sharePct}%`,
                                      opacity: cand.isPrimary ? 1 : 0.45,
                                    }}
                                  />
                                </i>
                              </div>
                              <div className="demo-candidate-meta">
                                <span>{cand.cooldown}</span>
                                <strong>{cand.status}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SURFACE 2: ADMIN / FINANCIAL STATEMENTS (features/commercial-position/page.tsx) */}
                  {activePreviewIndex === 2 && (
                    <div className="investigation demo-page-surface">
                      <div className="demo-page-header">
                        <div>
                          <div className="demo-page-title-row">
                            <h2>{t("Financial statements", "财务报表")}</h2>
                            <span className="demo-count-badge">
                              {t("Accrual + Cash flow", "权责发生制 + 现金流")}
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            {t(
                              "October 2026 (Month to date) · Compared against Sept 2026 (same MTD span) · Personal owner-funded calls are excluded from commercial revenue and cost.",
                              "2026 年 10 月（月初至今）· 对比 2026 年 9 月同期 · 个人所有者自付调用已从商业收入与成本中剔除。",
                            )}
                          </p>
                        </div>
                        <div className="demo-header-actions">
                          <span className="demo-filter-chip">
                            {t(
                              "Month to date (Current month)",
                              "月初至今（当月）",
                            )}
                          </span>
                          <span className="demo-filter-chip">
                            {t("Currency: $ USD", "币种：$ USD")}
                          </span>
                        </div>
                      </div>

                      {/* Line Tabs: Financial summary (P&L) | Provider positions */}
                      <div
                        className="demo-line-tabs"
                        role="tablist"
                        aria-label="Financial statement views"
                      >
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activeFinancialTab === "pnl"}
                          className={
                            activeFinancialTab === "pnl"
                              ? "is-active"
                              : undefined
                          }
                          onClick={() => setActiveFinancialTab("pnl")}
                        >
                          {t(
                            "Financial summary (Statement of operations)",
                            "财务汇总（损益表 P&L）",
                          )}
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activeFinancialTab === "providers"}
                          className={
                            activeFinancialTab === "providers"
                              ? "is-active"
                              : undefined
                          }
                          onClick={() => setActiveFinancialTab("providers")}
                        >
                          {t(
                            "Provider positions (3 active Providers)",
                            "供应商结算头寸（3 家活跃供应商）",
                          )}
                        </button>
                      </div>

                      {/* Layer 1: 4 Executive KPI Cards from commercial-position/page.tsx */}
                      <div className="demo-kpi-grid">
                        <article className="demo-kpi-card">
                          <div className="demo-kpi-top">
                            <span>
                              {t("Net recognized revenue", "已确认净收入")}
                            </span>
                            <span className="demo-outline-badge">
                              {t("Income", "收入")}
                            </span>
                          </div>
                          <strong>$48,920.40</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge is-positive">
                              {t("+18.4% vs prior MTD", "较上月同期 +18.4%")}
                            </span>
                            <small>
                              {t(
                                "Gross $51,240.00 · Gift -$2,139.60",
                                "总额 $51,240.00 · 赠金抵扣 -$2,139.60",
                              )}
                            </small>
                          </div>
                        </article>
                        <article className="demo-kpi-card">
                          <div className="demo-kpi-top">
                            <span>
                              {t(
                                "Cost of supply (Provider payable)",
                                "模型供给成本（应付供应商）",
                              )}
                            </span>
                            <span className="demo-outline-badge">COGS</span>
                          </div>
                          <strong>$34,610.85</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge">
                              {t("+14.1% vs prior MTD", "较上月同期 +14.1%")}
                            </span>
                            <small>
                              {t(
                                "128,450 settled commercial calls",
                                "128,450 次已结算商业调用",
                              )}
                            </small>
                          </div>
                        </article>
                        <article className="demo-kpi-card is-highlighted">
                          <div className="demo-kpi-top">
                            <span>
                              {t("Platform net contribution", "平台净贡献毛利")}
                            </span>
                            <span className="demo-outline-badge">
                              {t("29.3% margin", "29.3% 毛利率")}
                            </span>
                          </div>
                          <strong>$14,309.55</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge is-positive">
                              {t("+30.2% vs prior MTD", "较上月同期 +30.2%")}
                            </span>
                            <small>
                              {t(
                                "Net revenue minus Provider payable",
                                "净收入减去应付供应商成本",
                              )}
                            </small>
                          </div>
                        </article>
                        <article className="demo-kpi-card">
                          <div className="demo-kpi-top">
                            <span>
                              {t("Verified cash receipts", "已核验现金收款")}
                            </span>
                            <span className="demo-outline-badge">
                              {t("Cash flow", "现金流")}
                            </span>
                          </div>
                          <strong>$62,400.00</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge is-positive">
                              {t(
                                "Prepaid wallet: $19,840.20",
                                "预付钱包余额：$19,840.20",
                              )}
                            </span>
                            <small>
                              {t(
                                "Zero supplier cost leaked to customer API",
                                "上游采购成本对客户 API 零泄露",
                              )}
                            </small>
                          </div>
                        </article>
                      </div>

                      {/* Layer 2: Statement of Operations (P&L) OR Provider Positions */}
                      {activeFinancialTab === "pnl" ? (
                        <div className="comparison-scroll demo-table-scroll">
                          <table
                            className="comparison-matrix demo-data-table"
                            aria-label="Statement of operations (P&L)"
                          >
                            <thead>
                              <tr>
                                <th>
                                  Statement of operations (P&amp;L) line item
                                </th>
                                <th>Current MTD</th>
                                <th>Prior MTD</th>
                                <th>Change</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Gross customer usage charges</td>
                                <td>$51,240.00</td>
                                <td>$43,180.00</td>
                                <td>
                                  <span className="demo-delta-text is-positive">
                                    +18.7%
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Less: Customer balance refunds &amp;
                                  adjustments
                                </td>
                                <td>-$180.00</td>
                                <td>-$240.00</td>
                                <td>
                                  <span className="demo-delta-text">
                                    -25.0%
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Less: Consumed promotional gift allowance
                                </td>
                                <td>-$2,139.60</td>
                                <td>-$1,620.00</td>
                                <td>
                                  <span className="demo-delta-text">
                                    +32.1%
                                  </span>
                                </td>
                              </tr>
                              <tr className="demo-summary-row">
                                <td>
                                  <strong>
                                    Net recognized customer revenue
                                  </strong>
                                </td>
                                <td>
                                  <strong>$48,920.40</strong>
                                </td>
                                <td>
                                  <strong>$41,320.00</strong>
                                </td>
                                <td>
                                  <span className="demo-delta-text is-positive">
                                    <strong>+18.4%</strong>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Less: Provider payable (Cost of model supply)
                                </td>
                                <td>-$34,610.85</td>
                                <td>-$30,330.20</td>
                                <td>
                                  <span className="demo-delta-text">
                                    +14.1%
                                  </span>
                                </td>
                              </tr>
                              <tr className="matrix-selected demo-summary-row">
                                <td>
                                  <strong>
                                    Platform net contribution (Gross profit)
                                  </strong>
                                </td>
                                <td>
                                  <strong>$14,309.55</strong>
                                </td>
                                <td>
                                  <strong>$10,989.80</strong>
                                </td>
                                <td>
                                  <span className="demo-delta-text is-positive">
                                    <strong>+30.2% (+2.7 pp margin)</strong>
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="comparison-scroll demo-table-scroll">
                          <table
                            className="comparison-matrix demo-data-table"
                            aria-label="Provider commercial positions"
                          >
                            <thead>
                              <tr>
                                <th>Provider</th>
                                <th>Approved offers</th>
                                <th>Settled requests</th>
                                <th>Customer revenue</th>
                                <th>Provider payable</th>
                                <th>Net contribution</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="matrix-selected">
                                <td>
                                  <strong>Anthropic Direct</strong>
                                  <small>claude-sonnet-4, claude-opus-4</small>
                                </td>
                                <td>4 active offers</td>
                                <td>64,120</td>
                                <td>$26,480.00</td>
                                <td>$18,536.00</td>
                                <td>
                                  <strong>$7,944.00 (30.0%)</strong>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>OpenRouter Enterprise</strong>
                                  <small>deepseek-r1, qwen-2.5-coder</small>
                                </td>
                                <td>6 active offers</td>
                                <td>49,810</td>
                                <td>$14,120.40</td>
                                <td>$10,307.85</td>
                                <td>
                                  <strong>$3,812.55 (27.0%)</strong>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Volcengine Ark</strong>
                                  <small>seedance-1-5-pro, doubao-pro</small>
                                </td>
                                <td>3 active offers</td>
                                <td>14,520</td>
                                <td>$8,320.00</td>
                                <td>$5,767.00</td>
                                <td>
                                  <strong>$2,553.00 (30.7%)</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SURFACE 3: GENERATIONS · CHAT COMPARISON & SEEDANCE VIDEO (PlaygroundView.tsx + VideoView.tsx) */}
                  {activePreviewIndex === 3 && (
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
                              User prompt
                            </span>
                            <p>
                              Compare bounded route-pool failover vs
                              unconditional retries when an upstream Provider
                              returns HTTP 401 before streaming starts.
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
                                    <small>Anthropic · Pool revision 4</small>
                                  </div>
                                </div>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  Completed · 1,180 ms
                                </span>
                              </div>
                              <div className="demo-chat-card-body">
                                <p>
                                  <strong>Bounded failover</strong> only retries
                                  when the upstream rejection occurs before any
                                  SSE body bytes are committed. On{" "}
                                  <code>HTTP 401</code>, Niu places the failing
                                  candidate route into a 60s auth cooldown and
                                  dispatches Attempt 2 without double-charging
                                  the workspace.
                                </p>
                              </div>
                              <div className="demo-chat-card-footer">
                                <span>412 prompt → 128 output tokens</span>
                                <span>148.8 tok/s</span>
                                <strong>Customer charge: $0.0180</strong>
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
                                      OpenAI Direct · Pool revision 2
                                    </small>
                                  </div>
                                </div>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  Completed · 940 ms
                                </span>
                              </div>
                              <div className="demo-chat-card-body">
                                <p>
                                  <strong>Pre-stream vs mid-stream:</strong>{" "}
                                  Pre-stream <code>401/429/503</code> errors can
                                  safely fail over within the route pool’s{" "}
                                  <code>max_attempts</code> cap. If a stream
                                  drops after tokens are emitted, Niu records
                                  the state as{" "}
                                  <code>Uncertain / Unresolved</code>.
                                </p>
                              </div>
                              <div className="demo-chat-card-footer">
                                <span>412 prompt → 116 output tokens</span>
                                <span>162.4 tok/s</span>
                                <strong>Customer charge: $0.0142</strong>
                              </div>
                            </article>
                          </div>

                          <div className="comparison-scroll demo-table-scroll">
                            <table
                              className="comparison-matrix demo-data-table"
                              aria-label="Comparison summary"
                            >
                              <thead>
                                <tr>
                                  <th>Comparison summary metric</th>
                                  <th>claude-sonnet-4</th>
                                  <th>gpt-4.1</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Client round-trip &amp; attempts</td>
                                  <td>
                                    1,180 ms (2 attempts · seamless failover)
                                  </td>
                                  <td>940 ms (1 attempt · primary route)</td>
                                </tr>
                                <tr>
                                  <td>Prompt / output tokens</td>
                                  <td>540 total (412 prompt · 128 output)</td>
                                  <td>528 total (412 prompt · 116 output)</td>
                                </tr>
                                <tr className="matrix-selected">
                                  <td>
                                    <strong>Settled customer charge</strong>
                                  </td>
                                  <td>
                                    <strong>$0.0180</strong>
                                  </td>
                                  <td>
                                    <strong>$0.0142</strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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
                                  Audio generated
                                </span>
                              </div>
                              <div className="demo-video-play-center">
                                <Film size={24} />
                                <span>
                                  Rendered MP4 ready · 1920×1080 · 42.0s
                                  generation time
                                </span>
                              </div>
                              <div className="demo-video-prompt-overlay">
                                <small>
                                  SAVED PROMPT &amp; CAMERA DIRECTION
                                </small>
                                <p>
                                  “Aerial dusk tracking shot over an illuminated
                                  container port, cinematic reflections on wet
                                  asphalt, volumetric coastal fog, smooth gimbal
                                  motion.”
                                </p>
                              </div>
                            </div>
                            <div className="demo-video-controls-bar">
                              <span className="demo-filter-chip is-active">
                                Model: seedance-1-5-pro
                              </span>
                              <span className="demo-filter-chip">
                                Resolution: 1080p
                              </span>
                              <span className="demo-filter-chip">
                                Aspect: 16:9
                              </span>
                              <span className="demo-filter-chip">
                                Duration: 5s
                              </span>
                              <span className="demo-filter-chip">
                                Materials: 4 approved assets
                              </span>
                            </div>
                          </div>

                          <div className="demo-video-side-cards">
                            <div className="demo-timing-card">
                              <div className="demo-timing-header">
                                <strong>Video lifecycle</strong>
                                <span className="demo-status-pill is-completed">
                                  <i className="demo-status-dot" />
                                  Succeeded
                                </span>
                              </div>
                              <dl className="demo-drawer-dl">
                                <div>
                                  <dt>Submitted</dt>
                                  <dd>Oct 19, 14:16:02</dd>
                                </div>
                                <div>
                                  <dt>Completed</dt>
                                  <dd>Oct 19, 14:16:44 (42.0s)</dd>
                                </div>
                                <div>
                                  <dt>Provider tools</dt>
                                  <dd>
                                    Materials &amp; Human verification active
                                  </dd>
                                </div>
                              </dl>
                            </div>

                            <div className="demo-timing-card">
                              <div className="demo-timing-header">
                                <strong>Video billing</strong>
                                <span>Tariff settled</span>
                              </div>
                              <dl className="demo-drawer-dl">
                                <div>
                                  <dt>Billing status</dt>
                                  <dd>Settled debit</dd>
                                </div>
                                <div>
                                  <dt>Quoted estimate</dt>
                                  <dd>$0.2400</dd>
                                </div>
                                <div>
                                  <dt>Settled customer charge</dt>
                                  <dd>
                                    <strong>$0.2400</strong>
                                  </dd>
                                </div>
                                <div>
                                  <dt>API key</dt>
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
                      "Gateway · Workspace Dashboard · Model Catalog · Docs — served from one endpoint",
                      "AI 网关 · 工作空间控制台 · 模型目录 · 文档中心 — 单一端点一体化交付",
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

          {/* 4 Core Competitive Advantages */}
          <div
            className="pillars-grid"
            aria-label="Core competitive advantages"
          >
            {pillars.map((pillar, index) => {
              const PillarIcon = pillarIcons[index];
              return (
                <article
                  key={pillar.index}
                  className="pillar-card"
                  data-reveal
                  data-spotlight
                  style={stagger(index)}
                >
                  <div className="pillar-top">
                    <span className="pillar-icon" aria-hidden="true">
                      <PillarIcon size={20} stroke={1.75} />
                    </span>
                    <span className="pillar-metric">
                      {isZh ? pillar.metricZh : pillar.metric}
                    </span>
                  </div>
                  <h3>{isZh ? pillar.titleZh : pillar.title}</h3>
                  <p>{isZh ? pillar.detailZh : pillar.detail}</p>
                </article>
              );
            })}
          </div>
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
                "10× PERFORMANCE · MEASURED BENCHMARKS",
                "10 倍性能优势 · 实测数据说话",
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
                为什么用 Rust
                重写网关？因为高并发下网关自己绝不能成为瓶颈。使用开源基准工具{" "}
                <code>ai-gateway-bench</code>{" "}
                实测，即使完整开启数据库记账与额度风控，Niu
                牛元依然保持毫秒级延迟与 18 MB 极低内存占用。
              </>
            ) : (
              <>
                Why Rust? Because your gateway should never be the bottleneck.
                Measured with <code>ai-gateway-bench</code> on Apple M4 with
                PostgreSQL 17.11, Niu sustains 3,239 RPS with full database
                accounting and 18.2 MB idle RAM.
              </>
            )}
          </p>
        </div>
        <ol className="benchmark-steps">
          {benchmarkSteps.map((item, index) => (
            <li
              key={item.step}
              data-reveal
              data-spotlight
              style={stagger(index)}
            >
              <span className="benchmark-step-num">{item.step}</span>
              <div>
                <strong>{isZh ? item.titleZh : item.title}</strong>
                <p>{isZh ? item.descriptionZh : item.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="benchmark-demo" data-reveal>
          <div className="benchmark-toolbar">
            <span className="sample-label">
              {t(
                "AI-GATEWAY-BENCH · 0MS MOCK UPSTREAM (36,649 RPS DIRECT BASELINE)",
                "AI-GATEWAY-BENCH · 0MS 模拟上游（36,649 RPS 直连基线）",
              )}
            </span>
            <span className="benchmark-status">
              {t(
                "Apple M4 (10-core, 24 GB) · PostgreSQL 17.11 · 0% errors",
                "Apple M4 (10 核, 24 GB) · PostgreSQL 17.11 · 0% 错误率",
              )}
            </span>
          </div>
          <div
            className="benchmark-tabs"
            role="tablist"
            aria-label="Choose a benchmark workload"
          >
            {benchmarkSuites.map((suite, index) => (
              <button
                key={suite.id}
                type="button"
                role="tab"
                id={`benchmark-tab-${suite.id}`}
                aria-controls={`benchmark-panel-${suite.id}`}
                aria-selected={index === activeSuiteIndex}
                tabIndex={index === activeSuiteIndex ? 0 : -1}
                onClick={() => setActiveSuiteIndex(index)}
                onKeyDown={(e) => {
                  let next = index;
                  if (e.key === "ArrowRight")
                    next = (index + 1) % benchmarkSuites.length;
                  else if (e.key === "ArrowLeft")
                    next =
                      (index - 1 + benchmarkSuites.length) %
                      benchmarkSuites.length;
                  else if (e.key === "Home") next = 0;
                  else if (e.key === "End") next = benchmarkSuites.length - 1;
                  else return;
                  e.preventDefault();
                  setActiveSuiteIndex(next);
                  const nextEl = document.getElementById(
                    `benchmark-tab-${benchmarkSuites[next].id}`,
                  );
                  nextEl?.focus();
                }}
              >
                {isZh && suite.labelZh ? suite.labelZh : suite.label}
              </button>
            ))}
          </div>
          {benchmarkSuites.map((suite, index) => (
            <div
              key={suite.id}
              className="benchmark-panel"
              role="tabpanel"
              id={`benchmark-panel-${suite.id}`}
              aria-labelledby={`benchmark-tab-${suite.id}`}
              hidden={index !== activeSuiteIndex}
              tabIndex={0}
            >
              <div className="benchmark-task">
                <div>
                  <span className="small-label">
                    {isZh && suite.eyebrowZh ? suite.eyebrowZh : suite.eyebrow}
                  </span>
                  <h3>{isZh && suite.titleZh ? suite.titleZh : suite.title}</h3>
                  <p>
                    {isZh && suite.descriptionZh
                      ? suite.descriptionZh
                      : suite.description}
                  </p>
                </div>
                <div className="acceptance-rule">
                  <strong>
                    {isZh && suite.ruleTitleZh
                      ? suite.ruleTitleZh
                      : suite.ruleTitle}
                  </strong>
                  <span>
                    {isZh && suite.ruleDetailZh
                      ? suite.ruleDetailZh
                      : suite.ruleDetail}
                  </span>
                </div>
              </div>
              <div className="model-comparison">
                {suite.cards.map((card) => (
                  <article
                    key={card.name}
                    className={`model-result${card.isWinner ? " model-winner" : ""}`}
                    data-spotlight
                  >
                    <div className="model-title">
                      <div>
                        <h4>{card.name}</h4>
                        <p>{card.runtime}</p>
                      </div>
                      <span className="model-verdict">{card.badge}</span>
                    </div>
                    <div className="per-result">
                      <span>{card.primaryUnit}</span>
                      <strong>{card.primaryMetric}</strong>
                      <small>{card.primarySubtext}</small>
                    </div>
                    <div className="fusion-cost-bar" aria-hidden="true">
                      <i style={{ width: `${card.barPercent}%` }} />
                    </div>
                    <dl className="model-facts">
                      {card.facts.map((fact) => (
                        <div key={fact.label}>
                          <dt>{fact.label}</dt>
                          <dd>{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
              <div className="benchmark-verdict">
                <div className="verdict-number">
                  <strong>{suite.verdictNumber}</strong>
                  <span>
                    {isZh && suite.verdictSubZh
                      ? suite.verdictSubZh
                      : suite.verdictSub}
                  </span>
                </div>
                <div>
                  <h4>
                    {isZh && suite.verdictTitleZh
                      ? suite.verdictTitleZh
                      : suite.verdictTitle}
                  </h4>
                  <p>
                    {isZh && suite.verdictBodyZh
                      ? suite.verdictBodyZh
                      : suite.verdictBody}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="benchmark-method benchmark-method-compact">
            <p>
              {isZh ? (
                <>
                  <strong>公平性说明：</strong> Niu v0.2.4 开启完整 PostgreSQL
                  ACID 转发前准入与批量完成结算；New API (45fbb14) 开启{" "}
                  <code>MEMORY_CACHE_ENABLED=true</code>；LiteLLM Proxy
                  (v1.104.0) 运行于无状态 <code>master_key</code>{" "}
                  模式并关闭数据库日志。生产选型请结合您的实际业务负载进行基准验证。
                </>
              ) : (
                <>
                  <strong>Fairness note:</strong> Niu v0.2.4 ran with full ACID
                  PostgreSQL pre-dispatch admission &amp; batched completion;
                  New API (45fbb14) ran with{" "}
                  <code>MEMORY_CACHE_ENABLED=true</code>; LiteLLM Proxy
                  (v1.104.0) ran in stateless <code>master_key</code> mode with
                  DB logs disabled. Always qualify your own deployment and
                  workload.
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
        </div>
      </section>

      {/* 3. SIX CORE CAPABILITIES */}
      <section
        className="section container"
        id="product"
        aria-labelledby="product-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              {t("YOUR TOKEN WORKSPACE", "围绕 Token 使用的一站式工作空间")}
            </p>
            <h2 id="product-title">
              {isZh ? (
                <>
                  模型接入、调用与管理，
                  <br />
                  在一个工作空间完成。
                </>
              ) : (
                <>
                  Access, use and manage models.
                  <br />
                  Keep usage in one workspace.
                </>
              )}
            </h2>
          </div>
          <p>
            {t(
              "Connect your applications, try models in Chat, and manage keys, budgets and request history together.",
              "接入现有应用，在对话中试用模型，集中管理密钥、预算和调用记录。",
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

      {/* 4. DROP-IN API QUICKSTART */}
      <section
        className="gateway-section"
        id="gateway"
        aria-labelledby="gateway-title"
      >
        <div className="container section gateway-grid">
          <div className="gateway-copy" data-reveal>
            <p className="eyebrow">
              {t("DROP-IN COMPATIBILITY", "零代码改造 · 即插即用")}
            </p>
            <h2 id="gateway-title">
              {isZh ? (
                <>
                  改一行接口地址，
                  <br />
                  无缝接入所有 SDK 与编程助手。
                </>
              ) : (
                <>
                  One endpoint for SDKs
                  <br />
                  and coding agents.
                </>
              )}
            </h2>
            <p className="section-description">
              {t(
                "Point any OpenAI-compatible client, Claude Code, or Codex at your Niu gateway using a scoped workspace API key.",
                "无需修改现有业务代码，只需把 Base URL 指向您的 Niu 牛元网关，即可直接连接各类应用、Claude Code 与 Codex。",
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
              <a className="text-link" href="/docs/guides/api-quickstart/">
                {t("API quickstart", "API 快速入门")}{" "}
                <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="/docs/guides/sdk-quickstart/">
                {t("TypeScript SDK", "TypeScript SDK 教程")}{" "}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="code-card" data-reveal style={stagger(1)}>
            <div className="code-heading">
              <span className="code-window" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <div
                className="code-tabs"
                role="tablist"
                aria-label="Integration examples"
              >
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCodeIndex === idx}
                    onClick={() => setActiveCodeIndex(idx)}
                  >
                    {example.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="code-copy-btn"
                onClick={handleCopyCode}
                aria-label="Copy code snippet"
              >
                {copiedCode ? (
                  <IconCheck size={14} aria-hidden="true" />
                ) : (
                  <IconCopy size={14} aria-hidden="true" />
                )}
                <span>
                  {copiedCode ? t("Copied", "已复制") : t("Copy", "复制")}
                </span>
              </button>
            </div>
            <div className="code-subbar">
              <span>{codeExamples[activeCodeIndex].endpoint}</span>
              <span>TLS / Localhost · Bearer Workspace Key</span>
            </div>
            {/* Build-time Shiki HTML from our own source snippets; no runtime highlighter. */}
            <div
              key={codeExamples[activeCodeIndex].id}
              className="highlighted-example"
              dangerouslySetInnerHTML={{
                __html: highlightedCode[activeCodeIndex],
              }}
            />
            <div className="code-footnote">
              <span className="status-dot is-live"></span>
              <span>
                {t("Recorded in PostgreSQL:", "PostgreSQL 账本记录：")}{" "}
                <strong>
                  {isZh
                    ? codeExamples[activeCodeIndex].traceZh
                    : codeExamples[activeCodeIndex].trace}
                </strong>
              </span>
            </div>
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
              "The gateway, dashboard, model catalog, and docs are MIT-licensed with zero black-box dependencies or license servers—your data stays 100% yours.",
              "网关、管理控制台、模型目录与文档站点全部采用 MIT 开源许可，无黑盒依赖、无外部授权服务器，业务数据 100% 掌握在您自己手中。",
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
                  "High-speed Rust gateway (/v1/chat/completions, /v1/responses, /v1/messages)",
                  "Rust 高性能网关（兼容 /v1/chat/completions、/v1/responses 与 /v1/messages）",
                )}
              </li>
              <li>
                {t(
                  "Smart Model Pools with conditional routing, failover, and strategy audit",
                  "模型路由（支持条件分流、有界故障切换与逐次尝试记录）",
                )}
              </li>
              <li>
                {t(
                  "Company balance, workspace budgets, and per-key spend protection",
                  "企业账户余额、工作空间预算上限与 API 密钥并发防刷穿保护",
                )}
              </li>
              <li>
                {t(
                  "Request logs, token usage and customer-facing charges",
                  "请求明细日志、Token 用量与实际调用费用",
                )}
              </li>
              <li>
                {t(
                  "Public Model Catalog, saved multi-model Chat, and Seedance Video studio",
                  "公开模型目录、云端同步的多模型对话，以及 Seedance 视频生成工作台",
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
                  "Continuous protocol & edge-case verification across upstream Providers",
                  "持续扩展各家上游供应商与新模型的协议兼容性验证",
                )}
              </li>
              <li>
                {t(
                  "Commercial payment gateways and automated Provider settlement workflows",
                  "更多在线支付充值渠道与上游供应商自动结算闭环",
                )}
              </li>
              <li>
                {t(
                  "Async video generation lifecycle and media retention policies",
                  "异步视频生成全生命周期管理与媒体存储保留策略",
                )}
              </li>
              <li>
                {t(
                  "Multi-node high availability, crash recovery, and zero-downtime upgrades",
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
                {t("FROM THE NIU BLOG", "来自 NIU 牛元博客")}
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
                      {post.category}
                    </span>
                    <time dateTime={post.publishedAt}>{post.dateLabel}</time>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3>
                    {isZh && post.chineseTitle ? post.chineseTitle : post.title}
                  </h3>
                  <p>{post.description}</p>
                  <span className="text-link">
                    {t("Read article", "阅读全文")}{" "}
                    <IconArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
                {latestPosts.length === 1 &&
                  post.highlights &&
                  post.highlights.length > 0 && (
                    <div className="landing-blog-chapters">
                      <span className="small-label">
                        {t("INSIDE THIS ESSAY", "本文核心章节")}
                      </span>
                      <ol>
                        {post.highlights.map((heading, hIndex) => (
                          <li key={heading}>
                            <span>{String(hIndex + 1).padStart(2, "0")}</span>
                            <strong>{heading}</strong>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
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
                "What developers and teams need to know before connecting their applications.",
                "开发者和团队在接入应用前需要了解的关键问题。",
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
          {faqs.map((faq, idx) => (
            <details key={faq.question} open={idx === 0 || undefined}>
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
              "PERFORMANCE · RELIABILITY · ECONOMY",
              "性能 · 可靠性 · 经济性",
            )}
          </p>
          <h2 id="closing-title">
            {isZh ? (
              <>
                开始使用 Niu 牛元，
                <br />
                <span className="accent">让 Token 使用更有条理。</span>
              </>
            ) : (
              <>
                Put your tokens to work.
                <br />
                <span className="accent">Keep usage under control.</span>
              </>
            )}
          </h2>
          <p className="closing-copy">
            {t(
              "Browse models, create a workspace API key and start calling. You can also self-host the open-source stack.",
              "浏览模型，创建工作空间 API 密钥并开始调用；也可以自行部署开源版本。",
            )}
          </p>
          <div className="actions hero-actions">
            <Button asChild size="lg" className="cta-primary">
              <a href={links.dashboard}>
                <IconLayoutDashboard aria-hidden="true" />
                {t("Open dashboard", "打开控制台")}
                <IconArrowRight className="cta-arrow" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-secondary"
            >
              <a href={links.quickstart}>{t("Get started", "快速入门")}</a>
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
