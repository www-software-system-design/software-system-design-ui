import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Breadcrumbs } from './Breadcrumbs.js';
it('marks the current page while preserving native links', () => { render(<Breadcrumbs label='Location' items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]}/>); expect(screen.getByRole('navigation', { name: 'Location' })).toBeVisible(); expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/'); expect(screen.getByText('Settings')).toHaveAttribute('aria-current', 'page'); });
