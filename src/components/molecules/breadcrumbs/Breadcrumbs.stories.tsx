import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs.js';
const meta = { title: 'Controls/Navigation/Breadcrumbs', component: Breadcrumbs, tags: ['autodocs'], args: { label: 'Breadcrumb', items: [{ label: 'Home', href: '#home' }, { label: 'Projects', href: '#projects' }, { label: 'Settings' }] } } satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
