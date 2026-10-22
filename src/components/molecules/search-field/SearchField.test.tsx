import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchField } from './SearchField.js';
import { UIProvider } from '../../../providers/UIProvider.js';
import { getMessages } from '../../../i18n/index.js';

describe('SearchField', () => {
  it('associates visible labels and descriptions with independently identified inputs', () => {
    render(<><SearchField label="First search" description="Search by name" /><SearchField label="Second search" /></>);
    const first = screen.getByRole('searchbox', { name: 'First search' });
    const second = screen.getByRole('searchbox', { name: 'Second search' });
    expect(first.id).not.toBe('');
    expect(first.id).not.toBe(second.id);
    expect(first).toHaveAccessibleDescription('Search by name');
  });

  it('updates uncontrolled input and clears from the keyboard while returning focus', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<SearchField label="Search" defaultValue="Old" onValueChange={onValueChange} />);
    const input = screen.getByRole('searchbox');
    await user.click(input);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Clear search' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('');
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('lets the consumer own controlled values and changes', async () => {
    const onValueChange = vi.fn();
    const { rerender } = render(<SearchField label="Search" value="A" onValueChange={onValueChange} />);
    await userEvent.type(screen.getByRole('searchbox'), 'B');
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('AB');
    expect(screen.getByRole('searchbox')).toHaveValue('A');
    rerender(<SearchField label="Search" value="AB" onValueChange={onValueChange} />);
    expect(screen.getByRole('searchbox')).toHaveValue('AB');
  });

  it('exposes validation text alongside hints and clears invalid state when corrected', () => {
    const { rerender } = render(<SearchField id="catalog-search" label="Search" description="Use a name" error="Query is too long" required />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('id', 'catalog-search');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Use a name Query is too long');
    expect(input).toBeRequired();
    rerender(<SearchField id="catalog-search" label="Search" description="Use a name" />);
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Use a name');
  });

  it('localizes Malayalam clear labels and respects explicit overrides', () => {
    const { rerender } = render(<UIProvider locale="ml" direction="ltr" messages={getMessages('ml')}><SearchField label="തിരയുക" defaultValue="A" /></UIProvider>);
    expect(screen.getByRole('button', { name: 'തിരയൽ മായ്ക്കുക' })).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toHaveAttribute('dir', 'auto');
    rerender(<UIProvider locale="ml" direction="ltr" messages={getMessages('ml')}><SearchField label="തിരയുക" defaultValue="A" clearLabel="Reset query" /></UIProvider>);
    expect(screen.getByRole('button', { name: 'Reset query' })).toBeInTheDocument();
  });

  it.each([{ disabled: true }, { readOnly: true }])('prevents mutation when %o', async (state) => {
    const onValueChange = vi.fn();
    render(<SearchField label="Search" defaultValue="Fixed" onValueChange={onValueChange} {...state} />);
    await userEvent.type(screen.getByRole('searchbox'), 'No');
    expect(screen.getByRole('searchbox')).toHaveValue('Fixed');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
