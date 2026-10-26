import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton.js';
const meta = { title: 'Controls/Feedback/Skeleton', component: Skeleton, tags: ['autodocs'], args: { lines: 3 } } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
