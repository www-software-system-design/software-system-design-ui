'use client';
import { useEffect, useId, useRef, useImperativeHandle, type ComponentPropsWithRef } from 'react';
export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> {
    label: string;
    description?: string;
    error?: string;
    indeterminate?: boolean;
    wrapperClassName?: string;
}
export function Checkbox({ label, description, error, indeterminate = false, wrapperClassName, id, ref, className, ...props }: CheckboxProps) {
    const generated = useId();
    const inputId = id ?? generated;
    const input = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => input.current!, []);
    useEffect(() => {
        if (input.current)
            input.current.indeterminate = indeterminate;
    }, [indeterminate]);
    return <div className={['ssd-choice', wrapperClassName].filter(Boolean).join(' ')}><label htmlFor={inputId}><input {...props} ref={input} type='checkbox' id={inputId} className={['ssd-choice__input', className].filter(Boolean).join(' ')} aria-checked={indeterminate ? 'mixed' : props['aria-checked']} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={[props['aria-describedby'], description && inputId + '-hint', error && inputId + '-error'].filter(Boolean).join(' ') || undefined}/><span>{label}</span></label>{description && <p id={inputId + '-hint'} className='ssd-field-description'>{description}</p>}{error && <p id={inputId + '-error'} className='ssd-field-error'>{error}</p>}</div>;
}
