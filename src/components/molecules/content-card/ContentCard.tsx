"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
export interface ContentCardProps
  extends Omit<ComponentPropsWithRef<"article">, "title"> {
  title: ReactNode;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  headingId?: string;
  header?: ReactNode;
  footer?: ReactNode;
}
export function ContentCard({
  title,
  headingLevel = 3,
  headingId,
  header,
  footer,
  children,
  className,
  ...props
}: ContentCardProps) {
  const generated = useId();
  const id = headingId ?? "ssd-card-" + generated;
  const Heading = ("h" + headingLevel) as "h3";
  return (
    <article
      {...props}
      aria-labelledby={props["aria-labelledby"] ?? id}
      className={["ssd-content-card", className].filter(Boolean).join(" ")}
    >
      {header}
      <Heading id={id}>{title}</Heading>
      {children}
      {footer && <div className="ssd-content-card__footer">{footer}</div>}
    </article>
  );
}
