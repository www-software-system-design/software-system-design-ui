"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
export interface DataTableProps extends ComponentPropsWithRef<"div"> {
  label: string;
  caption: ReactNode;
  tableClassName?: string;
  emptyState?: ReactNode;
}
/** Native table children keep arbitrary schemas, row headers and caller-owned sorting. */
export function DataTable({
  label,
  caption,
  tableClassName,
  emptyState,
  className,
  children,
  ...props
}: DataTableProps) {
  return (
    // Focus permits keyboard users to scroll horizontally through off-screen columns.
    <div
      {...props}
      role="region"
      aria-label={label}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Keyboard access to horizontal scrolling.
      tabIndex={0}
      className={["ssd-data-table", className].filter(Boolean).join(" ")}
    >
      <table className={tableClassName}>
        <caption className="ssd-visually-hidden">{caption}</caption>
        {children}
      </table>
      {emptyState}
    </div>
  );
}
