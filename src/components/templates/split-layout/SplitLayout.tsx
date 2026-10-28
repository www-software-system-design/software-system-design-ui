'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
export interface SplitLayoutProps extends ComponentPropsWithRef<'div'> {
  secondary: ReactNode;
}
export function SplitLayout({ secondary, children, className, ...props }: SplitLayoutProps) {
  return <div {...props} className={['ssd-split-layout', className].filter(Boolean).join(' ')}>
    <div className="ssd-split-layout__columns"><div className="ssd-split-layout__primary">{children}</div>
    <div className="ssd-split-layout__secondary">{secondary}</div></div>
  </div>;
}
