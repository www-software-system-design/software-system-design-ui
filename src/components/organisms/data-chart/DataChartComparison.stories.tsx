import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataChart } from './DataChart.js';
const meta = { title: 'Data visualization/Comparison', component: DataChart, tags: ['autodocs'], args: { type: 'bar', title: 'Comparison', data: [{ label: 'First', value: 30 }, { label: 'Second', value: 20 }, { label: 'Third', value: 45 }, { label: 'Fourth', value: 15 }] } } satisfies Meta<typeof DataChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Bar: Story = { args: { type: 'bar' } };
export const HorizontalBar: Story = { args: { type: 'horizontal-bar' } };
