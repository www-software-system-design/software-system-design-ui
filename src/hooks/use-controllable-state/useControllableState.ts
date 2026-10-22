'use client';

import { useCallback, useState } from 'react';

export interface ControllableStateOptions<T> {
  value?: T | undefined;
  defaultValue: T;
  onValueChange?: ((value: T) => void) | undefined;
}

/**
 * A concrete-value setter, not a React functional updater. Keep controlled/uncontrolled
 * mode stable for the lifetime of an instance. Undefined means uncontrolled.
 */
export function useControllableState<T>({ value, defaultValue, onValueChange }: ControllableStateOptions<T>): readonly [T, (value: T) => void] {
  const [internalValue, setInternalValue] = useState<T>(() => defaultValue);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const setValue = useCallback((next: T) => {
    if (Object.is(currentValue, next)) return;
    if (!controlled) setInternalValue(() => next);
    // Notifications stay outside React state updaters, which may run more than once.
    onValueChange?.(next);
  }, [controlled, currentValue, onValueChange]);

  return [currentValue, setValue];
}
