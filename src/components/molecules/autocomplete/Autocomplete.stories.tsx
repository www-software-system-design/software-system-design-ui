import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from './Autocomplete.js';
const meta = { title: 'Controls/Forms/Autocomplete', component: Autocomplete, tags: ['autodocs'], args: { label: 'City', description: 'Choose a suggestion or enter another city.', options: ['Kochi', 'Paris', 'Tokyo'] } } satisfies Meta<typeof Autocomplete>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { error: 'Review this field before continuing.' } };
