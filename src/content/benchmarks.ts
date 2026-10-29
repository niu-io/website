export interface GatewayBenchmarkFact {
  label: string;
  labelZh?: string;
  value: string;
  valueZh?: string;
}

export interface GatewayBenchmarkCard {
  name: string;
  runtime: string;
  runtimeZh?: string;
  badge: string;
  badgeZh?: string;
  isWinner?: boolean;
  primaryMetric: string;
  primaryMetricZh?: string;
  primaryUnit: string;
  primaryUnitZh?: string;
  primarySubtext: string;
  primarySubtextZh?: string;
  barPercent: number;
  facts: GatewayBenchmarkFact[];
}

export interface GatewayBenchmarkRow {
  metric: string;
  metricZh?: string;
  sublabel?: string;
  niu: string;
  niuZh?: string;
  niuSub?: string;
  niuSubZh?: string;
  newApi: string;
  newApiZh?: string;
  newApiSub?: string;
  newApiSubZh?: string;
  litellm: string;
  litellmZh?: string;
  litellmSub?: string;
  litellmSubZh?: string;
  isKeyRow?: boolean;
}

export interface GatewayBenchmarkSuite {
  id: string;
  label: string;
  labelZh?: string;
  eyebrow: string;
  eyebrowZh?: string;
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  ruleTitle: string;
  ruleTitleZh?: string;
  ruleDetail: string;
  ruleDetailZh?: string;
  cards: GatewayBenchmarkCard[];
  rows: GatewayBenchmarkRow[];
  verdictNumber: string;
  verdictSub: string;
  verdictSubZh?: string;
  verdictTitle: string;
  verdictTitleZh?: string;
  verdictBody: string;
  verdictBodyZh?: string;
}

export const benchmarkSteps = [
  {
    step: "01",
    title: "3,238.7 RPS peak throughput",
    titleZh: "3,238.7 RPS 峰值吞吐",
    description:
      "10.7x LiteLLM Proxy and 3.7x New API peak at c = 64 (/v1/chat/completions), with 31.54 ms p99 tail latency.",
    descriptionZh:
      "64 并发 (/v1/chat/completions) 下达 LiteLLM Proxy 的 10.7 倍、New API 的 3.7 倍，p99 尾延迟仅 31.54 ms。",
  },
  {
    step: "02",
    title: "235.9 concurrent SSE streams/s",
    titleZh: "235.9 并发 SSE 流 / 秒",
    description:
      "9,436 tokens/s at c = 16 with 1.34 ms median inter-token latency (ITL) and 100% SSE chunk preservation.",
    descriptionZh:
      "16 并发下达 9,436 Token/s，中位逐字延迟 (ITL) 仅 1.34 ms，SSE 分片保留率 100%。",
  },
  {
    step: "03",
    title: "18.2 MB idle / 26.4 MB peak RSS",
    titleZh: "18.2 MB 空闲 / 26.4 MB 峰值内存",
    description:
      "7.4x lower peak RAM and 10.7x lower proxy compute cost ($0.014 / 1M requests) while persisting ACID PostgreSQL records.",
    descriptionZh:
      "在持久化 PostgreSQL ACID 账本的同时，峰值内存降低 7.4 倍，每百万请求网关计算成本低至 $0.014（降低 10.7 倍）。",
  },
];

