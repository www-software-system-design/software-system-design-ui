"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
export interface ContentStateProps
  extends Omit<ComponentPropsWithRef<"div">, "title"> {
  status: "loading" | "error" | "empty";
  title: ReactNode;
  actions?: ReactNode;
}
export function ContentState({
  status,
  title,
  actions,
  children,
  className,
  ...props
}: ContentStateProps) {
  return (
    <div
      {...props}
      role="status"
      aria-busy={status === "loading"}
      className={["ssd-content-state", className].filter(Boolean).join(" ")}
      data-status={status}
    >
      <h3>{title}</h3>
      {children}
      {actions}
    </div>
  );
}
