import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataChart } from './DataChart.js';
const meta = { title: 'Data visualization/Progress', component: DataChart, tags: ['autodocs'], args: { type: 'gauge', title: 'Progress', data: [{ label: 'Used', value: 65 }] } } satisfies Meta<typeof DataChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Gauge: Story = { args: { type: 'gauge' } };