export const benchmarkSuites: GatewayBenchmarkSuite[] = [
  {
    id: "throughput",
    label: "Throughput & tail latency",
    labelZh: "吞吐量与尾延迟",
    eyebrow: "Closed-loop load probe · 32 warmup + 2,000 requests per tier",
    eyebrowZh: "闭环压测 · 每梯度 32 次预热 + 2,000 次请求",
    title: "High-concurrency /v1/chat/completions & /v1/messages (c = 1 to 64)",
    titleZh:
      "高并发 /v1/chat/completions 与 /v1/messages 吞吐测试（c = 1 至 64）",
    description:
      "Isolates gateway routing, workspace key verification, protocol handling, and PostgreSQL accounting overhead against a deterministic 0ms mock upstream (36,649 RPS direct baseline).",
    descriptionZh:
      "基于确定性 0ms 模拟上游（直连基线 36,649 RPS），独立测量网关路由、工作空间密钥鉴权、协议处理与 PostgreSQL 账本写入开销。",
    ruleTitle: "Durability bar",
    ruleTitleZh: "持久化标准",
    ruleDetail: "ACID PostgreSQL admission & completion on Niu · 0% errors",
    ruleDetailZh: "Niu 全程执行 PostgreSQL ACID 准入与结算 · 0% 错误率",
    cards: [
      {
        name: "Niu v0.2.4",
        runtime: "Rust · Axum · Tokio",
        runtimeZh: "Rust · Axum · Tokio",
        badge: "3.7× – 10.7× faster",
        badgeZh: "领先 3.7 – 10.7 倍",
        isWinner: true,
        primaryMetric: "3,238.7 RPS",
        primaryUnit: "Peak throughput at c = 64",
        primaryUnitZh: "64 并发峰值吞吐量",
        primarySubtext: "p50: 18.94 ms · p95: 26.11 ms · p99: 31.54 ms",
        primarySubtextZh: "p50: 18.94 ms · p95: 26.11 ms · p99: 31.54 ms",
        barPercent: 100,
        facts: [
          {
            label: "c = 16 RPS / p99",
            labelZh: "16 并发 RPS / p99",
            value: "1,040.0 / 22.26 ms",
          },
          {
            label: "c = 1 RPS / p50",
            labelZh: "单并发 RPS / p50",
            value: "233.6 / 4.00 ms",
          },
          {
            label: "/v1/messages (c=64)",
            labelZh: "/v1/messages (64 并发)",
            value: "2,518.8 / 60.6 ms",
          },
          {
            label: "PostgreSQL work",
            labelZh: "数据库账本写入",
            value: "ACID + batch settle",
            valueZh: "ACID 准入 + 批量结算",
          },
        ],
      },
      {
        name: "New API",
        runtime: "Go · Gin · GORM (45fbb14)",
        runtimeZh: "Go · Gin · GORM (45fbb14)",
        badge: "26.7% of Niu",
        badgeZh: "吞吐仅为 Niu 的 26.7%",
        primaryMetric: "865.6 RPS",
        primaryUnit: "Peak throughput at c = 64",
        primaryUnitZh: "64 并发峰值吞吐量",
        primarySubtext: "p50: 71.15 ms · p95: 111.82 ms · p99: 135.73 ms",
        primarySubtextZh: "p50: 71.15 ms · p95: 111.82 ms · p99: 135.73 ms",
        barPercent: 27,
        facts: [
          {
            label: "c = 16 RPS / p99",
            labelZh: "16 并发 RPS / p99",
            value: "612.4 / 408.08 ms",
          },
          {
            label: "c = 1 RPS / p50",
            labelZh: "单并发 RPS / p50",
            value: "187.9 / 4.36 ms",
          },
          {
            label: "/v1/messages (c=16)",
            labelZh: "/v1/messages (16 并发)",
            value: "164.5 / 473.9 ms",
          },
          {
            label: "PostgreSQL work",
            labelZh: "数据库账本写入",
            value: "Cached + SQL logs",
            valueZh: "内存缓存 + 异步日志",
          },
        ],
      },
      {
        name: "LiteLLM Proxy",
        runtime: "Python · FastAPI (v1.104.0)",
        runtimeZh: "Python · FastAPI (v1.104.0)",
        badge: "9.3% of Niu",
        badgeZh: "吞吐仅为 Niu 的 9.3%",
        primaryMetric: "302.2 RPS",
        primaryUnit: "Peak throughput at c = 64",
        primaryUnitZh: "64 并发峰值吞吐量",
        primarySubtext: "p50: 193.26 ms · p95: 318.24 ms · p99: 338.74 ms",
        primarySubtextZh: "p50: 193.26 ms · p95: 318.24 ms · p99: 338.74 ms",
        barPercent: 9.3,
        facts: [
          {
            label: "c = 16 RPS / p99",
            labelZh: "16 并发 RPS / p99",
            value: "328.0 / 163.16 ms",
          },
          {
            label: "c = 1 RPS / p50",
            labelZh: "单并发 RPS / p50",
            value: "136.5 / 6.41 ms",
          },
          {
            label: "/v1/messages (c=64)",
            labelZh: "/v1/messages (64 并发)",
            value: "232.2 / 397.9 ms",
          },
          {
            label: "PostgreSQL work",
            labelZh: "数据库账本写入",
            value: "None (stateless)",
            valueZh: "关闭（无状态模式）",
          },
        ],
      },
    ],
    rows: [
      {
        metric: "c = 64 throughput (/v1/chat/completions)",
        metricZh: "64 并发吞吐量 (/v1/chat/completions)",
        niu: "3,238.7 RPS",
        niuSub: "p50: 18.94 ms · p99: 31.54 ms",
        newApi: "865.6 RPS (peak)",
        newApiZh: "865.6 RPS（峰值）",
        newApiSub: "p50: 71.15 ms · p99: 135.73 ms",
        litellm: "302.2 RPS",
        litellmSub: "p50: 193.26 ms · p99: 338.74 ms",
        isKeyRow: true,
      },
      {
        metric: "c = 16 throughput (/v1/chat/completions)",
        metricZh: "16 并发吞吐量 (/v1/chat/completions)",
        niu: "1,040.0 RPS (p99: 22.26 ms)",
        newApi: "612.4 RPS peak / 278.7 RPS sustained",
        newApiZh: "612.4 RPS 峰值 / 278.7 RPS 持续",
        litellm: "328.0 RPS (p99: 163.16 ms)",
      },
      {
        metric: "c = 4 throughput (/v1/chat/completions)",
        metricZh: "4 并发吞吐量 (/v1/chat/completions)",
        niu: "300.5 RPS (p99: 19.51 ms)",
        newApi: "352.0 RPS (p99: 57.27 ms)",
        litellm: "296.9 RPS (p99: 18.28 ms)",
      },
      {
        metric: "c = 1 sequential (/v1/chat/completions)",
        metricZh: "单并发顺序请求 (/v1/chat/completions)",
        niu: "233.6 RPS (p50: 4.00 ms)",
        newApi: "187.9 RPS (p50: 4.36 ms)",
        litellm: "136.5 RPS (p50: 6.41 ms)",
      },
      {
        metric: "Anthropic /v1/messages (c = 64)",
        metricZh: "Anthropic /v1/messages 原生接口 (64 并发)",
        niu: "2,518.8 RPS (p99: 60.61 ms)",
        newApi: "136.2 RPS (p99: 1,475.53 ms)",
        litellm: "232.2 RPS (p99: 397.88 ms)",
      },
    ],
    verdictNumber: "10.7×",
    verdictSub: "higher peak RPS than LiteLLM Proxy",
    verdictSubZh: "峰值 RPS 相比 LiteLLM Proxy 的提升倍数",
    verdictTitle:
      "Full ACID PostgreSQL admission and completion batching without sacrificing tail latency.",
    verdictTitleZh:
      "完整开启数据库准入与账本结算，依然保持 31.5 ms 极低尾延迟。",
    verdictBody:
      "Niu records pre-dispatch operations and attempts in a single SQL CTE and coalesces up to 64 post-dispatch completions per batch transaction, keeping c = 64 p99 latency at 31.54 ms while LiteLLM Proxy saturates its Python event loop at ~302 RPS.",
    verdictBodyZh:
      "Niu 牛元通过单条 SQL CTE 记录转发前操作与尝试，并在单个批量事务中合并最多 64 笔完成结算，将 64 并发下 p99 延迟稳定在 31.54 ms；而 LiteLLM Proxy 在约 302 RPS 时即触及 Python 事件循环瓶颈。",
  },
  {
    id: "streaming",
    label: "SSE token streaming",
    labelZh: "SSE 流式输出",
    eyebrow: "40 tokens / stream · 43 SSE events · chunk fidelity & ITL",
    eyebrowZh: "每流 40 Token · 43 个 SSE 事件 · 分片保真度与逐字延迟",
    title:
      "Concurrent Server-Sent Events (SSE) token streaming (c = 1 & c = 16)",
    titleZh: "并发 Server-Sent Events (SSE) 流式输出测试（c = 1 与 c = 16）",
    description:
      "Measures completed SSE streams/sec, delivered tokens/sec, Time-To-First-Token (TTFT), Inter-Token Latency (ITL), and whether the gateway preserves all 43 SSE frames per response.",
    descriptionZh:
      "测量每秒完成的 SSE 流数、每秒交付 Token 数、首字延迟 (TTFT)、逐字延迟 (ITL)，以及网关是否完整保留每次响应的全部 43 个 SSE 帧。",
    ruleTitle: "Streaming bar",
    ruleTitleZh: "流式保真标准",
    ruleDetail: "43 / 43 SSE chunks preserved · 0 dropped events",
    ruleDetailZh: "43 / 43 个 SSE 分片完整保留 · 0 丢帧",
    cards: [
      {
        name: "Niu v0.2.4",
        runtime: "Rust · Tokio zero-copy SSE",
        runtimeZh: "Rust · Tokio 零拷贝 SSE",
        badge: "2.3× – 2.8× faster",
        badgeZh: "流吞吐领先 2.3 – 2.8 倍",
        isWinner: true,
        primaryMetric: "235.9 /s",
        primaryMetricZh: "235.9 流/秒",
        primaryUnit: "Concurrent streams/sec at c = 16",
        primaryUnitZh: "16 并发每秒完成流数",
        primarySubtext: "9,436 tokens/s · ITL p50: 1.34 ms · 43.0 chunks",
        primarySubtextZh: "9,436 Token/秒 · 逐字 p50: 1.34 ms · 43.0 分片",
        barPercent: 100,
        facts: [
          {
            label: "ITL p50 (c = 1)",
            labelZh: "单流逐字延迟 p50",
            value: "0.008 ms (8 µs)",
          },
          {
            label: "ITL p50 (c = 16)",
            labelZh: "16 并发逐字延迟 p50",
            value: "1.34 ms",
          },
          {
            label: "Stream p50 / p95",
            labelZh: "整流耗时 p50 / p95",
            value: "62.2 / 88.2 ms",
          },
          {
            label: "Chunks preserved",
            labelZh: "SSE 分片保留率",
            value: "43.0 / 43.0 (100%)",
          },
        ],
      },
      {
        name: "New API",
        runtime: "Go Gin SSE relay (45fbb14)",
        runtimeZh: "Go Gin SSE 转发 (45fbb14)",
        badge: "42.8% of Niu",
        badgeZh: "流吞吐为 Niu 的 42.8%",
        primaryMetric: "100.9 /s",
        primaryMetricZh: "100.9 流/秒",
        primaryUnit: "Concurrent streams/sec at c = 16",
        primaryUnitZh: "16 并发每秒完成流数",
        primarySubtext: "4,036 tokens/s · ITL p50: 3.55 ms · 42.0 chunks",
        primarySubtextZh: "4,036 Token/秒 · 逐字 p50: 3.55 ms · 42.0 分片",
        barPercent: 43,
        facts: [
          {
            label: "ITL p50 (c = 1)",
            labelZh: "单流逐字延迟 p50",
            value: "0.036 ms (36 µs)",
          },
          {
            label: "ITL p50 (c = 16)",
            labelZh: "16 并发逐字延迟 p50",
            value: "3.55 ms",
          },
          {
            label: "Stream p50 / p95",
            labelZh: "整流耗时 p50 / p95",
            value: "150.3 / 228.6 ms",
          },
          {
            label: "Chunks preserved",
            labelZh: "SSE 分片保留率",
            value: "42.0 / 43.0",
          },
        ],
      },
      {
        name: "LiteLLM Proxy",
        runtime: "Python async SSE (v1.104.0)",
        runtimeZh: "Python 异步 SSE (v1.104.0)",
        badge: "35.2% of Niu",
        badgeZh: "流吞吐为 Niu 的 35.2%",
        primaryMetric: "83.0 /s",
        primaryMetricZh: "83.0 流/秒",
        primaryUnit: "Concurrent streams/sec at c = 16",
        primaryUnitZh: "16 并发每秒完成流数",
        primarySubtext: "3,320 tokens/s · ITL p50: 4.62 ms · 43.0 chunks",
        primarySubtextZh: "3,320 Token/秒 · 逐字 p50: 4.62 ms · 43.0 分片",
        barPercent: 35,
        facts: [
          {
            label: "ITL p50 (c = 1)",
            labelZh: "单流逐字延迟 p50",
            value: "0.194 ms (194 µs)",
          },
          {
            label: "ITL p50 (c = 16)",
            labelZh: "16 并发逐字延迟 p50",
            value: "4.62 ms",
          },
          {
            label: "Stream p50 / p95",
            labelZh: "整流耗时 p50 / p95",
            value: "192.7 / 207.3 ms",
          },
          {
            label: "Chunks preserved",
            labelZh: "SSE 分片保留率",
            value: "43.0 / 43.0 (100%)",
          },
        ],
      },
    ],
    rows: [
      {
        metric: "Concurrent streaming throughput (c = 16)",
        metricZh: "16 并发流式吞吐量",
        niu: "235.9 streams/s",
        niuZh: "235.9 流/秒",
        niuSub: "9,436 tokens/s · Stream p50: 62.17 ms",
        niuSubZh: "9,436 Token/秒 · 整流 p50: 62.17 ms",
        newApi: "100.9 streams/s",
        newApiZh: "100.9 流/秒",
        newApiSub: "4,036 tokens/s · Stream p50: 150.33 ms",
        newApiSubZh: "4,036 Token/秒 · 整流 p50: 150.33 ms",
        litellm: "83.0 streams/s",
        litellmZh: "83.0 流/秒",
        litellmSub: "3,320 tokens/s · Stream p50: 192.65 ms",
        litellmSubZh: "3,320 Token/秒 · 整流 p50: 192.65 ms",
        isKeyRow: true,
      },
      {
        metric: "Concurrent Inter-Token Latency (ITL p50, c = 16)",
        metricZh: "16 并发逐字间隔延迟 (ITL p50)",
        niu: "1.34 ms",
        newApi: "3.55 ms (2.65x slower)",
        newApiZh: "3.55 ms（慢 2.65 倍）",
        litellm: "4.62 ms (3.45x slower)",
        litellmZh: "4.62 ms（慢 3.45 倍）",
      },
      {
        metric: "Single-stream Inter-Token Latency (ITL p50, c = 1)",
        metricZh: "单流逐字间隔延迟 (ITL p50)",
        niu: "0.008 ms (+3 µs over direct mock)",
        niuZh: "0.008 ms（相比直连仅 +3 µs）",
        newApi: "0.036 ms (+31 µs over direct mock)",
        newApiZh: "0.036 ms（相比直连 +31 µs）",
        litellm: "0.194 ms (+189 µs over direct mock)",
        litellmZh: "0.194 ms（相比直连 +189 µs）",
      },
      {
        metric: "Single-stream throughput (c = 1)",
        metricZh: "单并发流式吞吐量",
        niu: "138.6 streams/s (5,544 tok/s)",
        niuZh: "138.6 流/秒 (5,544 Token/秒)",
        newApi: "138.3 streams/s (5,532 tok/s)",
        newApiZh: "138.3 流/秒 (5,532 Token/秒)",
        litellm: "60.4 streams/s (2,416 tok/s)",
        litellmZh: "60.4 流/秒 (2,416 Token/秒)",
      },
      {
        metric: "SSE chunks delivered per 40-token stream",
        metricZh: "每条 40-Token 流完整交付分片数",
        niu: "43.0 / 43.0 chunks",
        niuZh: "43.0 / 43.0 分片",
        newApi: "42.0 / 43.0 chunks",
        newApiZh: "42.0 / 43.0 分片",
        litellm: "43.0 / 43.0 chunks",
        litellmZh: "43.0 / 43.0 分片",
      },
    ],
    verdictNumber: "2.84×",
    verdictSub: "more concurrent SSE streams/sec",
    verdictSubZh: "并发每秒 SSE 流吞吐提升倍数",
    verdictTitle:
      "Sub-10 microsecond single-stream ITL overhead and 9,436 tokens/sec at c = 16.",
    verdictTitleZh:
      "单流逐字转发开销低于 10 微秒，16 并发稳定输出 9,436 Token/秒。",
    verdictBody:
      "Because LiteLLM Proxy instantiates and serializes Python/Pydantic chunk objects on every SSE token event, it adds 194 µs per chunk at c = 1 and plateaus at 83.0 streams/s at c = 16. Niu forwards SSE frames directly through Tokio byte streams while extracting terminal usage.",
    verdictBodyZh:
      "LiteLLM Proxy 在每个 SSE 事件上实例化并序列化 Python/Pydantic 对象，单流每分片增加 194 微秒开销并在 16 并发下停滞于 83.0 流/秒。Niu 牛元通过 Tokio 字节流直接转发 SSE 帧并在流尾提取结算用量。",
  },
  {
    id: "agents",
    label: "Coding agent sessions",
    labelZh: "编程智能体会话",
    eyebrow: "16 concurrent coding agents · 30 turns each · 480 SSE streams",
    eyebrowZh: "16 个并发编程智能体 · 各执行 30 轮对话 · 共 480 条 SSE 流",
    title:
      "Multi-turn Claude Code (/v1/messages) & Codex (/v1/chat/completions) sessions",
    titleZh:
      "Claude Code (/v1/messages) 与 Codex (/v1/chat/completions) 多轮并发会话",
    description:
      "Simulates 8 and 16 concurrent coding agents executing 30 sequential turns each with conversation context growing from 1.5 KB on turn 1 to 25 KB on turn 30.",
    descriptionZh:
      "模拟 8 个与 16 个并发编程智能体各自连续执行 30 轮对话，上下文体积从第 1 轮的 1.5 KB 递增至第 30 轮的 25 KB。",
    ruleTitle: "Workload profile",
    ruleTitleZh: "负载模型",
    ruleDetail: "16 agents × 30 turns = 480 growing-context SSE streams",
    ruleDetailZh: "16 个智能体 × 30 轮 = 480 条长上下文递增 SSE 流",
    cards: [
      {
        name: "Niu v0.2.4",
        runtime: "Native /v1/messages & /v1/chat",
        runtimeZh: "原生支持 /v1/messages 与 /v1/chat",
        badge: "2.8× – 3.4× faster",
        badgeZh: "会话速度领先 2.8 – 3.4 倍",
        isWinner: true,
        primaryMetric: "1.69 s",
        primaryUnit: "16-agent Codex 30-turn wall time",
        primaryUnitZh: "16 智能体 Codex 30 轮总耗时",
        primarySubtext: "Turn p50: 54.05 ms · Turn p99: 72.50 ms",
        primarySubtextZh: "单轮 p50: 54.05 ms · 单轮 p99: 72.50 ms",
        barPercent: 100,
        facts: [
          {
            label: "16-agent Claude Code",
            labelZh: "16 并发 Claude Code",
            value: "1.75 s (55.0 ms/turn)",
            valueZh: "1.75 s（55.0 ms/轮）",
          },
          {
            label: "16-agent Codex",
            labelZh: "16 并发 Codex",
            value: "1.69 s (54.1 ms/turn)",
            valueZh: "1.69 s（54.1 ms/轮）",
          },
          {
            label: "8-agent Claude Code",
            labelZh: "8 并发 Claude Code",
            value: "1.78 s (54.1 ms/turn)",
            valueZh: "1.78 s（54.1 ms/轮）",
          },
          {
            label: "8-agent Codex",
            labelZh: "8 并发 Codex",
            value: "1.69 s (55.7 ms/turn)",
            valueZh: "1.69 s（55.7 ms/轮）",
          },
        ],
      },
      {
        name: "New API",
        runtime: "Go channel relay (45fbb14)",
        runtimeZh: "Go 渠道中转 (45fbb14)",
        badge: "2.9× slower",
        badgeZh: "耗时为 Niu 的 2.9 倍",
        primaryMetric: "4.89 s",
        primaryUnit: "16-agent Codex 30-turn wall time",
        primaryUnitZh: "16 智能体 Codex 30 轮总耗时",
        primarySubtext: "Turn p50: 132.79 ms · Turn p99: 510.17 ms",
        primarySubtextZh: "单轮 p50: 132.79 ms · 单轮 p99: 510.17 ms",
        barPercent: 34,
        facts: [
          {
            label: "16-agent Claude Code",
            labelZh: "16 并发 Claude Code",
            value: "4.86 s (142.0 ms/turn)",
            valueZh: "4.86 s（142.0 ms/轮）",
          },
          {
            label: "16-agent Codex",
            labelZh: "16 并发 Codex",
            value: "4.89 s (132.8 ms/turn)",
            valueZh: "4.89 s（132.8 ms/轮）",
          },
          {
            label: "8-agent Claude Code",
            labelZh: "8 并发 Claude Code",
            value: "2.95 s (82.1 ms/turn)",
            valueZh: "2.95 s（82.1 ms/轮）",
          },
          {
            label: "8-agent Codex",
            labelZh: "8 并发 Codex",
            value: "3.13 s (83.1 ms/turn)",
            valueZh: "3.13 s（83.1 ms/轮）",
          },
        ],
      },
      {
        name: "LiteLLM Proxy",
        runtime: "Python FastAPI (v1.104.0)",
        runtimeZh: "Python FastAPI (v1.104.0)",
        badge: "3.4× slower",
        badgeZh: "耗时为 Niu 的 3.4 倍",
        primaryMetric: "5.80 s",
        primaryUnit: "16-agent Codex 30-turn wall time",
        primaryUnitZh: "16 智能体 Codex 30 轮总耗时",
        primarySubtext: "Turn p50: 180.75 ms · Turn p99: 328.23 ms",
        primarySubtextZh: "单轮 p50: 180.75 ms · 单轮 p99: 328.23 ms",
        barPercent: 29,
        facts: [
          {
            label: "16-agent Claude Code",
            labelZh: "16 并发 Claude Code",
            value: "3.35 s (103.0 ms/turn)",
            valueZh: "3.35 s（103.0 ms/轮）",
          },
          {
            label: "16-agent Codex",
            labelZh: "16 并发 Codex",
            value: "5.80 s (180.8 ms/turn)",
            valueZh: "5.80 s（180.8 ms/轮）",
          },
          {
            label: "8-agent Claude Code",
            labelZh: "8 并发 Claude Code",
            value: "2.01 s (62.2 ms/turn)",
            valueZh: "2.01 s（62.2 ms/轮）",
          },
          {
            label: "8-agent Codex",
            labelZh: "8 并发 Codex",
            value: "3.06 s (93.3 ms/turn)",
            valueZh: "3.06 s（93.3 ms/轮）",
          },
        ],
      },
    ],
    rows: [
      {
        metric: "16 agents × 30 turns (codex /v1/chat/completions)",
        metricZh: "16 智能体 × 30 轮 (Codex /v1/chat/completions)",
        niu: "1,686.6 ms wall",
        niuZh: "总耗时 1,686.6 ms",
        niuSub: "Turn p50: 54.05 ms · Turn p99: 72.50 ms",
        niuSubZh: "单轮 p50: 54.05 ms · 单轮 p99: 72.50 ms",
        newApi: "4,891.9 ms wall",
        newApiZh: "总耗时 4,891.9 ms",
        newApiSub: "Turn p50: 132.79 ms · Turn p99: 510.17 ms",
        newApiSubZh: "单轮 p50: 132.79 ms · 单轮 p99: 510.17 ms",
        litellm: "5,803.9 ms wall",
        litellmZh: "总耗时 5,803.9 ms",
        litellmSub: "Turn p50: 180.75 ms · Turn p99: 328.23 ms",
        litellmSubZh: "单轮 p50: 180.75 ms · 单轮 p99: 328.23 ms",
        isKeyRow: true,
      },
      {
        metric: "16 agents × 30 turns (claude_code /v1/messages)",
        metricZh: "16 智能体 × 30 轮 (Claude Code /v1/messages)",
        niu: "1,746.0 ms (turn p50: 55.02 ms)",
        niuZh: "1,746.0 ms（单轮 p50: 55.02 ms）",
        newApi: "4,864.9 ms (turn p50: 141.96 ms)",
        newApiZh: "4,864.9 ms（单轮 p50: 141.96 ms）",
        litellm: "3,353.3 ms (turn p50: 103.01 ms)",
        litellmZh: "3,353.3 ms（单轮 p50: 103.01 ms）",
      },
      {
        metric: "8 agents × 30 turns (codex /v1/chat/completions)",
        metricZh: "8 智能体 × 30 轮 (Codex /v1/chat/completions)",
        niu: "1,687.6 ms (turn p50: 55.71 ms)",
        niuZh: "1,687.6 ms（单轮 p50: 55.71 ms）",
        newApi: "3,126.2 ms (turn p50: 83.10 ms)",
        newApiZh: "3,126.2 ms（单轮 p50: 83.10 ms）",
        litellm: "3,057.5 ms (turn p50: 93.26 ms)",
        litellmZh: "3,057.5 ms（单轮 p50: 93.26 ms）",
      },
      {
        metric: "8 agents × 30 turns (claude_code /v1/messages)",
        metricZh: "8 智能体 × 30 轮 (Claude Code /v1/messages)",
        niu: "1,781.6 ms (turn p50: 54.14 ms)",
        niuZh: "1,781.6 ms（单轮 p50: 54.14 ms）",
        newApi: "2,953.3 ms (turn p50: 82.13 ms)",
        newApiZh: "2,953.3 ms（单轮 p50: 82.13 ms）",
        litellm: "2,005.3 ms (turn p50: 62.17 ms)",
        litellmZh: "2,005.3 ms（单轮 p50: 62.17 ms）",
      },
    ],
    verdictNumber: "3.44×",
    verdictSub: "faster 16-agent coding session completion",
    verdictSubZh: "16 并发智能体会话完成速度提升倍数",
    verdictTitle:
      "Flat session latency when doubling concurrent coding agents from 8 to 16.",
    verdictTitleZh:
      "并发编程智能体从 8 个翻倍至 16 个时，单轮会话延迟依然保持平稳。",
    verdictBody:
      "As growing conversation histories reach 25 KB per turn across 16 simultaneous agents, JSON re-parsing and event-loop contention double LiteLLM Proxy's completion time (3.06s to 5.80s). Niu completes all 480 turns in 1.69s with a flat 54 ms median turn time.",
    verdictBodyZh:
      "当 16 个并发智能体的历史上下文增长至每轮 25 KB 时，JSON 反复解析与事件循环争用使 LiteLLM Proxy 完成耗时翻倍（3.06 秒升至 5.80 秒）。Niu 牛元仅需 1.69 秒即可完成全部 480 轮请求，中位单轮耗时稳定在 54 ms。",
  },
  {
    id: "efficiency",
    label: "Memory & cost efficiency",
    labelZh: "内存与计算成本",
    eyebrow: "Resident set size (RSS) & AWS c7g.large ($0.0725/hr) efficiency",
    eyebrowZh: "常驻物理内存 (RSS) 与 AWS c7g.large ($0.0725/小时) 成本效率",
    title: "Memory footprint & proxy compute cost per 1M requests",
    titleZh: "内存占用与每百万次请求网关计算成本",
    description:
      "Measures idle and peak resident memory (RSS) under 64-worker load and calculates gateway compute cost per 1M proxied requests at 60% target CPU utilization.",
    descriptionZh:
      "测量空闲及 64 并发满载下的常驻物理内存 (RSS)，并按 60% 目标 CPU 利用率折算每代理一百万次请求所需的网关计算成本。",
    ruleTitle: "Instance reference",
    ruleTitleZh: "实例基准",
    ruleDetail: "AWS c7g.large (2 vCPU, 4 GB RAM · $0.0725/hr on-demand)",
    ruleDetailZh: "AWS c7g.large（2 vCPU, 4 GB 内存 · 按需 $0.0725/小时）",
    cards: [
      {
        name: "Niu v0.2.4",
        runtime: "Single static Rust binary",
        runtimeZh: "原生静态编译 Rust 单二进制",
        badge: "7.4× less peak RAM",
        badgeZh: "峰值内存降低 7.4 倍",
        isWinner: true,
        primaryMetric: "18.2 MB",
        primaryUnit: "Idle RSS (26.4 MB peak at c = 64)",
        primaryUnitZh: "空闲内存（64 并发满载仅 26.4 MB）",
        primarySubtext: "$0.014 per 1M requests · 71,599 RPS/$/hr",
        primarySubtextZh: "每百万请求网关成本 $0.014 · 71,599 RPS/美元/小时",
        barPercent: 14,
        facts: [
          { label: "Idle RSS", labelZh: "空闲常驻内存", value: "18.16 MB" },
          {
            label: "Peak RSS (c = 64)",
            labelZh: "64 并发峰值内存",
            value: "26.40 MB",
          },
          {
            label: "RPS per $/hr (60%)",
            labelZh: "单位成本吞吐 (60%)",
            value: "71,599 RPS/$/hr",
          },
          {
            label: "Cost / 1M requests",
            labelZh: "每百万请求网关成本",
            value: "$0.014",
          },
        ],
      },
      {
        name: "New API",
        runtime: "Go binary + GORM (45fbb14)",
        runtimeZh: "Go 二进制 + GORM (45fbb14)",
        badge: "3.7× higher RAM",
        badgeZh: "峰值内存为 Niu 的 3.7 倍",
        primaryMetric: "37.4 MB",
        primaryUnit: "Idle RSS (98.5 MB peak at c = 64)",
        primaryUnitZh: "空闲内存（64 并发满载达 98.5 MB）",
        primarySubtext: "$0.052 per 1M requests · 19,136 RPS/$/hr",
        primarySubtextZh: "每百万请求网关成本 $0.052 · 19,136 RPS/美元/小时",
        barPercent: 51,
        facts: [
          { label: "Idle RSS", labelZh: "空闲常驻内存", value: "37.42 MB" },
          {
            label: "Peak RSS (c = 64)",
            labelZh: "64 并发峰值内存",
            value: "98.50 MB",
          },
          {
            label: "RPS per $/hr (60%)",
            labelZh: "单位成本吞吐 (60%)",
            value: "19,136 RPS/$/hr",
          },
          {
            label: "Cost / 1M requests",
            labelZh: "每百万请求网关成本",
            value: "$0.052",
          },
        ],
      },
      {
        name: "LiteLLM Proxy",
        runtime: "Python 3.12 + SDKs (v1.104.0)",
        runtimeZh: "Python 3.12 + SDK 依赖 (v1.104.0)",
        badge: "7.4× higher RAM",
        badgeZh: "峰值内存为 Niu 的 7.4 倍",
        primaryMetric: "158.0 MB",
        primaryUnit: "Idle RSS (194.6 MB peak at c = 64)",
        primaryUnitZh: "空闲内存（64 并发满载达 194.6 MB）",
        primarySubtext: "$0.150 per 1M requests · 6,681 RPS/$/hr",
        primarySubtextZh: "每百万请求网关成本 $0.150 · 6,681 RPS/美元/小时",
        barPercent: 100,
        facts: [
          { label: "Idle RSS", labelZh: "空闲常驻内存", value: "158.00 MB" },
          {
            label: "Peak RSS (c = 64)",
            labelZh: "64 并发峰值内存",
            value: "194.60 MB",
          },
          {
            label: "RPS per $/hr (60%)",
            labelZh: "单位成本吞吐 (60%)",
            value: "6,681 RPS/$/hr",
          },
          {
            label: "Cost / 1M requests",
            labelZh: "每百万请求网关成本",
            value: "$0.150",
          },
        ],
      },
    ],
    rows: [
      {
        metric: "Proxy compute cost per 1M requests (c7g.large @ 60% util)",
        metricZh: "每百万次请求网关计算成本 (c7g.large @ 60% 利用率)",
        niu: "$0.014 / 1M",
        niuZh: "$0.014 / 百万次",
        niuSub: "71,599 RPS per $/hr · 1,943 effective RPS",
        niuSubZh: "71,599 RPS/美元/小时 · 等效 1,943 RPS",
        newApi: "$0.052 / 1M",
        newApiZh: "$0.052 / 百万次",
        newApiSub: "19,136 RPS per $/hr · 519 effective RPS",
        newApiSubZh: "19,136 RPS/美元/小时 · 等效 519 RPS",
        litellm: "$0.150 / 1M",
        litellmZh: "$0.150 / 百万次",
        litellmSub: "6,681 RPS per $/hr · 181 effective RPS",
        litellmSubZh: "6,681 RPS/美元/小时 · 等效 181 RPS",
        isKeyRow: true,
      },
      {
        metric: "Idle resident memory (RSS)",
        metricZh: "空闲常驻物理内存 (RSS)",
        niu: "18.16 MB",
        newApi: "37.42 MB (2.06x Niu)",
        newApiZh: "37.42 MB（Niu 的 2.06 倍）",
        litellm: "158.00 MB (8.70x Niu)",
        litellmZh: "158.00 MB（Niu 的 8.70 倍）",
      },
      {
        metric: "Peak resident memory under c = 64 load (RSS)",
        metricZh: "64 并发满载峰值物理内存 (RSS)",
        niu: "26.40 MB",
        newApi: "98.50 MB (3.73x Niu)",
        newApiZh: "98.50 MB（Niu 的 3.73 倍）",
        litellm: "194.60 MB (7.37x Niu)",
        litellmZh: "194.60 MB（Niu 的 7.37 倍）",
      },
    ],
    verdictNumber: "$0.014",
    verdictSub: "proxy compute cost per 1M requests",
    verdictSubZh: "每百万次请求网关计算成本",
    verdictTitle: "Run high-throughput gateway nodes in under 30 MB of RAM.",
    verdictTitleZh: "不到 30 MB 内存，即可扛起高并发生产级流量。",
    verdictBody:
      "Importing Python provider SDKs and tokenizers consumes 158–195 MB per LiteLLM worker before serving traffic. Niu's native Rust binary starts in 18.2 MB and grows by only 8.2 MB under 64-worker saturation.",
    verdictBodyZh:
      "LiteLLM 单个进程仅加载 Python SDK 与分词器就占用 158–195 MB 内存。Niu 牛元原生 Rust 单二进制启动仅需 18.2 MB，在 64 并发满载下也仅增长 8.2 MB。",
  },
];
