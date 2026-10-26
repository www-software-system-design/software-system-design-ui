'use client';

import { useState } from 'react';
import { Button } from '@software-system.design/ui/button';
import { SearchPanel } from '@software-system.design/ui/search-panel';
import { useControllableState } from '@software-system.design/ui/hooks';
import {ThemeToggle,Pagination,UIProvider} from '@software-system.design/ui';
import {Tabs} from '@software-system.design/ui/tabs';
import {Dialog} from '@software-system.design/ui/dialog';
import {Switch} from '@software-system.design/ui/switch';

export function ReferenceControls(){
  const [open,setOpen]=useState(false);
  const [enabled,setEnabled]=useState(false);
  return <UIProvider theme="dark" locale="fr" direction="rtl" messages={{close:'Fermer'}}>
    <Switch label="Reference notifications" checked={enabled} onChange={event=>setEnabled(event.currentTarget.checked)}/>
    <output aria-label="Notification preference">{enabled?'Enabled':'Disabled'}</output>
    <Tabs label="Reference panels" items={[{value:'first',label:'Reference one',content:<p>First reference panel</p>},{value:'second',label:'Reference two',content:<p>Second reference panel</p>}]}/>
    <Button onClick={()=>setOpen(true)}>Open reference dialog</Button>
    <Dialog open={open} onOpenChange={setOpen} title="Reference dialog"><p>Inherits its MFE scope.</p></Dialog>
  </UIProvider>;
}

export function MarketingControls() {
  const [theme,setTheme]=useState<'light'|'dark'>('dark');
  const [page,setPage]=useState(0);
  return <UIProvider theme={theme}>
    <ThemeToggle theme={theme} label={`Use ${theme==='dark'?'light':'dark'} theme`} onThemeChange={setTheme}/>
    <Pagination page={page} pageCount={2} onPageChange={setPage} label="Example pages" previousLabel="Previous page" nextLabel="Next page" pageLabel={`Page ${page+1} of 2`}/>
  </UIProvider>;
}

export function Controls() {
  const [count, setCount] = useState(0);
  return <section aria-label="Client state">
    <Button onClick={() => setCount((value) => value + 1)}>Increment</Button>
    <output aria-label="Count">{count}</output>
  </section>;
}

export function SearchExperience() {
  const [query, setQuery] = useControllableState({ defaultValue: '' });
  const items = ['Button', 'TextInput', 'SearchField'].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  return <SearchPanel title="Shared components" headingLevel={3} query={query} onQueryChange={setQuery} resultCount={items.length}>
    <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
  </SearchPanel>;
}
