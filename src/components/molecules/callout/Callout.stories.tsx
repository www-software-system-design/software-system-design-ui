import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Callout } from './Callout.js';

const meta = { title: 'Molecules/Callout', component: Callout, tags: ['autodocs'], args: { title: 'Authority and limits', children: <p>Preserve evidence and request human review.</p> } } satisfies Meta<typeof Callout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({canvasElement}) => { const c = within(canvasElement); await expect(c.getByRole('complementary', {name:'Authority and limits'})).toBeVisible(); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
