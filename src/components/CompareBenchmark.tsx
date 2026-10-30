import { benchmarkSuites } from "../content/benchmarks";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./ui/table";
import { Button } from "./ui/button";
import { useLocale } from "./locale";

// Reuse the published workload rows rather than maintaining a second dataset.
const rows = benchmarkSuites.flatMap((suite) =>
  suite.id === "efficiency"
    ? suite.rows.filter((row) => row.metric.includes("memory"))
    : suite.id === "throughput"
      ? suite.rows.filter((row) => row.metric.includes("c = 64"))
      : suite.id === "streaming"
        ? suite.rows.slice(0, 2)
        : suite.rows.slice(0, 2),
);

export default function CompareBenchmark() {
  const { t } = useLocale();
  return (
    <section
      className="compare-section"
      id="performance"
      aria-labelledby="performance-title"
    >
      <p className="compare-eyebrow">{t("Performance benchmark", "性能基准测试")}</p>
      <h2 id="performance-title">{t("Niu, New API and LiteLLM Proxy", "Niu 牛元、New API 与 LiteLLM Proxy")}</h2>
      <p>
        {t(
          "Archived runs: Niu v0.2.4, New API 45fbb14 and LiteLLM Proxy v1.104.0.",
          "历史测试版本：Niu v0.2.4、New API 45fbb14、LiteLLM Proxy v1.104.0。",
        )}
      </p>
      <p>
        {t(
          "Apple M4, 24 GB · PostgreSQL 17.11 · local zero-delay mock upstream. Historical synthetic results, not current-release or production capacity claims. OpenRouter was not tested.",
          "Apple M4、24 GB · PostgreSQL 17.11 · 本地零延迟模拟上游。历史合成测试，不代表当前版本或生产容量；未测试 OpenRouter。",
        )}
      </p>
      <Table className="compare-table">
        <TableCaption>
          {t(
            "RPS: requests/second · p99: 99th-percentile latency · coding sessions: simulated workloads.",
            "RPS：每秒请求数 · p99：第 99 百分位延迟 · 编程会话为模拟负载。",
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("Workload / metric", "测试负载 / 指标")}</TableHead>
            <TableHead>Niu v0.2.4</TableHead>
            <TableHead>New API 45fbb14</TableHead>
            <TableHead>LiteLLM Proxy v1.104.0</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.metric}>
              <TableCell>{row.metric}</TableCell>
              <TableCell data-label="Niu v0.2.4">
                {row.niu}
                {row.niuSub && <p>{row.niuSub}</p>}
              </TableCell>
              <TableCell data-label="New API 45fbb14">
                {row.newApi}
                {row.newApiSub && <p>{row.newApiSub}</p>}
              </TableCell>
              <TableCell data-label="LiteLLM Proxy v1.104.0">
                {row.litellm}
                {row.litellmSub && <p>{row.litellmSub}</p>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="compare-note">
        {t(
          "Different configurations: Niu used PostgreSQL admission and batched completion; New API used token caching and batched logs; LiteLLM used an in-memory master key without database spend logs. PostgreSQL synchronous_commit was off.",
          "配置不同：Niu 牛元使用 PostgreSQL 准入与批量结算；New API 使用令牌缓存与批量日志；LiteLLM 使用内存 master_key，关闭数据库消费日志。PostgreSQL synchronous_commit 关闭。",
        )}
      </p>
      <div className="compare-actions">
        <Button asChild variant="outline">
          <a href="/docs/guides/gateway-benchmarks/">
            {t("Read the full benchmark", "阅读完整基准测试报告")}
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href="https://github.com/niu-io/niu/blob/main/docs/reference/gateway-performance-benchmark.md">
            {t("Methodology and reproduction steps", "测试方法论与复现步骤")}
          </a>
        </Button>
      </div>
    </section>
  );
}
