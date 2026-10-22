"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
export interface MarketingLayoutProps extends ComponentPropsWithRef<"div"> {
  header: ReactNode;
  footer: ReactNode;
  mainId?: string;
}
export function MarketingLayout({
  header,
  footer,
  children,
  mainId,
  className,
  ...props
}: MarketingLayoutProps) {
  return (
    <div
      {...props}
      className={["ssd-marketing-layout", className].filter(Boolean).join(" ")}
    >
      {header}
      <main id={mainId}>{children}</main>
      {footer}
    </div>
  );
}
