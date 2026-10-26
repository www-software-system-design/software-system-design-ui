import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox.js';
it('associates label, description and error and supports mixed state', () => { render(<Checkbox label='Consent' description='Optional' error='Required' indeterminate/>); const input = screen.getByRole('checkbox', { name: 'Consent' }); expect(input).toHaveAccessibleDescription('Optional Required'); expect(input).toBePartiallyChecked(); expect(input).toHaveAttribute('aria-invalid', 'true'); });
it('participates in native form submission and reset', async () => { render(<form data-testid='form'><Checkbox label='Consent' name='consent' value='yes'/><button type='reset'>Reset</button></form>); await userEvent.click(screen.getByRole('checkbox')); expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('consent')).toBe('yes'); await userEvent.click(screen.getByRole('button')); expect(screen.getByRole('checkbox')).not.toBeChecked(); });
