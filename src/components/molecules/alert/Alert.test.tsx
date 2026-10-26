import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Alert } from './Alert.js';
it('uses polite status by default and assertive alerts only explicitly', () => { const { rerender } = render(<Alert title='Saved'>Your draft is ready.</Alert>); expect(screen.getByRole('status')).toHaveTextContent('Saved'); rerender(<Alert title='Failed' urgency='assertive' tone='danger'>Try again.</Alert>); expect(screen.getByRole('alert')).toHaveTextContent('Try again.'); });
