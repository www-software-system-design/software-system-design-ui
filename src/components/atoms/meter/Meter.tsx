'use client';
import type { ComponentPropsWithRef } from 'react';
export interface MeterProps extends Omit<ComponentPropsWithRef<'meter'>, 'value' | 'min' | 'max' | 'low' | 'high' | 'optimum' | 'children'> {
    label: string;
    value: number;
    min?: number;
    max?: number;
    low?: number;
    high?: number;
    optimum?: number;
}
export function Meter({ label, value, min = 0, max = 100, low, high, optimum, className, ...props }: MeterProps) {
    if (![value, min, max].every(Number.isFinite) || min >= max || value < min || value > max || [low, high, optimum].some(v => v !== undefined && (!Number.isFinite(v) || v < min || v > max)) || (low !== undefined && high !== undefined && low > high))
        throw new RangeError('Meter values and thresholds must agree with finite ordered bounds.');
    return <meter {...props} aria-label={label} value={value} min={min} max={max} low={low} high={high} optimum={optimum} className={['ssd-meter', className].filter(Boolean).join(' ')}/>;
}
