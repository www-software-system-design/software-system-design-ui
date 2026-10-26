import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar.js';
const meta = { title: 'Controls/Content/Avatar', component: Avatar, tags: ['autodocs'], args: { name: 'Ada Lovelace', fallback: 'AL' } } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
