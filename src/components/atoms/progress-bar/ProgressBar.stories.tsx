import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar.js';
const meta = { title: 'Controls/Feedback/ProgressBar', component: ProgressBar, tags: ['autodocs'], args: { label: 'Upload progress', value: 45 } } satisfies Meta<typeof ProgressBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Indeterminate: Story = { render: () => <ProgressBar label="Loading records"/> };
