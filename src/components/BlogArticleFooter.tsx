import { Button } from "./ui/button";
import { useLocale } from "./locale";

export default function BlogArticleFooter() {
  const { t } = useLocale();
  return (
    <footer className="blog-article-footer">
      <div>
        <h2>{t("Connect your agent to Niu", "让你的 Agent 连接 Niu")}</h2>
        <p>
          {t(
            "Give your agent a goal. Let it handle setup and retrieve the evidence.",
            "说明你的目标，让 Agent 完成接入并自行获取证据。",
          )}
        </p>
      </div>
      <div className="blog-article-actions">
        <Button asChild>
          <a href="/docs/guides/personal-assistant/">{t("Build with Niu", "用 Niu 开发")}</a>
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
