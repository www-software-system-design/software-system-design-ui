"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
export interface SiteFooterProps extends ComponentPropsWithRef<"footer"> {
  brand: ReactNode;
  navigation?: ReactNode;
  legal?: ReactNode;
  actions?: ReactNode;
}
export function SiteFooter({
  brand,
  navigation,
  legal,
  actions,
  className,
  children,
  ...props
}: SiteFooterProps) {
  return (
    <footer
      {...props}
      className={["ssd-site-footer", className].filter(Boolean).join(" ")}
    >
      <div className="ssd-site-footer__main">
        <div>{brand}</div>
        {navigation}
      </div>
      {children}
      <div className="ssd-site-footer__bottom">
        {legal}
        {actions}
      </div>
    </footer>
  );
}
