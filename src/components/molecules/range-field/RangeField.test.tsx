import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { RangeField } from './RangeField.js';
it('preserves named native range bounds and value changes', () => { const change = vi.fn(); render(<RangeField label='Volume' min={0} max={10} step={2} defaultValue={4} onChange={change}/>); const input = screen.getByRole('slider', { name: 'Volume' }); fireEvent.change(input, { target: { value: '8' } }); expect(input).toHaveValue('8'); expect(change).toHaveBeenCalledOnce(); expect(input).toHaveAttribute('step', '2'); });
