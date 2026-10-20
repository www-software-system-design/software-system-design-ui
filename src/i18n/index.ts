/** Library-owned messages only. Application copy remains consumer-owned. */
export interface UIMessages {
  loading: string;
}

export const englishMessages: Readonly<UIMessages> = Object.freeze({ loading: 'Loading' });
