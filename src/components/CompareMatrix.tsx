import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from './ui/dropdown-menu';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from './ui/table';
import { overviewRows, reviewed } from '../content/comparisons';
export default function CompareMatrix() {
  const [category, setCategory] = useState('All differences');
  const [selected, setSelected] = useState<string[]>(['New API', 'OpenRouter']);
  const toggle = (name: string) => setSelected(current=>current.includes(name) ? current.length > 1 ? current.filter(value=>value!==name) : current : [...current,name]);
  const rows = overviewRows.filter(row=>category==='All differences'||row.category===category);
  return <section aria-labelledby="matrix-title" className="compare-matrix">
    <div className="compare-toolbar"><h2 id="matrix-title">At a glance</h2><div className="compare-controls">
      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">{selected.join(' + ')}<IconChevronDown aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuLabel>Compare with Niu</DropdownMenuLabel><DropdownMenuSeparator />{['New API','OpenRouter'].map(name=><DropdownMenuCheckboxItem key={name} checked={selected.includes(name)} disabled={selected.length===1&&selected.includes(name)} onCheckedChange={()=>toggle(name)}>{name}</DropdownMenuCheckboxItem>)}</DropdownMenuContent></DropdownMenu>
      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">{category}<IconChevronDown aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuRadioGroup value={category} onValueChange={setCategory}>{['All differences','Setup','Model access','Access & billing','Observability'].map(value=><DropdownMenuRadioItem key={value} value={value}>{value}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>
    </div></div>
    <Table className="compare-table"><TableCaption>Documentation reviewed {reviewed}. This is a scope comparison, not a benchmark.</TableCaption><TableHeader><TableRow><TableHead>Capability</TableHead><TableHead>Niu</TableHead>{selected.includes('New API')&&<TableHead>New API</TableHead>}{selected.includes('OpenRouter')&&<TableHead>OpenRouter</TableHead>}</TableRow></TableHeader><TableBody>{rows.map(row=><TableRow key={row.feature}><TableCell>{row.feature}</TableCell><TableCell data-label="Niu">{row.niu}</TableCell>{selected.includes('New API')&&<TableCell data-label="New API">{row.newApi}</TableCell>}{selected.includes('OpenRouter')&&<TableCell data-label="OpenRouter">{row.openRouter}</TableCell>}</TableRow>)}</TableBody></Table>
  </section>;
}
