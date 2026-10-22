"use client";

import type { ComponentPropsWithRef } from "react";
export interface ThemeToggleProps
  extends Omit<ComponentPropsWithRef<"button">, "onClick" | "children"> {
  theme: "light" | "dark";
  label: string;
  onThemeChange: (theme: "light" | "dark") => void;
}
export function ThemeToggle({
  theme,
  label,
  onThemeChange,
  className,
  type = "button",
  ...props
}: ThemeToggleProps) {
  return (
    <button
      {...props}
      type={type}
      className={["ssd-theme-toggle", className].filter(Boolean).join(" ")}
      aria-label={label}
      title={label}
      onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </>
        ) : (
          <path d="M20.5 14.2A9 9 0 0 1 9.8 3.5 9 9 0 1 0 20.5 14.2Z" />
        )}
      </svg>
    </button>
  );
}
