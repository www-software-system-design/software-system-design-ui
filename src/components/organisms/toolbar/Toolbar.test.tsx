import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Toolbar } from './Toolbar.js';
it('makes a pointer-focused button the next keyboard entry point', async () => {
    render(<Toolbar label="Actions"><button>First</button><button>Second</button></Toolbar>);
    await userEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('tabindex', '-1');
});
it('moves focus among enabled buttons without activating them', async () => { const click = vi.fn(); render(<Toolbar label='Formatting'><button onClick={click}>Bold</button><button disabled>Disabled</button><button>Italic</button></Toolbar>); screen.getByRole('button', { name: 'Bold' }).focus(); await userEvent.keyboard('{ArrowRight}'); expect(screen.getByRole('button', { name: 'Italic' })).toHaveFocus(); expect(click).not.toHaveBeenCalled(); });
