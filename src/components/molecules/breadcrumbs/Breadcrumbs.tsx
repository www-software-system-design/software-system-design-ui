'use client';
import type { ComponentPropsWithRef } from 'react';
import { Link } from '../../atoms/link/index.js';
export interface BreadcrumbItem {
    label: string;
    href?: string;
}
export interface BreadcrumbsProps extends Omit<ComponentPropsWithRef<'nav'>, 'children'> {
    label: string;
    items: readonly BreadcrumbItem[];
}
export function Breadcrumbs({ label, items, className, ...props }: BreadcrumbsProps) {
    return <nav {...props} aria-label={label} className={['ssd-breadcrumbs', className].filter(Boolean).join(' ')}><ol>{items.map((item, i) => <li key={i}>{i > 0 && <span aria-hidden='true'>/</span>}{item.href ? <Link href={item.href} aria-current={i === items.length - 1 ? 'page' : undefined}>{item.label}</Link> : <span aria-current={i === items.length - 1 ? 'page' : undefined}>{item.label}</span>}</li>)}</ol></nav>;
}
