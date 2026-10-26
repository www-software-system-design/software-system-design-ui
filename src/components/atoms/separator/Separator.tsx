'use client';
import type { ComponentPropsWithRef } from 'react';
export interface SeparatorProps extends ComponentPropsWithRef<'hr'> {
    orientation?: 'horizontal' | 'vertical';
}
export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
    return <hr {...props} aria-orientation={orientation} className={['ssd-separator', className].filter(Boolean).join(' ')}/>;
}
