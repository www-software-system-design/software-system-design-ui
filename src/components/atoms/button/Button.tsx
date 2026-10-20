'use client';

import type { ComponentPropsWithRef } from 'react';
import { useUI } from '../../../providers/UIProvider.js';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /** Prevent activation and display a localized loading label. */
  loading?: boolean;
  /** Takes precedence over the provider's loading message. */
  loadingLabel?: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ loading = false, loadingLabel, variant = 'primary', type = 'button', disabled, className, children, ...props }: ButtonProps) {
  const { messages } = useUI();
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || props['aria-busy']}
      className={['ssd-button', className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      {loading ? loadingLabel ?? messages.loading : children}
    </button>
  );
}
