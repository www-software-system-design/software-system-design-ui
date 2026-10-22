"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
export interface SectionHeadingProps
  extends Omit<ComponentPropsWithRef<"div">, "title"> {
  title: ReactNode;
  eyebrow?: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  headingId?: string;
}
export function SectionHeading({
  title,
  eyebrow,
  headingLevel = 2,
  headingId,
  children,
  className,
  ...props
}: SectionHeadingProps) {
  const Heading = ("h" + headingLevel) as "h2";
  return (
    <div
      {...props}
      className={["ssd-section-heading", className].filter(Boolean).join(" ")}
    >
      <div>
        {eyebrow && <p className="ssd-section-heading__eyebrow">{eyebrow}</p>}
        <Heading id={headingId}>{title}</Heading>
      </div>
      {children}
    </div>
  );
}
