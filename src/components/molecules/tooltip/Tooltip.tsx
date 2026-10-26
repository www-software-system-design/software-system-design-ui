'use client';
import { cloneElement, useId, useState, type ReactElement, type HTMLAttributes } from 'react';
export interface TooltipProps {
    content: string;
    children: ReactElement<HTMLAttributes<HTMLElement>>;
}
export function Tooltip({ content, children }: TooltipProps) {
    const id = useId();
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const open = (hovered || focused) && !dismissed;
    return <span className='ssd-tooltip' onMouseEnter={() => {
        setHovered(true);
        setDismissed(false);
    }} onMouseLeave={() => setHovered(false)} onFocus={() => {
        setFocused(true);
        setDismissed(false);
    }} onBlur={() => setFocused(false)}>{cloneElement(children, { onKeyDown: event => {
                children.props.onKeyDown?.(event);
                if (!event.defaultPrevented && event.key === 'Escape')
                    setDismissed(true);
            }, 'aria-describedby': [children.props['aria-describedby'], open && id].filter(Boolean).join(' ') || undefined })}{open && <span id={id} role='tooltip' className='ssd-tooltip__content'>{content}</span>}</span>;
}
