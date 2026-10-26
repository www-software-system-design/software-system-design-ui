'use client';
import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { useUI } from '../../../providers/index.js';
import { DataTable } from '../data-table/index.js';
export interface ChartDatum {
    label: string;
    value: number;
}
export interface ChartPoint extends ChartDatum {
    x: number;
    size?: number;
}
export interface HeatmapCell extends ChartDatum {
    row: string;
    column: string;
}
export type ChartType = 'bar' | 'horizontal-bar' | 'line' | 'area' | 'histogram' | 'pie' | 'donut' | 'radar' | 'treemap' | 'funnel' | 'waterfall' | 'scatter' | 'bubble' | 'heatmap' | 'gauge';
interface CommonProps extends Omit<ComponentPropsWithRef<'figure'>, 'title' | 'children'> {
    title: string;
    description?: string;
    categoryLabel?: string;
    valueLabel?: string;
    xLabel?: string;
    sizeLabel?: string;
    rowLabel?: string;
    columnLabel?: string;
    emptyLabel?: string;
    /** Runs in the consumer's client wrapper when passed as a callback. */
    formatValue?: (value: number) => string;
}
export type DataChartProps = CommonProps & ({
    type: Exclude<ChartType, 'scatter' | 'bubble' | 'heatmap' | 'gauge'>;
    data: readonly ChartDatum[];
    max?: never;
} | {
    type: 'scatter' | 'bubble';
    data: readonly ChartPoint[];
    max?: never;
} | {
    type: 'heatmap';
    data: readonly HeatmapCell[];
    max?: never;
} | {
    type: 'gauge';
    data: readonly ChartDatum[];
    max?: number;
});
const positiveTypes: readonly ChartType[] = ['pie', 'donut', 'radar', 'treemap', 'funnel', 'histogram', 'gauge'];
// SVG coordinates stay LTR in an RTL text scope: numerical axes retain their meaning.
const left = 50, right = 590, top = 30, bottom = 250, width = right - left, height = bottom - top;
const colors = ['var(--ssd-chart-series-1, var(--ssd-color-action))', 'var(--ssd-chart-series-2, var(--ssd-color-success))', 'var(--ssd-chart-series-3, var(--ssd-color-warning))', 'var(--ssd-chart-series-4, var(--ssd-color-danger))'];
const color = (i: number) => colors[i % colors.length];
function cumulativeSteps(data: readonly ChartDatum[]) {
    const steps: {
        start: number;
        end: number;
    }[] = [];
    let cumulative = 0;
    for (const item of data) {
        const start = cumulative;
        cumulative += item.value;
        steps.push({ start, end: cumulative });
    }
    return steps;
}
/** Single-series, read-only SVG visualization with a complete visible data alternative. */
export function DataChart({ type, data, title, description, max = 100, categoryLabel, valueLabel, xLabel, sizeLabel, rowLabel, columnLabel, emptyLabel, formatValue, className, ...props }: DataChartProps) {
    const id = useId();
    const { locale, messages } = useUI();
    let formatter: Intl.NumberFormat;
    try {
        formatter = new Intl.NumberFormat(locale);
    }
    catch {
        formatter = new Intl.NumberFormat('en');
    }
    const format = formatValue ?? ((value: number) => formatter.format(value));
    const xy = type === 'scatter' || type === 'bubble';
    const heat = type === 'heatmap';
    const points = data as readonly ChartPoint[];
    const cells = data as readonly HeatmapCell[];
    for (const item of data) {
        if (!Number.isFinite(item.value) || (positiveTypes.includes(type) && item.value < 0))
            throw new RangeError('Chart values must be finite and non-negative for this chart type.');
    }
    if (xy && points.some(p => !Number.isFinite(p.x) || (type === 'bubble' && p.size !== undefined && (!Number.isFinite(p.size) || p.size < 0))))
        throw new RangeError('Points require finite x coordinates and non-negative finite bubble sizes.');
    if (heat && (cells.some(c => typeof c.row !== 'string' || typeof c.column !== 'string') || new Set(cells.map(c => JSON.stringify([c.row, c.column]))).size !== cells.length))
        throw new RangeError('Heatmap cells require unique row/column pairs.');
    if (type === 'gauge' && (!Number.isFinite(max) || max <= 0 || data.length > 1 || data.some(d => d.value > max)))
        throw new RangeError('Gauge requires a positive maximum and at most one value within its bounds.');
    const steps = cumulativeSteps(data);
    if (steps.some(s => !Number.isFinite(s.end)))
        throw new RangeError('Chart totals exceed the supported numeric range.');
    const values = type === 'waterfall' ? [0, ...steps.map(s => s.end)] : [0, ...data.map(d => d.value)];
    const low = Math.min(...values), high = Math.max(...values);
    const range = high - low || 1;
    if (!Number.isFinite(range))
        throw new RangeError('Chart range exceeds the supported numeric range.');
    const y = (v: number) => bottom - (v - low) / range * height;
    const x = (i: number) => left + (data.length === 1 ? width / 2 : i * width / (data.length - 1));
    const band = width / (data.length || 1);
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const magnitude = Math.max(1, ...data.map(d => Math.abs(d.value)));
    const category = categoryLabel ?? messages.chartCategory ?? 'Category';
    const value = valueLabel ?? messages.chartValue ?? 'Value';
    const xName = xLabel ?? messages.chartX ?? 'X';
    const sizeName = sizeLabel ?? messages.chartSize ?? 'Size';
    const rowName = rowLabel ?? messages.chartRow ?? 'Row';
    const columnName = columnLabel ?? messages.chartColumn ?? 'Column';
    const axes = <g className="ssd-data-chart__axes"><path d={`M${left},${top}V${bottom}H${right}`}/><line x1={left} x2={right} y1={y(0)} y2={y(0)}/><text x={left - 6} y={top + 4} textAnchor="end">{format(high)}</text><text x={left - 6} y={bottom} textAnchor="end">{format(low)}</text></g>;
    let marks: ReactNode;
    if (type === 'bar' || type === 'histogram' || type === 'waterfall') {
        marks = <>{axes}{data.map((d, i) => {
                const start = type === 'waterfall' ? steps[i]!.start : 0;
                const end = type === 'waterfall' ? steps[i]!.end : d.value;
                return <rect key={i} x={left + i * band + (type === 'histogram' ? 0 : band * .15)} y={Math.min(y(start), y(end))} width={band * (type === 'histogram' ? 1 : .7)} height={Math.abs(y(end) - y(start))} fill={color(i)}><title>{`${d.label}: ${format(d.value)}`}</title></rect>;
            })}</>;
    }
    else if (type === 'horizontal-bar') {
        const scale = (v: number) => left + (v - low) / range * width;
        marks = <><g className="ssd-data-chart__axes"><line x1={scale(0)} x2={scale(0)} y1={top} y2={bottom}/><text x={left} y={bottom + 20}>{format(low)}</text><text x={right} y={bottom + 20} textAnchor="end">{format(high)}</text></g>{data.map((d, i) => <rect key={i} x={Math.min(scale(0), scale(d.value))} y={top + i * height / data.length + 4} width={Math.abs(scale(d.value) - scale(0))} height={Math.max(1, height / data.length - 8)} fill={color(i)}><title>{`${d.label}: ${format(d.value)}`}</title></rect>)}</>;
    }
    else if (type === 'line' || type === 'area') {
        const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(i)},${y(d.value)}`).join(' ');
        marks = <>{axes}{type === 'area' && <path d={`${path} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`} fill={color(0)} fillOpacity=".2"/>}<path d={path} fill="none" stroke={color(0)} strokeWidth="3"/>{data.map((d, i) => <circle key={i} cx={x(i)} cy={y(d.value)} r="4" fill={color(0)}><title>{`${d.label}: ${format(d.value)}`}</title></circle>)}</>;
    }
    else if (xy) {
        const minX = points.length ? Math.min(...points.map(p => p.x)) : 0;
        const maxX = points.length ? Math.max(...points.map(p => p.x)) : 0;
        const span = maxX - minX;
        if (!Number.isFinite(span))
            throw new RangeError('X range exceeds the supported numeric range.');
        const maxSize = Math.max(1, ...points.map(p => p.size ?? 1));
        marks = <>{axes}<g className="ssd-data-chart__axes"><text x={left} y={bottom + 20}>{format(minX)}</text><text x={right} y={bottom + 20} textAnchor="end">{format(maxX)}</text></g>{points.map((p, i) => <circle key={i} cx={span ? left + (p.x - minX) / span * width : (left + right) / 2} cy={y(p.value)} r={type === 'bubble' ? Math.sqrt((p.size ?? 1) / maxSize) * 18 : 5} fill={color(i)} fillOpacity=".7" stroke={color(i)}><title>{`${p.label}: ${format(p.x)}, ${format(p.value)}`}</title></circle>)}</>;
    }
    else if (type === 'pie' || type === 'donut') {
        marks = <>{total === 0 && <circle cx="320" cy="140" r="100" fill="var(--ssd-color-surface-subtle)"/>}{data.map((d, i) => {
                const start = (total ? steps[i]!.start / total * Math.PI * 2 : 0) - Math.PI / 2;
                const angle = (total ? steps[i]!.end / total * Math.PI * 2 : 0) - Math.PI / 2;
                if (!d.value)
                    return null;
                const path = `M320,140 L${320 + 100 * Math.cos(start)},${140 + 100 * Math.sin(start)} A100,100 0 ${angle - start > Math.PI ? 1 : 0},1 ${320 + 100 * Math.cos(angle)},${140 + 100 * Math.sin(angle)} Z`;
                return d.value === total ? <circle key={i} cx="320" cy="140" r="100" fill={color(i)}><title>{d.label}</title></circle> : <path key={i} d={path} fill={color(i)} stroke="var(--ssd-color-surface)" strokeWidth="2"><title>{`${d.label}: ${format(d.value)}`}</title></path>;
            })}{type === 'donut' && <circle cx="320" cy="140" r="58" fill="var(--ssd-color-surface)"/>}</>;
    }
    else if (type === 'radar') {
        const radial = (i: number, radius: number) => { const a = i / data.length * Math.PI * 2 - Math.PI / 2; return `${320 + Math.cos(a) * radius},${140 + Math.sin(a) * radius}`; };
        marks = <><polygon points={data.map((_, i) => radial(i, 100)).join(' ')} fill="none" stroke="var(--ssd-color-border)"/>{data.map((d, i) => <g key={i}><path d={`M320,140 L${radial(i, 100)}`} stroke="var(--ssd-color-border)"/><circle cx={radial(i, d.value / magnitude * 100).split(',')[0]} cy={radial(i, d.value / magnitude * 100).split(',')[1]} r="4" fill={color(0)}><title>{`${d.label}: ${format(d.value)}`}</title></circle></g>)}<polygon points={data.map((d, i) => radial(i, d.value / magnitude * 100)).join(' ')} fill={color(0)} fillOpacity=".2" stroke={color(0)} strokeWidth="2"/></>;
    }
    else if (heat) {
        const rows = [...new Set(cells.map(c => c.row))], columns = [...new Set(cells.map(c => c.column))];
        marks = cells.map((c, i) => <rect key={i} x={left + columns.indexOf(c.column) * width / columns.length} y={top + rows.indexOf(c.row) * height / rows.length} width={width / columns.length} height={height / rows.length} fill={color(0)} fillOpacity={.15 + .85 * (c.value - low) / range} stroke="var(--ssd-color-surface)" strokeWidth="2"><title>{`${c.row}, ${c.column}: ${format(c.value)}`}</title></rect>);
    }
    else if (type === 'treemap') {
        // Slice-and-dice layout: each rectangular leaf's area is proportional to its value.
        marks = data.map((d, i) => { const w = total ? d.value / total * width : 0; const start = left + (total ? steps[i]!.start / total * width : 0); return <rect key={i} x={start} y={top} width={w} height={height} fill={color(i)} stroke="var(--ssd-color-surface)" strokeWidth="2"><title>{`${d.label}: ${format(d.value)}`}</title></rect>; });
    }
    else if (type === 'funnel') {
        marks = data.map((d, i) => { const w = d.value / magnitude * width; return <rect key={i} x={320 - w / 2} y={top + i * height / data.length} width={w} height={height / data.length - 2} fill={color(i)}><title>{`${d.label}: ${format(d.value)}`}</title></rect>; });
    }
    else {
        const fraction = (data[0]?.value ?? 0) / max;
        marks = <><path d="M220,180 A100,100 0 0,1 420,180" fill="none" stroke="var(--ssd-color-border)" strokeWidth="18"/><path d="M220,180 A100,100 0 0,1 420,180" pathLength="100" strokeDasharray={`${fraction * 100} 100`} fill="none" stroke={color(0)} strokeWidth="18"/><text x="320" y="170" textAnchor="middle" fill="var(--ssd-color-text)">{format(data[0]?.value ?? 0)}</text><g className="ssd-data-chart__axes"><text x="220" y="215" textAnchor="middle">{format(0)}</text><text x="420" y="215" textAnchor="middle">{format(max)}</text></g></>;
    }
    const shortLabel = (label: string, limit = 10) => label.length > limit ? `${label.slice(0, limit - 1)}…` : label;
    const categoryTicks = ['bar', 'histogram', 'waterfall', 'line', 'area'].includes(type);
    return <figure {...props} className={['ssd-data-chart', className].filter(Boolean).join(' ')}>
    <figcaption id={`${id}-title`}>{title}</figcaption>
    {description && <p id={`${id}-description`}>{description}</p>}
    {data.length ? <><svg viewBox="0 0 640 280" role="img" aria-labelledby={`${id}-title`} aria-describedby={description ? `${id}-description` : undefined} direction="ltr">{marks}
      <g className="ssd-data-chart__axes">{categoryTicks && data.map((d, i) => i % Math.max(1, Math.ceil(data.length / 8)) === 0 && <text key={i} x={type === 'line' || type === 'area' ? x(i) : left + (i + .5) * band} y={bottom + 20} textAnchor="middle">{shortLabel(d.label, Math.min(10, Math.max(3, Math.floor(band / 7))))}</text>)}
      {type === 'radar' && <><text x="470" y="40">{format(magnitude)}</text>{data.map((d, i) => {
        const angle = i / data.length * Math.PI * 2 - Math.PI / 2;
        return <text key={i} x={320 + Math.cos(angle) * 125} y={145 + Math.sin(angle) * 125} textAnchor="middle">{shortLabel(d.label)}</text>;
      })}</>}
      {type === 'horizontal-bar' && data.map((d, i) => <text key={i} x={left} y={top + (i + .5) * height / data.length} textAnchor="end">{shortLabel(d.label, 6)}</text>)}
      {heat && <>{[...new Set(cells.map(c => c.row))].map((row, i, rows) => <text key={row} x={left - 4} y={top + (i + .5) * height / rows.length} textAnchor="end">{shortLabel(row, 6)}</text>)}{[...new Set(cells.map(c => c.column))].map((column, i, columns) => <text key={column} x={left + (i + .5) * width / columns.length} y={bottom + 20} textAnchor="middle">{shortLabel(column)}</text>)}</>}
      </g>
    </svg>
      <DataTable label={title} caption={title}><thead><tr><th scope="col">{category}</th>{xy && <th scope="col">{xName}</th>}{heat && <><th scope="col">{rowName}</th><th scope="col">{columnName}</th></>}<th scope="col">{value}</th>{type === 'bubble' && <th scope="col">{sizeName}</th>}</tr></thead><tbody>{data.map((d, i) => <tr key={i}><th scope="row"><span aria-hidden="true" className="ssd-data-chart__swatch" style={{ background: color(['line', 'area', 'radar', 'heatmap', 'gauge'].includes(type) ? 0 : i) }}/>{d.label}</th>{xy && <td>{format(points[i]!.x)}</td>}{heat && <><td>{cells[i]!.row}</td><td>{cells[i]!.column}</td></>}<td>{format(d.value)}</td>{type === 'bubble' && <td>{format(points[i]!.size ?? 1)}</td>}</tr>)}</tbody></DataTable></> : <p>{emptyLabel ?? messages.chartEmpty ?? 'No chart data'}</p>}
  </figure>;
}
