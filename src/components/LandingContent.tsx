import { useEffect, useRef, useState } from 'react';
import { CountUp, useLandingMotion } from './landing-motion';
import {
  IconArrowRight,
  IconBolt,
  IconBrandGithub,
  IconCheck,
  IconCoins,
  IconCopy,
  IconLayoutDashboard,
  IconListSearch,
  IconMessageChatbot,
  IconPlugConnected,
  IconRoute,
  IconScale,
  IconServerBolt,
  IconShieldLock,
  IconTimeline,
} from '@tabler/icons-react';
import { Button } from './ui/button';
import { links, pillars, capabilities, faqs, codeExamples, heroStats } from '../content/landing';
import { benchmarkSteps, benchmarkSuites } from '../content/benchmarks';

const pillarIcons = [IconBolt, IconScale, IconTimeline, IconServerBolt];
const capabilityIcons = [IconRoute, IconListSearch, IconCoins, IconShieldLock, IconPlugConnected, IconMessageChatbot];

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
  { id: 'evidence', label: 'Request evidence & trace', breadcrumb: 'Workspace / Logs' },
  { id: 'routing', label: 'Route pools & supply', breadcrumb: 'Admin / Route pools' },
  { id: 'billing', label: 'Three-way accounting', breadcrumb: 'Admin / Financial statements' },
  { id: 'generations', label: 'Chat & Seedance video', breadcrumb: 'Generations · Chat & Video' },
];

const traceSpans = [
  { name: 'Preparation', kind: 'Validation, policy & route admission', offset: 0, width: 12, duration: '2.1 ms', tag: 'ADMITTED' },
  { name: 'Attempt 1 · Rejected', kind: 'Not executed · HTTP 401 · Not charged', offset: 12, width: 17, duration: '3.2 ms', tag: 'HTTP 401' },
  { name: 'First output wait', kind: 'Attempt 2 dispatch to first SSE token', offset: 29, width: 23, duration: '4.4 ms', tag: 'TTFT' },
  { name: 'Output stream', kind: '40 SSE tokens · Completed · $0.018', offset: 52, width: 48, duration: '9.2 ms', tag: 'HTTP 200' },
];

const gatewaySteps = [
  {
    step: '01',
    title: 'Bind upstream Provider credentials to a route pool alias',
    detail: 'Keep Anthropic, OpenRouter, and Vertex credentials encrypted server-side behind one customer model name.',
  },
  {
    step: '02',
    title: 'Issue a workspace API key with model grants and spending caps',
    detail: 'Scope each key to authorized models and reserve company, workspace, and key budgets before dispatch.',
  },
  {
    step: '03',
    title: 'Stream responses while Niu settles usage and customer charges',
    detail: 'Every call links its operation, upstream attempts, SSE token count, and settled customer tariff in PostgreSQL.',
  },
];

