import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { PageNavigation } from './PageNavigation.js';

const meta = { title: 'Molecules/PageNavigation', component: PageNavigation, tags: ['autodocs'], args: { label: 'Initiative pages', currentHref: '#standards', items: [{ href: '#overview', label: 'Product overview' }, { href: '#people', label: 'People and agents' }, { href: '#standards', label: 'Open standards' }] }, } satisfies Meta<typeof PageNavigation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({ canvasElement }) => { const c = within(canvasElement); await expect(c.getByRole('link', { name: 'Open standards' })).toHaveAttribute('aria-current', 'page'); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };


