import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NativeField } from './NativeField.js';
describe('NativeField', () => {
    it('preserves numeric constraints and labels browser-owned date controls', () => {
        render(<><NativeField type="number" label="Quantity" min={1} max={10} defaultValue={2} error="Review quantity"/><NativeField type="date" label="Start date"/></>);
        expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toHaveValue(2);
        expect(screen.getByRole('spinbutton')).toHaveAccessibleDescription('Review quantity');
        expect(screen.getByLabelText('Start date')).toHaveAttribute('type', 'date');
    });
});
