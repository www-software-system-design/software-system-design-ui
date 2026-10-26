import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar } from './Toolbar.js';
const meta = { title: 'Controls/Actions/Toolbar', component: Toolbar, tags: ['autodocs'], args: { label: 'Text formatting', children: <><button type='button'>Bold</button><button type='button'>Italic</button><button type='button' disabled>Underline</button></> } } satisfies Meta<typeof Toolbar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Vertical: Story = { args: { orientation: 'vertical' } };
