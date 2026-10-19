import { useEffect, useRef, useState } from "react";
import { CountUp, useLandingMotion } from "./landing-motion";
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
  Coins,
  Cpu,
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
    breadcrumb: "Default workspace / Logs",
    railArea: "workspace" as const,
  },
  {
    id: "routing",
    label: "Admin · Route pools",
    breadcrumb: "Admin / Route pools",
    railArea: "admin" as const,
  },
  {
    id: "billing",
    label: "Admin · Financial statements",
    breadcrumb: "Admin / Financial statements",
    railArea: "admin" as const,
  },
  {
    id: "generations",
    label: "Generations · Chat & Video",
    breadcrumb: "Generations / Chat & Video",
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
    title: "Bind upstream Provider credentials to a route pool alias",
    detail:
      "Keep Anthropic, OpenRouter, and Vertex credentials encrypted server-side behind one customer model name.",
  },
  {
    step: "02",
    title: "Issue a workspace API key with model grants and spending caps",
    detail:
      "Scope each key to authorized models and reserve company, workspace, and key budgets before dispatch.",
  },
  {
    step: "03",
    title: "Stream responses while Niu settles usage and customer charges",
    detail:
      "Every call links its operation, upstream attempts, SSE token count, and settled customer tariff in PostgreSQL.",
  },
];

