'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
export interface PrincipleItem { id: string; title: ReactNode; description: ReactNode; }
export interface PrincipleListProps extends Omit<ComponentPropsWithRef<'ol'>, 'children' | 'aria-label'> {
  label: string;
  items: readonly PrincipleItem[];
}
export function PrincipleList({ label, items, className, ...props }: PrincipleListProps) {
  return <ol {...props} aria-label={label} className={['ssd-principle-list', className].filter(Boolean).join(' ')}>{items.map(item =>
    <li key={item.id}><div><strong>{item.title}</strong><div>{item.description}</div></div></li>
  )}</ol>;
}
