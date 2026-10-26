import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { RadioButton } from './RadioButton.js';
it('uses native named exclusivity', async () => { render(<><RadioButton label='Small' name='size' value='s'/><RadioButton label='Large' name='size' value='l'/></>); await userEvent.click(screen.getByRole('radio', { name: 'Small' })); await userEvent.click(screen.getByRole('radio', { name: 'Large' })); expect(screen.getByRole('radio', { name: 'Small' })).not.toBeChecked(); expect(screen.getByRole('radio', { name: 'Large' })).toBeChecked(); });
