import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleButton } from './ToggleButton.js';
const meta = { title: 'Controls/Actions/ToggleButton', component: ToggleButton, tags: ['autodocs'], args: { children: 'Bold' } } satisfies Meta<typeof ToggleButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
