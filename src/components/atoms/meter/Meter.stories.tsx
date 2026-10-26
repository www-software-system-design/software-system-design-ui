import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from './Meter.js';
const meta = { title: 'Controls/Feedback/Meter', component: Meter, tags: ['autodocs'], args: { label: 'Storage used', value: 65, low: 25, high: 80, optimum: 10 } } satisfies Meta<typeof Meter>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
