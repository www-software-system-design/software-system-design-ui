'use client';
import { useEffect, useId, useImperativeHandle, useRef, type ComponentPropsWithRef } from 'react';
import { useUI } from '../../../providers/index.js';
import { Button } from '../../atoms/button/index.js';
export interface DialogProps extends Omit<ComponentPropsWithRef<'dialog'>, 'title' | 'onCancel' | 'onClose' | 'open'> {
    title: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    description?: string;
    closeLabel?: string;
}
export function Dialog({ title, description, open, onOpenChange, closeLabel, children, className, ref, ...props }: DialogProps) {
    const id = useId();
    const dialog = useRef<HTMLDialogElement>(null);
    const { messages } = useUI();
    useImperativeHandle(ref, () => dialog.current!, []);
    useEffect(() => {
        const element = dialog.current;
        if (!element)
            return;
        if (open && !element.open)
            element.showModal();
        else if (!open && element.open)
            element.close();
        return () => {
            if (element.open)
                element.close();
        };
    }, [open]);
    return <dialog {...props} ref={dialog} className={['ssd-dialog', className].filter(Boolean).join(' ')} aria-labelledby={id + '-title'} aria-describedby={[props['aria-describedby'], description && id + '-description'].filter(Boolean).join(' ') || undefined} onCancel={event => {
        event.preventDefault();
        onOpenChange(false);
    }} onClose={event => {
            if (open && !event.currentTarget.open)
                onOpenChange(false);
        }}><header><h2 id={id + '-title'}>{title}</h2><Button variant='secondary' onClick={() => onOpenChange(false)}>{closeLabel ?? messages.close ?? 'Close'}</Button></header>{description && <p id={id + '-description'}>{description}</p>}{children}</dialog>;
}
