'use client';
import { useState, type ComponentPropsWithRef } from 'react';
export interface AvatarProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
    name: string;
    src?: string;
    fallback?: string;
}
export function Avatar({ name, src, fallback, className, ...props }: AvatarProps) {
    const [failed, setFailed] = useState<string>();
    const initials = fallback ?? name.trim().split(/\s+/).slice(0, 2).map(word => Array.from(word)[0]).join('');
    return <span {...props} className={['ssd-avatar', className].filter(Boolean).join(' ')}>{src && failed !== src ? <img src={src} alt={name} onError={() => setFailed(src)}/> : <span role='img' aria-label={name}>{initials}</span>}</span>;
}
