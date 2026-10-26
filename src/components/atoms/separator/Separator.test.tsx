import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Separator } from './Separator.js';
it('exposes orientation without adding a focus stop', () => { render(<Separator orientation='vertical'/>); expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical'); expect(screen.getByRole('separator')).not.toHaveAttribute('tabindex'); });
