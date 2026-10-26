import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner.js';
const meta = { title: 'Controls/Feedback/Spinner', component: Spinner, tags: ['autodocs'], args: { label: 'Loading records' } } satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
