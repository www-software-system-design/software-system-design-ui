import { render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DataChart } from './DataChart.js';
import { UIProvider } from '../../../providers/index.js';
describe('DataChart', () => {
    it('names radar spokes and shows their shared maximum', () => {
        render(<DataChart type="radar" title="Metrics" data={[{ label: 'Latency', value: 10 }, { label: 'Memory', value: 20 }, { label: 'CPU', value: 30 }]}/>);
        const chart = screen.getByRole('img');
        expect(within(chart).getByText('Latency', { selector: 'text' })).toBeInTheDocument();
        expect(within(chart).getByText('30', { selector: 'text' })).toBeInTheDocument();
    });
    const data = [{ label: 'Alpha', value: 20 }, { label: 'Beta', value: 40 }];
    it.each(['bar', 'horizontal-bar', 'line', 'area', 'pie', 'donut', 'radar', 'treemap', 'funnel', 'waterfall', 'histogram'] as const)('%s exposes data without relying on color or hover', (type) => {
        render(<DataChart type={type} title="Revenue" data={data}/>);
        expect(screen.getByRole('img', { name: 'Revenue' })).toBeVisible();
        const table = screen.getByRole('table', { name: 'Revenue' });
        expect(within(table).getByRole('rowheader', { name: 'Alpha' })).toBeVisible();
        expect(within(table).getByRole('cell', { name: '40' })).toBeVisible();
    });
    it('uses signed bars with a shared zero baseline', () => {
        const { container } = render(<DataChart type="bar" title="Balance" data={[{ label: 'Loss', value: -10 }, { label: 'Gain', value: 10 }]}/>);
        const bars = container.querySelectorAll('svg rect');
        expect(bars[0]).toHaveAttribute('y', '140');
        expect(bars[0]).toHaveAttribute('height', '110');
        expect(bars[1]).toHaveAttribute('y', '30');
    });
    it.each(['scatter', 'bubble'] as const)('%s uses numeric x spacing', (type) => {
        const { container } = render(<DataChart type={type} title="Relationship" data={[{ label: 'A', x: 0, value: 1, size: 4 }, { label: 'B', x: 10, value: 2, size: 16 }, { label: 'C', x: 100, value: 3, size: 1 }]}/>);
        expect(container.querySelectorAll('svg circle')[1]).toHaveAttribute('cx', '104');
        expect(screen.getAllByRole('columnheader')).toHaveLength(type === 'bubble' ? 4 : 3);
    });
    it('positions heatmap cells using row and column identities', () => {
        const { container } = render(<DataChart type="heatmap" title="Activity" data={[{ label: 'A', row: 'Mon', column: 'AM', value: 2 }, { label: 'B', row: 'Tue', column: 'PM', value: 4 }]}/>);
        expect(container.querySelectorAll('svg rect')[1]).toHaveAttribute('x', '320');
        expect(screen.getByRole('cell', { name: 'Tue' })).toBeVisible();
    });
    it('shows gauge bounds and value', () => {
        render(<DataChart type="gauge" title="Capacity" max={200} data={[{ label: 'Used', value: 50 }]}/>);
        expect(screen.getByRole('img')).toHaveTextContent('200');
        expect(screen.getByRole('cell', { name: '50' })).toBeVisible();
    });
    it('handles empty and zero data without invalid SVG', () => {
        const { rerender, container } = render(<DataChart type="pie" title="Share" data={[]} emptyLabel="Nothing recorded"/>);
        expect(screen.getByText('Nothing recorded')).toBeVisible();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        rerender(<DataChart type="pie" title="Share" data={[{ label: 'A', value: 0 }]}/>);
        expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
        expect(screen.getByRole('cell', { name: '0' })).toBeVisible();
    });
    it.each(['scatter', 'bubble'] as const)('%s supports an empty data set', (type) => {
        render(<DataChart type={type} title="Empty relationship" data={[]}/>);
        expect(screen.getByText('No chart data')).toBeVisible();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
    it.each([
        { type: 'bar', data: [{ label: 'A', value: NaN }] },
        { type: 'pie', data: [{ label: 'A', value: -1 }] },
        { type: 'scatter', data: [{ label: 'A', value: 1, x: Infinity }] },
        { type: 'bubble', data: [{ label: 'A', value: 1, x: 2, size: -1 }] },
        { type: 'gauge', max: 0, data: [{ label: 'A', value: 1 }] },
        { type: 'gauge', max: 100, data: [{ label: 'A', value: 101 }] },
    ] as const)('rejects invalid $type input', (props) => {
        expect(() => renderToString(<DataChart {...props} title="Invalid"/>)).toThrow(RangeError);
    });
    it('supports scoped messages and explicit label overrides', () => {
        const { rerender } = render(<UIProvider locale="fr" messages={{ chartValue: 'Valeur' }}><DataChart type="bar" title="Ventes" data={[{ label: 'A', value: 1234.5 }]}/></UIProvider>);
        expect(screen.getByRole('columnheader', { name: 'Valeur' })).toBeVisible();
        expect(screen.getByRole('cell').textContent).toBe(new Intl.NumberFormat('fr').format(1234.5));
        rerender(<DataChart type="bar" title="Sales" valueLabel="Amount" data={data}/>);
        expect(screen.getByRole('columnheader', { name: 'Amount' })).toBeVisible();
    });
    it('renders deterministic server markup and distinct accessible IDs', () => {
        expect(renderToString(<DataChart type="line" title="Trend" description="Monthly totals" data={data}/>)).toContain('Monthly totals');
        render(<><DataChart type="bar" title="First" data={data}/><DataChart type="bar" title="Second" data={data}/></>);
        expect(screen.getByRole('img', { name: 'First' }).getAttribute('aria-labelledby')).not.toBe(screen.getByRole('img', { name: 'Second' }).getAttribute('aria-labelledby'));
    });
});
