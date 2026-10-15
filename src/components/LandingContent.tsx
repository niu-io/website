import { createElement, useState } from 'react';
import { Button } from './ui/button';
import { links, capabilities, faqs, requestExample } from '../content/landing';
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

export default function LandingContent({ latestPosts }: { latestPosts: LandingPost[] }) {
  const [activeSuiteIndex, setActiveSuiteIndex] = useState(0);

  return (
<main id="main">
<section className="hero container" aria-labelledby="hero-title">
<a className="release-link" href="#benchmark"><span className="status-dot"></span>Open source · 3,239 RPS Rust AI gateway · 10.7x LiteLLM </a>
<h1 id="hero-title">Build your model<br/><span className="accent">API business.</span></h1>
<p className="hero-description">Open-source infrastructure for people building a business on model aggregation and forwarding. Operate your supply, keep clear accounts, and give customers a service they can trust.</p>
<div className="actions"><Button asChild size="lg" children={createElement('a',{href:links.quickstart},'Get started')}/><Button asChild size="lg" variant="secondary" children={createElement('a',{href:'/models/'},'Browse models')}/></div>
<p className="hero-note">Service delivery · Clear accounts · Customer confidence</p>
<p className="hero-availability">Open-source foundations. Commercial discipline. <a href="/blog/why-niu/">Why Niu?</a></p>
</section>
<section className="gateway-section" id="gateway" aria-labelledby="gateway-title"><div className="container section gateway-grid"><div><h2 id="gateway-title">Your supply.<br/>Your customer endpoint.</h2><p className="section-description">Configure a Provider and model route, issue a scoped workspace key, and serve a request through your gateway. Follow its delivery, reported usage and customer charge.</p><ul className="gateway-features"><li><span>01</span>Connect a configured model alias</li><li><span>02</span>Keep upstream credentials server-side</li><li><span>03</span>Use your application’s scoped API key</li></ul><a className="text-link" href="/docs/guides/api-quickstart/">Read the API quickstart</a></div><div className="code-card"><div className="code-heading"><span>YOUR FIRST REQUEST</span><span>cURL</span></div><pre><code>{requestExample}</code></pre><div className="code-footnote">Replace YOUR_MODEL_ALIAS with an available model and use your workspace key.</div></div></div></section>
<section className="section container" id="product" aria-labelledby="product-title"><div className="section-heading"><h2 id="product-title">Deliver the service.<br/>Run the business.</h2><p>Customers pay for a service they can depend on. Niu brings model delivery, financial accounting and customer workflows together so you can operate the whole platform.</p></div><div className="capability-grid">{capabilities.map(item=><article key={item.href} className="capability"><h3>{item.title}</h3><p>{item.description}</p><a className="text-link" href={item.href}>{item.label}</a></article>)}</div></section>
<section className="section container benchmark-section" id="benchmark" aria-labelledby="benchmark-title">
  <div className="benchmark-heading">
    <div>
      <p className="eyebrow">AI GATEWAY PERFORMANCE BENCHMARK</p>
      <h2 id="benchmark-title">Built in Rust for high throughput<br/>and predictable tail latency.</h2>
    </div>
    <p>Evaluated with the open-source <code>ai-gateway-bench</code> harness against a deterministic 0ms mock upstream on Apple M4 with PostgreSQL 17.11—comparing Niu, New API, and LiteLLM Proxy across concurrency tiers, SSE streaming, and coding agent sessions.</p>
  </div>
  <ol className="benchmark-steps">
    {benchmarkSteps.map(item => (
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
      <span className="sample-label">REPRODUCIBLE AI-GATEWAY-BENCH SUITE · 0MS MOCK UPSTREAM ON LOOPBACK</span>
      <span className="benchmark-status">Apple M4 (10-core, 24 GB) · PostgreSQL 17.11 · October 2026</span>
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
          {suite.cards.map(card => (
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
                {card.facts.map(fact => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <div className="comparison-scroll" role="region" aria-label={suite.title} tabIndex={0}>
          <table className="comparison-matrix benchmark-matrix">
            <caption className="sr-only">{suite.title} comparison across Niu, New API, and LiteLLM Proxy.</caption>
            <thead>
              <tr>
                <th scope="col">Metric</th>
                <th scope="col" className="matrix-selected">
                  <strong>Niu (v0.2.4)</strong>
                  <small>Rust · Axum · Tokio + PostgreSQL</small>
                </th>
                <th scope="col">
                  <strong>New API (45fbb14)</strong>
                  <small>Go · Gin · GORM + PostgreSQL</small>
                </th>
                <th scope="col">
                  <strong>LiteLLM Proxy (v1.104.0)</strong>
                  <small>Python · FastAPI · Uvicorn</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {suite.rows.map(row => (
                <tr key={row.metric} className={row.isKeyRow ? 'matrix-key' : undefined}>
                  <th scope="row">{row.metric}</th>
                  <td className="matrix-selected">
                    <strong>{row.niu}</strong>
                    {row.niuSub && <small>{row.niuSub}</small>}
                  </td>
                  <td>
                    {row.isKeyRow ? <strong>{row.newApi}</strong> : row.newApi}
                    {row.newApiSub && <small>{row.newApiSub}</small>}
                  </td>
                  <td>
                    {row.isKeyRow ? <strong>{row.litellm}</strong> : row.litellm}
                    {row.litellmSub && <small>{row.litellmSub}</small>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    <div className="benchmark-method">
      <p><strong>Methodology:</strong> Adapted from <code>BerriAI/ai-gateway-bench</code>. All three gateways ran on the same Apple M4 host (10-core CPU, 24 GB RAM, macOS arm64) over loopback against a zero-delay Rust/Axum mock upstream (36,649 RPS direct baseline) with 32 warmup requests per run.</p>
      <p>Niu ran with full ACID PostgreSQL 17.11 pre-dispatch request admission and micro-batched completion settlement; New API ran with <code>MEMORY_CACHE_ENABLED=true</code> and <code>BATCH_UPDATE_ENABLED=true</code>; LiteLLM Proxy ran in its fastest stateless <code>master_key</code> mode with database spend logs disabled.</p>
    </div>
  </div>
  <div className="benchmark-next">
    <p><strong>Inspect the methodology, full tables, and reproduction steps.</strong> Real production capacity depends on your hardware, PostgreSQL topology, and upstream Provider latency—qualify the routes you deploy.</p>
    <a className="text-link" href={links.benchmark}>Read the full benchmark documentation <span aria-hidden="true">→</span></a>
  </div>
</section>
<section className="integration-story container" id="pricing" aria-labelledby="pricing-title"><div><h2 id="pricing-title">Know what you charge.<br/>Know what you owe.</h2></div><div className="integration-points"><article><h3>Price your service independently</h3><p>Manage customer tariffs separately from Provider offers. Keep customer charges, procurement costs and Provider earnings distinct, so selling access and buying supply do not become the same account.</p></article><article><h3>Give customers a bill they can understand</h3><p>Connect reported usage and customer charges to request evidence. Keep unresolved amounts explicit and procurement prices in platform administration, outside customer reports.</p></article></div></section>
<section className="section container editions-section" id="deployment" aria-labelledby="deployment-title"><div className="section-heading"><h2 id="deployment-title">Open-source foundations.<br/>Commercial discipline.</h2><p>Build on a public core you can inspect, deploy and adapt. Community operation requires no private source or license service; commercial and enterprise extensions use explicit composition boundaries.</p></div><div className="enterprise-controls"><h3>Operate the public core.</h3><div><article><h4>Deploy together</h4><p>Gateway, dashboard, catalog and documentation share one public application endpoint.</p></article><article><h4>Own access and records</h4><p>Manage workspace keys, Provider credentials and persisted request history with scoped authorization.</p></article><article><h4>Inspect and extend</h4><p>Niu-owned code is MIT licensed; reused modules retain their original licenses and attribution.</p></article></div></div><div className="actions"><Button asChild variant="secondary" children={createElement('a',{href:links.deployment},'Deployment guide')}/><Button asChild variant="secondary" children={createElement('a',{href:links.repo},'View the source')}/></div></section>
{latestPosts.length > 0 && <section className="section container landing-blog" aria-labelledby="landing-blog-title">
<div className="section-heading"><h2 id="landing-blog-title">From the Niu blog.</h2><div className="landing-blog-intro"><p>Why model delivery, clear accounts and customer trust belong in the same product.</p><a className="text-link" href="/blog/">All articles</a></div></div>
<div className="landing-blog-list">{latestPosts.map(post => <article key={post.href} className="landing-blog-entry">
<div className="landing-blog-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{post.dateLabel}</time><span>{post.readingTime}</span></div>
<div className="landing-blog-body"><h3><a href={post.href}>{post.title}</a></h3><p>{post.description}</p><a className="text-link" href={post.href} aria-label={`Read article: ${post.title}`}>Read article</a></div>
</article>)}</div>
</section>}
<section className="section container" id="release" aria-labelledby="release-title"><div className="section-heading"><h2 id="release-title">Evaluate the product.<br/>Know its boundaries.</h2><p>The development build is available. The first feature-complete release is still being qualified; implemented interfaces and complete release acceptance are distinct.</p></div><div className="release-grid"><article className="release-card"><span className="phase available">AVAILABLE TO EVALUATE</span><h3>Start with supported workflows.</h3><ul><li>Provider credentials and configured model routes</li><li>Scoped workspace keys and spending controls</li><li>Request usage and customer-charge records</li><li>Saved Chat and Video management interfaces</li><li>Generated REST and SDK references</li></ul><a className="text-link" href="/docs/">Explore the documentation</a></article><article className="release-card upcoming"><span className="phase">QUALIFICATION IN PROGRESS</span><h3>Check the route you will use.</h3><ul><li>Model and protocol conformance</li><li>Complete video generation and result lifecycle</li><li>Qualified commercial offers and payments</li><li>Deployment, upgrade and recovery acceptance</li></ul><a className="text-link" href={links.release}>Release acceptance matrix</a></article></div></section>
<section className="section container start-section" aria-labelledby="start-title"><div><h2 id="start-title">Build.<br/>Connect.<br/>Operate.</h2><p className="section-description">Start with a request, then choose the guide or generated reference you need.</p></div><div className="start-paths"><a href="/docs/guides/api-quickstart/"><span className="path-number">01</span><div><h3>Use the API</h3><p>Make model calls with your workspace key.</p></div></a><a href="/docs/guides/sdk-quickstart/"><span className="path-number">02</span><div><h3>Use the SDK</h3><p>Typed client calls, streaming and error handling.</p></div></a><a href="/compare/"><span className="path-number">03</span><div><h3>Compare Niu</h3><p>See how Niu differs from New API and OpenRouter.</p></div></a></div></section>
<section className="section container faq-section" aria-labelledby="faq-title"><h2 id="faq-title">Before you start.</h2><div className="faq-list">{faqs.map(faq=><details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
<section className="closing container"><h2>Build a service<br/>customers trust.</h2><Button asChild size="lg" children={createElement('a',{href:links.quickstart},'Get started')}/></section>
</main>
); }
