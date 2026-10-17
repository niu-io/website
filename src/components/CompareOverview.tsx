import CompareBenchmark from "./CompareBenchmark";
import CompareMatrix from "./CompareMatrix";
import { comparisons } from "../content/comparisons";
import { Button } from "./ui/button";
export default function CompareOverview() {
  return (
    <>
      <header className="compare-intro">
        <p className="compare-eyebrow">Compare</p>
        <h1>Niu, New API and OpenRouter</h1>
        <p>
          From your first model call to ongoing application operations: Niu
          combines Supplier management, workspace budgets, transparent usage and
          billing, and text/video generation management. Compare it with New API
          for a straightforward start and OpenRouter for hosted model access.
        </p>
      </header>
      <CompareBenchmark />
      <CompareMatrix />
      <section className="compare-section">
        <p className="compare-eyebrow">Go deeper</p>
        <h2>Two comparisons. Different tradeoffs.</h2>
        <div className="compare-links">
          {comparisons.map((item) => (
            <article key={item.slug}>
              <h3>
                <a href={`/compare/${item.slug}/`}>Niu vs {item.name}</a>
              </h3>
              <Button asChild variant="outline">
                <a href={`/compare/${item.slug}/`}>Read the comparison</a>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
