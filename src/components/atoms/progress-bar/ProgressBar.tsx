'use client';
import type { ComponentPropsWithRef } from 'react';
export interface ProgressBarProps extends Omit<ComponentPropsWithRef<'progress'>, 'value' | 'max' | 'children'> {
    label: string;
    value?: number;
    max?: number;
}
export function ProgressBar({ label, value, max = 100, className, ...props }: ProgressBarProps) {
    if (!Number.isFinite(max) || max <= 0 || (value !== undefined && (!Number.isFinite(value) || value < 0 || value > max)))
        throw new RangeError('Progress requires a positive maximum and an optional value within its bounds.');
    return <progress {...props} aria-label={label} value={value} max={max} className={['ssd-progress', className].filter(Boolean).join(' ')}/>;
}
