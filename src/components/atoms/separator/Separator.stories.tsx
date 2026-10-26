import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator.js';
const meta = { title: 'Controls/Content/Separator', component: Separator, tags: ['autodocs'], args: {} } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
