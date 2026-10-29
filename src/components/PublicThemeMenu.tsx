import { useEffect, useState } from 'react';
import { IconDeviceDesktop, IconLanguage, IconMoon, IconSun } from '@tabler/icons-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './ui/dropdown-menu';
import { useLocale, type Locale } from './locale';
type Theme = 'system' | 'light' | 'dark';
function read(): Theme {
  try {
    const value = localStorage.getItem('niu-dashboard-theme');
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}
function apply(theme: Theme) {
  const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
}
export default function PublicThemeMenu() {
  const [theme, setTheme] = useState<Theme>('system');
  const { locale, setLocale, t } = useLocale();
  useEffect(() => {
    const update = () => {
      const value = read();
      setTheme(value);
      apply(value);
    };
    const media = matchMedia('(prefers-color-scheme: dark)');
    update();
    media.addEventListener('change', update);
    window.addEventListener('storage', update);
    window.addEventListener('niu-theme-change', update);
    return () => {
      media.removeEventListener('change', update);
      window.removeEventListener('storage', update);
      window.removeEventListener('niu-theme-change', update);
    };
  }, []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 px-2 text-xs font-medium"
            aria-label="Language"
            title={t('Language: English', '界面语言：简体中文')}
          >
            <IconLanguage size={16} />
            <span>{locale === 'zh-CN' ? '中文' : 'EN'}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <IconLanguage size={14} />
            {t('Language', '界面语言')}
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            aria-label="Language"
            value={locale}
            onValueChange={(value) => setLocale(value as Locale)}
          >
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="zh-CN">简体中文</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Color mode"
            title={t(
              `Color mode: ${theme}`,
              `外观模式：${theme === 'dark' ? '深色' : theme === 'light' ? '浅色' : '跟随系统'}`,
            )}
          >
            {theme === 'dark' ? <IconMoon /> : theme === 'light' ? <IconSun /> : <IconDeviceDesktop />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            {t('Appearance', '外观模式')}
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => {
              const selected = value as Theme;
              try {
                localStorage.setItem('niu-dashboard-theme', selected);
              } catch {}
              setTheme(selected);
              apply(selected);
              window.dispatchEvent(new CustomEvent('niu-theme-change'));
            }}
          >
            <DropdownMenuRadioItem value="system">
              <IconDeviceDesktop />
              {t('System', '跟随系统')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light">
              <IconSun />
              {t('Light', '浅色')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <IconMoon />
              {t('Dark', '深色')}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
