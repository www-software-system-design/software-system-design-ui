import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Spinner } from './Spinner.js';
it('announces a supplied loading label', () => { render(<Spinner label='Chargement'/>); expect(screen.getByRole('status')).toHaveTextContent('Chargement'); });
