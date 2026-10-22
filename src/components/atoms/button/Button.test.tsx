import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button.js';
import { UIProvider } from '../../../providers/UIProvider.js';

describe('Button', () => {
  it('uses native button semantics and activates from the keyboard', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('type', 'button');
    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not activate when disabled', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('blocks repeated activation while loading and supplies an English fallback', async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Loading' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('prefers explicit loading labels over scoped translations', () => {
    render(<UIProvider messages={{ loading: 'Chargement' }}><Button loading loadingLabel="Saving">Save</Button></UIProvider>);
    expect(screen.getByRole('button', { name: 'Saving' })).toBeInTheDocument();
  });

  it('supports scoped translations and locale changes without remounting', () => {
    const { rerender } = render(<UIProvider locale="fr" messages={{ loading: 'Chargement' }}><Button loading>Save</Button></UIProvider>);
    expect(screen.getByRole('button', { name: 'Chargement' })).toBeInTheDocument();
    rerender(<UIProvider locale="ml" direction="ltr" messages={{ loading: 'ലോഡ് ചെയ്യുന്നു' }}><Button loading>Save</Button></UIProvider>);
    expect(screen.getByRole('button', { name: 'ലോഡ് ചെയ്യുന്നു' })).toBeInTheDocument();
  });

  it('forwards native props and the DOM ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button type="submit" ref={ref} aria-label="Submit form">Save</Button>);
    expect(ref.current).toBe(screen.getByRole('button', { name: 'Submit form' }));
    expect(ref.current).toHaveAttribute('type', 'submit');
  });
});
