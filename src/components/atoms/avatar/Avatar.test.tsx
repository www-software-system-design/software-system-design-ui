import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Avatar } from './Avatar.js';
it('has a localizable name and falls back after an image error', () => { render(<Avatar name='Ada Lovelace' src='/missing.png' fallback='AL'/>); fireEvent.error(screen.getByRole('img', { name: 'Ada Lovelace' })); expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL'); });
