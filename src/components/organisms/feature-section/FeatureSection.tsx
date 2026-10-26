'use client';
import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { SectionHeading } from '../../molecules/section-heading/index.js';
export interface FeatureSectionProps extends Omit<ComponentPropsWithRef<'section'>, 'title'> {
  title: ReactNode;
  eyebrow?: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  headingId?: string;
  description?: ReactNode;
  footer?: ReactNode;
}
export function FeatureSection({ title, eyebrow, headingLevel = 2, headingId, description, children, footer, className, ...props }: FeatureSectionProps) {
  const generated = useId();
  const id = headingId ?? 'ssd-feature-' + generated;
  return <section {...props} aria-labelledby={props['aria-labelledby'] ?? id} className={['ssd-feature-section', className].filter(Boolean).join(' ')}>
    <SectionHeading title={title} headingLevel={headingLevel} headingId={id} {...(eyebrow !== undefined ? { eyebrow } : {})} />
    {description && <div className='ssd-feature-section__description'>{description}</div>}
    <div className='ssd-feature-section__grid'>{children}</div>
    {footer && <div className='ssd-feature-section__footer'>{footer}</div>}
  </section>;
}
