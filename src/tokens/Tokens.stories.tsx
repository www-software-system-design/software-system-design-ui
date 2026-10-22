import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { UIProvider } from '../providers/UIProvider.js';
import { Button } from '../components/atoms/button/index.js';

const colors = ['surface', 'surface-subtle', 'text', 'muted', 'danger', 'action', 'on-action', 'border', 'focus'] as const;
const meta = {
  title: 'Foundations/Tokens',
  parameters: { docs: { description: { component: 'Semantic --ssd-* CSS properties are the public styling contract. These swatches use the actual stylesheet rather than copied color values. Light/dark palettes have independent AA contrast tests for active text, errors, controls, and focus. Disabled states are not counted as active text. Override tokens at a DOM scope; never target private component selectors.' } } }
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => <div><h2>Semantic colors</h2><div className="ssd-example-grid">{colors.map((name) => <div key={name}>
    <div className="ssd-example-swatch" style={{ background: `var(--ssd-color-${name})` }} aria-hidden="true" />
    <p className="ssd-example-token"><code>{`--ssd-color-${name}`}</code></p>
  </div>)}</div><h2>Spacing and shape</h2><p>Spacing: --ssd-space-1 through --ssd-space-4, --ssd-space-6, --ssd-space-8. Shape: --ssd-radius-control and --ssd-radius-panel.</p></div>
};
export const DarkPalette: Story = { ...Palette, globals: { theme: 'dark' } };
export const ScopedOverride: Story = {
  render: () => <UIProvider style={{ '--ssd-color-action': '#6941c6', '--ssd-color-on-action': '#ffffff' } as CSSProperties}><Button>Custom action token</Button></UIProvider>
};
