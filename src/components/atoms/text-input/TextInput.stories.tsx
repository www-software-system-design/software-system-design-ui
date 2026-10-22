import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { TextInput } from './TextInput.js';

const meta = {
  id: 'atoms-text-input', title: 'Atoms/TextInput', component: TextInput, tags: ['autodocs'],
  args: { 'aria-label': 'Component name', placeholder: 'For example, Button' },
  render: (args) => <label className="ssd-field-label">{args['aria-label']}<TextInput {...args} /></label>,
  parameters: { docs: { description: { component: 'Native text input with React 19 ref support and no owned application state. Supply a visible label and any hint/error associations; SearchField demonstrates that composition. Native input props remain available. Supports SSR and light/dark CSS tokens.' } } }
} satisfies Meta<typeof TextInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Component name' });
    await userEvent.type(input, 'Button');
    await expect(input).toHaveValue('Button');
  }
};
export const Required: Story = { args: { required: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Button' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'Button' } };
export const Dark: Story = { globals: { theme: 'dark' } };
export const Malayalam: Story = { args: { 'aria-label': 'ഘടകത്തിന്റെ പേര്', placeholder: 'ഉദാഹരണം: ബട്ടൺ' }, globals: { locale: 'ml', direction: 'ltr' } };
