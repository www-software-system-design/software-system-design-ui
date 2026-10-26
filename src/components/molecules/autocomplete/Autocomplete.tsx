'use client';
import { useId } from 'react';
import { TextField, type TextFieldProps } from '../text-field/index.js';
export interface AutocompleteProps extends Omit<TextFieldProps, 'type' | 'list' | 'children'> {
    options: readonly string[];
}
export function Autocomplete({ options, id, ...props }: AutocompleteProps) {
    const generated = useId();
    const inputId = id ?? generated;
    return <><TextField {...props} id={inputId} type='text' list={inputId + '-options'}/><datalist id={inputId + '-options'}>{options.map(option => <option key={option} value={option}/>)}</datalist></>;
}
