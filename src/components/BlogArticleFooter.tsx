import { Button } from "./ui/button";

export default function BlogArticleFooter() {
  return (
    <footer className="blog-article-footer">
      <div>
        <h2>Build your model API business</h2>
        <p>
          Evaluate model delivery, clear accounts, and the experience you can
          offer customers.
        </p>
      </div>
      <div className="blog-article-actions">
        <Button asChild>
          <a href="/docs/guides/api-quickstart/">Get started</a>
        </Button>
        <Button asChild variant="outline">
          <a href="https://github.com/niu-io/niu">View on GitHub</a>
        </Button>
      </div>
    </footer>
  );
}
