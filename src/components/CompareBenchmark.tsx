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
  return (
    <section
      className="compare-section"
      id="performance"
      aria-labelledby="performance-title"
    >
      <p className="compare-eyebrow">Performance benchmark</p>
      <h2 id="performance-title">Niu, New API and LiteLLM Proxy</h2>
      <p>
        Our published benchmark covers throughput, tail latency, SSE streaming,
        multi-turn coding sessions and memory. The archived figures below use
        Niu v0.2.4, New API 45fbb14 and LiteLLM Proxy v1.104.0.
      </p>
      <p>
        Apple M4 (10-core, 24 GB), macOS arm64, PostgreSQL 17.11, loopback
        networking and a deterministic zero-delay mock upstream. These are
        historical synthetic measurements, unverified for the current release;
        they do not establish current end-to-end performance or production
        capacity. OpenRouter was not included in this run.
      </p>
      <Table className="compare-table">
        <TableCaption>
          Archived measurements from the published report. RPS means requests
          per second; p99 is the 99th-percentile latency. Coding sessions are
          simulated workloads, not completed coding tasks.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Workload / metric</TableHead>
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
      <p>
        Configurations differ: Niu records PostgreSQL admission and batched
        completion; New API uses cached token access and batched usage logging;
        LiteLLM Proxy uses an in-memory master key with database spend logging
        disabled. PostgreSQL synchronous_commit was off. Consult the full report
        before interpreting these figures.
      </p>
      <Button asChild variant="outline">
        <a href="/docs/guides/gateway-benchmarks/">Read the full benchmark</a>
      </Button>{" "}
      <Button asChild variant="outline">
        <a href="https://github.com/niu-io/niu/blob/main/docs/reference/gateway-performance-benchmark.md">
          Methodology and reproduction steps
        </a>
      </Button>
    </section>
  );
}
