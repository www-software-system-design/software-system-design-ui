'use client';
import { useId, type ComponentPropsWithRef } from 'react';
export interface RadioButtonProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> {
    label: string;
    name: string;
    description?: string;
    error?: string;
    wrapperClassName?: string;
}
export function RadioButton({ label, description, error, wrapperClassName, id, className, ...props }: RadioButtonProps) {
    const generated = useId();
    const inputId = id ?? generated;
    return <div className={['ssd-choice', wrapperClassName].filter(Boolean).join(' ')}><label htmlFor={inputId}><input {...props} type='radio' id={inputId} className={['ssd-choice__input', className].filter(Boolean).join(' ')} aria-describedby={[props['aria-describedby'], description && inputId + '-hint', error && inputId + '-error'].filter(Boolean).join(' ') || undefined}/><span>{label}</span></label>{description && <p id={inputId + '-hint'} className='ssd-field-description'>{description}</p>}{error && <p id={inputId + '-error'} className='ssd-field-error'>{error}</p>}</div>;
}
