import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SearchField, type SearchFieldProps } from './SearchField.js';

const meta = {
  id: 'molecules-search-field', title: 'Molecules/SearchField', component: SearchField, tags: ['autodocs'],
  args: { label: 'Search components', description: 'Search by component name.', onValueChange: fn() },
  parameters: { docs: { description: { component: 'Composes TextInput, Button, and useControllableState. Always supplies a visible label and stable SSR-safe IDs. Hints/errors use aria-describedby. Clear returns focus to the input. value/onValueChange is controlled; defaultValue initializes isolated internal state. Keep mode stable. id addresses the input; ref addresses the wrapper. Clear labels use explicit prop, scoped messages, then English.' } } }
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;

function ControlledExample(args: SearchFieldProps) {
  const [value, setValue] = useState(args.value ?? '');
  return <SearchField {...args} value={value} onValueChange={(next) => { setValue(next); args.onValueChange?.(next); }} />;
}

export const Uncontrolled: Story = {};
export const Controlled: Story = {
  args: { value: 'Button' },
  // Changing the initial value in Controls starts a new consumer demonstration.
  render: (args) => <ControlledExample key={args.value} {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByRole('searchbox')).toHaveValue('');
    await expect(canvas.getByRole('searchbox')).toHaveFocus();
    await expect(args.onValueChange).toHaveBeenLastCalledWith('');
  }
};
export const Invalid: Story = { args: { defaultValue: 'An overly broad query', error: 'Use a more specific component name.' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Button' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'Button' } };
export const LongLabels: Story = { args: { label: 'Durchsuchen Sie alle verfügbaren Komponenten der gemeinsamen Bibliothek', defaultValue: 'Button', clearLabel: 'Den gesamten Suchbegriff entfernen', description: 'Diese Beschriftungen demonstrieren längere Übersetzungen.' }, globals: { viewport: 'compact' } };
export const Malayalam: Story = { args: { label: 'ഘടകങ്ങൾ തിരയുക', description: 'ഘടകത്തിന്റെ പേര് ഉപയോഗിച്ച് തിരയുക', defaultValue: 'ബട്ടൺ' }, globals: { theme: 'dark', locale: 'ml', direction: 'ltr' } };
