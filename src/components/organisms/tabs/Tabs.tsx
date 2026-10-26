'use client';
import { useId, useRef, type ComponentPropsWithRef, type ReactNode } from 'react';
import { useControllableState } from '../../../hooks/index.js';
import { useUI } from '../../../providers/index.js';
export interface TabItem {
    value: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
}
export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'defaultValue' | 'onChange'> {
    label: string;
    items: readonly TabItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: ((value: string) => void) | undefined;
    orientation?: 'horizontal' | 'vertical';
}
export function Tabs({ label, items, value, defaultValue, onValueChange, orientation = 'horizontal', className, ...props }: TabsProps) {
    const id = useId();
    const { direction } = useUI();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const enabled = items.filter(item => !item.disabled);
    const [selected, setSelected] = useControllableState({ value, defaultValue: defaultValue ?? enabled[0]?.value ?? '', onValueChange });
    const active = enabled.find(item => item.value === selected)?.value ?? enabled[0]?.value;
    return <div {...props} className={['ssd-tabs', className].filter(Boolean).join(' ')}><div role='tablist' aria-label={label} aria-orientation={orientation}>{items.map((item, i) => <button key={item.value} ref={element => {
            buttons.current[i] = element;
        }} id={id + '-tab-' + i} type='button' role='tab' disabled={item.disabled} aria-selected={active === item.value} aria-controls={id + '-panel-' + i} tabIndex={active === item.value ? 0 : -1} onClick={() => setSelected(item.value)} onKeyDown={event => {
                if (event.altKey || event.ctrlKey || event.metaKey)
                    return;
                const forward = orientation === 'vertical' ? 'ArrowDown' : direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
                const backward = orientation === 'vertical' ? 'ArrowUp' : direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
                const position = enabled.findIndex(candidate => candidate.value === item.value);
                let next;
                if (event.key === 'Home')
                    next = enabled[0];
                else if (event.key === 'End')
                    next = enabled.at(-1);
                else if (event.key === forward)
                    next = enabled[(position + 1) % enabled.length];
                else if (event.key === backward)
                    next = enabled[(position - 1 + enabled.length) % enabled.length];
                if (next) {
                    event.preventDefault();
                    setSelected(next.value);
                    buttons.current[items.indexOf(next)]?.focus();
                }
            }}>{item.label}</button>)}</div>{items.map((item, i) => <div key={item.value} id={id + '-panel-' + i} role='tabpanel' aria-labelledby={id + '-tab-' + i} hidden={active !== item.value} tabIndex={0}>{item.content}</div>)}</div>;
}
