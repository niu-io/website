export interface GatewayBenchmarkCard {
  name: string;
  runtime: string;
  badge: string;
  isWinner?: boolean;
  primaryMetric: string;
  primaryUnit: string;
  primarySubtext: string;
  barPercent: number;
  facts: { label: string; value: string }[];
}

export interface GatewayBenchmarkRow {
  metric: string;
  sublabel?: string;
  niu: string;
  niuSub?: string;
  newApi: string;
  newApiSub?: string;
  litellm: string;
  litellmSub?: string;
  isKeyRow?: boolean;
}

export interface GatewayBenchmarkSuite {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  ruleTitle: string;
  ruleDetail: string;
  cards: GatewayBenchmarkCard[];
  rows: GatewayBenchmarkRow[];
  verdictNumber: string;
  verdictSub: string;
  verdictTitle: string;
  verdictBody: string;
}

export const benchmarkSteps = [
  {
    step: "01",
    title: "3,238.7 RPS peak throughput",
    description:
      "10.7x LiteLLM Proxy and 3.7x New API peak at c = 64 (/v1/chat/completions), with 31.54 ms p99 tail latency.",
  },
  {
    step: "02",
    title: "235.9 concurrent SSE streams/s",
    description:
      "9,436 tokens/s at c = 16 with 1.34 ms median inter-token latency (ITL) and 100% SSE chunk preservation.",
  },
  {
    step: "03",
    title: "18.2 MB idle / 26.4 MB peak RSS",
    description:
      "7.4x lower peak RAM and 10.7x lower proxy compute cost ($0.014 / 1M requests) while persisting ACID PostgreSQL records.",
  },
];

