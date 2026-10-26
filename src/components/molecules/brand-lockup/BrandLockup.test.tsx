import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { BrandLockup } from './BrandLockup.js';
it('renders a named native link with consumer artwork and wordmark', () => {
 render(<BrandLockup href='/home' label='Example home' artwork={<svg data-testid='art' />} wordmark='Example Studio' />);
 expect(screen.getByRole('link', { name: 'Example home' })).toHaveAttribute('href', '/home');
 expect(screen.getByTestId('art').parentElement).toHaveAttribute('aria-hidden', 'true');
 expect(screen.getByText('Example Studio')).toBeVisible();
});
