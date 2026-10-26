import type { Meta, StoryObj } from '@storybook/react-vite';
import { RangeField } from './RangeField.js';
const meta = { title: 'Controls/Forms/RangeField', component: RangeField, tags: ['autodocs'], args: { label: 'Volume', min: 0, max: 10, step: 1, defaultValue: 4 } } satisfies Meta<typeof RangeField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { error: 'Review this field before continuing.' } };
