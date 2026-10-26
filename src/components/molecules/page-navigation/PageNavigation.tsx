'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Link } from '../../atoms/link/index.js';
export interface PageNavigationItem { href: string; label: ReactNode; }
export interface PageNavigationProps extends Omit<ComponentPropsWithRef<'nav'>, 'children' | 'aria-label'> {
  label: string;
  items: readonly PageNavigationItem[];
  currentHref?: string;
}
export function PageNavigation({ label, items, currentHref, className, ...props }: PageNavigationProps) {
  return <nav {...props} aria-label={label} className={['ssd-page-navigation', className].filter(Boolean).join(' ')}>
    <ul>{items.map(item => <li key={item.href}><Link href={item.href} aria-current={item.href === currentHref ? 'page' : undefined}>{item.label}</Link></li>)}</ul>
  </nav>;
}
