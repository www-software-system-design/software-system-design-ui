import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Skeleton } from './Skeleton.js';
it('is decorative and cannot add repeated loading announcements', () => { const { container } = render(<Skeleton lines={3}/>); expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true'); expect(screen.queryByRole('status')).not.toBeInTheDocument(); });
