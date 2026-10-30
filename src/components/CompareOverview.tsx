import CompareBenchmark from "./CompareBenchmark";
import CompareMatrix from "./CompareMatrix";
import { comparisons } from "../content/comparisons";
import { Button } from "./ui/button";
import { useLocale } from "./locale";
export default function CompareOverview() {
  const { t } = useLocale();
  return (
    <>
      <header className="compare-intro">
        <p className="compare-eyebrow">{t("Compare", "能力对比")}</p>
        <h1>{t("Niu, LiteLLM and OpenRouter", "Niu 牛元、LiteLLM 与 OpenRouter 对比")}</h1>
        <p>
          {t(
            "From your first model call to ongoing application operations: Niu combines Provider management, workspace budgets, transparent usage and billing, and text/video generation management. Compare it with LiteLLM for self-hosted gateway and SDK workflows, and OpenRouter for hosted model access.",
            "从第一次模型调用到持续生产运营：Niu 牛元集成了供应商管理、工作空间预算、透明的用量与计费账本，以及生成对话与视频工作台。与提供自托管网关及 Python SDK 的 LiteLLM，以及托管模型服务 OpenRouter 对比。",
          )}
        </p>
      </header>
      <CompareBenchmark />
      <CompareMatrix />
      <section className="compare-section">
        <p className="compare-eyebrow">{t("Go deeper", "深入对比")}</p>
        <h2>{t("Two comparisons. Different tradeoffs.", "两份深度对比，清晰呈现不同架构取舍。")}</h2>
        <div className="compare-links">
          {comparisons.map((item) => (
            <article key={item.slug}>
              <h3>
                <a href={`/compare/${item.slug}/`}>
                  {t(`Niu vs ${item.name}`, `Niu 牛元 vs ${item.name}`)}
                </a>
              </h3>
              <Button asChild variant="outline">
                <a href={`/compare/${item.slug}/`}>
                  {t("Read the comparison", "查看详细对比")}
                </a>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
