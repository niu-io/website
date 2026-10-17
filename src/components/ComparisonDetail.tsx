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
export default function ComparisonDetail({
  comparison,
}: {
  comparison: (typeof comparisons)[number];
}) {
  const categories = [...new Set(comparison.rows.map((row) => row.category))];
  return (
    <>
      <header className="compare-intro">
        <a className="compare-back" href="/compare/">
          ← All comparisons
        </a>
        <h1>Niu vs {comparison.name}</h1>
        <p>{comparison.intro}</p>
        <p className="compare-meta">
          Reviewed {reviewed}. Product documentation and Niu's current API
          contract are linked below.
        </p>
      </header>
      <Table className="compare-table">
        <TableCaption>
          Niu targets lower-cost model access and transparent billing. Savings
          depend on the model, workload and qualified Supplier offer; this
          feature comparison is not a verified price comparison.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Feature</TableHead>
            <TableHead>Niu</TableHead>
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
        <h2>Why choose Niu?</h2>
        <Table className="compare-table decision-table">
          <TableHeader>
            <TableRow>
              <TableHead>Your requirement</TableHead>
              <TableHead>Niu</TableHead>
              <TableHead>{comparison.name}</TableHead>
              <TableHead>Fits best</TableHead>
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
          <a href="/docs/guides/api-quickstart/">Make your first request</a>
        </Button>
      </section>
      <section className="compare-section">
        <h2>Sources</h2>
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
