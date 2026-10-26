# Charts and data visualization

`DataChart` provides a categorized, single-series catalogue using React and native
SVG. No charting runtime dependency is installed. This avoids adding a third-party
chart dependency; it is not a guarantee that the entire development dependency
tree is vulnerability-free. Audit that tree separately with `npm audit`.

| Category | `type` | Input contract |
| --- | --- | --- |
| Comparison | `bar`, `horizontal-bar` | Ordered labels and finite signed values; shared zero baseline |
| Trends | `line`, `area` | Equally spaced categories in caller order; signed values supported |
| Composition | `pie`, `donut`, `treemap` | Non-negative values; slice-and-dice treemap represents flat leaves |
| Distribution | `histogram` | Caller-precomputed equal-width bins, labels and non-negative counts; adjoining bars |
| Relationships | `scatter`, `bubble` | Numeric `x`, `value` as y; optional non-negative `size` controls bubble area, defaults to 1 |
| Multivariate | `radar` | Non-negative values on a shared scale; use at least three comparable measures |
| Intensity | `heatmap` | `row`, `column`, signed `value`; unique coordinate pairs, absent cells remain blank |
| Flow and change | `funnel`, `waterfall` | Caller-ordered non-negative stages; or signed deltas accumulated from zero |
| Progress | `gauge` | One non-negative value within `max` (default 100) |

```tsx
import { DataChart } from '@software-system.design/ui/data-chart';
import '@software-system.design/ui/styles.css';

<DataChart
  type="bar"
  title="Quarterly revenue"
  description="Revenue in thousands of euros."
  valueLabel="Revenue (€000)"
  data={[{ label: 'Q1', value: 20 }, { label: 'Q2', value: 35 }]}
/>;
```

All variants include a visible semantic data table containing the exact values.
The SVG has an accessible name and optional description. No information requires
pointer hover, color perception, or JavaScript interaction. Tables can scroll
with the keyboard. Supply meaningful labels, units, and descriptions explaining
scales. Histogram binning, ordering, missing-value treatment, aggregation, date
formatting, and fetching belong to the consumer. Zero totals draw no proportional
marks and preserve the zero values in the table. Invalid or unsupported numeric
ranges throw `RangeError`; values are never silently dropped or clamped.

Use `UIProvider` for number formatting, messages, direction, and scoped themes.
`categoryLabel`, `valueLabel`, `xLabel`, `sizeLabel`, `rowLabel`, `columnLabel`, and
`emptyLabel` override optional `chart*` provider messages, then English fallbacks.
Existing complete `UIMessages` catalogs remain valid because the added keys are
optional. `formatValue` overrides numeric formatting; supply callbacks from an
MFE client wrapper, rather than across an RSC boundary. Serializable data and
labels can be passed directly from Server Components.

Text and table layout inherit RTL; the numerical plot retains LTR axes. The
responsive SVG uses a deterministic viewBox and requires no browser measurement.
Scoped `--ssd-chart-series-1` through `--ssd-chart-series-4` overrides customize
marks; defaults resolve to existing semantic action/success/warning/danger tokens.
Colors repeat for larger data sets; read the table for exact category identity.
Prefer small aggregated data sets: this component renders all marks and rows and
does not virtualize data or support zoom, brushing, selection, animation, or live
region announcements.

This catalogue does not cover every possible visualization. Hierarchical trees,
sunburst, stacked or multiple series, box/violin plots, candlesticks, geographic
maps, Sankey/chord/network diagrams, and 3D graphics require dedicated data and
interaction contracts. They are not approximated by unrelated variants here.

This is an additive API planned for the next minor release. Existing consumers
need no changes; opt in through the root export or `/data-chart` subpath. No npm
publication or deployment is part of this change.
