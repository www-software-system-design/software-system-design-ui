import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataChart } from './DataChart.js';
const meta = { title: 'Data visualization/Intensity', component: DataChart, tags: ['autodocs'], args: { type: 'heatmap', title: 'Intensity', data: [{ label: 'Mon morning', row: 'Mon', column: 'AM', value: 2 }, { label: 'Mon evening', row: 'Mon', column: 'PM', value: 5 }, { label: 'Tue morning', row: 'Tue', column: 'AM', value: 8 }, { label: 'Tue evening', row: 'Tue', column: 'PM', value: 3 }] } } satisfies Meta<typeof DataChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Heatmap: Story = { args: { type: 'heatmap' } };
