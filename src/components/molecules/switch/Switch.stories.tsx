import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch.js';
const meta = { title: 'Controls/Forms/Switch', component: Switch, tags: ['autodocs'], args: { label: 'Enable notifications', defaultChecked: true, name: 'notifications' } } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Disabled: Story = { args: { disabled: true } };
