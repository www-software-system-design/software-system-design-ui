import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from './Fieldset.js';
import { Checkbox } from '../checkbox/index.js';
const meta = { title: 'Controls/Forms/Fieldset', component: Fieldset, tags: ['autodocs'], args: { legend: 'Contact preferences', children: <><Checkbox label='Email'/><Checkbox label='SMS'/></> } } satisfies Meta<typeof Fieldset>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Disabled: Story = { args: { disabled: true } };
