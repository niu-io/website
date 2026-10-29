import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Database,
  ExternalLink,
  FileText,
  FolderKanban,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Play,
  Receipt,
  RefreshCw,
  Search,
  Server,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Terminal,
  Video,
  Wallet,
} from "lucide-react";
import { IconMessageChatbot, IconSparkles } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useLocale } from "./locale";
import {
  capabilities,
  capabilityGroups,
  codeExamples,
  faqs,
  heroPillars,
  links,
  pipelineStages,
  stackComponents,
} from "../content/landing";
import { benchmarkSuites } from "../content/benchmarks";

export interface LandingBlogPost {
  id?: string;
  href: string;
  title: string;
  chineseTitle?: string;
  description: string;
  category?: string;
  publishedAt: string;
  dateLabel: string;
  dateLabelZh?: string;
  readingTime: string;
  readingTimeZh?: string;
  highlights: string[];
}

interface Props {
  latestPosts: LandingBlogPost[];
  highlightedCode: string[];
}

const WHY_NIU_ZH = {
  title:
    "为什么我们要做 Niu 牛元：把模型 API 做成一门账目清晰、客户信赖的好生意",
  description:
    "把客户连上大模型只是第一步。真正留住付费客户，靠的是稳定的多渠道交付、每一笔都解释得清楚的账单，以及客户无需反复找人工支持就能自助使用的完整体验。",
  category: "产品理念",
  highlights: [
    "交付一套每一笔调用都有据可查的模型服务",
    "算清哪些费用已经结算、哪些异常流仍在待核实",
    "给客户一套开箱即用、自助管理的工作空间与工作台",
    "跑在真正全栈开源、可自主掌控的底座之上",
  ],
};

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function LandingContent({
  latestPosts,
  highlightedCode,
}: Props) {
  const { isZh: rawIsZh } = useLocale();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const isZh = hydrated && rawIsZh;
  const t = <E, Z>(enText: E, zhText: Z): E | Z => (isZh ? zhText : enText);
  const [previewTab, setPreviewTab] = useState<string>("pools");
  const [poolBillingMode, setPoolBillingMode] = useState<"pool" | "candidate">(
    "pool",
  );
  const [selectedLogIndex, setSelectedLogIndex] = useState<number>(0);
  const [benchmarkId, setBenchmarkId] = useState<string>(
    benchmarkSuites[0]?.id ?? "throughput",
  );
  const [codeTab, setCodeTab] = useState<string>(codeExamples[0]?.id ?? "curl");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 1800);
    } catch {
      /* Clipboard unavailable in restricted contexts */
    }
  };

  const logEntries = [
    {
      model: "claude-sonnet-4",
      time: t("Today, 14:22:08", "今天 14:22:08"),
      keyName: "prod-coding-agent",
      statusTone: "ok" as const,
      statusLabel: t("Completed · 200", "已完成 · 200"),
      charge: "$0.0180",
      latency: "1,180 ms",
      inputTokens: "1,840",
      cachedTokens: "512",
      outputTokens: "960",
      prepMs: "1.9 ms",
      ttftMs: "312 ms",
      streamMs: "866 ms",
      throughput: "148.8 tok/s",
      settlement: t(
        "Settled at workspace retail tariff",
        "已按工作空间零售费率结算",
      ),
      attemptsSummary: t(
        "Attempt #1 upstream HTTP 429 (3.1 ms, $0.00 not charged) → Automatic failover to Attempt #2 HTTP 200 OK (settled $0.0180).",
        "第 1 次尝试上游返回 HTTP 429（耗时 3.1 ms，未扣费）→ 自动无感切换至第 2 次尝试 HTTP 200 OK（按客户零售价结算 $0.0180）。",
      ),
    },
    {
      model: "gpt-4.1",
      time: t("Today, 14:20:41", "今天 14:20:41"),
      keyName: "ci-batch-runner",
      statusTone: "warn" as const,
      statusLabel: t("Quota Hold · 402", "预算护栏拦截 · 402"),
      charge: t("Not charged", "未扣费 ($0.00)"),
      latency: "1.8 ms",
      inputTokens: "12,400",
      cachedTokens: "0",
      outputTokens: "0",
      prepMs: "1.8 ms",
      ttftMs: "—",
      streamMs: "—",
      throughput: "—",
      settlement: t(
        "Rejected before upstream dispatch",
        "转发前准入拦截 · 零上游消耗",
      ),
      attemptsSummary: t(
        "Pre-dispatch PostgreSQL hold detected API key monthly cap ($50.00 / $50.00). Rejected in 1.8 ms before sending tokens upstream.",
        "转发前 PostgreSQL 预占检测到该 API 密钥已触及月度上限（$50.00 / $50.00），在 1.8 ms 内直接拦截，未产生任何上游调用消耗。",
      ),
    },
    {
      model: "deepseek-r1",
      time: t("Today, 14:19:12", "今天 14:19:12"),
      keyName: "research-notebook",
      statusTone: "pending" as const,
      statusLabel: t("Stream Dropped · Unresolved", "流式中断 · 待核实"),
      charge: t("Unresolved hold", "待核实（暂不扣费）"),
      latency: "4,820 ms",
      inputTokens: "2,150",
      cachedTokens: "0",
      outputTokens: t("Unknown", "缺少流尾凭证"),
      prepMs: "2.1 ms",
      ttftMs: "640 ms",
      streamMs: "4,178 ms",
      throughput: "—",
      settlement: t(
        "Flagged unresolved — never fake $0 or blind debit",
        "保留在途记录待核实 · 绝不盲扣或伪造 0 元账单",
      ),
      attemptsSummary: t(
        "Upstream TCP stream closed after 19 SSE chunks before terminal usage arrived. Preserved for reconciliation without blind retry.",
        "上游连接在返回 19 个 SSE 分片后意外断开，未收到最终用量事件。系统诚实标记为「待核实」供对账，绝不盲目重试导致重复扣费。",
      ),
    },
  ];

  const activeLog = logEntries[selectedLogIndex] ?? logEntries[0];

  const poolCandidates = [
    {
      rank: "#1",
      provider: "Anthropic Direct",
      route: "claude-sonnet-4-20250514",
      rule: t("Default + >128k context", "主力默认 + >128k 长上下文"),
      share: "78.4%",
      ttft: "312 ms",
      costRate: "$2.40 / $12.00",
      retailRate:
        poolBillingMode === "pool" ? "$3.00 / $15.00" : "$3.10 / $15.50",
      margin: poolBillingMode === "pool" ? "+20.0%" : "+22.6%",
      status: t("Healthy", "健康"),
    },
    {
      rank: "#2",
      provider: "OpenRouter Enterprise",
      route: "anthropic/claude-sonnet-4",
      rule: t("30% weighted + tool calls", "30% 权重分流 + 工具调用"),
      share: "21.6%",
      ttft: "386 ms",
      costRate: "$2.55 / $12.75",
      retailRate:
        poolBillingMode === "pool" ? "$3.00 / $15.00" : "$2.95 / $14.80",
      margin: poolBillingMode === "pool" ? "+15.0%" : "+13.8%",
      status: t("Healthy", "健康"),
    },
    {
      rank: "#3",
      provider: "AWS Bedrock (us-east-1)",
      route: "us.anthropic.claude-sonnet-4-v1",
      rule: t("Failover standby (429/5xx)", "主渠道异常秒级兜底"),
      share: "0.0%",
      ttft: "350 ms",
      costRate: "$3.00 / $15.00",
      retailRate:
        poolBillingMode === "pool" ? "$3.00 / $15.00" : "$3.20 / $16.00",
      margin: poolBillingMode === "pool" ? "0.0% (SLA)" : "+6.3%",
      status: t("Standby", "热备待命"),
    },
  ];

  return (
    <main id="main" className="niu-landing">
      {/* =====================================================================
          SECTION 1: FIRST VIEWPORT — AUTHORITATIVE OPENING + CONSOLE STAGE
      ===================================================================== */}
      <section className="niu-hero-section">
        <div className="container">
          <div className="niu-hero-header">
            <div className="niu-hero-copy">
              <p className="niu-meta-line">
                <span className="niu-meta-tag">MIT</span>
                <span>
                  {t(
                    "Full-Stack Open Source · Rust Gateway + Operator Console + Chat & Video Studio",
                    "MIT 全栈开源 · Rust 高性能网关 + 商业运营后台 + 对话与视频工作台",
                  )}
                </span>
              </p>

              <h1 className="niu-hero-title">
                {t(
                  "Run a profitable model API business ",
                  <>
                    把大模型 API 做成一门
                    <span className="whitespace-nowrap">好生意，</span>
                  </>,
                )}
                <span className="niu-title-accent">
                  {t("on one open-source stack.", "一套开源系统全部跑通。")}
                </span>
              </h1>

              <p className="niu-hero-lead">
                {t(
                  "Niu combines a 3,239 RPS Rust gateway with the commercial operations LiteLLM and channel relays leave out: Smart Model Pools, private upstream margins, pre-dispatch balance protection, and a ready-to-use customer workspace.",
                  "告别简陋的命令行转发与糊涂账。Niu 牛元用 Rust 原生打造 10 倍并发性能的 AI 网关，内置智能模型池、进销价格分离、三级并发余额风控，以及开箱即用的多模型对话与视频工作台。",
                )}
              </p>

              <div className="niu-hero-cta">
                <Button asChild size="lg" className="niu-btn-primary">
                  <a href={links.dashboard}>
                    <span>{t("Open dashboard", "打开控制台")}</span>
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="niu-btn-outline"
                >
                  <a href={links.deployment}>
                    <span>
                      {t("Deploy single container", "单容器私有化部署")}
                    </span>
                  </a>
                </Button>
                <a
                  className="niu-inline-repo-link"
                  href={links.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon />
                  <span>{t("GitHub (niu-io/niu)", "GitHub 开源仓库")}</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside
              className="niu-hero-ledger"
              aria-label={t(
                "Three core competitive advantages",
                "三大核心竞争力",
              )}
            >
              {heroPillars.map((item) => (
                <div key={item.id} className="niu-ledger-row">
                  <div className="niu-ledger-top">
                    <span className="niu-ledger-tag">
                      {t(item.tag, item.tagZh)}
                    </span>
                  </div>
                  <h2 className="niu-ledger-title">
                    {t(item.title, item.titleZh)}
                  </h2>
                  <p className="niu-ledger-detail">
                    {t(item.detail, item.detailZh)}
                  </p>
                </div>
              ))}
            </aside>
          </div>

          {/* LIVE INTERACTIVE PRODUCT STAGE (Starts inside first viewport) */}
          <div className="niu-stage-shell" id="console-preview">
            <Tabs
              value={previewTab}
              onValueChange={setPreviewTab}
              className="niu-stage-tabs"
            >
              <div className="niu-stage-topbar">
                <div className="niu-stage-identity">
                  <span className="niu-stage-brand-mark" aria-hidden="true" />
                  <span className="niu-stage-brand-text">
                    {t("Niu Console", "Niu 牛元控制台")}
                  </span>
                  <span className="niu-stage-divider" aria-hidden="true">
                    /
                  </span>
                  <span className="niu-stage-context">
                    {previewTab === "pools" &&
                      t(
                        "Admin · Model Pools · claude-sonnet-4",
                        "管理后台 · 智能模型池 · claude-sonnet-4",
                      )}
                    {previewTab === "logs" &&
                      t(
                        "Workspace: default · Request Logs",
                        "客户工作空间: default · 全链路日志",
                      )}
                    {previewTab === "finance" &&
                      t(
                        "Admin · Financial P&L Ledger",
                        "管理后台 · 经营损益与渠道毛利",
                      )}
                    {previewTab === "studio" &&
                      t(
                        "Workspace: default · Chat & Video Studio",
                        "客户工作空间: default · 对话与视频工作台",
                      )}
                  </span>
                </div>

                <TabsList className="niu-stage-tablist">
                  <TabsTrigger value="pools">
                    <GitBranch className="size-3.5" aria-hidden="true" />
                    <span>{t("Model Pools", "智能模型池")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="logs">
                    <Activity className="size-3.5" aria-hidden="true" />
                    <span>{t("Request Logs", "全链路日志")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="finance">
                    <Receipt className="size-3.5" aria-hidden="true" />
                    <span>{t("Margins & P&L", "进销损益账本")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="studio">
                    <IconSparkles className="size-3.5" aria-hidden="true" />
                    <span>{t("Chat & Video", "对话与视频工作台")}</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="niu-stage-frame">
                {/* Authentic Niu Left Rail + Contextual Sidebar */}
                <aside className="niu-app-chrome" aria-hidden="true">
                  <div className="niu-app-rail">
                    <span
                      className={`niu-rail-icon ${previewTab === "logs" ? "is-active" : ""}`}
                    >
                      <FolderKanban className="size-4" />
                    </span>
                    <span
                      className={`niu-rail-icon ${previewTab === "studio" ? "is-active" : ""}`}
                    >
                      <IconSparkles className="size-4" />
                    </span>
                    <span
                      className={`niu-rail-icon ${previewTab === "pools" || previewTab === "finance" ? "is-active" : ""}`}
                    >
                      <ShieldCheck className="size-4" />
                    </span>
                  </div>

                  <div className="niu-app-sidebar">
                    <div className="niu-scope-dropdown">
                      <span className="niu-scope-avatar">
                        {previewTab === "pools" || previewTab === "finance"
                          ? "A"
                          : "W"}
                      </span>
                      <span className="niu-scope-label">
                        {previewTab === "pools" || previewTab === "finance"
                          ? t("Platform Admin", "平台管理后台")
                          : t("Default Workspace", "默认工作空间")}
                      </span>
                      <ChevronDown className="size-3.5 text-muted-foreground" />
                    </div>

                    {previewTab === "pools" || previewTab === "finance" ? (
                      <ul className="niu-sidebar-nav">
                        <li>
                          <Server className="size-3.5" />
                          <span>{t("Providers", "模型供应商")}</span>
                        </li>
                        <li
                          className={previewTab === "pools" ? "is-active" : ""}
                        >
                          <GitBranch className="size-3.5" />
                          <span>{t("Model Pools", "智能模型池")}</span>
                        </li>
                        <li>
                          <Layers className="size-3.5" />
                          <span>{t("Retail Tariffs", "对客销售定价")}</span>
                        </li>
                        <li
                          className={
                            previewTab === "finance" ? "is-active" : ""
                          }
                        >
                          <Receipt className="size-3.5" />
                          <span>{t("Financial P&L", "财务损益报表")}</span>
                        </li>
                        <li>
                          <FolderKanban className="size-3.5" />
                          <span>{t("Workspaces", "客户工作空间")}</span>
                        </li>
                        <li className="niu-sidebar-bottom">
                          <Settings className="size-3.5" />
                          <span>{t("Admin Settings", "系统管理设置")}</span>
                        </li>
                      </ul>
                    ) : (
                      <ul className="niu-sidebar-nav">
                        <li>
                          <KeyRound className="size-3.5" />
                          <span>{t("API Keys", "API 密钥")}</span>
                        </li>
                        <li
                          className={previewTab === "logs" ? "is-active" : ""}
                        >
                          <Activity className="size-3.5" />
                          <span>{t("Request Logs", "请求日志")}</span>
                        </li>
                        <li
                          className={previewTab === "studio" ? "is-active" : ""}
                        >
                          <IconMessageChatbot className="size-3.5" />
                          <span>{t("Chat & Video", "对话与视频")}</span>
                        </li>
                        <li>
                          <ShieldCheck className="size-3.5" />
                          <span>{t("Spend Guardrails", "预算风控护栏")}</span>
                        </li>
                        <li>
                          <Wallet className="size-3.5" />
                          <span>{t("Billing & Credits", "账单与额度")}</span>
                        </li>
                        <li className="niu-sidebar-bottom">
                          <Settings className="size-3.5" />
                          <span>{t("Workspace Settings", "工作空间设置")}</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </aside>

                {/* TAB 1: ADMIN MODEL POOLS (#117 Unified Model Pools) */}
                <TabsContent value="pools" className="niu-stage-canvas">
                  <div className="niu-canvas-head">
                    <div>
                      <div className="niu-canvas-title-row">
                        <h3>claude-sonnet-4</h3>
                        <span className="niu-status-pill is-ok">
                          {t("Published as model", "已作为对外模型发布")}
                        </span>
                        <span className="niu-status-pill">
                          {t("Public catalog: On", "公开模型目录可见")}
                        </span>
                      </div>
                      <p className="niu-canvas-sub">
                        {t(
                          'Applications call model: "claude-sonnet-4" directly. Conditional rules route across 3 approved Providers while keeping purchase costs private.',
                          '客户端直接调用 model: "claude-sonnet-4"。网关按请求特征在 3 条已准入供应商渠道间智能分流与容灾，采购底价对客户严格保密。',
                        )}
                      </p>
                    </div>

                    <div
                      className="niu-mode-switch"
                      role="group"
                      aria-label={t("Pool billing mode", "模型池计费模式")}
                    >
                      <button
                        type="button"
                        className={
                          poolBillingMode === "pool" ? "is-active" : ""
                        }
                        onClick={() => setPoolBillingMode("pool")}
                      >
                        {t("Unified Pool Tariff", "统一模型定价")}
                      </button>
                      <button
                        type="button"
                        className={
                          poolBillingMode === "candidate" ? "is-active" : ""
                        }
                        onClick={() => setPoolBillingMode("candidate")}
                      >
                        {t("Candidate Pass-Through", "按命中模型计费")}
                      </button>
                    </div>
                  </div>

                  <div className="niu-kpi-strip">
                    <div>
                      <span>
                        {t("Customer billing mode", "当前对客计费策略")}
                      </span>
                      <strong>
                        {poolBillingMode === "pool"
                          ? t(
                              "$3.00 / $15.00 per 1M tok",
                              "$3.00 / $15.00 / 百万 Token",
                            )
                          : t(
                              "Matched route retail rate",
                              "按实际命中渠道零售价结算",
                            )}
                      </strong>
                    </div>
                    <div>
                      <span>
                        {t("Pre-dispatch quota hold", "转发前保守预占上限")}
                      </span>
                      <strong>
                        {poolBillingMode === "pool"
                          ? t("$0.0480 max / call", "$0.0480 / 次（防刷穿）")
                          : t("$0.0512 upper bound", "$0.0512 候选最高值预占")}
                      </strong>
                    </div>
                    <div>
                      <span>
                        {t("24h failover recovery", "24h 自动容灾恢复")}
                      </span>
                      <strong>
                        {t(
                          "100% (14 upstream 429s)",
                          "100%（14 次上游限流无感切换）",
                        )}
                      </strong>
                    </div>
                    <div>
                      <span>
                        {t(
                          "Blended net margin (Admin only)",
                          "综合净毛利率（仅管理员可见）",
                        )}
                      </span>
                      <strong className="is-positive">
                        {poolBillingMode === "pool" ? "+18.9%" : "+20.7%"}
                      </strong>
                    </div>
                  </div>

                  <div className="niu-rules-bar">
                    <span className="niu-rules-label">
                      <SlidersHorizontal
                        className="size-3.5"
                        aria-hidden="true"
                      />
                      {t("Conditional rules:", "条件分流规则：")}
                    </span>
                    <code>
                      {t(
                        "1. context > 128k ∨ thinking → Anthropic Direct",
                        "1. 上下文 > 128k 或 深度思考 → Anthropic Direct 直连",
                      )}
                    </code>
                    <code>
                      {t(
                        "2. tool_calls ∨ json_schema → 70% Anthropic / 30% OpenRouter",
                        "2. 工具调用 或 结构化 JSON → 70% Anthropic / 30% OpenRouter",
                      )}
                    </code>
                  </div>

                  <div className="niu-table-surface">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("Priority", "优先级")}</TableHead>
                          <TableHead>
                            {t(
                              "Candidate Provider & route",
                              "候选供应商与路由",
                            )}
                          </TableHead>
                          <TableHead>
                            {t("Rule & share", "匹配规则与命中率")}
                          </TableHead>
                          <TableHead>{t("TTFT p50", "首字延迟")}</TableHead>
                          <TableHead>
                            {t("Provider cost (Admin)", "采购底价（保密）")}
                          </TableHead>
                          <TableHead>{t("Retail price", "对客售价")}</TableHead>
                          <TableHead>{t("Net margin", "净毛利")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {poolCandidates.map((row) => (
                          <TableRow key={row.provider}>
                            <TableCell className="niu-mono">
                              {row.rank}
                            </TableCell>
                            <TableCell>
                              <div className="niu-cell-primary">
                                {row.provider}
                              </div>
                              <div className="niu-cell-sub niu-mono">
                                {row.route}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="niu-cell-primary">{row.rule}</div>
                              <div className="niu-cell-sub">
                                {t(
                                  `Hit share: ${row.share}`,
                                  `命中占比: ${row.share}`,
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="niu-mono">
                              {row.ttft}
                            </TableCell>
                            <TableCell className="niu-mono">
                              {row.costRate}
                            </TableCell>
                            <TableCell className="niu-mono">
                              {row.retailRate}
                            </TableCell>
                            <TableCell>
                              <span className="niu-margin-chip">
                                {row.margin}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* TAB 2: CUSTOMER WORKSPACE REQUEST LOGS (Interactive master-detail) */}
                <TabsContent value="logs" className="niu-stage-canvas">
                  <div className="niu-canvas-head">
                    <div>
                      <div className="niu-canvas-title-row">
                        <h3>{t("Request Logs", "请求日志")}</h3>
                        <span className="niu-status-pill">
                          {t(
                            "Customer workspace view · Zero upstream cost leakage",
                            "客户工作空间视角 · 严禁暴露上游供应商与采购底价",
                          )}
                        </span>
                      </div>
                      <p className="niu-canvas-sub">
                        {t(
                          "Select any request row below to inspect its pre-dispatch hold, failover attempts, stage timings, and settled customer charge.",
                          "点击下方任意一条请求记录，即可查看对应的转发前额度预占、故障切换链路、分段耗时与对客结算凭证。",
                        )}
                      </p>
                    </div>
                    <div className="niu-toolbar-icons" aria-hidden="true">
                      <span className="niu-icon-btn">
                        <Search className="size-3.5" />
                      </span>
                      <span className="niu-icon-btn">
                        <RefreshCw className="size-3.5" />
                      </span>
                    </div>
                  </div>

                  <div className="niu-logs-split">
                    <div
                      className="niu-logs-list"
                      role="listbox"
                      aria-label={t("Sample requests", "示例请求列表")}
                    >
                      {logEntries.map((item, idx) => (
                        <button
                          key={item.model + item.time}
                          type="button"
                          role="option"
                          aria-selected={selectedLogIndex === idx}
                          className={`niu-log-row ${selectedLogIndex === idx ? "is-selected" : ""}`}
                          onClick={() => setSelectedLogIndex(idx)}
                        >
                          <div className="niu-log-row-main">
                            <span className="niu-log-model">{item.model}</span>
                            <span className="niu-log-meta">
                              {item.time} · {t("Key:", "密钥:")} {item.keyName}
                            </span>
                          </div>
                          <div className="niu-log-row-status">
                            <span
                              className={`niu-status-pill is-${item.statusTone}`}
                            >
                              {item.statusLabel}
                            </span>
                          </div>
                          <div className="niu-log-row-charge">
                            <strong>{item.charge}</strong>
                            <span>{item.latency}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="niu-log-drawer">
                      <div className="niu-drawer-head">
                        <div>
                          <span className="niu-drawer-kicker">
                            {t("Request Evidence", "请求结算与追踪凭证")}
                          </span>
                          <h4>{activeLog.model}</h4>
                        </div>
                        <span
                          className={`niu-status-pill is-${activeLog.statusTone}`}
                        >
                          {activeLog.statusLabel}
                        </span>
                      </div>

                      <div className="niu-drawer-grid">
                        <div>
                          <span>{t("Gateway latency", "网关总耗时")}</span>
                          <strong>{activeLog.latency}</strong>
                        </div>
                        <div>
                          <span>{t("Customer charge", "客户账单扣费")}</span>
                          <strong>{activeLog.charge}</strong>
                        </div>
                        <div>
                          <span>
                            {t("Input / Cached tok", "输入 / 缓存 Token")}
                          </span>
                          <strong>
                            {activeLog.inputTokens} / {activeLog.cachedTokens}
                          </strong>
                        </div>
                        <div>
                          <span>{t("Output tokens", "输出 Token")}</span>
                          <strong>{activeLog.outputTokens}</strong>
                        </div>
                      </div>

                      <div className="niu-timing-breakdown">
                        <div className="niu-timing-row">
                          <span>
                            {t("Admission & quota hold", "准入校验与额度预占")}
                          </span>
                          <strong>{activeLog.prepMs}</strong>
                        </div>
                        <div className="niu-timing-row">
                          <span>
                            {t(
                              "First token wait (TTFT)",
                              "首字响应等待 (TTFT)",
                            )}
                          </span>
                          <strong>{activeLog.ttftMs}</strong>
                        </div>
                        <div className="niu-timing-row">
                          <span>{t("SSE output stream", "流式输出传输")}</span>
                          <strong>
                            {activeLog.streamMs}
                            {activeLog.throughput !== "—"
                              ? ` (${activeLog.throughput})`
                              : ""}
                          </strong>
                        </div>
                      </div>

                      <div className="niu-drawer-evidence">
                        <span>{activeLog.settlement}</span>
                        <p>{activeLog.attemptsSummary}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* TAB 3: ADMIN FINANCIAL P&L LEDGER */}
                <TabsContent value="finance" className="niu-stage-canvas">
                  <div className="niu-canvas-head">
                    <div>
                      <div className="niu-canvas-title-row">
                        <h3>
                          {t(
                            "Statement of Operations & Margin Ledger",
                            "平台经营损益与渠道毛利账本",
                          )}
                        </h3>
                        <span className="niu-status-pill is-ok">
                          {t("Admin confidential", "仅平台管理员可见")}
                        </span>
                      </div>
                      <p className="niu-canvas-sub">
                        {t(
                          "Reconcile settled customer retail charges against upstream Provider procurement costs and live pre-dispatch holds in real time.",
                          "实时对账已结算的对客销售收入、上游供应商渠道采购支出与在途冻结额度，每一分毛利与未决敞口都清晰可查。",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="niu-kpi-strip">
                    <div>
                      <span>
                        {t(
                          "Settled customer revenue (30d)",
                          "对客已结算收入 (30天)",
                        )}
                      </span>
                      <strong>$14,820.40</strong>
                    </div>
                    <div>
                      <span>
                        {t(
                          "Upstream Provider cost (30d)",
                          "上游渠道采购成本 (30天)",
                        )}
                      </span>
                      <strong>$11,190.10</strong>
                    </div>
                    <div>
                      <span>
                        {t("Platform net gross profit", "平台净毛利与毛利率")}
                      </span>
                      <strong className="is-positive">$3,630.30 (24.5%)</strong>
                    </div>
                    <div>
                      <span>
                        {t(
                          "In-flight reservations & unresolved",
                          "在途预占与待核实敞口",
                        )}
                      </span>
                      <strong>
                        {t(
                          "$42.80 held · 1 unresolved",
                          "$42.80 预占 · 1 笔待核实",
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="niu-table-surface">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            {t("Published Model / Pool", "对外模型 / 模型池")}
                          </TableHead>
                          <TableHead>
                            {t("Settled calls", "已结算调用")}
                          </TableHead>
                          <TableHead>
                            {t("Customer revenue", "客户结算收入")}
                          </TableHead>
                          <TableHead>
                            {t("Provider procurement", "渠道采购成本")}
                          </TableHead>
                          <TableHead>{t("Net profit", "净毛利额")}</TableHead>
                          <TableHead>{t("Gross margin", "毛利率")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="niu-mono">
                            claude-sonnet-4
                          </TableCell>
                          <TableCell className="niu-mono">412,900</TableCell>
                          <TableCell className="niu-mono">$7,432.20</TableCell>
                          <TableCell className="niu-mono">$6,027.50</TableCell>
                          <TableCell className="niu-mono">$1,404.70</TableCell>
                          <TableCell>
                            <span className="niu-margin-chip">+18.9%</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="niu-mono">gpt-4.1</TableCell>
                          <TableCell className="niu-mono">289,450</TableCell>
                          <TableCell className="niu-mono">$4,631.20</TableCell>
                          <TableCell className="niu-mono">$3,334.46</TableCell>
                          <TableCell className="niu-mono">$1,296.74</TableCell>
                          <TableCell>
                            <span className="niu-margin-chip">+28.0%</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="niu-mono">
                            seedance-1.5-pro
                          </TableCell>
                          <TableCell className="niu-mono">11,487</TableCell>
                          <TableCell className="niu-mono">$2,757.00</TableCell>
                          <TableCell className="niu-mono">$1,828.14</TableCell>
                          <TableCell className="niu-mono">$928.86</TableCell>
                          <TableCell>
                            <span className="niu-margin-chip">+33.7%</span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* TAB 4: BUILT-IN CHAT & VIDEO WORKSPACE */}
                <TabsContent value="studio" className="niu-stage-canvas">
                  <div className="niu-canvas-head">
                    <div>
                      <div className="niu-canvas-title-row">
                        <h3>
                          {t(
                            "Generations · Multi-Model Chat & Video Studio",
                            "生成工作台 · 多模型对话与视频生成",
                          )}
                        </h3>
                        <span className="niu-status-pill is-ok">
                          {t("PostgreSQL persisted", "服务端云端持久化")}
                        </span>
                      </div>
                      <p className="niu-canvas-sub">
                        {t(
                          "Customers test models, run multi-turn chats, and generate Seedance videos right inside Niu—no third-party ChatUI wrapper required.",
                          "客户无需部署任何第三方套壳前端，登录工作空间即可直接使用多模型对话与 Seedance 异步视频生成，会话与资产全程保存在服务端。",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="niu-studio-split">
                    <div className="niu-studio-panel">
                      <div className="niu-studio-panel-head">
                        <span>
                          <IconMessageChatbot
                            className="size-4"
                            aria-hidden="true"
                          />
                          {t("Saved Chat Session", "持久化多模型对话")}
                        </span>
                        <code className="niu-mono">claude-sonnet-4</code>
                      </div>
                      <div className="niu-chat-thread">
                        <div className="niu-chat-msg is-user">
                          <span>{t("User", "客户提问")}</span>
                          <p>
                            {t(
                              "Compare PostgreSQL CTE batching vs per-request commits under 64 concurrent workers.",
                              "对比 64 并发下 PostgreSQL 单条 CTE 批量提交与逐请求独立事务的尾延迟差异。",
                            )}
                          </p>
                        </div>
                        <div className="niu-chat-msg is-assistant">
                          <span>
                            claude-sonnet-4 ·{" "}
                            {t(
                              "TTFT 312 ms · Retail charge $0.0142",
                              "首字 312 ms · 账单扣费 $0.0142",
                            )}
                          </span>
                          <p>
                            {t(
                              "Coalescing post-dispatch completions up to 64 operations per batch eliminates WAL fsync contention, keeping p99 latency at 31.5 ms while preserving pre-dispatch admission durability.",
                              "将最多 64 笔响应完成结算合并至单次批量提交，可显著消除高并发下 WAL 刷盘锁争用，在保证转发前准入持久化的同时将 p99 稳定在 31.5 ms。",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="niu-studio-panel">
                      <div className="niu-studio-panel-head">
                        <span>
                          <Video className="size-4" aria-hidden="true" />
                          {t("Async Video Task", "异步视频生成任务")}
                        </span>
                        <code className="niu-mono">seedance-1.5-pro</code>
                      </div>
                      <div className="niu-video-preview">
                        <div className="niu-video-frame">
                          <span className="niu-video-play" aria-hidden="true">
                            <Play className="size-4 fill-current" />
                          </span>
                          <div className="niu-video-spec">
                            <strong>1080p · 24 fps · 00:05</strong>
                            <span>
                              {t(
                                "Prompt: Warm studio lighting over precision brass server rack",
                                "提示词：暖色摄影棚光线下精密运转的金属服务器机柜特写",
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="niu-video-meta">
                          <span>
                            {t(
                              "Status: Completed & archived",
                              "状态：生成完成并已归档资产",
                            )}
                          </span>
                          <strong>
                            {t("Settled: $0.2400", "已结算: $0.2400")}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: 4-STAGE REQUEST ARCHITECTURE PIPELINE
      ===================================================================== */}
      <section
        className="niu-section niu-pipeline-section"
        id="architecture"
        aria-labelledby="pipeline-heading"
      >
        <div className="container">
          <div className="niu-section-head-inline">
            <h2 id="pipeline-heading">
              {t(
                "What happens inside Niu in under 2 ms of gateway overhead",
                <>
                  一次 API 调用，在{" "}
                  <span className="whitespace-nowrap">Niu 牛元</span>
                  内部经历的 4 步商业闭环
                </>,
              )}
            </h2>
            <p>
              {t(
                "Every request passes through protocol validation, atomic budget reservation, conditional Provider routing, and separated dual-ledger settlement.",
                "不到 2 毫秒的网关转发开销内，自动完成多协议接入、并发余额预占、智能模型池选路与进销分离记账。",
              )}
            </p>
          </div>

          <ol className="niu-pipeline-grid">
            {pipelineStages.map((stage, index) => (
              <li key={stage.protocol} className="niu-pipeline-step">
                <div className="niu-pipeline-step-top">
                  <span className="niu-step-index">{index + 1}</span>
                  <code className="niu-pipeline-proto">{stage.protocol}</code>
                </div>
                <h3>{t(stage.title, stage.titleZh)}</h3>
                <p>{t(stage.detail, stage.detailZh)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: PILLAR I — 10X RUST PERFORMANCE BENCHMARKS (#benchmark)
      ===================================================================== */}
      <section
        className="niu-section niu-benchmark-section"
        id="benchmark"
        aria-labelledby="benchmark-heading"
      >
        <div className="container">
          <div className="niu-split-header">
            <div>
              <h2 id="benchmark-heading">
                {t(
                  "3,239 RPS on a single node — 10.7× LiteLLM and 3.7× New API.",
                  "单机 3,239 RPS 峰值吞吐，10.7 倍于 LiteLLM · 3.7 倍于 New API。",
                )}
              </h2>
            </div>
            <p>
              {t(
                "High-concurrency AI traffic should wait on model inference, never on a Python GIL or GC pause in your gateway. Measured with ai-gateway-bench against a deterministic 0ms mock upstream while keeping Niu's PostgreSQL ACID ledger enabled.",
                "高并发流量下，网关自己绝不能成为瓶颈。使用开源基准工具 ai-gateway-bench 实测：即使全程开启 PostgreSQL 准入与扣费账本，Rust 原生架构依然保持毫秒级尾延迟与 18.2 MB 极低空闲内存。",
              )}
            </p>
          </div>

          <Tabs
            value={benchmarkId}
            onValueChange={setBenchmarkId}
            className="niu-bench-tabs"
          >
            <div className="niu-bench-Controls">
              <TabsList className="niu-bench-tablist">
                {benchmarkSuites.map((suite) => (
                  <TabsTrigger key={suite.id} value={suite.id}>
                    {t(suite.label, suite.labelZh ?? suite.label)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <span className="niu-bench-env">
                {t(
                  "Apple M4 (10-core, 24 GB) · PostgreSQL 17.11 · 0% errors",
                  "实测环境：Apple M4 (10 核, 24 GB) · PostgreSQL 17.11 · 0% 错误率",
                )}
              </span>
            </div>

            {benchmarkSuites.map((suite) => (
              <TabsContent
                key={suite.id}
                value={suite.id}
                className="niu-bench-panel"
              >
                <div className="niu-bench-summary-bar">
                  <div>
                    <p className="niu-bench-probe">
                      {t(suite.eyebrow, suite.eyebrowZh ?? suite.eyebrow)}
                    </p>
                    <h3>{t(suite.title, suite.titleZh ?? suite.title)}</h3>
                    <p className="niu-bench-desc">
                      {t(
                        suite.description,
                        suite.descriptionZh ?? suite.description,
                      )}
                    </p>
                  </div>
                  <div className="niu-bench-rule">
                    <span>
                      {t(suite.ruleTitle, suite.ruleTitleZh ?? suite.ruleTitle)}
                    </span>
                    <strong>
                      {t(
                        suite.ruleDetail,
                        suite.ruleDetailZh ?? suite.ruleDetail,
                      )}
                    </strong>
                  </div>
                </div>

                {/* Horizontal Bar Comparison */}
                <div className="niu-bench-bars">
                  {suite.cards.map((card) => (
                    <div
                      key={card.name}
                      className={`niu-bench-bar-row ${card.isWinner ? "is-niu" : ""}`}
                    >
                      <div className="niu-bench-bar-meta">
                        <div className="niu-bench-bar-name">
                          <strong>{card.name}</strong>
                          <span>
                            {t(card.runtime, card.runtimeZh ?? card.runtime)}
                          </span>
                        </div>
                        <div className="niu-bench-bar-metric">
                          <span className="niu-bench-badge">
                            {t(card.badge, card.badgeZh ?? card.badge)}
                          </span>
                          <strong>
                            {t(
                              card.primaryMetric,
                              card.primaryMetricZh ?? card.primaryMetric,
                            )}
                          </strong>
                        </div>
                      </div>

                      <div className="niu-bench-track" aria-hidden="true">
                        <div
                          className="niu-bench-fill"
                          style={{ width: `${Math.max(card.barPercent, 4)}%` }}
                        />
                      </div>

                      <div className="niu-bench-bar-foot">
                        <span>
                          {t(
                            card.primaryUnit,
                            card.primaryUnitZh ?? card.primaryUnit,
                          )}
                        </span>
                        <span>
                          {t(
                            card.primarySubtext,
                            card.primarySubtextZh ?? card.primarySubtext,
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detailed Workload Table */}
                <div className="niu-table-surface niu-bench-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {t("Measured workload / tier", "实测负载梯度与指标")}
                        </TableHead>
                        <TableHead>Niu v0.2.4 (Rust)</TableHead>
                        <TableHead>New API 45fbb14 (Go)</TableHead>
                        <TableHead>LiteLLM v1.104.0 (Python)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suite.rows.map((row) => (
                        <TableRow
                          key={row.metric}
                          className={row.isKeyRow ? "is-key-row" : undefined}
                        >
                          <TableCell className="niu-cell-metric">
                            {t(row.metric, row.metricZh ?? row.metric)}
                          </TableCell>
                          <TableCell className="niu-cell-winner">
                            <div className="niu-mono font-semibold">
                              {t(row.niu, row.niuZh ?? row.niu)}
                            </div>
                            {row.niuSub && (
                              <div className="niu-cell-sub niu-mono">
                                {t(row.niuSub, row.niuSubZh ?? row.niuSub)}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="niu-mono">
                              {t(row.newApi, row.newApiZh ?? row.newApi)}
                            </div>
                            {row.newApiSub && (
                              <div className="niu-cell-sub niu-mono">
                                {t(
                                  row.newApiSub,
                                  row.newApiSubZh ?? row.newApiSub,
                                )}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="niu-mono">
                              {t(row.litellm, row.litellmZh ?? row.litellm)}
                            </div>
                            {row.litellmSub && (
                              <div className="niu-cell-sub niu-mono">
                                {t(
                                  row.litellmSub,
                                  row.litellmSubZh ?? row.litellmSub,
                                )}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Engineering Root-Cause Takeaway + Methodology Link */}
                <div className="niu-bench-takeaway">
                  <div className="niu-takeaway-stat">
                    <strong>{suite.verdictNumber}</strong>
                    <span>
                      {t(
                        suite.verdictSub,
                        suite.verdictSubZh ?? suite.verdictSub,
                      )}
                    </span>
                  </div>
                  <div className="niu-takeaway-copy">
                    <h4>
                      {t(
                        suite.verdictTitle,
                        suite.verdictTitleZh ?? suite.verdictTitle,
                      )}
                    </h4>
                    <p>
                      {t(
                        suite.verdictBody,
                        suite.verdictBodyZh ?? suite.verdictBody,
                      )}
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="niu-methodology-note">
            <p>
              <strong>{t("Methodology note:", "公平性与方法论说明：")}</strong>{" "}
              {t(
                "Archived synthetic loopback measurements: Niu v0.2.4 ran with PostgreSQL ACID admission & batched completion; New API (45fbb14) ran with MEMORY_CACHE_ENABLED=true; LiteLLM Proxy (v1.104.0) ran stateless with database spend logging disabled. Qualify capacity with your production workload.",
                "以上为本地回环 0ms 模拟上游归档实测：Niu v0.2.4 开启完整 PostgreSQL ACID 准入与批量完成结算；New API (45fbb14) 开启内存缓存；LiteLLM Proxy (v1.104.0) 关闭数据库日志运行于无状态模式。生产部署请结合实际业务负载评估容量。",
              )}
            </p>
            <div className="niu-methodology-links">
              <a className="niu-text-link" href={links.benchmark}>
                <span>
                  {t("Full benchmark report", "阅读完整基准测试报告")}
                </span>
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
              <a className="niu-text-link" href={links.compare}>
                <span>
                  {t(
                    "Compare Niu vs. New API & OpenRouter",
                    "查看网关横向对比矩阵",
                  )}
                </span>
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: PILLAR II — COMMERCIALIZATION MATRIX (#product)
      ===================================================================== */}
      <section
        className="niu-section niu-commercial-section"
        id="product"
        aria-labelledby="commercial-heading"
      >
        <div className="container">
          <div className="niu-commercial-layout">
            <div className="niu-commercial-sticky">
              <h2 id="commercial-heading">
                {t(
                  "Stop cobbling scripts together. Run a real model business.",
                  <>
                    不用再东拼西凑，
                    <span className="whitespace-nowrap">一套系统</span>搞定
                    <span className="whitespace-nowrap">模型商业化运营。</span>
                  </>,
                )}
              </h2>
              <p>
                {t(
                  "Forwarding an API key takes an afternoon. Operating multi-Provider failover, private retail margins, concurrent balance holds, and customer self-service is where homemade proxies break down.",
                  "写一个转发脚本只需要半天；但要管好多家上游容灾、守住不外泄的渠道毛利、防住高并发刷穿余额，还要给客户提供好用的控制台和工作台——Niu 牛元把这些商业化能力全部原生做进了系统底座。",
                )}
              </p>
              <div className="niu-commercial-actions">
                <Button asChild variant="outline">
                  <a href={links.models}>
                    <span>
                      {t("Explore public model catalog", "浏览公开模型目录")}
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="niu-commercial-domains">
              {capabilityGroups.map((group) => {
                const items = capabilities.filter((c) => c.group === group.id);
                return (
                  <div key={group.id} className="niu-domain-block">
                    <div className="niu-domain-header">
                      <h3>{t(group.title, group.titleZh)}</h3>
                      <p>{t(group.summary, group.summaryZh)}</p>
                    </div>

                    <div className="niu-domain-items">
                      {items.map((cap) => (
                        <article key={cap.href} className="niu-cap-row">
                          <div className="niu-cap-main">
                            <code className="niu-cap-proof">
                              {t(cap.proof, cap.proofZh)}
                            </code>
                            <h4>{t(cap.title, cap.titleZh)}</h4>
                            <p>{t(cap.description, cap.descriptionZh)}</p>
                          </div>
                          <div className="niu-cap-action">
                            <a className="niu-text-link" href={cap.href}>
                              <span>{t(cap.label, cap.labelZh)}</span>
                              <ArrowRight
                                className="size-3.5"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: PILLAR III (A) — DROP-IN DEVELOPER & AGENT WORKBENCH
      ===================================================================== */}
      <section
        className="niu-section niu-developer-section"
        id="gateway"
        aria-labelledby="developer-heading"
      >
        <div className="container">
          <div className="niu-developer-grid">
            <div className="niu-developer-copy">
              <h2 id="developer-heading">
                {t(
                  "Change one Base URL. Connect SDKs, Claude Code, and Codex.",
                  <>
                    改一行 Base URL，
                    <span className="whitespace-nowrap">无缝接入</span>
                    现有应用与编程智能体。
                  </>,
                )}
              </h2>
              <p>
                {t(
                  "Speak native OpenAI and Anthropic protocols without proprietary SDK lock-in—or use the typed @niu/sdk when you want full workspace and management APIs.",
                  "原生兼容 OpenAI 与 Anthropic 核心协议，无需改造业务代码即可接入 Claude Code、Codex 与现有应用；同时也提供强类型的官方 @niu/sdk。",
                )}
              </p>

              <ol className="niu-onboarding-steps">
                <li>
                  <span className="niu-step-num">1</span>
                  <div>
                    <h3>
                      {t(
                        "Boot Niu against PostgreSQL",
                        "单容器启动 Niu 并连接 PostgreSQL",
                      )}
                    </h3>
                    <p>
                      {t(
                        "One Docker image serves the Rust gateway, admin console, customer workspaces, catalog, and docs.",
                        "一个标准 Docker 镜像同时启动高性能网关、管理后台、客户工作空间、公开目录与文档。",
                      )}
                    </p>
                  </div>
                </li>
                <li>
                  <span className="niu-step-num">2</span>
                  <div>
                    <h3>
                      {t(
                        "Create a Model Pool & set retail pricing",
                        "配置供应商渠道并发布智能模型池",
                      )}
                    </h3>
                    <p>
                      {t(
                        "Encrypt Provider keys with AES-256-GCM, define failover rules, and publish your customer tariff.",
                        "使用 AES-256-GCM 加密托管上游密钥，设定主备容灾规则与对客销售价格。",
                      )}
                    </p>
                  </div>
                </li>
                <li>
                  <span className="niu-step-num">3</span>
                  <div>
                    <h3>
                      {t(
                        "Issue scoped workspace API keys",
                        "签发工作空间密钥，立即对外提供服务",
                      )}
                    </h3>
                    <p>
                      {t(
                        "Customers connect apps or coding agents immediately with per-key spend caps and real-time logs.",
                        "客户拿到密钥即可连接应用或编程智能体，享受密钥级预算护栏与实时扣费明细。",
                      )}
                    </p>
                  </div>
                </li>
              </ol>

              <div className="niu-developer-links">
                <a className="niu-text-link" href={links.api}>
                  <span>{t("REST API reference", "REST API 接口文档")}</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
                <a className="niu-text-link" href={links.sdk}>
                  <span>
                    {t("TypeScript SDK guide", "TypeScript SDK 指南")}
                  </span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="niu-code-workbench">
              <Tabs
                value={codeTab}
                onValueChange={setCodeTab}
                className="niu-code-tabs"
              >
                <div className="niu-code-topbar">
                  <TabsList className="niu-code-tablist">
                    {codeExamples.map((ex) => (
                      <TabsTrigger key={ex.id} value={ex.id}>
                        {t(ex.label, ex.labelZh ?? ex.label)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {codeExamples.map((ex) =>
                    ex.id === codeTab ? (
                      <button
                        key={ex.id}
                        type="button"
                        className="niu-copy-btn"
                        onClick={() => handleCopy(ex.id, ex.code)}
                      >
                        {copiedId === ex.id ? (
                          <>
                            <Check className="size-3.5" aria-hidden="true" />
                            <span>{t("Copied", "已复制")}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" aria-hidden="true" />
                            <span>{t("Copy", "复制代码")}</span>
                          </>
                        )}
                      </button>
                    ) : null,
                  )}
                </div>

                {codeExamples.map((ex, idx) => (
                  <TabsContent
                    key={ex.id}
                    value={ex.id}
                    className="niu-code-panel"
                  >
                    <div className="niu-code-endpoint">
                      <Terminal className="size-3.5" aria-hidden="true" />
                      <code>{ex.endpoint}</code>
                    </div>
                    <div
                      className="niu-shiki-wrap"
                      dangerouslySetInnerHTML={{
                        __html: highlightedCode[idx] ?? "",
                      }}
                    />
                    <div className="niu-code-trace">
                      <span>{t("Execution trace", "网关执行链路")}</span>
                      <p>{t(ex.trace, ex.traceZh ?? ex.trace)}</p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: PILLAR III (B) — FULL-STACK OPEN SOURCE & RELEASE LEDGER
      ===================================================================== */}
      <section
        className="niu-section niu-oss-section"
        id="release"
        aria-labelledby="oss-heading"
      >
        <div className="container">
          <div className="niu-split-header">
            <div>
              <h2 id="oss-heading">
                {t(
                  "Truly full-stack MIT open source — zero black-box dependencies.",
                  "真正全栈 MIT 开源交付，私有化部署不留黑盒。",
                )}
              </h2>
            </div>
            <p>
              {t(
                "Unlike freemium gateways that lock multi-tenant workspaces, pricing, or admin consoles behind enterprise licenses, Niu ships the complete product in the public repository.",
                "拒绝「核心功能全靠商业版解锁」的伪开源套路。从底层 Rust 网关到管理后台、客户工作空间、公开模型目录与对话视频工作台，全部在公共仓库以 MIT 协议完整开源。",
              )}
            </p>
          </div>

          <div className="niu-oss-grid">
            <div className="niu-oss-modules">
              <h3 className="niu-subledger-heading">
                <Database className="size-4" aria-hidden="true" />
                <span>
                  {t(
                    "What ships inside one Niu container + PostgreSQL",
                    "单容器 + PostgreSQL 开箱包含的完整模块",
                  )}
                </span>
              </h3>
              <dl className="niu-module-list">
                {stackComponents.map((item) => (
                  <div key={item.module} className="niu-module-row">
                    <dt>
                      <code>{item.module}</code>
                      <span>{t(item.role, item.roleZh)}</span>
                    </dt>
                    <dd>{t(item.detail, item.detailZh)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="niu-oss-readiness">
              <h3 className="niu-subledger-heading">
                <Lock className="size-4" aria-hidden="true" />
                <span>
                  {t(
                    "Transparent production readiness & qualification",
                    "坦诚透明的功能就绪度与准入进展",
                  )}
                </span>
              </h3>

              <div className="niu-readiness-block">
                <h4>
                  <span className="niu-dot-ok" aria-hidden="true" />
                  {t("Ready to deploy today", "现已就绪，可直接部署上线")}
                </h4>
                <ul>
                  <li>
                    {t(
                      "OpenAI (/v1/chat/completions, /v1/responses, /v1/embeddings) & Anthropic (/v1/messages) routing",
                      "OpenAI（对话、Responses、向量）与 Anthropic（/v1/messages）原生路由转发",
                    )}
                  </li>
                  <li>
                    {t(
                      "Smart Model Pools with trait rules, dual billing modes & live margin audit",
                      "智能模型池（条件规则分流、统一/透传双计费模式、渠道延迟与毛利审计）",
                    )}
                  </li>
                  <li>
                    {t(
                      "Separated cost vs. retail tariffs, 3-tier pre-dispatch holds & attempt-level logs",
                      "进销价格严格隔离、三级并发额度预占防刷穿、全链路日志与异常断流对账",
                    )}
                  </li>
                  <li>
                    {t(
                      "Multi-tenant customer workspaces, public catalog & saved Chat / Seedance Video studio",
                      "多租户客户工作空间、公开模型目录，以及服务端持久化的对话与 Seedance 视频工作台",
                    )}
                  </li>
                </ul>
              </div>

              <div className="niu-readiness-block is-ongoing">
                <h4>
                  <span className="niu-dot-ongoing" aria-hidden="true" />
                  {t(
                    "Tracked in public release qualification",
                    "公开持续推进中的商业化准入项",
                  )}
                </h4>
                <p>
                  {t(
                    "Merchant payment settlement lifecycles, automated Provider payout reconciliation, and multi-region HA failover drills are tracked openly in our release acceptance matrix—never overstated as finished before verification.",
                    "第三方支付渠道到账闭环、供应商自动分账结算与多节点跨区高可用演练均在公开的发布准入矩阵中透明追踪——绝不把尚未完成端到端验收的能力夸大包装。",
                  )}
                </p>
                <div className="niu-readiness-links">
                  <a className="niu-text-link" href={links.releaseDocs}>
                    <span>
                      {t("Release acceptance matrix", "查看发布准入矩阵")}
                    </span>
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <a
                    className="niu-text-link"
                    href={links.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{t("Inspect MIT source", "检视 GitHub 源码")}</span>
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: EDITORIAL ESSAY (WHY NIU?)
      ===================================================================== */}
      {latestPosts.length > 0 && (
        <section
          className="niu-section niu-editorial-section"
          id="why-niu"
          aria-labelledby="editorial-heading"
        >
          <div className="container">
            {latestPosts.slice(0, 1).map((post) => {
              const isWhyNiu =
                post.id === "why-niu" || post.href.includes("why-niu");
              const displayTitle =
                isZh && isWhyNiu
                  ? WHY_NIU_ZH.title
                  : isZh && post.chineseTitle
                    ? post.chineseTitle
                    : post.title;
              const displayDesc =
                isZh && isWhyNiu ? WHY_NIU_ZH.description : post.description;
              const displayCategory =
                isZh && isWhyNiu
                  ? WHY_NIU_ZH.category
                  : (post.category ?? t("Engineering", "工程与产品"));
              const displayHighlights =
                isZh && isWhyNiu ? WHY_NIU_ZH.highlights : post.highlights;

              return (
                <article key={post.href} className="niu-editorial-feature">
                  <div className="niu-editorial-main">
                    <div className="niu-editorial-meta">
                      <span className="niu-editorial-tag">
                        <FileText className="size-3.5" aria-hidden="true" />
                        {displayCategory}
                      </span>
                      <time dateTime={post.publishedAt}>
                        {isZh
                          ? (post.dateLabelZh ?? post.dateLabel)
                          : post.dateLabel}
                      </time>
                      <span>
                        {isZh
                          ? (post.readingTimeZh ?? post.readingTime)
                          : post.readingTime}
                      </span>
                    </div>

                    <h2 id="editorial-heading">
                      <a href={post.href}>{displayTitle}</a>
                    </h2>
                    <p>{displayDesc}</p>

                    <div className="niu-editorial-actions">
                      <a className="niu-text-link" href={post.href}>
                        <span>
                          {t("Read the full essay", "阅读完整产品阐述")}
                        </span>
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </a>
                      <a className="niu-text-link" href="/blog/">
                        <span>{t("All articles", "浏览全部博客")}</span>
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {displayHighlights.length > 0 && (
                    <div className="niu-editorial-outline">
                      <span>{t("Key topics covered", "文章核心探讨议题")}</span>
                      <ul>
                        {displayHighlights.map((item) => (
                          <li key={item}>
                            <a href={post.href}>{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 8: PRODUCTION FAQ (#faq)
      ===================================================================== */}
      <section
        className="niu-section niu-faq-section"
        id="faq"
        aria-labelledby="faq-heading"
      >
        <div className="container">
          <div className="niu-faq-layout">
            <div className="niu-faq-intro">
              <h2 id="faq-heading">
                {t(
                  "Answers to real operator questions.",
                  <>
                    <span className="whitespace-nowrap">选型与商业化</span>
                    <span className="whitespace-nowrap">常见疑问解答。</span>
                  </>,
                )}
              </h2>
              <p>
                {t(
                  "How Niu compares to Python/Go proxies, protects your upstream margins, reconciles dropped streams, and deploys on your own servers.",
                  "关于性能差异、采购底价保密、流式断连对账以及全栈私有化部署的核心细节。",
                )}
              </p>
              <a className="niu-text-link" href={links.compare}>
                <span>
                  {t(
                    "Detailed comparison vs. New API & OpenRouter",
                    "查看与 New API / OpenRouter 的详细对比",
                  )}
                </span>
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="niu-faq-list">
              {faqs.map((item, idx) => (
                <details
                  key={item.question}
                  className="niu-faq-item"
                  open={idx === 0}
                >
                  <summary>
                    <div className="niu-faq-q">
                      <span className="niu-faq-cat">
                        {t(item.category, item.categoryZh)}
                      </span>
                      <h3>{t(item.question, item.questionZh)}</h3>
                    </div>
                    <ChevronDown
                      className="niu-faq-chevron size-4"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="niu-faq-a">
                    <p>{t(item.answer, item.answerZh)}</p>
                    <a className="niu-text-link" href={item.linkHref}>
                      <span>{t(item.linkLabel, item.linkLabelZh)}</span>
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: FOCUSED CLOSING ACTION
      ===================================================================== */}
      <section
        className="niu-closing-section"
        aria-labelledby="closing-heading"
      >
        <div className="container">
          <div className="niu-closing-surface">
            <div className="niu-closing-copy">
              <h2 id="closing-heading">
                {t(
                  "Ready to launch your own model API platform?",
                  "准备好搭建属于你自己的模型 API 商业平台了吗？",
                )}
              </h2>
              <p>
                {t(
                  "Try the live workspace console immediately, or self-host the entire MIT stack with Docker and PostgreSQL in five minutes.",
                  "立即打开在线控制台体验完整流程，或使用 Docker 连接 PostgreSQL 在五分钟内完成全栈私有化部署。",
                )}
              </p>
            </div>

            <div className="niu-closing-actions">
              <Button asChild size="lg" className="niu-btn-primary">
                <a href={links.dashboard}>
                  <span>{t("Open dashboard", "打开控制台")}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="niu-btn-outline"
              >
                <a href={links.quickstart}>
                  <span>{t("Read quickstart guide", "查看快速入门指南")}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
