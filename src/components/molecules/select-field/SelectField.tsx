'use client';
import { useId, type ComponentPropsWithRef } from 'react';
export interface SelectFieldProps extends ComponentPropsWithRef<'select'> {
    label: string;
    description?: string;
    error?: string;
    wrapperClassName?: string;
}
export function SelectField({ label, description, error, id, wrapperClassName, className, ...props }: SelectFieldProps) {
    const generated = useId();
    const inputId = id ?? generated;
    return <div className={['ssd-text-field', wrapperClassName].filter(Boolean).join(' ')}><label htmlFor={inputId} className='ssd-field-label'>{label}</label><select {...props} id={inputId} className={['ssd-select', className].filter(Boolean).join(' ')} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={[props['aria-describedby'], description && inputId + '-hint', error && inputId + '-error'].filter(Boolean).join(' ') || undefined}/>{description && <p id={inputId + '-hint'} className='ssd-field-description'>{description}</p>}{error && <p id={inputId + '-error'} className='ssd-field-error'>{error}</p>}</div>;
}
