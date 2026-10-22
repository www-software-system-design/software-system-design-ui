"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
export interface StatisticProps extends ComponentPropsWithRef<"div"> {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
}
export function Statistic({
  label,
  value,
  description,
  className,
  ...props
}: StatisticProps) {
  const id = useId();
  return (
    <div
      {...props}
      role="group"
      aria-labelledby={id}
      className={["ssd-statistic", className].filter(Boolean).join(" ")}
    >
      <span id={id}>{label}</span>
      <strong>{value}</strong>
      {description && <p>{description}</p>}
    </div>
  );
}
