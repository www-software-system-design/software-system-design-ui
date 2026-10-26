import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { SelectField } from './SelectField.js';
it('supports native selection, disabled options and descriptions', async () => { render(<SelectField label='Region' description='Choose a region' defaultValue='eu'><option value='eu'>Europe</option><option value='in'>India</option><option disabled value='x'>Unavailable</option></SelectField>); const select = screen.getByRole('combobox', { name: 'Region' }); expect(select).toHaveAccessibleDescription('Choose a region'); await userEvent.selectOptions(select, 'in'); expect(select).toHaveValue('in'); });
it('supports multiple selection as a native listbox', async () => { render(<SelectField label='Languages' multiple defaultValue={['en']}><option value='en'>English</option><option value='fr'>French</option></SelectField>); await userEvent.selectOptions(screen.getByRole('listbox'), 'fr'); expect(screen.getByRole('listbox')).toHaveValue(['en', 'fr']); });
