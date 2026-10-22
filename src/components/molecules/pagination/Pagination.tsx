"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { Button } from "../../atoms/button/index.js";
export interface PaginationProps extends ComponentPropsWithRef<"nav"> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  label: string;
  previousLabel: string;
  nextLabel: string;
  pageLabel: ReactNode;
}
/** Zero-based page. The application owns filtering, totals, fetching and page resets. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  label,
  previousLabel,
  nextLabel,
  pageLabel,
  children,
  className,
  ...props
}: PaginationProps) {
  return (
    <nav
      {...props}
      aria-label={label}
      className={["ssd-pagination", className].filter(Boolean).join(" ")}
    >
      {children}
      <div className="ssd-pagination__controls">
        <Button
          variant="secondary"
          disabled={page <= 0 || pageCount === 0}
          onClick={() => onPageChange(page - 1)}
          aria-label={previousLabel}
        >
          ←
        </Button>
        <span aria-live="polite">{pageLabel}</span>
        <Button
          variant="secondary"
          disabled={pageCount === 0 || page + 1 >= pageCount}
          onClick={() => onPageChange(page + 1)}
          aria-label={nextLabel}
        >
          →
        </Button>
      </div>
    </nav>
  );
}
