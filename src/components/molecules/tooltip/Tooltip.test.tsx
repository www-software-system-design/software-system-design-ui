import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip.js';
it('opens on keyboard focus, dismisses with Escape and preserves trigger description', async () => { render(<><p id='hint'>Existing hint</p><Tooltip content='Additional help'><button aria-describedby='hint'>Help</button></Tooltip></>); const trigger = screen.getByRole('button'); await userEvent.tab(); expect(screen.getByRole('tooltip')).toBeVisible(); expect(trigger).toHaveAccessibleDescription('Existing hint Additional help'); await userEvent.keyboard('{Escape}'); expect(screen.queryByRole('tooltip')).not.toBeInTheDocument(); });
