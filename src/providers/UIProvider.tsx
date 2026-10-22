'use client';

import { createContext, useContext, useMemo, type ComponentPropsWithoutRef } from 'react';
import { englishMessages, type UIMessages } from '../i18n/index.js';

export type Theme = 'light' | 'dark' | 'system';
export type Direction = 'ltr' | 'rtl';

interface UIConfiguration {
  theme: Theme;
  locale: string;
  direction: Direction;
  messages: Readonly<UIMessages>;
}

const UIContext = createContext<UIConfiguration>({
  theme: 'system', locale: 'en', direction: 'ltr', messages: englishMessages
});

export interface UIProviderProps extends Omit<ComponentPropsWithoutRef<'div'>, 'dir'> {
  theme?: Theme;
  locale?: string;
  direction?: Direction;
  messages?: Partial<UIMessages>;
}

/** An isolated DOM scope: no global document mutations or shared mutable store. */
export function UIProvider({ theme, locale, direction, messages, children, className, ...props }: UIProviderProps) {
  const parent = useUI();
  const value = useMemo<UIConfiguration>(() => ({
    theme: theme ?? parent.theme,
    locale: locale ?? parent.locale,
    direction: direction ?? parent.direction,
    messages: { ...parent.messages, ...messages }
  }), [theme, locale, direction, messages, parent.messages, parent.theme, parent.locale, parent.direction]);

  return (
    <UIContext value={value}>
      <div {...props} className={['ssd-scope', className].filter(Boolean).join(' ')} data-ssd-theme={value.theme} lang={value.locale} dir={value.direction}>
        {children}
      </div>
    </UIContext>
  );
}

export function useUI(): UIConfiguration {
  return useContext(UIContext);
}
