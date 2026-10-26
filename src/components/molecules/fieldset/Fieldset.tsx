'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
export interface FieldsetProps extends ComponentPropsWithRef<'fieldset'> {
    legend: ReactNode;
}
export function Fieldset({ legend, children, className, ...props }: FieldsetProps) {
    return <fieldset {...props} className={['ssd-fieldset', className].filter(Boolean).join(' ')}><legend>{legend}</legend>{children}</fieldset>;
}