export default function LandingContent({
  latestPosts,
  highlightedCode,
}: {
  latestPosts: LandingPost[];
  highlightedCode: string[];
}) {
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
            href="#benchmark"
          >
            <span className="release-tag">Benchmark</span>
            <span>
              MIT open source · 3,239 RPS Rust gateway · 10.7× LiteLLM
            </span>
            <IconArrowRight size={14} aria-hidden="true" />
          </a>
          <h1 id="hero-title" className="hero-enter" style={stagger(1)}>
            Build and run your
            <br />
            <span className="accent">model API business.</span>
          </h1>
          <p className="hero-description hero-enter" style={stagger(2)}>
            High-throughput Rust AI gateway with independent customer tariffs,
            attempt-level request evidence, and self-service Chat &amp; Video
            workspaces.
          </p>
          <div className="actions hero-actions hero-enter" style={stagger(3)}>
            <Button asChild size="lg" className="cta-primary">
              <a href={links.dashboard}>
                <IconLayoutDashboard aria-hidden="true" />
                Open dashboard
                <IconArrowRight className="cta-arrow" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-secondary"
            >
              <a href={links.quickstart}>Get started</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="cta-ghost">
              <a href={links.repo}>
                <IconBrandGithub aria-hidden="true" />
                Star on GitHub
              </a>
            </Button>
          </div>
          <p className="hero-sublinks hero-enter" style={stagger(4)}>
            <a href={links.compare}>Compare gateways</a>
            <span aria-hidden="true">·</span>
            <a href="/models/">Browse models</a>
            <span aria-hidden="true">·</span>
            <a href="/blog/why-niu/">Why Niu?</a>
          </p>

          <dl className="hero-stats" aria-label="Measured gateway results">
            {heroStats.map((stat, i) => (
              <div key={stat.label} data-reveal style={stagger(i)}>
                <dt>{stat.label}</dt>
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
                  <button
                    type="button"
                    className="mock-rail-btn"
                    aria-label="Route Pools"
                    title="Admin · Route pools"
                    onClick={() => setActivePreviewIndex(1)}
                  >
                    <Cpu size={18} />
                  </button>
                </div>
                <div className="demo-rail-footer">
                  <button
                    type="button"
                    className={`mock-rail-btn${activeTab.railArea === "admin" ? " is-active" : ""}`}
                    aria-label="Admin"
                    title="Admin · Route pools & Financial statements"
                    onClick={() =>
                      setActivePreviewIndex(activePreviewIndex === 1 ? 2 : 1)
                    }
                  >
                    <IconShieldLock size={19} stroke={1.75} />
                  </button>
                  <button
                    type="button"
                    className="mock-rail-btn"
                    aria-label="Providers"
                    title="Admin · Providers & Route pools"
                    onClick={() => setActivePreviewIndex(1)}
                  >
                    <IconPlugConnected size={19} stroke={1.75} />
                  </button>
                  <span className="demo-rail-avatar" title="Operator account">
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
                            Default workspace
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
                          <span>Overview</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <KeyRound size={15} />
                          <span>API keys</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item is-active"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <List size={15} />
                          <span>Logs</span>
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
                          <span>Video</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <ShieldAlert size={15} />
                          <span>Guardrails</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <BarChart3 size={15} />
                          <span>Activity</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <Coins size={15} />
                          <span>Billing</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <Users size={15} />
                          <span>Users</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(0)}
                        >
                          <Settings size={15} />
                          <span>Settings</span>
                        </button>
                      </nav>
                      <div className="demo-sidebar-footer">
                        <a href="/docs/" className="demo-sidebar-item">
                          <IconBook size={15} />
                          <span>Documentation</span>
                        </a>
                      </div>
                    </>
                  )}

                  {activeTab.railArea === "admin" && (
                    <>
                      <div className="demo-sidebar-header">
                        <span className="demo-sidebar-title">Admin</span>
                      </div>
                      <nav className="demo-sidebar-nav" aria-label="Admin menu">
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <IconPlugConnected size={15} />
                          <span>Providers</span>
                        </button>
                        <button
                          type="button"
                          className={`demo-sidebar-item${activePreviewIndex === 1 ? " is-active" : ""}`}
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <IconRoute size={15} />
                          <span>Route pools</span>
                        </button>
                        <button
                          type="button"
                          className={`demo-sidebar-item${activePreviewIndex === 2 ? " is-active" : ""}`}
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <IconCoins size={15} />
                          <span>Financial statements</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <Users size={15} />
                          <span>Customer accounts</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <Receipt size={15} />
                          <span>Customer pricing</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(2)}
                        >
                          <CreditCard size={15} />
                          <span>Payment gateways</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <Palette size={15} />
                          <span>Branding &amp; theme</span>
                        </button>
                        <button
                          type="button"
                          className="demo-sidebar-item"
                          onClick={() => setActivePreviewIndex(1)}
                        >
                          <ScrollText size={15} />
                          <span>Audit logs</span>
                        </button>
                      </nav>
                      <div className="demo-sidebar-footer">
                        <a href="/docs/" className="demo-sidebar-item">
                          <IconBook size={15} />
                          <span>Documentation</span>
                        </a>
                      </div>
                    </>
                  )}

                  {activeTab.railArea === "generations" && (
                    <>
                      <div className="demo-sidebar-header demo-sidebar-header-gen">
                        <span className="demo-sidebar-title">Generations</span>
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
                          <span>New generation</span>
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
                            <strong>Production API architecture</strong>
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
                            <strong>Seedance 1.5 Pro studio</strong>
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
                            <strong>Guardrail &amp; retry audit</strong>
                            <small>deepseek-r1 · 1h ago</small>
                          </div>
                        </button>
                      </nav>
                      <div className="demo-sidebar-footer">
                        <span className="demo-sidebar-muted">
                          PostgreSQL session sync active
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
                      {activeTab.breadcrumb}
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
                        <span>{tab.label}</span>
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
                            <h2>Logs</h2>
                            <span className="demo-count-badge">
                              1,428 requests
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            Inspect every workspace operation, upstream
                            route-pool attempt, phase latency, and settled
                            customer tariff.
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
                                ? "Hide volume"
                                : "Request volume"}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="demo-action-btn"
                            onClick={() => setSelectedLogIndex(1)}
                          >
                            <ShieldAlert size={13} />
                            <span>Blocked &amp; failed</span>
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
                            <span>Request volume · Last 24 hours</span>
                            <span>
                              99.8% completed · 2 bounded failovers · 1
                              uncertain stream
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
                                All statuses
                              </span>
                              <span className="demo-filter-chip">
                                Pool: claude-sonnet-4
                              </span>
                            </div>
                            <div className="demo-subtoolbar-right">
                              <span className="demo-filter-chip">All time</span>
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
                                  <th>Model &amp; time</th>
                                  <th>Status</th>
                                  <th className="is-right">
                                    Charge &amp; latency
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
                                Request details
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
                              <span>Gateway latency</span>
                              <strong>{selectedLog.duration}</strong>
                            </div>
                            <div>
                              <span>Customer charge</span>
                              <strong>{selectedLog.charge}</strong>
                            </div>
                            <div>
                              <span>Input tokens</span>
                              <strong>
                                {selectedLog.inputTokens}{" "}
                                <small>Cached {selectedLog.cachedTokens}</small>
                              </strong>
                            </div>
                            <div>
                              <span>Output tokens</span>
                              <strong>
                                {selectedLog.outputTokens}{" "}
                                <small>
                                  Reason {selectedLog.reasoningTokens}
                                </small>
                              </strong>
                            </div>
                          </div>

                          {/* RequestTiming.tsx component replica */}
                          <div className="demo-timing-card">
                            <div className="demo-timing-header">
                              <strong>Request timing</strong>
                              <span>
                                Gateway latency: {selectedLog.duration}
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
                              <span>Total: {selectedLog.duration}</span>
                            </div>
                          </div>

                          <dl className="demo-drawer-dl">
                            <div>
                              <dt>Provider model</dt>
                              <dd>{selectedLog.providerSub}</dd>
                            </div>
                            <div>
                              <dt>Provider status</dt>
                              <dd>{selectedLog.providerStatus}</dd>
                            </div>
                            <div>
                              <dt>Delivery &amp; billing</dt>
                              <dd>{selectedLog.deliveryStatus}</dd>
                            </div>
                            <div>
                              <dt>API key</dt>
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
                                    ? "Response"
                                    : tabKey === "request"
                                      ? "Request"
                                      : "Raw trace"}
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
                            <h2>Route pools</h2>
                            <span className="demo-count-badge">
                              3 active pools
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            Group multiple Provider model mappings under a
                            single Niu alias with priority tiers and weighted
                            selection. Highest eligible priority wins, with
                            weighted selection inside that tier.
                          </p>
                        </div>
                        <div className="demo-header-actions">
                          <button
                            type="button"
                            className="demo-action-btn"
                            onClick={() => setActivePreviewIndex(2)}
                          >
                            <IconPlugConnected size={13} />
                            <span>Providers</span>
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
                            <span>Create route pool</span>
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
                            All scopes (3)
                          </span>
                          <span className="demo-filter-chip">
                            Shared pools (2)
                          </span>
                          <span className="demo-filter-chip">
                            Organization pools (1)
                          </span>
                        </div>
                        <div className="demo-subtoolbar-right">
                          <span className="demo-toolbar-meta">
                            Click a route pool to inspect candidate priority
                            &amp; weights
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
                              <th>Pool alias</th>
                              <th>Scope</th>
                              <th>Candidate routes</th>
                              <th>Status</th>
                              <th>Actions</th>
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
                            <h2>Financial statements</h2>
                            <span className="demo-count-badge">
                              Accrual + Cash flow
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            October 2026 (Month to date) · Compared against Sept
                            2026 (same MTD span) · Personal owner-funded calls
                            are excluded from commercial revenue and cost.
                          </p>
                        </div>
                        <div className="demo-header-actions">
                          <span className="demo-filter-chip">
                            Month to date (Current month)
                          </span>
                          <span className="demo-filter-chip">
                            Currency: $ USD
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
                          Financial summary (Statement of operations)
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
                          Provider positions (3 active Providers)
                        </button>
                      </div>

                      {/* Layer 1: 4 Executive KPI Cards from commercial-position/page.tsx */}
                      <div className="demo-kpi-grid">
                        <article className="demo-kpi-card">
                          <div className="demo-kpi-top">
                            <span>Net recognized revenue</span>
                            <span className="demo-outline-badge">Income</span>
                          </div>
                          <strong>$48,920.40</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge is-positive">
                              +18.4% vs prior MTD
                            </span>
                            <small>Gross $51,240.00 · Gift -$2,139.60</small>
                          </div>
                        </article>
                        <article className="demo-kpi-card">
                          <div className="demo-kpi-top">
                            <span>Cost of supply (Provider payable)</span>
                            <span className="demo-outline-badge">COGS</span>
                          </div>
                          <strong>$34,610.85</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge">
                              +14.1% vs prior MTD
                            </span>
                            <small>128,450 settled commercial calls</small>
                          </div>
                        </article>
                        <article className="demo-kpi-card is-highlighted">
                          <div className="demo-kpi-top">
                            <span>Platform net contribution</span>
                            <span className="demo-outline-badge">
                              29.3% margin
                            </span>
                          </div>
                          <strong>$14,309.55</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge is-positive">
                              +30.2% vs prior MTD
                            </span>
                            <small>Net revenue minus Provider payable</small>
                          </div>
                        </article>
                        <article className="demo-kpi-card">
                          <div className="demo-kpi-top">
                            <span>Verified cash receipts</span>
                            <span className="demo-outline-badge">
                              Cash flow
                            </span>
                          </div>
                          <strong>$62,400.00</strong>
                          <div className="demo-kpi-foot">
                            <span className="demo-delta-badge is-positive">
                              Prepaid wallet: $19,840.20
                            </span>
                            <small>
                              Zero supplier cost leaked to customer API
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
                                ? "Chat comparison"
                                : "Video · Seedance 1.5 Pro"}
                            </h2>
                            <span className="demo-count-badge">
                              {activeGenerationsMode === "chat"
                                ? "2 models side-by-side"
                                : "Async video studio"}
                            </span>
                          </div>
                          <p className="demo-page-subtitle">
                            {activeGenerationsMode === "chat"
                              ? "Compare models side-by-side with live streaming throughput, token counts, and settled customer charges persisted in PostgreSQL."
                              : "Submit text-to-video and image-to-video tasks with Volcengine Seedance 1.5 Pro, manage materials, and track settled video charges."}
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
                              <span>Chat comparison</span>
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
                              <span>Seedance video</span>
                            </button>
                          </div>
                          <span className="demo-filter-chip">
                            Key: prod-backend
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
                    Gateway · Workspace Dashboard · Model Catalog · Docs —
                    served from one endpoint
                  </span>
                  <Button asChild size="sm" className="cta-primary cta-compact">
                    <a href={links.dashboard}>
                      Open workspace dashboard
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
                    <span className="pillar-metric">{pillar.metric}</span>
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.detail}</p>
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
            <p className="eyebrow">AI GATEWAY PERFORMANCE BENCHMARK</p>
            <h2 id="benchmark-title">
              3,239 RPS in Rust.
              <br />
              10.7× LiteLLM. 3.7× New API.
            </h2>
          </div>
          <p>
            Measured with the open-source <code>ai-gateway-bench</code> harness
            against a deterministic 0ms mock upstream on Apple M4 with
            PostgreSQL 17.11—while Niu persists full ACID admission and batched
            completions.
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
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="benchmark-demo" data-reveal>
          <div className="benchmark-toolbar">
            <span className="sample-label">
              AI-GATEWAY-BENCH · 0MS MOCK UPSTREAM (36,649 RPS DIRECT BASELINE)
            </span>
            <span className="benchmark-status">
              Apple M4 (10-core, 24 GB) · PostgreSQL 17.11 · 0% errors
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
                {suite.label}
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
                  <span className="small-label">{suite.eyebrow}</span>
                  <h3>{suite.title}</h3>
                  <p>{suite.description}</p>
                </div>
                <div className="acceptance-rule">
                  <strong>{suite.ruleTitle}</strong>
                  <span>{suite.ruleDetail}</span>
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
                  <span>{suite.verdictSub}</span>
                </div>
                <div>
                  <h4>{suite.verdictTitle}</h4>
                  <p>{suite.verdictBody}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="benchmark-method benchmark-method-compact">
            <p>
              <strong>Fairness note:</strong> Niu v0.2.4 ran with full ACID
              PostgreSQL pre-dispatch admission &amp; batched completion; New
              API (45fbb14) ran with <code>MEMORY_CACHE_ENABLED=true</code>;
              LiteLLM Proxy (v1.104.0) ran in stateless <code>master_key</code>{" "}
              mode with DB logs disabled. Always qualify your own deployment and
              workload.
            </p>
            <div className="benchmark-links">
              <a className="text-link" href={links.benchmark}>
                Full benchmark report &amp; methodology{" "}
                <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="/compare/#performance">
                Side-by-side matrix <span aria-hidden="true">→</span>
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
            <p className="eyebrow">COMPLETE OPERATOR PLATFORM</p>
            <h2 id="product-title">
              Everything required to sell
              <br />
              and operate model access.
            </h2>
          </div>
          <p>
            Replace stitched-together proxies, billing scripts, and chat
            wrappers with one cohesive system backed by PostgreSQL.
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
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a className="text-link" href={item.href}>
                  {item.label} <span aria-hidden="true">→</span>
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
            <p className="eyebrow">DROP-IN COMPATIBILITY</p>
            <h2 id="gateway-title">
              One endpoint for SDKs
              <br />
              and coding agents.
            </h2>
            <p className="section-description">
              Point any OpenAI-compatible client, Claude Code, or Codex at your
              Niu gateway using a scoped workspace API key.
            </p>
            <ul className="gateway-features">
              {gatewaySteps.map((item) => (
                <li key={item.step}>
                  <span className="gateway-step-badge">{item.step}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="gateway-links">
              <a className="text-link" href="/docs/guides/api-quickstart/">
                API quickstart <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="/docs/guides/sdk-quickstart/">
                TypeScript SDK <span aria-hidden="true">→</span>
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
                <span>{copiedCode ? "Copied" : "Copy"}</span>
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
                Recorded in PostgreSQL:{" "}
                <strong>{codeExamples[activeCodeIndex].trace}</strong>
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
            <p className="eyebrow">OPEN-SOURCE ARCHITECTURE &amp; SCOPE</p>
            <h2 id="release-title">
              Self-host the complete core.
              <br />
              Know what is qualified today.
            </h2>
          </div>
          <p>
            Niu’s public core is MIT-licensed and runs against your own
            PostgreSQL instance without private source or license servers.
          </p>
        </div>
        <div className="release-grid">
          <article className="release-card" data-reveal data-spotlight>
            <span className="phase available">
              <span className="status-dot is-live"></span>READY TO DEPLOY &amp;
              EVALUATE
            </span>
            <h3>Available in the current build</h3>
            <ul>
              <li>
                Rust gateway (/v1/chat/completions, /v1/responses, scoped
                /v1/messages)
              </li>
              <li>
                Provider credentials, model mappings, and weighted route pools
              </li>
              <li>
                Company funds, workspace budgets, and API-key spending holds
              </li>
              <li>
                Attempt-level request logs and independent customer tariff
                settlement
              </li>
              <li>
                Public Model Catalog, saved Chat sessions, and Seedance Video UI
              </li>
            </ul>
            <a className="text-link" href={links.deployment}>
              Single-container deployment guide{" "}
              <span aria-hidden="true">→</span>
            </a>
          </article>
          <article
            className="release-card upcoming"
            data-reveal
            data-spotlight
            style={stagger(1)}
          >
            <span className="phase">RELEASE QUALIFICATION IN PROGRESS</span>
            <h3>Verify against your workload</h3>
            <ul>
              <li>
                End-to-end Provider &amp; protocol conformance across target
                models
              </li>
              <li>
                Complete commercial merchant payment and Provider settlement
                gates
              </li>
              <li>
                Full Seedance video lifecycle and storage retention
                qualification
              </li>
              <li>
                Multi-instance failover, crash recovery, and upgrade acceptance
              </li>
            </ul>
            <a className="text-link" href={links.release}>
              Release acceptance matrix <span aria-hidden="true">↗</span>
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
              <p className="eyebrow">FROM THE NIU BLOG</p>
              <h2 id="landing-blog-title">
                Engineering notes from
                <br />
                the gateway team.
              </h2>
            </div>
            <div className="landing-blog-intro">
              <p>
                Gateway performance, financial accounting, and operating model
                APIs in production.
              </p>
              <a className="text-link" href="/blog/">
                All articles <span aria-hidden="true">→</span>
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
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <span className="text-link">
                    Read article <IconArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
                {latestPosts.length === 1 &&
                  post.highlights &&
                  post.highlights.length > 0 && (
                    <div className="landing-blog-chapters">
                      <span className="small-label">INSIDE THIS ESSAY</span>
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
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-title">
              Key questions before
              <br />
              you run in production.
            </h2>
          </div>
          <div className="faq-intro">
            <p>
              What operators verify before putting Niu in front of customer
              traffic and billing.
            </p>
            <div className="faq-intro-links">
              <a className="text-link" href="/docs/">
                Read the docs <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href={`${links.repo}/issues`}>
                Ask on GitHub <span aria-hidden="true">↗</span>
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
                  <span className="faq-category">{faq.category}</span>
                </span>
                <span className="faq-question">{faq.question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>{faq.answer}</p>
                <a className="text-link faq-doc-link" href={faq.linkHref}>
                  {faq.linkLabel} <span aria-hidden="true">→</span>
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
          <p className="eyebrow">OPEN-SOURCE AI GATEWAY &amp; WORKSPACE</p>
          <h2 id="closing-title">
            Deploy Niu and run your
            <br />
            <span className="accent">first model route today.</span>
          </h2>
          <p className="closing-copy">
            Self-host the MIT core against your own PostgreSQL, or open the
            hosted workspace dashboard.
          </p>
          <div className="actions hero-actions">
            <Button asChild size="lg" className="cta-primary">
              <a href={links.dashboard}>
                <IconLayoutDashboard aria-hidden="true" />
                Open dashboard
                <IconArrowRight className="cta-arrow" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-secondary"
            >
              <a href={links.quickstart}>Get started</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="cta-ghost">
              <a href={links.repo}>
                <IconBrandGithub aria-hidden="true" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
