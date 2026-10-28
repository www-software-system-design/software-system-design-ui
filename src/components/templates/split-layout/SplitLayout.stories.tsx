import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SplitLayout } from './SplitLayout.js';
import { Callout } from '../../molecules/callout/index.js';
const meta = { title: 'Templates/SplitLayout', component: SplitLayout, tags: ['autodocs'], args: { children: <div><h2>Context</h2><p>Content remains in reading order.</p></div>, secondary: <Callout title='Review guidance'><p>Inspect the evidence.</p></Callout> } } satisfies Meta<typeof SplitLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({canvasElement}) => { const c = within(canvasElement); await expect(c.getByRole('heading', {name:'Context'})).toBeVisible(); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
