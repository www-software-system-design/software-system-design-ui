'use client';
import { useId, type ComponentPropsWithRef } from 'react';
export type NativeInputType = 'number' | 'date' | 'datetime-local' | 'time' | 'month' | 'week' | 'color' | 'range' | 'file';
interface CommonProps extends Omit<ComponentPropsWithRef<'input'>, 'children' | 'type' | 'value' | 'defaultValue'> {
    label: string;
    description?: string;
    error?: string;
    wrapperClassName?: string;
}
export type NativeFieldProps = CommonProps & ({
    type: Exclude<NativeInputType, 'file'>;
    value?: string | number;
    defaultValue?: string | number;
} | {
    type: 'file';
    value?: never;
    defaultValue?: never;
});
/** Browser-owned pickers and numeric constraints; no application parsing or uploads. */
export function NativeField({ label, description, error, id, wrapperClassName, className, ...props }: NativeFieldProps) {
    const generated = useId();
    const inputId = id ?? generated;
    return <div className={['ssd-text-field', wrapperClassName].filter(Boolean).join(' ')}>
    <label htmlFor={inputId} className="ssd-field-label">{label}</label>
    <input {...props} id={inputId} className={['ssd-text-input', className].filter(Boolean).join(' ')} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={[props['aria-describedby'], description && inputId + '-hint', error && inputId + '-error'].filter(Boolean).join(' ') || undefined}/>
    {description && <p id={inputId + '-hint'} className="ssd-field-description">{description}</p>}
    {error && <p id={inputId + '-error'} className="ssd-field-error">{error}</p>}
  </div>;
}
