import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { BrandLockup } from './BrandLockup.js';

const meta = { title: 'Molecules/BrandLockup', component: BrandLockup, tags: ['autodocs'], args: { href: '#home', label: 'Example Studio home', artwork: <svg width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' rx='10' fill='currentColor'/></svg>, wordmark: <>Example<br/>Studio</> }, } satisfies Meta<typeof BrandLockup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({ canvasElement }) => { const c = within(canvasElement); await expect(c.getByRole('link', { name: 'Example Studio home' })).toHaveAttribute('href', '#home'); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const OfficialBrand: Story = {
  args: {
    href: 'https://software-system.design',
    label: 'Software-System.Design home',
    artwork: <img src='./software-system-design-logo.png' width={1254} height={1254} alt='' />,
    wordmark: <span style={{ display: 'grid', lineHeight: 1.1 }}><span>Software-</span><span>System.</span><span>Design</span></span>,
  },
};
export const OfficialFooter: Story = { ...OfficialBrand, args: { ...OfficialBrand.args, variant: 'footer' } };


