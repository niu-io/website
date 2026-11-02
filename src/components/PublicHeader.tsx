import NiuBrand from './NiuBrand';
import { IconSearch } from '@tabler/icons-react';
import { Button } from './ui/button';
import ThemeMenu from './PublicThemeMenu';
import SessionLink from './SessionLink';
import PublicNavigationMenu from './PublicNavigationMenu';
import navigation from '../content/website-navigation';
import { publicNavigationActive, documentationNavigation, documentationHref } from '../content/docs-navigation';
import { useLocale } from './locale';

const NAV_ZH: Record<string, string> = {
  'Docs': '文档',
  'AgentDoc': 'AgentDoc',
  'Why Niu?': '为什么选择 Niu？',
  Blog: '博客',
  Models: '模型',
  API: 'API',
  SDK: 'SDK',
  Compare: '对比',
};

export default function PublicHeader({path,embedded=false}:{path:string;embedded?:boolean}) {
 const { locale, t } = useLocale();
 return <header className="public-header"><div className="docs-header"><a className="docs-brand" href={embedded ? '/help/' : '/'} aria-label={embedded ? t('Niu Docs', 'Niu 文档') : t('Niu home', 'Niu 首页')}>{embedded ? <span>{t('Niu Docs', 'Niu 文档')}</span> : <NiuBrand locale={locale} />}</a><nav aria-label={t("Documentation navigation", "文档导航")}>{(embedded || path.startsWith('/docs/') ? documentationNavigation : navigation).map(({label,href})=><a key={href} href={documentationHref(href, embedded)} aria-current={(embedded || path.startsWith('/docs/') ? publicNavigationActive(path,label) : path.startsWith(href))?'page':undefined}>{t(label, NAV_ZH[label] ?? label)}</a>)}</nav><div className="public-session"><SessionLink/></div><div className="docs-header-tools"><Button asChild variant="ghost" size="icon" className="public-search"><a href={documentationHref("/docs/?search=1", embedded)} aria-label={t("Search documentation", "搜索文档")} title={t('Search documentation', '搜索文档')}><IconSearch size={16}/></a></Button><ThemeMenu/></div><div className="public-mobile-menu"><PublicNavigationMenu path={path} embedded={embedded}/></div></div></header>;
}
