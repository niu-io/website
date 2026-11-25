import NiuBrand from "./NiuBrand";
import { IconSearch } from "@tabler/icons-react";
import { Button } from "./ui/button";
import ThemeMenu from "./PublicThemeMenu";
import SessionLink from "./SessionLink";
import PublicNavigationMenu from "./PublicNavigationMenu";
import navigation from "../content/website-navigation";
import {
  documentationNavigation,
  publicNavigationActive,
} from "../content/docs-navigation";
import { useLocale } from "./locale";
import { usePublicModelsAvailable } from "./usePublicModelsAvailable";

const NAV_ZH: Record<string, string> = {
  Docs: "文档",
  "Why Niu?": "为什么选择 Niu？",
  Blog: "博客",
  Models: "模型",
  API: "API",
  SDK: "SDK",
  Compare: "对比",
};

export default function PublicHeader({ path }: { path: string }) {
  const { locale, t } = useLocale();
  const modelsAvailable = usePublicModelsAvailable();
  const navItems = path.startsWith("/docs/")
    ? documentationNavigation
    : modelsAvailable && !navigation.some((item) => item.href === "/models/")
      ? [...navigation, { label: "Models", href: "/models/" }]
      : navigation;
  return (
    <header className="public-header">
      <div className="docs-header">
        <a
          className="docs-brand"
          href="/"
          aria-label={t("Niu home", "Niu 首页")}
        >
          <NiuBrand locale={locale} />
        </a>
        <nav aria-label={t("Documentation navigation", "文档导航")}>
          {navItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              aria-current={
                (
                  path.startsWith("/docs/")
                    ? publicNavigationActive(path, label)
                    : path.startsWith(href)
                )
                  ? "page"
                  : undefined
              }
            >
              {t(label, NAV_ZH[label] ?? label)}
            </a>
          ))}
        </nav>
        <div className="public-session">
          <SessionLink />
        </div>
        <div className="docs-header-tools">
          <Button asChild variant="ghost" size="icon" className="public-search">
            <a
              href="/docs/?search=1"
              aria-label={t("Search documentation", "搜索文档")}
              title={t("Search documentation", "搜索文档")}
            >
              <IconSearch size={16} />
            </a>
          </Button>
          <ThemeMenu />
        </div>
        <div className="public-mobile-menu">
          <PublicNavigationMenu path={path} />
        </div>
      </div>
    </header>
  );
}
