import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ToggleButton } from './ToggleButton.js';
it('supports uncontrolled and controlled pressed state', async () => { const change = vi.fn(); const { rerender } = render(<ToggleButton onPressedChange={change}>Bold</ToggleButton>); await userEvent.click(screen.getByRole('button', { name: 'Bold' })); expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true'); expect(change).toHaveBeenCalledWith(true); rerender(<ToggleButton pressed={false} onPressedChange={change}>Bold</ToggleButton>); await userEvent.click(screen.getByRole('button')); expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false'); });
