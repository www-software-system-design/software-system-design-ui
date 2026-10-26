import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { NavigationDisclosure } from './NavigationDisclosure.js';

const meta = { title: 'Molecules/NavigationDisclosure', component: NavigationDisclosure, tags: ['autodocs'], args: { label: 'Product', children: <><a href='#overview'>Overview</a><a href='#plans'>Plans</a></> }, } satisfies Meta<typeof NavigationDisclosure>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({ canvasElement }) => { const c = within(canvasElement); await userEvent.click(c.getByRole('button', { name: 'Product' })); await expect(c.getByRole('link', { name: 'Plans' })).toBeVisible(); await userEvent.keyboard('{Escape}'); await expect(c.getByRole('button', { name: 'Product' })).toHaveFocus(); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };


