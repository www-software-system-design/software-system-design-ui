'use client';
import { useEffect, useId, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button } from '../../atoms/button/index.js';
import { useControllableState } from '../../../hooks/use-controllable-state/index.js';
export interface NavigationDisclosureProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  label: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export function NavigationDisclosure({ label, children, open, defaultOpen = false, onOpenChange, className, onBlur, onKeyDown, ...props }: NavigationDisclosureProps) {
  const [expanded, setExpanded] = useControllableState({ value: open, defaultValue: defaultOpen, onValueChange: onOpenChange });
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!expanded) return;
    const owner = root.current?.ownerDocument;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setExpanded(false);
    }
    owner?.addEventListener('pointerdown', dismiss);
    return () => owner?.removeEventListener('pointerdown', dismiss);
  }, [expanded, setExpanded]);
  // Escape bubbles from native links; the wrapper is not itself an interactive widget.
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return <div {...props} ref={root} className={['ssd-navigation-disclosure', className].filter(Boolean).join(' ')}
    onBlur={event => { onBlur?.(event); if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}
    onKeyDown={event => { onKeyDown?.(event); if (!event.defaultPrevented && event.key === 'Escape' && expanded) { event.preventDefault(); event.stopPropagation(); setExpanded(false); trigger.current?.focus(); } }}>
    <Button ref={trigger} variant='secondary' aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>{label}<span aria-hidden='true'> ▾</span></Button>
    {/* Native links dispatch click for both keyboard and pointer activation. */}
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
    <div id={id} hidden={!expanded} className='ssd-navigation-disclosure__panel' onClick={event => {
      if (event.target instanceof Element && event.target.closest('a[href]')) setExpanded(false);
    }}>{children}</div>
  </div>;
}
