import {useState} from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {expect,userEvent,within} from 'storybook/test';
import dictionary from '../../docs/ui-dictionary.json';
import {SearchField} from '../components/molecules/search-field/index.js';
import {SelectField} from '../components/molecules/select-field/index.js';
import {DataTable} from '../components/organisms/data-table/index.js';
import {Link} from '../components/atoms/link/index.js';

function Dictionary(){
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('all');
  const [kind,setKind]=useState('all');
  const entries=dictionary.entries.filter(entry=>(category==='all'||entry.category===category)&&(kind==='all'||entry.kind===kind)&&[entry.name,entry.purpose,entry.component,...entry.aliases].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="ssd-reference">
    <h1>UI control dictionary</h1>
    <p>The shared web UI vocabulary for software-system.design MFEs. Component entries have public APIs; recipes compose existing controls or native HTML. Reference entries document specialized contracts and are not shipped components.</p>
    <div className="ssd-reference__filters">
      <SearchField label="Find a control" value={query} onValueChange={setQuery}/>
      <SelectField label="Category" value={category} onChange={event=>setCategory(event.currentTarget.value)}><option value="all">All categories</option>{dictionary.categories.map(item=><option key={item}>{item}</option>)}</SelectField>
      <SelectField label="Availability" value={kind} onChange={event=>setKind(event.currentTarget.value)}><option value="all">All entries</option><option value="component">Components</option><option value="recipe">Composition recipes</option><option value="reference">Reference only</option></SelectField>
    </div>
    <p role="status">{entries.length} entries</p>
    <DataTable label="UI dictionary entries" caption="UI control dictionary entries"><thead><tr><th scope="col">Control</th><th scope="col">Category</th><th scope="col">Availability</th><th scope="col">Contract</th></tr></thead><tbody>{entries.map(entry=><tr key={entry.id}><th scope="row">{entry.story?<Link target="_top" href={'/?path=/story/'+entry.story}>{entry.name}</Link>:entry.name}</th><td>{entry.category}</td><td>{entry.kind}</td><td><p>{entry.purpose}</p>{entry.subpath&&<code>@software-system.design/ui/{entry.subpath}</code>}<p><Link href={entry.standard} target="_blank">Web standard reference</Link></p></td></tr>)}</tbody></DataTable>
    {entries.length===0&&<p>No matching controls. Try a broader term or another category.</p>}
  </div>;
}
const meta={title:'Reference/UI dictionary',parameters:{layout:'padded'},render:()=> <Dictionary/>} satisfies Meta;
export default meta;
type Story=StoryObj<typeof meta>;
export const Browse:Story={};
export const Search:Story={play:async({canvasElement})=>{const canvas=within(canvasElement);await userEvent.type(canvas.getByRole('searchbox',{name:'Find a control'}),'spinbutton');await expect(canvas.getByRole('status')).toHaveTextContent('2 entries');await expect(canvas.getByRole('link',{name:'NativeField'})).toBeVisible();}};
export const CompactRtl:Story={globals:{viewport:'compact',direction:'rtl'}};
