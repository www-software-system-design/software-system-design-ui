"use client";

import type { ComponentPropsWithRef } from "react";
export type TextAreaProps = ComponentPropsWithRef<"textarea">;
export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={["ssd-text-input", "ssd-text-area", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
