import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ProgressBar } from './ProgressBar.js';
it('supports determinate and indeterminate progress', () => { const { rerender } = render(<ProgressBar label='Upload' value={25} max={50}/>); expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute('value', '25'); rerender(<ProgressBar label='Upload'/>); expect(screen.getByRole('progressbar')).not.toHaveAttribute('value'); });
it('rejects an out-of-range value', () => { expect(() => render(<ProgressBar label='Bad' value={101}/>)).toThrow(RangeError); });
