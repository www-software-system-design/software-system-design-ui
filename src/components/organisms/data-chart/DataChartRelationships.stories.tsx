import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataChart } from './DataChart.js';
const meta = { title: 'Data visualization/Relationships', component: DataChart, tags: ['autodocs'], args: { type: 'scatter', title: 'Relationships', data: [{ label: 'A', x: 1, value: 5, size: 4 }, { label: 'B', x: 4, value: 12, size: 16 }, { label: 'C', x: 10, value: 8, size: 9 }] } } satisfies Meta<typeof DataChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Scatter: Story = { args: { type: 'scatter' } };
export const Bubble: Story = { args: { type: 'bubble' } };
