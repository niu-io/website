import CompareBenchmark from "./CompareBenchmark";
import { Fragment } from "react";
import { comparisons, reviewed } from "../content/comparisons";
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
export default function ComparisonDetail({
  comparison,
}: {
  comparison: (typeof comparisons)[number];
}) {
  const { t } = useLocale();
  const categories = [...new Set(comparison.rows.map((row) => row.category))];
  return (
    <>
      <header className="compare-intro">
        <a className="compare-back" href="/compare/">
          {t("← All comparisons", "← 返回全部对比")}
        </a>
        <h1>{t(`Niu vs ${comparison.name}`, `Niu 牛元 vs ${comparison.name}`)}</h1>
        <p>{comparison.intro}</p>
        <p className="compare-meta">
          {t(
            `Reviewed ${reviewed}. Product documentation and Niu's current API contract are linked below.`,
            `审阅日期：${reviewed}。下方附有产品文档与 Niu 牛元当前 API 契约链接。`,
          )}
        </p>
      </header>
      <Table className="compare-table">
        <TableCaption>
          {t(
            "Niu targets lower-cost model access and transparent billing. Savings depend on the model, workload and qualified Provider offer; this feature comparison is not a verified price comparison.",
            "Niu 牛元致力于提供更低成本的模型接入与透明计费。实际成本节省取决于具体模型、负载及供应商报价；本表为功能范围对比而非价格对比。",
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("Feature", "能力维度")}</TableHead>
            <TableHead>{t("Niu", "Niu 牛元")}</TableHead>
            <TableHead>{comparison.name}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <Fragment key={category}>
              <TableRow className="compare-group">
                <TableHead colSpan={3}>{category}</TableHead>
              </TableRow>
              {comparison.rows
                .filter((row) => row.category === category)
                .map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell>{row.feature}</TableCell>
                    <TableCell data-label="Niu">{row.niu}</TableCell>
                    <TableCell data-label={comparison.name}>
                      {row.alternative}
                    </TableCell>
                  </TableRow>
                ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      {comparison.slug === "new-api" && <CompareBenchmark />}
      <section className="compare-section">
        <h2>{t("Why choose Niu?", "为什么选择 Niu 牛元？")}</h2>
        <Table className="compare-table decision-table">
          <TableHeader>
            <TableRow>
              <TableHead>{t("Your requirement", "您的业务需求")}</TableHead>
              <TableHead>{t("Niu", "Niu 牛元")}</TableHead>
              <TableHead>{comparison.name}</TableHead>
              <TableHead>{t("Fits best", "最佳选择")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparison.decisions.map((row) => (
              <TableRow key={row.need}>
                <TableCell>{row.need}</TableCell>
                <TableCell data-label="Niu">{row.niu}</TableCell>
                <TableCell data-label={comparison.name}>
                  {row.alternative}
                </TableCell>
                <TableCell data-label="Fits best">{row.choice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button asChild>
          <a href="/docs/guides/api-quickstart/">
            {t("Make your first request", "发起第一个 API 请求")}
          </a>
        </Button>
      </section>
      <section className="compare-section">
        <h2>{t("Sources", "参考资料")}</h2>
        <ul>
          {comparison.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url}>{source.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
