import { StrictMode, type ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './useControllableState.js';

describe('useControllableState', () => {
  it('updates uncontrolled state and notifies once under StrictMode', () => {
    const onValueChange = vi.fn();
    const wrapper = ({ children }: { children: ReactNode }) => <StrictMode>{children}</StrictMode>;
    const { result } = renderHook(() => useControllableState({ defaultValue: '', onValueChange }), { wrapper });
    act(() => result.current[1]('architecture'));
    expect(result.current[0]).toBe('architecture');
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('architecture');
  });

  it('leaves controlled state with the owner until new props arrive', () => {
    const onValueChange = vi.fn();
    const { result, rerender } = renderHook(({ value }) => useControllableState({ value, defaultValue: '', onValueChange }), { initialProps: { value: 'first' } });
    act(() => result.current[1]('second'));
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('second');
    expect(result.current[0]).toBe('first');
    rerender({ value: 'second' });
    expect(result.current[0]).toBe('second');
  });

  it('does not notify for an unchanged value', () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 'same', onValueChange }));
    act(() => result.current[1]('same'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('uses defaultValue only for initialization and isolates hook instances', () => {
    const { result, rerender } = renderHook(({ initial }) => ({
      first: useControllableState({ defaultValue: initial }),
      second: useControllableState({ defaultValue: 'independent' })
    }), { initialProps: { initial: 'start' } });
    act(() => result.current.first[1]('changed'));
    rerender({ initial: 'new default' });
    expect(result.current.first[0]).toBe('changed');
    expect(result.current.second[0]).toBe('independent');
  });

  it('uses the latest callback after the owner rerenders', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { result, rerender } = renderHook(({ onValueChange }) => useControllableState({ defaultValue: 0, onValueChange }), { initialProps: { onValueChange: first } });
    rerender({ onValueChange: second });
    act(() => result.current[1](1));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledExactlyOnceWith(1);
  });
});
