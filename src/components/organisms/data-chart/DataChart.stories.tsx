import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataChart, type DataChartProps } from './DataChart.js';
const meta = { title: 'Data visualization/Overview', component: DataChart, tags: ['autodocs'], args: { type: 'bar', title: 'Quarterly revenue', data: [{ label: 'Q1', value: 20 }, { label: 'Q2', value: 35 }, { label: 'Q3', value: 28 }, { label: 'Q4', value: 50 }] } } satisfies Meta<typeof DataChart>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Empty: StoryObj<typeof meta> = { args: { data: [] } };
export const Signed: StoryObj<typeof meta> = { args: { data: [{ label: 'Costs', value: -20 }, { label: 'Revenue', value: 40 }] } };
export const CompactRtl: StoryObj<typeof meta> = { globals: { viewport: 'compact', direction: 'rtl' }, args: { title: 'A long translated chart heading that wraps within its MFE container', data: [{ label: 'A long category label supplied by a consumer', value: 12 }, { label: 'Another long translated category', value: 24 }] } };
export const French: StoryObj<typeof meta> = { globals: { locale: 'fr' } };
export const Malayalam: StoryObj<typeof meta> = { globals: { locale: 'ml' } };
const sample = [{ label: 'First', value: 30 }, { label: 'Second', value: 20 }, { label: 'Third', value: 45 }, { label: 'Fourth', value: 15 }];
const catalogue: DataChartProps[] = [
    ...(['bar', 'horizontal-bar', 'line', 'area', 'pie', 'donut', 'treemap', 'histogram', 'radar', 'funnel', 'waterfall'] as const).map(type => ({ type, title: type, data: sample })),
    ...(['scatter', 'bubble'] as const).map(type => ({ type, title: type, data: [{ label: 'A', x: 1, value: 5, size: 4 }, { label: 'B', x: 4, value: 12, size: 16 }, { label: 'C', x: 10, value: 8, size: 9 }] })),
    { type: 'heatmap', title: 'heatmap', data: [{ label: 'Mon AM', row: 'Mon', column: 'AM', value: 2 }, { label: 'Mon PM', row: 'Mon', column: 'PM', value: 8 }, { label: 'Tue AM', row: 'Tue', column: 'AM', value: 5 }, { label: 'Tue PM', row: 'Tue', column: 'PM', value: 3 }] },
    { type: 'gauge', title: 'gauge', data: [{ label: 'Used', value: 65 }] },
];
export const Catalogue: StoryObj<typeof meta> = {
    render: () => <div className="chart-catalogue" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '2rem' }}>{catalogue.map(props => <DataChart key={props.type} {...props}/>)}</div>,
};
