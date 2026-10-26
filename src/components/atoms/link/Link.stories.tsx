import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link.js';
const meta = { title: 'Controls/Actions/Link', component: Link, tags: ['autodocs'], args: { href: '#reference', children: 'Read the reference' } } satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
