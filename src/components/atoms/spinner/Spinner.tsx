'use client';
import type { ComponentPropsWithRef } from 'react';
import { useUI } from '../../../providers/index.js';
export interface SpinnerProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
    label?: string;
}
export function Spinner({ label, className, ...props }: SpinnerProps) {
    const { messages } = useUI();
    return <span {...props} role='status' className={['ssd-spinner', className].filter(Boolean).join(' ')}><span className='ssd-spinner__indicator' aria-hidden='true'/><span>{label ?? messages.loading}</span></span>;
}
