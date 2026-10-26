'use client';
import type { ComponentPropsWithRef } from 'react';
export interface SkeletonProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    lines?: number;
}
export function Skeleton({ lines = 1, className, ...props }: SkeletonProps) {
    if (!Number.isSafeInteger(lines) || lines < 1 || lines > 12)
        throw new RangeError('Skeleton supports one to twelve lines.');
    return <div {...props} aria-hidden='true' className={['ssd-skeleton', className].filter(Boolean).join(' ')}>{Array.from({ length: lines }, (_, i) => <span key={i}/>)}</div>;
}
