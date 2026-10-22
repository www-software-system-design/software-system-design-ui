import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TextInput } from './TextInput.js';

describe('TextInput', () => {
  it('provides native text input semantics and forwards ref, name, and required', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<TextInput aria-label="Name" name="name" required ref={ref} />);
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('type', 'text');
    expect(ref.current).toHaveAttribute('name', 'name');
    expect(ref.current).toBeRequired();
  });

  it('supports controlled values and native change events', async () => {
    const onChange = vi.fn();
    const { rerender } = render(<TextInput aria-label="Name" value="A" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'B');
    expect(onChange).toHaveBeenCalledOnce();
    expect(screen.getByRole('textbox')).toHaveValue('A');
    rerender(<TextInput aria-label="Name" value="AB" onChange={onChange} />);
    expect(screen.getByRole('textbox')).toHaveValue('AB');
  });

  it('preserves disabled, read-only, and invalid accessibility states', async () => {
    render(<><TextInput aria-label="Disabled" disabled /><TextInput aria-label="Read only" readOnly defaultValue="Fixed" aria-invalid="true" /></>);
    await userEvent.type(screen.getByRole('textbox', { name: 'Disabled' }), 'No');
    await userEvent.type(screen.getByRole('textbox', { name: 'Read only' }), 'No');
    expect(screen.getByRole('textbox', { name: 'Disabled' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Read only' })).toHaveValue('Fixed');
    expect(screen.getByRole('textbox', { name: 'Read only' })).toHaveAttribute('aria-invalid', 'true');
  });
});
