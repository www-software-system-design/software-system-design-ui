'use client';
import { Checkbox, type CheckboxProps } from '../checkbox/index.js';
export type SwitchProps = Omit<CheckboxProps, 'indeterminate' | 'role'>;
export function Switch(props: SwitchProps) {
    return <Checkbox {...props} role='switch'/>;
}
