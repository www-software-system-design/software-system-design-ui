import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { expect, it } from 'vitest';
import { Link } from './Link.js';
it('preserves native navigation, rel and ref', () => { const ref = createRef<HTMLAnchorElement>(); render(<Link href='/docs' target='_blank' rel='author' ref={ref}>Docs</Link>); const link = screen.getByRole('link', { name: 'Docs' }); expect(link).toHaveAttribute('href', '/docs'); expect(link.getAttribute('rel')).toContain('noopener'); expect(link.getAttribute('rel')).toContain('author'); expect(ref.current).toBe(link); });
