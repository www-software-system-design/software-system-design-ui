import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Meter } from './Meter.js';
it('preserves a named bounded measurement', () => { render(<Meter label='Storage' value={30} min={10} max={50}/>); const meter = screen.getByRole('meter', { name: 'Storage' }); expect(meter).toHaveAttribute('value', '30'); expect(meter).toHaveAttribute('min', '10'); });
it('rejects invalid bounds', () => { expect(() => render(<Meter label='Bad' value={30} min={50} max={10}/>)).toThrow(RangeError); });
