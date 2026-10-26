import type {Meta,StoryObj} from '@storybook/react-vite';
import {TextField} from '../components/molecules/text-field/index.js';
import {TextArea} from '../components/atoms/text-area/index.js';
import {Checkbox} from '../components/molecules/checkbox/index.js';
import {RadioButton} from '../components/molecules/radio-button/index.js';
import {Fieldset} from '../components/molecules/fieldset/index.js';
import {SelectField} from '../components/molecules/select-field/index.js';

const meta={title:'Reference/Native recipes',render:()=> <div className="ssd-reference__gallery">
  <Fieldset legend="Text entry"><TextField label="Email" type="email" autoComplete="email"/><TextField label="Password" type="password" autoComplete="new-password"/><TextField label="Telephone" type="tel" autoComplete="tel"/><TextField label="Website" type="url"/><TextField label="Verification code" autoComplete="one-time-code" inputMode="numeric"/><label htmlFor="recipe-notes">Notes</label><TextArea id="recipe-notes" rows={3}/></Fieldset>
  <Fieldset legend="Native choice groups"><RadioButton label="Email" name="recipe-channel" value="email" defaultChecked/><RadioButton label="SMS" name="recipe-channel" value="sms"/><Checkbox label="Remember this preference"/><SelectField label="Languages" multiple defaultValue={['en']}><optgroup label="Available languages"><option value="en">English</option><option value="fr">French</option><option value="ml">Malayalam</option></optgroup></SelectField></Fieldset>
  <section><h2>Step indicator</h2><nav aria-label="Setup steps"><ol><li>Account</li><li aria-current="step">Preferences</li><li>Review</li></ol></nav><p>The MFE owns validation, navigation, and the current step.</p></section>
  <section><h2>Definition list</h2><dl><dt>Package</dt><dd>@software-system.design/ui</dd><dt>Runtime</dt><dd>React Client Components</dd></dl></section>
</div>} satisfies Meta;
export default meta;
export const Forms:StoryObj<typeof meta>={};
