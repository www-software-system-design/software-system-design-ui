'use client';

import { useId, useRef, type ComponentPropsWithRef } from 'react';
import { TextInput } from '../../atoms/text-input/index.js';
import { Button } from '../../atoms/button/index.js';
import { useControllableState } from '../../../hooks/use-controllable-state/index.js';
import { useUI } from '../../../providers/UIProvider.js';

export interface SearchFieldProps extends Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'defaultValue' | 'children' | 'dangerouslySetInnerHTML'> {
  label: string;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
  clearLabel?: string | undefined;
  description?: string | undefined;
  error?: string | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  autoComplete?: string | undefined;
}

/** Labelled search control. `id` identifies the input; the ref targets the field wrapper. */
export function SearchField({
  label, value, defaultValue = '', onValueChange, clearLabel, description, error,
  id, name, placeholder, disabled, readOnly, required, autoComplete, className, ...props
}: SearchFieldProps) {
  const generatedId = useId();
  const inputId = id ?? `ssd-search-${generatedId}`;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const describedBy = [description && descriptionId, error && errorId].filter(Boolean).join(' ') || undefined;
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages } = useUI();
  const [query, setQuery] = useControllableState({ value, defaultValue, onValueChange });

  return (
    <div {...props} className={['ssd-search-field', className].filter(Boolean).join(' ')}>
      <label className="ssd-field-label" htmlFor={inputId}>{label}</label>
      <div className="ssd-search-field__controls">
        <TextInput
          ref={inputRef} id={inputId} name={name} type="search" value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder={placeholder} disabled={disabled} readOnly={readOnly} required={required}
          autoComplete={autoComplete} dir="auto" aria-invalid={error ? true : undefined} aria-describedby={describedBy}
        />
        {query !== '' && !disabled && !readOnly && (
          <Button variant="secondary" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
            {clearLabel ?? messages.clearSearch}
          </Button>
        )}
      </div>
      {description && <p className="ssd-field-description" id={descriptionId}>{description}</p>}
      {error && <p className="ssd-field-error" id={errorId}>{error}</p>}
    </div>
  );
}
