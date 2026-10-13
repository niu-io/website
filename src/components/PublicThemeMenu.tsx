import { useEffect, useState } from 'react';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from './ui/dropdown-menu';
type Theme = 'system' | 'light' | 'dark';
function read(): Theme { try { const value=localStorage.getItem('niu-dashboard-theme');return value==='light'||value==='dark'?value:'system'; } catch { return 'system'; } }
function apply(theme: Theme) { const dark=theme==='dark'||(theme==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light'; }
export default function PublicThemeMenu() {
 const [theme,setTheme]=useState<Theme>('system');
 useEffect(()=>{const update=()=>{const value=read();setTheme(value);apply(value);};const media=matchMedia('(prefers-color-scheme: dark)');update();media.addEventListener('change',update);window.addEventListener('storage',update);window.addEventListener('niu-theme-change',update);return()=>{media.removeEventListener('change',update);window.removeEventListener('storage',update);window.removeEventListener('niu-theme-change',update);};},[]);
 return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Color mode">{theme==='dark'?<IconMoon/>:theme==='light'?<IconSun/>:<IconDeviceDesktop/>}</Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuRadioGroup value={theme} onValueChange={value=>{const selected=value as Theme;try{localStorage.setItem('niu-dashboard-theme',selected);}catch{}setTheme(selected);apply(selected);window.dispatchEvent(new CustomEvent('niu-theme-change'));}}><DropdownMenuRadioItem value="system"><IconDeviceDesktop/>System</DropdownMenuRadioItem><DropdownMenuRadioItem value="light"><IconSun/>Light</DropdownMenuRadioItem><DropdownMenuRadioItem value="dark"><IconMoon/>Dark</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>;
}
