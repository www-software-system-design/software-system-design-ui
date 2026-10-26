import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog.js';
it('provides a named dialog and consumer-owned dismissal', async () => { const change = vi.fn(); const show = vi.fn(function (this: HTMLDialogElement) { this.open = true; }); Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: show }); Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.open = false; } }); render(<Dialog open title='Confirm changes' closeLabel='Fermer' onOpenChange={change}>Details</Dialog>); expect(show).toHaveBeenCalled(); expect(screen.getByRole('dialog', { name: 'Confirm changes' })).toHaveTextContent('Details'); await userEvent.click(screen.getByRole('button', { name: 'Fermer' })); expect(change).toHaveBeenCalledWith(false); vi.restoreAllMocks(); });
