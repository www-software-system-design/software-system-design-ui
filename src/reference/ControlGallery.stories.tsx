import type {Meta,StoryObj} from '@storybook/react-vite';
import {Checkbox,RadioButton,Switch,SelectField,RangeField,FileUpload,Fieldset,NativeField,Autocomplete,Alert,Avatar,Breadcrumbs,Link,ToggleButton,Toolbar,Tabs,Accordion,ProgressBar,Meter,Spinner,Skeleton,Separator} from '../index.js';

const meta={title:'Reference/Control gallery',render:()=> <div className="ssd-reference__gallery">
  <Fieldset legend="Choices"><Checkbox label="Receive a summary" defaultChecked/><Checkbox label="Mixed selection" indeterminate/><RadioButton label="Email" name="gallery-channel" value="email" defaultChecked/><RadioButton label="SMS" name="gallery-channel" value="sms"/><Switch label="Enable notifications" defaultChecked/><Checkbox label="Unavailable choice" disabled/><Checkbox label="Approval" error="Review this choice"/></Fieldset>
  <Fieldset legend="Selection and input"><SelectField label="Region" defaultValue="in"><option value="in">India</option><option value="eu">Europe</option></SelectField><Autocomplete label="City" options={['Kochi','Paris']}/><NativeField label="Quantity" type="number" defaultValue={2} min={1} max={10}/><RangeField label="Volume" min={0} max={10} defaultValue={4}/><FileUpload label="Attachment"/></Fieldset>
  <section><h2>Feedback</h2><Alert title="Draft saved" tone="success">Your work is ready.</Alert><p>Upload progress</p><ProgressBar label="Upload progress" value={45}/><p>Storage used</p><Meter label="Storage used" value={65}/><p><Spinner label="Loading records"/></p><Skeleton lines={3}/></section>
  <section><h2>Actions and identity</h2><Avatar name="Ada Lovelace"/><p><Link href="#documentation">Read documentation</Link></p><Toolbar label="Text formatting"><ToggleButton>Bold</ToggleButton><ToggleButton>Italic</ToggleButton></Toolbar><Separator/><Breadcrumbs label="Page location" items={[{label:'Home',href:'#home'},{label:'Settings'}]}/></section>
  <section><h2>Navigation</h2><Tabs label="Project sections" items={[{value:'overview',label:'Overview',content:'Project overview'},{value:'activity',label:'Activity',content:'Recent activity'}]}/></section>
  <section><h2>Disclosure</h2><Accordion label="Reference questions" items={[{id:'ownership',title:'Who owns application data?',content:'The MFE owns data, routing, persistence and operations.',defaultOpen:true},{id:'theme',title:'How are themes applied?',content:'Use a scoped UIProvider.'}]}/></section>
</div>} satisfies Meta;
export default meta;
export const Overview:StoryObj<typeof meta>={};
export const CompactRtl:StoryObj<typeof meta>={globals:{viewport:'compact',direction:'rtl'}};
