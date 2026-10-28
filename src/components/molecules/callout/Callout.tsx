'use client';

import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
export interface CalloutProps extends Omit<ComponentPropsWithRef<'aside'>, 'title'> {
  title: ReactNode;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  headingId?: string;
}
export function Callout({ title, headingLevel = 3, headingId, children, className, ...props }: CalloutProps) {
  const generated = useId();
  const id = headingId ?? 'ssd-callout-' + generated;
  const Heading = `h${headingLevel}` as const;
  return <aside {...props} aria-labelledby={props['aria-labelledby'] ?? id} className={['ssd-callout', className].filter(Boolean).join(' ')}>
    <Heading id={id}>{title}</Heading>{children}
  </aside>;
}
