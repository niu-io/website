import { Button } from "./ui/button";
import { useLocale } from "./locale";

export default function BlogArticleFooter() {
  const { t } = useLocale();
  return (
    <footer className="blog-article-footer">
      <div>
        <h2>{t("Build your model API business", "构建并运营您的模型 API 商业服务")}</h2>
        <p>
          {t(
            "Evaluate model delivery, clear accounts, and the experience you can offer customers.",
            "评估模型路由交付、清晰的财务账本，以及您可以为客户提供的完整产品体验。",
          )}
        </p>
      </div>
      <div className="blog-article-actions">
        <Button asChild>
          <a href="/docs/guides/api-quickstart/">{t("Get started", "快速入门")}</a>
        </Button>
        <Button asChild variant="outline">
          <a href="https://github.com/niu-io/niu">{t("View on GitHub", "在 GitHub 查看")}</a>
        </Button>
      </div>
    </footer>
  );
}
