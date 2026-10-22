'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';

type SidebarSlot = { sidebar: ReactNode; sidebarLabel: string } | { sidebar?: never; sidebarLabel?: never };

export type ExplorerLayoutProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & SidebarSlot & {
  header: ReactNode;
  contentLabel: string;
  children: ReactNode;
  toolbar?: ReactNode;
  footer?: ReactNode;
};

/** Layout slots only. The host owns page landmarks, application state, and routing. */
export function ExplorerLayout({ header, toolbar, sidebar, sidebarLabel, contentLabel, children, footer, className, ...props }: ExplorerLayoutProps) {
  const hasSidebar = sidebar !== undefined && sidebar !== null;
  return (
    <div {...props} className={['ssd-explorer-layout', className].filter(Boolean).join(' ')}>
      <div className="ssd-explorer-layout__header">{header}</div>
      {toolbar != null && <div className="ssd-explorer-layout__toolbar">{toolbar}</div>}
      <div className="ssd-explorer-layout__body" data-sidebar={hasSidebar || undefined}>
        {hasSidebar && <aside className="ssd-explorer-layout__sidebar" aria-label={sidebarLabel}>{sidebar}</aside>}
        <section className="ssd-explorer-layout__content" aria-label={contentLabel}>{children}</section>
      </div>
      {footer != null && <div className="ssd-explorer-layout__footer">{footer}</div>}
    </div>
  );
}
