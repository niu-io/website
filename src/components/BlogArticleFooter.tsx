import { Button } from "./ui/button";
import { useLocale } from "./locale";

export default function BlogArticleFooter() {
  const { t } = useLocale();
  return (
    <footer className="blog-article-footer">
      <div>
        <h2>{t("Make your first model request", "开始你的第一次模型请求")}</h2>
        <p>
          {t(
            "Connect an application, explore models and understand your token usage.",
            "接入应用、探索模型，并了解你的词元用量。",
          )}
        </p>
      </div>
      <div className="blog-article-actions">
        <Button asChild>
          <a href="/docs/getting-started/">{t("Get started", "快速入门")}</a>
        </Button>
        <Button asChild variant="outline">
          <a href="https://github.com/niu-io/niu">
            {t("View on GitHub", "在 GitHub 查看")}
          </a>
        </Button>
      </div>
    </footer>
  );
}
