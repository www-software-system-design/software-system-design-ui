import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataChart } from './DataChart.js';
const meta = { title: 'Data visualization/Multivariate', component: DataChart, tags: ['autodocs'], args: { type: 'radar', title: 'Multivariate', data: [{ label: 'First', value: 30 }, { label: 'Second', value: 20 }, { label: 'Third', value: 45 }, { label: 'Fourth', value: 15 }] } } satisfies Meta<typeof DataChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Radar: Story = { args: { type: 'radar' } };
