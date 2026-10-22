'use client';

import type { ComponentPropsWithRef } from 'react';

export type TextInputProps = Omit<ComponentPropsWithRef<'input'>, 'children' | 'type'> & {
  type?: 'text' | 'search' | 'email' | 'url' | 'tel' | 'password';
};

/** Native semantics and ref support; consumers supply the accessible name. */
export function TextInput({ type = 'text', className, ...props }: TextInputProps) {
  return <input {...props} type={type} className={['ssd-text-input', className].filter(Boolean).join(' ')} />;
}
