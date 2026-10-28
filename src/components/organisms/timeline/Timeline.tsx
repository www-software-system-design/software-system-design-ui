'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Badge } from '../../atoms/badge/index.js';
export interface TimelineItem { id: string; title: ReactNode; description: ReactNode; phase?: ReactNode; status?: ReactNode; }
export interface TimelineProps extends Omit<ComponentPropsWithRef<'ol'>, 'children' | 'aria-label'> {
  label: string;
  items: readonly TimelineItem[];
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}
export function Timeline({ label, items, headingLevel = 3, className, ...props }: TimelineProps) {
  const Heading = `h${headingLevel}` as const;
  return <ol {...props} aria-label={label} className={['ssd-timeline', className].filter(Boolean).join(' ')}>
    {items.map(item => <li key={item.id}>
      <div className="ssd-timeline__metadata">{item.phase !== undefined && <span>{item.phase}</span>}{item.status !== undefined && <Badge>{item.status}</Badge>}</div>
      <div className="ssd-timeline__content"><Heading>{item.title}</Heading><div>{item.description}</div></div>
    </li>)}
  </ol>;
}
