"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { useControllableState } from "../../../hooks/use-controllable-state/index.js";
export interface DisclosureProps
  extends Omit<ComponentPropsWithRef<"details">, "onToggle" | "defaultOpen"> {
  summary: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: ((open: boolean) => void) | undefined;
}
/** Keep controlled/uncontrolled mode stable. Native details supplies keyboard semantics. */
export function Disclosure({
  summary,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: DisclosureProps) {
  const [expanded, setExpanded] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onValueChange: onOpenChange,
  });
  return (
    <details
      {...props}
      className={["ssd-disclosure", className].filter(Boolean).join(" ")}
      open={expanded}
      onToggle={(event) => {
        const next = event.currentTarget.open;
        setExpanded(next);
        if (open !== undefined) event.currentTarget.open = open;
      }}
    >
      <summary>{summary}</summary>
      {children}
    </details>
  );
}
