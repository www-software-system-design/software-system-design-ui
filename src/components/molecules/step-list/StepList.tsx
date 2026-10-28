'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
export interface StepItem { id: string; title: ReactNode; description: ReactNode; }
export interface StepListProps extends Omit<ComponentPropsWithRef<'ol'>, 'children' | 'aria-label'> {
  label: string;
  items: readonly StepItem[];
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}
export function StepList({ label, items, headingLevel = 3, className, ...props }: StepListProps) {
  const Heading = `h${headingLevel}` as const;
  return <ol {...props} aria-label={label} className={['ssd-step-list', className].filter(Boolean).join(' ')}>
    {items.map(item => <li key={item.id}><Heading>{item.title}</Heading><div>{item.description}</div></li>)}
  </ol>;
}
