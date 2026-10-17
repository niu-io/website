import { createElement, useState } from 'react';
import { Button } from './ui/button';
import { links, pillars, capabilities, faqs, requestExample } from '../content/landing';
import { benchmarkSteps, benchmarkSuites } from '../content/benchmarks';

interface LandingPost {
  href: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  dateLabel: string;
  readingTime: string;
}

const previewTabs = [
  { id: 'evidence', label: 'Request evidence & trace', breadcrumb: 'Workspace · Request Logs' },
  { id: 'routing', label: 'Route pools & supply', breadcrumb: 'Administration · Route Pools' },
  { id: 'billing', label: 'Three-way accounting', breadcrumb: 'Workspace · Usage & Tariffs' },
  { id: 'generations', label: 'Chat & Seedance video', breadcrumb: 'Workspace · Generations' },
];

const traceSpans = [
  { name: 'Pre-dispatch hold', kind: 'ACID admission & cap check', offset: 0, width: 12, duration: '2.1 ms' },
  { name: 'Attempt 1 · OpenRouter', kind: 'HTTP 401 rejected ($0)', offset: 12, width: 18, duration: '3.2 ms' },
  { name: 'Attempt 2 · Anthropic', kind: '200 OK · 40 SSE tokens', offset: 30, width: 58, duration: '11.4 ms' },
  { name: 'Batch settlement', kind: '64-row UNNEST commit', offset: 88, width: 12, duration: '2.2 ms' },
];

