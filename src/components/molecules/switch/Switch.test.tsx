import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch.js';
it('is named, keyboard operable and submits a native value', async () => { render(<Switch label='Notifications' name='notify'/>); const control = screen.getByRole('switch', { name: 'Notifications' }); control.focus(); await userEvent.keyboard(' '); expect(control).toBeChecked(); });
