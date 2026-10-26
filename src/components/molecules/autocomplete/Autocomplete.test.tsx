import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Autocomplete } from './Autocomplete.js';
it('associates a native suggestion list while permitting free text', async () => { render(<Autocomplete label='City' options={['Paris', 'Kochi']}/>); const input = screen.getByRole('combobox', { name: 'City' }); const list = document.getElementById(input.getAttribute('list')!); expect(list?.querySelectorAll('option')).toHaveLength(2); await userEvent.type(input, 'Tokyo'); expect(input).toHaveValue('Tokyo'); });
