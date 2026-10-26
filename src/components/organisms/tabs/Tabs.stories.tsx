import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs.js';
const meta = { title: 'Controls/Navigation/Tabs', component: Tabs, tags: ['autodocs'], args: { label: 'Project sections', items: [{ value: 'overview', label: 'Overview', content: <p>Project overview</p> }, { value: 'activity', label: 'Activity', content: <p>Recent activity</p> }, { value: 'disabled', label: 'Archived', disabled: true, content: <p>Unavailable</p> }] } } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Vertical: Story = { args: { orientation: 'vertical' } };
