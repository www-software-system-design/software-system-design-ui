import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataChart } from './DataChart.js';
const meta = { title: 'Data visualization/Composition', component: DataChart, tags: ['autodocs'], args: { type: 'pie', title: 'Composition', data: [{ label: 'First', value: 30 }, { label: 'Second', value: 20 }, { label: 'Third', value: 45 }, { label: 'Fourth', value: 15 }] } } satisfies Meta<typeof DataChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Pie: Story = { args: { type: 'pie' } };
export const Donut: Story = { args: { type: 'donut' } };
export const Treemap: Story = { args: { type: 'treemap' } };
