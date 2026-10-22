"use client";

import type { ComponentPropsWithRef } from "react";
export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}
export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={["ssd-badge", className].filter(Boolean).join(" ")}
      data-tone={tone}
    />
  );
}
