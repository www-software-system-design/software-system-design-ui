'use client';
import type { ComponentPropsWithRef } from 'react';
export interface LinkProps extends ComponentPropsWithRef<'a'> {
    href: string;
}
export function Link({ className, rel, target, children, ...props }: LinkProps) {
    return <a {...props} target={target} rel={target === '_blank' ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ') : rel} className={['ssd-link', className].filter(Boolean).join(' ')}>{children}</a>;
}
