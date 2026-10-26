'use client';
import type { ComponentPropsWithRef } from 'react';
export interface AlertProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
    title: string;
    urgency?: 'polite' | 'assertive';
    tone?: 'info' | 'success' | 'warning' | 'danger';
}
export function Alert({ title, urgency = 'polite', tone = 'info', className, children, ...props }: AlertProps) {
    return <div {...props} role={urgency === 'assertive' ? 'alert' : 'status'} data-tone={tone} className={['ssd-alert', className].filter(Boolean).join(' ')}><strong>{title}</strong>{children && <div>{children}</div>}</div>;
}
