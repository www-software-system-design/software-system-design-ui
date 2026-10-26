import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip.js';
const meta = { title: 'Controls/Overlays/Tooltip', component: Tooltip, tags: ['autodocs'], args: { content: 'Additional information', children: <button type='button'>Help</button> } } satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
