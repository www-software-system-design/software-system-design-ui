import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './RadioButton.js';
const meta = { title: 'Controls/Forms/RadioButton', component: RadioButton, tags: ['autodocs'], args: { label: 'Email notifications', name: 'channel', value: 'email' } } satisfies Meta<typeof RadioButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { error: 'Review this field before continuing.' } };