export default function LandingContent({ latestPosts }: { latestPosts: LandingPost[] }) {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [activeSuiteIndex, setActiveSuiteIndex] = useState(0);

  return (
    <main id="main">
      {/* 1. HERO + 4 CORE COMPETITIVE PILLARS + INTERACTIVE PRODUCT PREVIEW */}
      <section className="hero container" aria-labelledby="hero-title">
        <a className="release-link" href="#benchmark">
          <span className="status-dot"></span>MIT Open Source · 3,239 RPS Rust Gateway · 10.7× LiteLLM
        </a>
        <h1 id="hero-title">
          Build and run your<br />
          <span className="accent">model API business.</span>
        </h1>
        <p className="hero-description">
          High-throughput Rust AI gateway with independent customer tariffs, attempt-level request evidence, and self-service Chat &amp; Video workspaces.
        </p>
        <div className="actions">
          <Button asChild size="lg" children={createElement('a', { href: links.quickstart }, 'Get started')} />
          <Button asChild size="lg" variant="secondary" children={createElement('a', { href: links.compare }, 'Compare gateways')} />
          <Button asChild size="lg" variant="secondary" children={createElement('a', { href: '/models/' }, 'Browse models')} />
        </div>

        {/* 4 Core Competitive Advantages Strip */}
        <div className="pillars-grid" aria-label="Core competitive advantages">
          {pillars.map((pillar) => (
            <article key={pillar.index} className="pillar-card">
              <div className="pillar-top">
                <span className="feature-number">{pillar.index}</span>
                <span className="pillar-metric">{pillar.metric}</span>
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.detail}</p>
            </article>
          ))}
        </div>

        {/* Interactive Product UI Preview Window */}
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
                    {tab.label}
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
                        18.9 <small>ms</small>
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
                    </div>
                    {traceSpans.map((span, i) => (
                      <div key={span.name} className="timeline-row">
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
                            style={{ '--offset': `${span.offset}%`, '--width': `${span.width}%` } as React.CSSProperties}
                          >
                            <span className="sr-only">{span.duration}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="evidence-row">
                    <div>
                      <span className="evidence-icon warning">!</span>
                      <div>
                        <span className="small-label">ATTEMPT 1 · OPENROUTER</span>
                        <strong>401 Rejected · $0.00</strong>
                      </div>
                    </div>
                    <div>
                      <span className="evidence-icon">✓</span>
                      <div>
                        <span className="small-label">ATTEMPT 2 · ANTHROPIC</span>
                        <strong>40 tok · $0.018 settled</strong>
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
                      <p className="small-label">Route Pool Configuration · Revision 4</p>
                      <h2>One customer alias backed by prioritized Provider routes.</h2>
                    </div>
                    <span className="badge badge-accent">Pool: claude-sonnet-4</span>
                  </div>
                  <div className="metrics">
                    <div>
                      <span>Catalog snapshot reads</span>
                      <strong>
                        1,346 <small>reads/s</small>
                      </strong>
                    </div>
                    <div>
                      <span>Route cache TTL</span>
                      <strong>
                        5.0 <small>seconds</small>
                      </strong>
                    </div>
                    <div>
                      <span>Upstream credentials</span>
                      <strong>
                        Server-side <small>encrypted</small>
                      </strong>
                    </div>
                  </div>
                  <div className="comparison-scroll">
                    <table className="comparison-matrix preview-table">
                      <thead>
                        <tr>
                          <th>Candidate mapping</th>
                          <th>Provider</th>
                          <th>Priority / Weight</th>
                          <th>Declared capabilities</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="matrix-selected">
                          <td><strong>claude-sonnet-4-direct</strong></td>
                          <td>Anthropic Direct</td>
                          <td>Priority 100 · Weight 80%</td>
                          <td>Chat · Messages · SSE · Tools</td>
                          <td><strong>Selected primary</strong></td>
                        </tr>
                        <tr>
                          <td><strong>claude-sonnet-4-or</strong></td>
                          <td>OpenRouter</td>
                          <td>Priority 100 · Weight 20%</td>
                          <td>Chat · Messages · SSE · Tools</td>
                          <td>Active weighted peer</td>
                        </tr>
                        <tr>
                          <td><strong>claude-sonnet-4-vertex</strong></td>
                          <td>Google Vertex AI</td>
                          <td>Priority 50 · Weight 100%</td>
                          <td>Chat · SSE</td>
                          <td>Secondary tier</td>
                        </tr>
                      </tbody>
                    </table>
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
                      <span className="small-label">CHAT GENERATIONS · /workspaces/default/</span>
                      <h3>Multi-turn Chat with usage &amp; charge trace</h3>
                      <p>Customers test models, compare outputs, and resume saved conversations across browsers while every response links to its workspace token count and customer charge.</p>
                    </article>
                    <article className="preview-subcard">
                      <span className="small-label">VIDEO GENERATIONS · SEEDANCE TASKS</span>
                      <h3>Async video creation, history &amp; result download</h3>
                      <p>Submit text-to-video or image-to-video tasks, restore saved prompt/material inputs, track job status, and preview or download available video outputs.</p>
                    </article>
                  </div>
                </div>
              )}
            </div>

            <div className="preview-caption">
              <span>Gateway · Workspace Dashboard · Model Catalog · Docs — served from one endpoint</span>
              <a href="/workspaces/default/">
                Open workspace dashboard <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PERFORMANCE BENCHMARK (VISUAL CARDS + VERDICT) */}
      <section className="section container benchmark-section" id="benchmark" aria-labelledby="benchmark-title">
        <div className="benchmark-heading">
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
          {benchmarkSteps.map((item) => (
            <li key={item.step}>
              <span>{item.step}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="benchmark-demo">
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
                  <article key={card.name} className={`model-result${card.isWinner ? ' model-winner' : ''}`}>
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
        <div className="section-heading">
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
          {capabilities.map((item) => (
            <article key={item.href} className="capability">
              <span className="feature-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a className="text-link" href={item.href}>
                {item.label} <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* 4. DROP-IN API QUICKSTART */}
      <section className="gateway-section" id="gateway" aria-labelledby="gateway-title">
        <div className="container section gateway-grid">
          <div>
            <p className="eyebrow">DROP-IN COMPATIBILITY</p>
            <h2 id="gateway-title">
              One endpoint for SDKs<br />
              and coding agents.
            </h2>
            <p className="section-description">
              Point any OpenAI-compatible client, Claude Code, or Codex at your Niu gateway using a scoped workspace API key.
            </p>
            <ul className="gateway-features">
              <li>
                <span>01</span>Bind upstream Provider credentials to a route pool alias
              </li>
              <li>
                <span>02</span>Issue a workspace API key with model grants and spending caps
              </li>
              <li>
                <span>03</span>Stream responses while Niu records usage and customer charges
              </li>
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
          <div className="code-card">
            <div className="code-heading">
              <span>STREAMING REQUEST · /V1/CHAT/COMPLETIONS</span>
              <span>cURL</span>
            </div>
            <pre>
              <code>{requestExample}</code>
            </pre>
            <div className="code-footnote">
              <span className="status-dot"></span>Recorded in PostgreSQL: <strong>Operation → Attempt → Usage (40 tok) → Settled Customer Charge ($0.018)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELF-HOSTED ARCHITECTURE & EVALUATION SCOPE */}
      <section className="section container" id="release" aria-labelledby="release-title">
        <div className="section-heading">
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
          <article className="release-card">
            <span className="phase available">
              <span className="status-dot"></span>READY TO DEPLOY &amp; EVALUATE
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
          <article className="release-card upcoming">
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
          <div className="section-heading">
            <h2 id="landing-blog-title">From the Niu blog.</h2>
            <div className="landing-blog-intro">
              <p>Engineering notes on gateway performance, financial accounting, and operating model APIs.</p>
              <a className="text-link" href="/blog/">
                All articles <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="landing-blog-list">
            {latestPosts.map((post) => (
              <article key={post.href} className="landing-blog-entry">
                <div className="landing-blog-meta">
                  <span>{post.category}</span>
                  <time dateTime={post.publishedAt}>{post.dateLabel}</time>
                  <span>{post.readingTime}</span>
                </div>
                <div className="landing-blog-body">
                  <h3>
                    <a href={post.href}>{post.title}</a>
                  </h3>
                  <p>{post.description}</p>
                  <a className="text-link" href={post.href} aria-label={`Read article: ${post.title}`}>
                    Read article <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 7. CONCISE FAQ */}
      <section className="section container faq-section" aria-labelledby="faq-title">
        <div>
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h2 id="faq-title">Key questions.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 8. CLOSING CTA */}
      <section className="closing container">
        <div>
          <p className="eyebrow">OPEN-SOURCE AI GATEWAY &amp; WORKSPACE</p>
          <h2>Deploy Niu and run your first model route.</h2>
        </div>
        <div className="actions" style={{ marginTop: 0 }}>
          <Button asChild size="lg" children={createElement('a', { href: links.quickstart }, 'Get started')} />
          <Button asChild size="lg" variant="secondary" children={createElement('a', { href: links.repo }, 'Star on GitHub')} />
        </div>
      </section>
    </main>
  );
}
