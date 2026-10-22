"use client";

import {
  useId,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { Button } from "../../atoms/button/index.js";
import { useControllableState } from "../../../hooks/use-controllable-state/index.js";
export interface SiteHeaderProps extends ComponentPropsWithRef<"header"> {
  brand: ReactNode;
  navigation: ReactNode;
  actions?: ReactNode;
  navigationLabel: string;
  openLabel: string;
  closeLabel: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: ((open: boolean) => void) | undefined;
}
/** Slot links may be framework links. Place callback adapters inside an MFE client boundary. */
export function SiteHeader({
  brand,
  navigation,
  actions,
  navigationLabel,
  openLabel,
  closeLabel,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: SiteHeaderProps) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onValueChange: onOpenChange,
  });
  return (
    // Escape bubbles from native controls; this landmark itself is not a widget.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <header
      {...props}
      className={["ssd-site-header", className].filter(Boolean).join(" ")}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (!event.defaultPrevented && event.key === "Escape" && expanded) {
          setExpanded(false);
          trigger.current?.focus();
        }
      }}
    >
      <div className="ssd-site-header__inner">
        {brand}
        <div className="ssd-site-header__actions">{actions}</div>
        <Button
          ref={trigger}
          variant="secondary"
          className="ssd-site-header__toggle"
          aria-label={expanded ? closeLabel : openLabel}
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? closeLabel : openLabel}
        </Button>
        {/* Native anchors emit click for both keyboard and pointer activation. This only observes them. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <nav
          id={id}
          className="ssd-site-header__navigation"
          aria-label={navigationLabel}
          data-open={expanded}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a[href]"))
              setExpanded(false);
          }}
        >
          {navigation}
        </nav>
      </div>
    </header>
  );
}
