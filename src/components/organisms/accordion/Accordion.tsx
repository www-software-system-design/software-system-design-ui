'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Disclosure } from '../../molecules/disclosure/index.js';
export interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
    defaultOpen?: boolean;
}
export interface AccordionProps extends Omit<ComponentPropsWithRef<'section'>, 'children'> {
    label: string;
    items: readonly AccordionItem[];
}
export function Accordion({ label, items, className, ...props }: AccordionProps) {
    return <section {...props} aria-label={label} className={['ssd-accordion', className].filter(Boolean).join(' ')}>{items.map(item => <Disclosure key={item.id} summary={item.title} defaultOpen={item.defaultOpen ?? false}>{item.content}</Disclosure>)}</section>;
}
