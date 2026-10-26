import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { PageNavigation } from './PageNavigation.js';
it('renders page links and marks only the selected destination', () => {
 render(<PageNavigation label='Initiatives' currentHref='/standards' items={[{ href: '/', label: 'Overview' }, { href: '/standards', label: 'Standards' }]} />);
 expect(screen.getByRole('navigation', { name: 'Initiatives' })).toBeVisible();
 expect(screen.getByRole('link', { name: 'Standards' })).toHaveAttribute('aria-current', 'page');
 expect(screen.getByRole('link', { name: 'Overview' })).not.toHaveAttribute('aria-current');
 expect(screen.queryByRole('tab')).not.toBeInTheDocument();
});
