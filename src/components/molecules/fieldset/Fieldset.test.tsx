import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Fieldset } from './Fieldset.js';
it('names a native disabled form group', () => { render(<Fieldset legend='Contact preferences' disabled><input aria-label='Email'/></Fieldset>); expect(screen.getByRole('group', { name: 'Contact preferences' })).toBeDisabled(); expect(screen.getByRole('textbox')).toBeDisabled(); });
