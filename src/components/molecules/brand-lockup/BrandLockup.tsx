'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
export interface BrandLockupProps extends Omit<ComponentPropsWithRef<'a'>, 'children' | 'aria-label'> {
  href: string;
  label: string;
  /** Decorative artwork: supply an image with empty alt or an aria-hidden SVG. */
  artwork: ReactNode;
  wordmark: ReactNode;
  variant?: 'header' | 'footer';
}
export function BrandLockup({ label, artwork, wordmark, variant = 'header', className, ...props }: BrandLockupProps) {
  return <a {...props} aria-label={label} data-variant={variant} className={['ssd-brand-lockup', className].filter(Boolean).join(' ')}>
    <span aria-hidden='true' className='ssd-brand-lockup__artwork'>{artwork}</span>
    <span aria-hidden='true' className='ssd-brand-lockup__wordmark'>{wordmark}</span>
  </a>;
}
