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
          "Our published benchmark covers throughput, tail latency, SSE streaming, multi-turn coding sessions and memory. The archived figures below use Niu v0.2.4, New API 45fbb14 and LiteLLM Proxy v1.104.0.",
          "公开的性能基准测试涵盖吞吐量、尾延迟、SSE 流式传输、多轮编程智能体会话及内存占用。下方归档数据基于 Niu v0.2.4、New API 45fbb14 与 LiteLLM Proxy v1.104.0。",
        )}
      </p>
      <p>
        {t(
          "Apple M4 (10-core, 24 GB), macOS arm64, PostgreSQL 17.11, loopback networking and a deterministic zero-delay mock upstream. These are historical synthetic measurements, unverified for the current release; they do not establish current end-to-end performance or production capacity. OpenRouter was not included in this run.",
          "测试环境：Apple M4（10 核，24 GB）、macOS arm64、PostgreSQL 17.11、本地回环网络及确定性零延迟模拟上游。以下为历史基准测量数据，不代表生产端到端模型推理延迟；OpenRouter 未包含在此项本地网关测试中。",
        )}
      </p>
      <Table className="compare-table">
        <TableCaption>
          {t(
            "Archived measurements from the published report. RPS means requests per second; p99 is the 99th-percentile latency. Coding sessions are simulated workloads, not completed coding tasks.",
            "公开基准报告中的归档测量结果。RPS 表示每秒请求数；p99 表示第 99 百分位尾延迟。",
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
          "Configurations differ: Niu records PostgreSQL admission and batched completion; New API uses cached token access and batched usage logging; LiteLLM Proxy uses an in-memory master key with database spend logging disabled. PostgreSQL synchronous_commit was off. Consult the full report before interpreting these figures.",
          "配置差异说明：Niu 牛元记录 PostgreSQL 转发前准入与批量完成结算；New API 启用内存缓存与批量日志；LiteLLM Proxy 使用内存 master_key 并关闭数据库日志。详细方法论请参阅完整基准报告。",
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