export const benchmarkSuites: GatewayBenchmarkSuite[] = [
  {
    id: "throughput",
    label: "Throughput & tail latency",
    eyebrow: "CLOSED-LOOP LOAD PROBE · 32 WARMUP + 2,000 REQUESTS PER TIER",
    title: "High-concurrency /v1/chat/completions & /v1/messages (c = 1 to 64)",
    description:
      "Isolates gateway routing, workspace key verification, protocol handling, and PostgreSQL accounting overhead against a deterministic 0ms mock upstream (36,649 RPS direct baseline).",
    ruleTitle: "Durability bar",
    ruleDetail: "ACID PostgreSQL admission & completion on Niu · 0% errors",
    cards: [
      {
        name: "Niu v0.2.4",
        runtime: "Rust · Axum · Tokio",
        badge: "3.7x – 10.7x faster",
        isWinner: true,
        primaryMetric: "3,238.7 RPS",
        primaryUnit: "PEAK THROUGHPUT AT C = 64",
        primarySubtext: "p50: 18.94 ms · p95: 26.11 ms · p99: 31.54 ms",
        barPercent: 100,
        facts: [
          { label: "c = 16 RPS / p99", value: "1,040.0 / 22.26 ms" },
          { label: "c = 1 RPS / p50", value: "233.6 / 4.00 ms" },
          { label: "/v1/messages (c=64)", value: "2,518.8 / 60.6 ms" },
          { label: "PostgreSQL work", value: "ACID + batch settle" },
        ],
      },
      {
        name: "New API",
        runtime: "Go · Gin · GORM (45fbb14)",
        badge: "26.7% of Niu",
        primaryMetric: "865.6 RPS",
        primaryUnit: "PEAK THROUGHPUT AT C = 64",
        primarySubtext: "p50: 71.15 ms · p95: 111.82 ms · p99: 135.73 ms",
        barPercent: 27,
        facts: [
          { label: "c = 16 RPS / p99", value: "612.4 / 408.08 ms" },
          { label: "c = 1 RPS / p50", value: "187.9 / 4.36 ms" },
          { label: "/v1/messages (c=16)", value: "164.5 / 473.9 ms" },
          { label: "PostgreSQL work", value: "Cached + SQL logs" },
        ],
      },
      {
        name: "LiteLLM Proxy",
        runtime: "Python · FastAPI (v1.104.0)",
        badge: "9.3% of Niu",
        primaryMetric: "302.2 RPS",
        primaryUnit: "PEAK THROUGHPUT AT C = 64",
        primarySubtext: "p50: 193.26 ms · p95: 318.24 ms · p99: 338.74 ms",
        barPercent: 9.3,
        facts: [
          { label: "c = 16 RPS / p99", value: "328.0 / 163.16 ms" },
          { label: "c = 1 RPS / p50", value: "136.5 / 6.41 ms" },
          { label: "/v1/messages (c=64)", value: "232.2 / 397.9 ms" },
          { label: "PostgreSQL work", value: "None (stateless)" },
        ],
      },
    ],
    rows: [
      {
        metric: "c = 64 throughput (/v1/chat/completions)",
        niu: "3,238.7 RPS",
        niuSub: "p50: 18.94 ms · p99: 31.54 ms",
        newApi: "865.6 RPS (peak)",
        newApiSub: "p50: 71.15 ms · p99: 135.73 ms",
        litellm: "302.2 RPS",
        litellmSub: "p50: 193.26 ms · p99: 338.74 ms",
        isKeyRow: true,
      },
      {
        metric: "c = 16 throughput (/v1/chat/completions)",
        niu: "1,040.0 RPS (p99: 22.26 ms)",
        newApi: "612.4 RPS peak / 278.7 RPS sustained",
        litellm: "328.0 RPS (p99: 163.16 ms)",
      },
      {
        metric: "c = 4 throughput (/v1/chat/completions)",
        niu: "300.5 RPS (p99: 19.51 ms)",
        newApi: "352.0 RPS (p99: 57.27 ms)",
        litellm: "296.9 RPS (p99: 18.28 ms)",
      },
      {
        metric: "c = 1 sequential (/v1/chat/completions)",
        niu: "233.6 RPS (p50: 4.00 ms)",
        newApi: "187.9 RPS (p50: 4.36 ms)",
        litellm: "136.5 RPS (p50: 6.41 ms)",
      },
      {
        metric: "Anthropic /v1/messages (c = 64)",
        niu: "2,518.8 RPS (p99: 60.61 ms)",
        newApi: "136.2 RPS (p99: 1,475.53 ms)",
        litellm: "232.2 RPS (p99: 397.88 ms)",
      },
    ],
    verdictNumber: "10.7x",
    verdictSub: "higher peak RPS than LiteLLM Proxy",
    verdictTitle:
      "Full ACID PostgreSQL admission and completion batching without sacrificing tail latency.",
    verdictBody:
      "Niu records pre-dispatch operations and attempts in a single SQL CTE and coalesces up to 64 post-dispatch completions per batch transaction, keeping c = 64 p99 latency at 31.54 ms while LiteLLM Proxy saturates its Python event loop at ~302 RPS.",
  },
  {
    id: "streaming",
    label: "SSE token streaming",
    eyebrow: "40 TOKENS / STREAM · 43 SSE EVENTS · CHUNK FIDELITY & ITL",
    title: "Concurrent Server-Sent Events (SSE) token streaming (c = 1 & c = 16)",
    description:
      "Measures completed SSE streams/sec, delivered tokens/sec, Time-To-First-Token (TTFT), Inter-Token Latency (ITL), and whether the gateway preserves all 43 SSE frames per response.",
    ruleTitle: "Streaming bar",
    ruleDetail: "43 / 43 SSE chunks preserved · 0 dropped events",
    cards: [
      {
        name: "Niu v0.2.4",
        runtime: "Rust · Tokio zero-copy SSE",
        badge: "2.3x – 2.8x faster",
        isWinner: true,
        primaryMetric: "235.9 /s",
        primaryUnit: "CONCURRENT STREAMS/SEC AT C = 16",
        primarySubtext: "9,436 tokens/s · ITL p50: 1.34 ms · 43.0 chunks",
        barPercent: 100,
        facts: [
          { label: "ITL p50 (c = 1)", value: "0.008 ms (8 µs)" },
          { label: "ITL p50 (c = 16)", value: "1.34 ms" },
          { label: "Stream p50 / p95", value: "62.2 / 88.2 ms" },
          { label: "Chunks preserved", value: "43.0 / 43.0 (100%)" },
        ],
      },
      {
        name: "New API",
        runtime: "Go Gin SSE relay (45fbb14)",
        badge: "42.8% of Niu",
        primaryMetric: "100.9 /s",
        primaryUnit: "CONCURRENT STREAMS/SEC AT C = 16",
        primarySubtext: "4,036 tokens/s · ITL p50: 3.55 ms · 42.0 chunks",
        barPercent: 43,
        facts: [
          { label: "ITL p50 (c = 1)", value: "0.036 ms (36 µs)" },
          { label: "ITL p50 (c = 16)", value: "3.55 ms" },
          { label: "Stream p50 / p95", value: "150.3 / 228.6 ms" },
          { label: "Chunks preserved", value: "42.0 / 43.0" },
        ],
      },
      {
        name: "LiteLLM Proxy",
        runtime: "Python async SSE (v1.104.0)",
        badge: "35.2% of Niu",
        primaryMetric: "83.0 /s",
        primaryUnit: "CONCURRENT STREAMS/SEC AT C = 16",
        primarySubtext: "3,320 tokens/s · ITL p50: 4.62 ms · 43.0 chunks",
        barPercent: 35,
        facts: [
          { label: "ITL p50 (c = 1)", value: "0.194 ms (194 µs)" },
          { label: "ITL p50 (c = 16)", value: "4.62 ms" },
          { label: "Stream p50 / p95", value: "192.7 / 207.3 ms" },
          { label: "Chunks preserved", value: "43.0 / 43.0 (100%)" },
        ],
      },
    ],
    rows: [
      {
        metric: "Concurrent streaming throughput (c = 16)",
        niu: "235.9 streams/s",
        niuSub: "9,436 tokens/s · Stream p50: 62.17 ms",
        newApi: "100.9 streams/s",
        newApiSub: "4,036 tokens/s · Stream p50: 150.33 ms",
        litellm: "83.0 streams/s",
        litellmSub: "3,320 tokens/s · Stream p50: 192.65 ms",
        isKeyRow: true,
      },
      {
        metric: "Concurrent Inter-Token Latency (ITL p50, c = 16)",
        niu: "1.34 ms",
        newApi: "3.55 ms (2.65x slower)",
        litellm: "4.62 ms (3.45x slower)",
      },
      {
        metric: "Single-stream Inter-Token Latency (ITL p50, c = 1)",
        niu: "0.008 ms (+3 µs over direct mock)",
        newApi: "0.036 ms (+31 µs over direct mock)",
        litellm: "0.194 ms (+189 µs over direct mock)",
      },
      {
        metric: "Single-stream throughput (c = 1)",
        niu: "138.6 streams/s (5,544 tok/s)",
        newApi: "138.3 streams/s (5,532 tok/s)",
        litellm: "60.4 streams/s (2,416 tok/s)",
      },
      {
        metric: "SSE chunks delivered per 40-token stream",
        niu: "43.0 / 43.0 chunks",
        newApi: "42.0 / 43.0 chunks",
        litellm: "43.0 / 43.0 chunks",
      },
    ],
    verdictNumber: "2.84x",
    verdictSub: "more concurrent SSE streams/sec",
    verdictTitle:
      "Sub-10 microsecond single-stream ITL overhead and 9,436 tokens/sec at c = 16.",
    verdictBody:
      "Because LiteLLM Proxy instantiates and serializes Python/Pydantic chunk objects on every SSE token event, it adds 194 µs per chunk at c = 1 and plateaus at 83.0 streams/s at c = 16. Niu forwards SSE frames directly through Tokio byte streams while extracting terminal usage.",
  },
  {
    id: "agents",
    label: "Coding agent sessions",
    eyebrow: "16 CONCURRENT CODING AGENTS · 30 TURNS EACH · 480 SSE STREAMS",
    title: "Multi-turn Claude Code (/v1/messages) & Codex (/v1/chat/completions) sessions",
    description:
      "Simulates 8 and 16 concurrent coding agents executing 30 sequential turns each with conversation context growing from 1.5 KB on turn 1 to 25 KB on turn 30.",
    ruleTitle: "Workload profile",
    ruleDetail: "16 agents × 30 turns = 480 growing-context SSE streams",
    cards: [
      {
        name: "Niu v0.2.4",
        runtime: "Native /v1/messages & /v1/chat",
        badge: "2.8x – 3.4x faster",
        isWinner: true,
        primaryMetric: "1.69 s",
        primaryUnit: "16-AGENT CODEX 30-TURN WALL TIME",
        primarySubtext: "Turn p50: 54.05 ms · Turn p99: 72.50 ms",
        barPercent: 100,
        facts: [
          { label: "16-agent Claude Code", value: "1.75 s (55.0 ms/turn)" },
          { label: "16-agent Codex", value: "1.69 s (54.1 ms/turn)" },
          { label: "8-agent Claude Code", value: "1.78 s (54.1 ms/turn)" },
          { label: "8-agent Codex", value: "1.69 s (55.7 ms/turn)" },
        ],
      },
      {
        name: "New API",
        runtime: "Go channel relay (45fbb14)",
        badge: "2.9x slower",
        primaryMetric: "4.89 s",
        primaryUnit: "16-AGENT CODEX 30-TURN WALL TIME",
        primarySubtext: "Turn p50: 132.79 ms · Turn p99: 510.17 ms",
        barPercent: 34,
        facts: [
          { label: "16-agent Claude Code", value: "4.86 s (142.0 ms/turn)" },
          { label: "16-agent Codex", value: "4.89 s (132.8 ms/turn)" },
          { label: "8-agent Claude Code", value: "2.95 s (82.1 ms/turn)" },
          { label: "8-agent Codex", value: "3.13 s (83.1 ms/turn)" },
        ],
      },
      {
        name: "LiteLLM Proxy",
        runtime: "Python FastAPI (v1.104.0)",
        badge: "3.4x slower",
        primaryMetric: "5.80 s",
        primaryUnit: "16-AGENT CODEX 30-TURN WALL TIME",
        primarySubtext: "Turn p50: 180.75 ms · Turn p99: 328.23 ms",
        barPercent: 29,
        facts: [
          { label: "16-agent Claude Code", value: "3.35 s (103.0 ms/turn)" },
          { label: "16-agent Codex", value: "5.80 s (180.8 ms/turn)" },
          { label: "8-agent Claude Code", value: "2.01 s (62.2 ms/turn)" },
          { label: "8-agent Codex", value: "3.06 s (93.3 ms/turn)" },
        ],
      },
    ],
    rows: [
      {
        metric: "16 agents × 30 turns (codex /v1/chat/completions)",
        niu: "1,686.6 ms wall",
        niuSub: "Turn p50: 54.05 ms · Turn p99: 72.50 ms",
        newApi: "4,891.9 ms wall",
        newApiSub: "Turn p50: 132.79 ms · Turn p99: 510.17 ms",
        litellm: "5,803.9 ms wall",
        litellmSub: "Turn p50: 180.75 ms · Turn p99: 328.23 ms",
        isKeyRow: true,
      },
      {
        metric: "16 agents × 30 turns (claude_code /v1/messages)",
        niu: "1,746.0 ms (turn p50: 55.02 ms)",
        newApi: "4,864.9 ms (turn p50: 141.96 ms)",
        litellm: "3,353.3 ms (turn p50: 103.01 ms)",
      },
      {
        metric: "8 agents × 30 turns (codex /v1/chat/completions)",
        niu: "1,687.6 ms (turn p50: 55.71 ms)",
        newApi: "3,126.2 ms (turn p50: 83.10 ms)",
        litellm: "3,057.5 ms (turn p50: 93.26 ms)",
      },
      {
        metric: "8 agents × 30 turns (claude_code /v1/messages)",
        niu: "1,781.6 ms (turn p50: 54.14 ms)",
        newApi: "2,953.3 ms (turn p50: 82.13 ms)",
        litellm: "2,005.3 ms (turn p50: 62.17 ms)",
      },
    ],
    verdictNumber: "3.44x",
    verdictSub: "faster 16-agent coding session completion",
    verdictTitle:
      "Flat session latency when doubling concurrent coding agents from 8 to 16.",
    verdictBody:
      "As growing conversation histories reach 25 KB per turn across 16 simultaneous agents, JSON re-parsing and event-loop contention double LiteLLM Proxy's completion time (3.06s to 5.80s). Niu completes all 480 turns in 1.69s with a flat 54 ms median turn time.",
  },
  {
    id: "efficiency",
    label: "Memory & cost efficiency",
    eyebrow: "RESIDENT SET SIZE (RSS) & AWS C7G.LARGE ($0.0725/HR) EFFICIENCY",
    title: "Memory footprint & proxy compute cost per 1M requests",
    description:
      "Measures idle and peak resident memory (RSS) under 64-worker load and calculates gateway compute cost per 1M proxied requests at 60% target CPU utilization.",
    ruleTitle: "Instance reference",
    ruleDetail: "AWS c7g.large (2 vCPU, 4 GB RAM · $0.0725/hr on-demand)",
    cards: [
      {
        name: "Niu v0.2.4",
        runtime: "Single static Rust binary",
        badge: "7.4x less peak RAM",
        isWinner: true,
        primaryMetric: "18.2 MB",
        primaryUnit: "IDLE RSS (26.4 MB PEAK AT C = 64)",
        primarySubtext: "$0.014 per 1M requests · 71,599 RPS/$/hr",
        barPercent: 14,
        facts: [
          { label: "Idle RSS", value: "18.16 MB" },
          { label: "Peak RSS (c = 64)", value: "26.40 MB" },
          { label: "RPS per $/hr (60%)", value: "71,599 RPS/$/hr" },
          { label: "Cost / 1M requests", value: "$0.014" },
        ],
      },
      {
        name: "New API",
        runtime: "Go binary + GORM (45fbb14)",
        badge: "3.7x higher RAM",
        primaryMetric: "37.4 MB",
        primaryUnit: "IDLE RSS (98.5 MB PEAK AT C = 64)",
        primarySubtext: "$0.052 per 1M requests · 19,136 RPS/$/hr",
        barPercent: 51,
        facts: [
          { label: "Idle RSS", value: "37.42 MB" },
          { label: "Peak RSS (c = 64)", value: "98.50 MB" },
          { label: "RPS per $/hr (60%)", value: "19,136 RPS/$/hr" },
          { label: "Cost / 1M requests", value: "$0.052" },
        ],
      },
      {
        name: "LiteLLM Proxy",
        runtime: "Python 3.12 + SDKs (v1.104.0)",
        badge: "7.4x higher RAM",
        primaryMetric: "158.0 MB",
        primaryUnit: "IDLE RSS (194.6 MB PEAK AT C = 64)",
        primarySubtext: "$0.150 per 1M requests · 6,681 RPS/$/hr",
        barPercent: 100,
        facts: [
          { label: "Idle RSS", value: "158.00 MB" },
          { label: "Peak RSS (c = 64)", value: "194.60 MB" },
          { label: "RPS per $/hr (60%)", value: "6,681 RPS/$/hr" },
          { label: "Cost / 1M requests", value: "$0.150" },
        ],
      },
    ],
    rows: [
      {
        metric: "Proxy compute cost per 1M requests (c7g.large @ 60% util)",
        niu: "$0.014 / 1M",
        niuSub: "71,599 RPS per $/hr · 1,943 effective RPS",
        newApi: "$0.052 / 1M",
        newApiSub: "19,136 RPS per $/hr · 519 effective RPS",
        litellm: "$0.150 / 1M",
        litellmSub: "6,681 RPS per $/hr · 181 effective RPS",
        isKeyRow: true,
      },
      {
        metric: "Idle resident memory (RSS)",
        niu: "18.16 MB",
        newApi: "37.42 MB (2.06x Niu)",
        litellm: "158.00 MB (8.70x Niu)",
      },
      {
        metric: "Peak resident memory under c = 64 load (RSS)",
        niu: "26.40 MB",
        newApi: "98.50 MB (3.73x Niu)",
        litellm: "194.60 MB (7.37x Niu)",
      },
    ],
    verdictNumber: "$0.014",
    verdictSub: "proxy compute cost per 1M requests",
    verdictTitle:
      "Run high-throughput gateway nodes in under 30 MB of RAM.",
    verdictBody:
      "Importing Python provider SDKs and tokenizers consumes 158–195 MB per LiteLLM worker before serving traffic. Niu's native Rust binary starts in 18.2 MB and grows by only 8.2 MB under 64-worker saturation.",
  },
];