export default function LandingContent({ latestPosts }: { latestPosts: LandingPost[] }) {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [previewPaused, setPreviewPaused] = useState(false);
  const [activeSpanIndex, setActiveSpanIndex] = useState<number | null>(null);
  const [activeSuiteIndex, setActiveSuiteIndex] = useState(0);
  const [activeCodeIndex, setActiveCodeIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useLandingMotion(mainRef);
  const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties;

  useEffect(() => {
    if (previewPaused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActivePreviewIndex((prev) => (prev + 1) % previewTabs.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [previewPaused, activePreviewIndex]);

  const handleCopyCode = () => {
    const snippet = codeExamples[activeCodeIndex]?.code;
    if (!snippet || typeof navigator === 'undefined' || !navigator.clipboard) return;
    void navigator.clipboard.writeText(snippet).then(() => {
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 1800);
    });
  };

  return (
    <main id="main" ref={mainRef}>
      {/* 1. HERO + INTERACTIVE PRODUCT PREVIEW + 4 CORE COMPETITIVE PILLARS */}
      <section className="hero-stage" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true">
          <span className="hero-grid" />
          <span className="hero-glow" />
        </div>
        <div className="hero container">
          <a className="release-link hero-enter" style={stagger(0)} href="#benchmark">
            <span className="release-tag">Benchmark</span>
            <span>MIT open source · 3,239 RPS Rust gateway · 10.7× LiteLLM</span>
            <IconArrowRight size={14} aria-hidden="true" />
          </a>
          <h1 id="hero-title" className="hero-enter" style={stagger(1)}>
            Build and run your<br />
            <span className="accent">model API business.</span>
          </h1>
          <p className="hero-description hero-enter" style={stagger(2)}>
            High-throughput Rust AI gateway with independent customer tariffs, attempt-level request evidence, and self-service Chat &amp; Video workspaces.
          </p>
          <div className="actions hero-actions hero-enter" style={stagger(3)}>
            <Button asChild size="lg" className="cta-primary">
              <a href={links.dashboard}>
                <IconLayoutDashboard aria-hidden="true" />
                Open dashboard
                <IconArrowRight className="cta-arrow" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="cta-secondary">
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

          {/* Interactive Product UI Preview Window */}
          <div
            className={`preview-frame${previewPaused ? ' is-paused' : ''}`}
            data-reveal
            onMouseEnter={() => setPreviewPaused(true)}
            onMouseLeave={() => {
              setPreviewPaused(false);
              setActiveSpanIndex(null);
            }}
            onFocusCapture={() => setPreviewPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPreviewPaused(false);
              }
            }}
          >
            <div className="product-preview" aria-label="Interactive Niu workspace preview">
              <aside className="mock-nav-rail" aria-label="Workspace navigation preview">
                <span className="mock-nav-home" title="Niu">
                  <img src="/site-assets/brand/niu-mark.png" alt="Niu" width="28" height="28" />
                </span>
                <div className="mock-nav-items">
                  {[
                    { name: 'Request Logs', path: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01' },
                    { name: 'Route Pools', path: 'M5 5v4c0 3 7 3 7 6v4M19 5v4c0 3-7 3-7 6M9 17l3 3 3-3' },
                    { name: 'Usage & Tariffs', path: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
                    { name: 'Generations', path: 'M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z' },
                  ].map((icon, i) => (
                    <button
                      key={icon.name}
                      type="button"
                      className={`mock-rail-btn${activePreviewIndex === i ? ' is-active' : ''}`}
                      aria-label={icon.name}
                      title={icon.name}
                      onClick={() => setActivePreviewIndex(i)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d={icon.path} />
                      </svg>
                    </button>
                  ))}
                </div>
                <span className="mock-nav-profile" role="img" aria-label="Workspace account" title="Workspace account">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 20v-2a7 7 0 0 1 14 0v2" />
                  </svg>
                </span>
              </aside>

              <div className="mock-workspace">
                <div className="preview-toolbar">
                  <div className="preview-brand">
                    <span className="status-dot is-live" aria-hidden="true" />
                    <strong>Niu</strong>
                    <span>{previewTabs[activePreviewIndex].breadcrumb}</span>
                  </div>
                  <div className="preview-tabs" role="tablist" aria-label="Product surface views">
                    {previewTabs.map((tab, i) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activePreviewIndex === i}
                        onClick={() => setActivePreviewIndex(i)}
                      >
                        <span>{tab.label}</span>
                        {activePreviewIndex === i && <i className="preview-tab-progress" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="preview-body">
                  {activePreviewIndex === 0 && (
                    <div className="investigation">
                      <div className="task-heading">
                        <div>
                          <p className="small-label">POST /v1/chat/completions · Route pool: claude-sonnet-4</p>
                          <h2>Every upstream attempt and charge state stays linked.</h2>
                        </div>
                        <span className="badge badge-accent">Settled · 2 attempts</span>
                      </div>
                      <div className="metrics">
                        <div>
                          <span>Gateway latency (p50)</span>
                          <strong>
                            18.9 <small>ms total</small>
                          </strong>
                        </div>
                        <div>
                          <span>Recorded attempts</span>
                          <strong>
                            2 <small>bounded failover</small>
                          </strong>
                        </div>
                        <div>
                          <span>Customer charge</span>
                          <strong>
                            $0.018 <small>settled debit</small>
                          </strong>
                        </div>
                      </div>
                      <div className="timeline" role="img" aria-label="Request execution and settlement timeline">
                        <div className="time-axis">
                          <span>Operation → Attempt → Settlement trace</span>
                          <div>
                            <span>0 ms</span>
                            <span>10 ms</span>
                            <span>18.9 ms</span>
                          </div>
                          <span className="time-axis-meta">Duration · State</span>
                        </div>
                        {traceSpans.map((span, i) => (
                          <div
                            key={span.name}
                            className={`timeline-row${activeSpanIndex === i ? ' is-hovered' : ''}`}
                            onMouseEnter={() => setActiveSpanIndex(i)}
                          >
                            <div className="span-name">
                              <span className={`span-icon icon-${i}`}>
                                {i === 0 ? '◇' : i === 1 ? '!' : i === 2 ? '↳' : '✓'}
                              </span>
                              <span>
                                {span.name}
                                <small>{span.kind}</small>
                              </span>
                            </div>
                            <div className="track">
                              <span
                                className={`bar bar-${i}`}
                                style={{ '--offset': `${span.offset}%`, '--width': `${span.width}%`, '--i': i } as React.CSSProperties}
                              >
                                <span className="sr-only">{span.duration}</span>
                              </span>
                            </div>
                            <span className="span-duration">
                              <strong>{span.duration}</strong> · {span.tag}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="evidence-row">
                        <div className={activeSpanIndex === 1 ? 'is-highlighted' : undefined}>
                          <span className="evidence-icon warning">!</span>
                          <div>
                            <span className="small-label">ATTEMPT 1 · RELATED REQUEST</span>
                            <strong>Not executed · HTTP 401 · Not charged</strong>
                          </div>
                        </div>
                        <div className={activeSpanIndex === 2 || activeSpanIndex === 3 ? 'is-highlighted' : undefined}>
                          <span className="evidence-icon">✓</span>
                          <div>
                            <span className="small-label">ATTEMPT 2 · RELATED REQUEST</span>
                            <strong>Completed · 40 tok · $0.018</strong>
                          </div>
                        </div>
                        <p>Uncertain mid-stream drops remain explicitly unresolved—never fabricated as $0.</p>
                      </div>
                    </div>
                  )}

                  {activePreviewIndex === 1 && (
                    <div className="investigation">
                      <div className="task-heading">
                        <div>
                          <p className="small-label">Admin / Route pools · Revision 4 · Shared pool</p>
                          <h2>One customer alias backed by prioritized candidate routes.</h2>
                        </div>
                        <span className="badge badge-accent">Pool: claude-sonnet-4</span>
                      </div>
                      <div className="metrics">
                        <div>
                          <span>Ownership scope</span>
                          <strong>
                            Shared pool <small>all workspaces</small>
                          </strong>
                        </div>
                        <div>
                          <span>Candidate routes</span>
                          <strong>
                            3 <small>of 3 enabled</small>
                          </strong>
                        </div>
                        <div>
                          <span>Auth cooldown policy</span>
                          <strong>
                            0 / 3 <small>failures in 60s window</small>
                          </strong>
                        </div>
                      </div>
                      <div className="comparison-scroll">
                        <table className="comparison-matrix preview-table">
                          <thead>
                            <tr>
                              <th>Candidate route alias</th>
                              <th>Priority tier</th>
                              <th>Weight &amp; tier share</th>
                              <th>Temporary cooldown</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="matrix-selected">
                              <td><strong>claude-sonnet-4-direct</strong></td>
                              <td>Priority 100</td>
                              <td>
                                <div className="route-weight-cell">
                                  <span>Weight 800 · 80% tier share</span>
                                  <i className="route-weight-bar"><b style={{ width: '80%' }} /></i>
                                </div>
                              </td>
                              <td>No active cooldown · 0 / 3 in 60s</td>
                              <td><span className="route-status is-primary"><i className="status-dot is-live" />Enabled</span></td>
                            </tr>
                            <tr>
                              <td><strong>claude-sonnet-4-or</strong></td>
                              <td>Priority 100</td>
                              <td>
                                <div className="route-weight-cell">
                                  <span>Weight 200 · 20% tier share</span>
                                  <i className="route-weight-bar"><b style={{ width: '20%' }} /></i>
                                </div>
                              </td>
                              <td>No active cooldown · 0 / 3 in 60s</td>
                              <td><span className="route-status">Enabled</span></td>
                            </tr>
                            <tr>
                              <td><strong>claude-sonnet-4-vertex</strong></td>
                              <td>Priority 50</td>
                              <td>
                                <div className="route-weight-cell">
                                  <span>Weight 1000 · Standby tier</span>
                                  <i className="route-weight-bar"><b style={{ width: '100%', opacity: 0.35 }} /></i>
                                </div>
                              </td>
                              <td>No active cooldown · 0 / 3 in 60s</td>
                              <td><span className="route-status is-muted">Enabled · standby</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="evidence-row">
                        <div>
                          <span className="evidence-icon">✓</span>
                          <div>
                            <span className="small-label">BOUNDED RETRY POLICY</span>
                            <strong>Max 2 candidate attempts</strong>
                          </div>
                        </div>
                        <div>
                          <span className="evidence-icon">◇</span>
                          <div>
                            <span className="small-label">IMMUTABLE REVISIONS</span>
                            <strong>Revision 4 · audited history</strong>
                          </div>
                        </div>
                        <p>Highest eligible priority wins, with weighted selection inside that tier.</p>
                      </div>
                    </div>
                  )}

                  {activePreviewIndex === 2 && (
                    <div className="investigation">
                      <div className="task-heading">
                        <div>
                          <p className="small-label">Commercial Data Boundary &amp; Ledger</p>
                          <h2>Provider costs, workspace caps, and customer bills stay separate.</h2>
                        </div>
                        <span className="badge badge-accent">3-way isolation</span>
                      </div>
                      <div className="metrics">
                        <div>
                          <span>Provider purchase rate</span>
                          <strong>
                            Admin only <small>hidden from workspace</small>
                          </strong>
                        </div>
                        <div>
                          <span>Pre-dispatch hold</span>
                          <strong>
                            Active <small>company + workspace + key</small>
                          </strong>
                        </div>
                        <div>
                          <span>Interrupted stream</span>
                          <strong>
                            Unresolved <small>never fake $0</small>
                          </strong>
                        </div>
                      </div>
                      <div className="preview-cards-grid">
                        <article className="preview-subcard">
                          <span className="small-label">01 · PLATFORM ADMINISTRATION</span>
                          <h3>Provider Offer &amp; Cost</h3>
                          <p>Bind upstream mappings to agreed Provider rates and track settlement earnings without exposing procurement margins to customer workspaces.</p>
                        </article>
                        <article className="preview-subcard">
                          <span className="small-label">02 · PRE-DISPATCH ADMISSION</span>
                          <h3>Spending Cap Reservation</h3>
                          <p>Reserve spending capacity across shared company funds, workspace limits, and API key caps in PostgreSQL before any upstream call is dispatched.</p>
                        </article>
                        <article className="preview-subcard highlighted">
                          <span className="small-label">03 · CUSTOMER WORKSPACE</span>
                          <h3>Customer Tariff &amp; Bill</h3>
                          <p>Charge workspaces against immutable operation tariff bindings. Completed calls settle exact debits; interrupted calls stay explicitly unresolved.</p>
                        </article>
                      </div>
                      <div className="evidence-row">
                        <div>
                          <span className="evidence-icon">✓</span>
                          <div>
                            <span className="small-label">SERIALIZATION GUARD</span>
                            <strong>Zero supplier cost in API</strong>
                          </div>
                        </div>
                        <div>
                          <span className="evidence-icon">◇</span>
                          <div>
                            <span className="small-label">BATCH COMPLETION</span>
                            <strong>64-row UNNEST settlement</strong>
                          </div>
                        </div>
                        <p>Enforced in backend authorization and response serialization—not merely hidden in the UI.</p>
                      </div>
                    </div>
                  )}

                  {activePreviewIndex === 3 && (
                    <div className="investigation">
                      <div className="task-heading">
                        <div>
                          <p className="small-label">Customer Self-Service Workspace</p>
                          <h2>Persistent Chat sessions and Seedance video job management.</h2>
                        </div>
                        <span className="badge badge-accent">Chat + Video</span>
                      </div>
                      <div className="metrics">
                        <div>
                          <span>Session persistence</span>
                          <strong>
                            PostgreSQL <small>source of truth</small>
                          </strong>
                        </div>
                        <div>
                          <span>Video workflow</span>
                          <strong>
                            Seedance <small>async job tracking</small>
                          </strong>
                        </div>
                        <div>
                          <span>Result access</span>
                          <strong>
                            Authorized <small>workspace key / session</small>
                          </strong>
                        </div>
                      </div>
                      <div className="preview-cards-grid two-col">
                        <article className="preview-subcard highlighted">
                          <span className="small-label">CHAT GENERATIONS · /generations</span>
                          <h3>Multi-turn Chat with usage &amp; charge trace</h3>
                          <p>Customers test models, compare outputs, and resume saved conversations across browsers while every response links to its workspace token count and customer charge.</p>
                        </article>
                        <article className="preview-subcard">
                          <span className="small-label">VIDEO GENERATIONS · SEEDANCE TASKS</span>
                          <h3>Async video creation, history &amp; result download</h3>
                          <p>Submit text-to-video or image-to-video tasks, restore saved prompt/material inputs, track job status, and preview or download available video outputs.</p>
                        </article>
                      </div>
                      <div className="evidence-row">
                        <div>
                          <span className="evidence-icon">✓</span>
                          <div>
                            <span className="small-label">DURABLE BACKEND STATE</span>
                            <strong>Cross-browser history sync</strong>
                          </div>
                        </div>
                        <div>
                          <span className="evidence-icon">◇</span>
                          <div>
                            <span className="small-label">GUARDED REFRESH</span>
                            <strong>Original key &amp; route bound</strong>
                          </div>
                        </div>
                        <p>Browser storage is only a disposable cache; clearing it never loses saved Chat or Video records.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="preview-caption">
                  <span>Gateway · Workspace Dashboard · Model Catalog · Docs — served from one endpoint</span>
                  <Button asChild size="sm" className="cta-primary cta-compact">
                    <a href={links.dashboard}>
                      Open workspace dashboard
                      <IconArrowRight className="cta-arrow" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Core Competitive Advantages */}
          <div className="pillars-grid" aria-label="Core competitive advantages">
            {pillars.map((pillar, index) => {
              const PillarIcon = pillarIcons[index];
              return (
                <article key={pillar.index} className="pillar-card" data-reveal data-spotlight style={stagger(index)}>
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
      <section className="section container benchmark-section" id="benchmark" aria-labelledby="benchmark-title">
        <div className="benchmark-heading" data-reveal>
          <div>
            <p className="eyebrow">AI GATEWAY PERFORMANCE BENCHMARK</p>
            <h2 id="benchmark-title">
              3,239 RPS in Rust.<br />
              10.7× LiteLLM. 3.7× New API.
            </h2>
          </div>
          <p>
            Measured with the open-source <code>ai-gateway-bench</code> harness against a deterministic 0ms mock upstream on Apple M4 with PostgreSQL 17.11—while Niu persists full ACID admission and batched completions.
          </p>
        </div>
        <ol className="benchmark-steps">
          {benchmarkSteps.map((item, index) => (
            <li key={item.step} data-reveal data-spotlight style={stagger(index)}>
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
            <span className="sample-label">AI-GATEWAY-BENCH · 0MS MOCK UPSTREAM (36,649 RPS DIRECT BASELINE)</span>
            <span className="benchmark-status">Apple M4 (10-core, 24 GB) · PostgreSQL 17.11 · 0% errors</span>
          </div>
          <div className="benchmark-tabs" role="tablist" aria-label="Choose a benchmark workload">
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
                  if (e.key === 'ArrowRight') next = (index + 1) % benchmarkSuites.length;
                  else if (e.key === 'ArrowLeft') next = (index - 1 + benchmarkSuites.length) % benchmarkSuites.length;
                  else if (e.key === 'Home') next = 0;
                  else if (e.key === 'End') next = benchmarkSuites.length - 1;
                  else return;
                  e.preventDefault();
                  setActiveSuiteIndex(next);
                  const nextEl = document.getElementById(`benchmark-tab-${benchmarkSuites[next].id}`);
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
                  <article key={card.name} className={`model-result${card.isWinner ? ' model-winner' : ''}`} data-spotlight>
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
              <strong>Fairness note:</strong> Niu v0.2.4 ran with full ACID PostgreSQL pre-dispatch admission &amp; batched completion; New API (45fbb14) ran with <code>MEMORY_CACHE_ENABLED=true</code>; LiteLLM Proxy (v1.104.0) ran in stateless <code>master_key</code> mode with DB logs disabled. Always qualify your own deployment and workload.
            </p>
            <div className="benchmark-links">
              <a className="text-link" href={links.benchmark}>
                Full benchmark report &amp; methodology <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="/compare/#performance">
                Side-by-side matrix <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIX CORE CAPABILITIES */}
      <section className="section container" id="product" aria-labelledby="product-title">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">COMPLETE OPERATOR PLATFORM</p>
            <h2 id="product-title">
              Everything required to sell<br />
              and operate model access.
            </h2>
          </div>
          <p>
            Replace stitched-together proxies, billing scripts, and chat wrappers with one cohesive system backed by PostgreSQL.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const CapabilityIcon = capabilityIcons[index];
            return (
              <article key={item.href} className="capability" data-reveal data-spotlight style={stagger(index % 3)}>
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
      <section className="gateway-section" id="gateway" aria-labelledby="gateway-title">
        <div className="container section gateway-grid">
          <div className="gateway-copy" data-reveal>
            <p className="eyebrow">DROP-IN COMPATIBILITY</p>
            <h2 id="gateway-title">
              One endpoint for SDKs<br />
              and coding agents.
            </h2>
            <p className="section-description">
              Point any OpenAI-compatible client, Claude Code, or Codex at your Niu gateway using a scoped workspace API key.
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
              <div className="code-tabs" role="tablist" aria-label="Integration examples">
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
                {copiedCode ? <IconCheck size={14} aria-hidden="true" /> : <IconCopy size={14} aria-hidden="true" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="code-subbar">
              <span>{codeExamples[activeCodeIndex].endpoint}</span>
              <span>TLS / Localhost · Bearer Workspace Key</span>
            </div>
            <pre key={codeExamples[activeCodeIndex].id}>
              <code>{codeExamples[activeCodeIndex].code}</code>
              <span className="code-cursor" aria-hidden="true" />
            </pre>
            <div className="code-footnote">
              <span className="status-dot is-live"></span>
              <span>
                Recorded in PostgreSQL: <strong>{codeExamples[activeCodeIndex].trace}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELF-HOSTED ARCHITECTURE & EVALUATION SCOPE */}
      <section className="section container" id="release" aria-labelledby="release-title">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">OPEN-SOURCE ARCHITECTURE &amp; SCOPE</p>
            <h2 id="release-title">
              Self-host the complete core.<br />
              Know what is qualified today.
            </h2>
          </div>
          <p>
            Niu’s public core is MIT-licensed and runs against your own PostgreSQL instance without private source or license servers.
          </p>
        </div>
        <div className="release-grid">
          <article className="release-card" data-reveal data-spotlight>
            <span className="phase available">
              <span className="status-dot is-live"></span>READY TO DEPLOY &amp; EVALUATE
            </span>
            <h3>Available in the current build</h3>
            <ul>
              <li>Rust gateway (/v1/chat/completions, /v1/responses, scoped /v1/messages)</li>
              <li>Provider credentials, model mappings, and weighted route pools</li>
              <li>Company funds, workspace budgets, and API-key spending holds</li>
              <li>Attempt-level request logs and independent customer tariff settlement</li>
              <li>Public Model Catalog, saved Chat sessions, and Seedance Video UI</li>
            </ul>
            <a className="text-link" href={links.deployment}>
              Single-container deployment guide <span aria-hidden="true">→</span>
            </a>
          </article>
          <article className="release-card upcoming" data-reveal data-spotlight style={stagger(1)}>
            <span className="phase">RELEASE QUALIFICATION IN PROGRESS</span>
            <h3>Verify against your workload</h3>
            <ul>
              <li>End-to-end Provider &amp; protocol conformance across target models</li>
              <li>Complete commercial merchant payment and Provider settlement gates</li>
              <li>Full Seedance video lifecycle and storage retention qualification</li>
              <li>Multi-instance failover, crash recovery, and upgrade acceptance</li>
            </ul>
            <a className="text-link" href={links.release}>
              Release acceptance matrix <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </section>

      {/* 6. LATEST BLOG POSTS */}
      {latestPosts.length > 0 && (
        <section className="section container landing-blog" aria-labelledby="landing-blog-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">FROM THE NIU BLOG</p>
              <h2 id="landing-blog-title">
                Engineering notes from<br />
                the gateway team.
              </h2>
            </div>
            <div className="landing-blog-intro">
              <p>Gateway performance, financial accounting, and operating model APIs in production.</p>
              <a className="text-link" href="/blog/">
                All articles <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className={`landing-blog-list${latestPosts.length === 1 ? ' is-single' : ''}`}>
            {latestPosts.map((post, index) => (
              <a key={post.href} className="landing-blog-card" href={post.href} data-reveal data-spotlight style={stagger(index)}>
                <div className="landing-blog-main">
                  <div className="landing-blog-meta">
                    <span className="landing-blog-category">{post.category}</span>
                    <time dateTime={post.publishedAt}>{post.dateLabel}</time>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <span className="text-link">
                    Read article <IconArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
                {latestPosts.length === 1 && post.highlights && post.highlights.length > 0 && (
                  <div className="landing-blog-chapters">
                    <span className="small-label">INSIDE THIS ESSAY</span>
                    <ol>
                      {post.highlights.map((heading, hIndex) => (
                        <li key={heading}>
                          <span>{String(hIndex + 1).padStart(2, '0')}</span>
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
      <section className="section container faq-section" aria-labelledby="faq-title">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-title">
              Key questions before<br />
              you run in production.
            </h2>
          </div>
          <div className="faq-intro">
            <p>What operators verify before putting Niu in front of customer traffic and billing.</p>
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
      <section className="closing-stage container" aria-labelledby="closing-title">
        <div className="closing" data-reveal>
          <span className="closing-glow" aria-hidden="true" />
          <p className="eyebrow">OPEN-SOURCE AI GATEWAY &amp; WORKSPACE</p>
          <h2 id="closing-title">
            Deploy Niu and run your<br />
            <span className="accent">first model route today.</span>
          </h2>
          <p className="closing-copy">Self-host the MIT core against your own PostgreSQL, or open the hosted workspace dashboard.</p>
          <div className="actions hero-actions">
            <Button asChild size="lg" className="cta-primary">
              <a href={links.dashboard}>
                <IconLayoutDashboard aria-hidden="true" />
                Open dashboard
                <IconArrowRight className="cta-arrow" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="cta-secondary">
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
