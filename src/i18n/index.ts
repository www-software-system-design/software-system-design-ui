/** Library-owned messages only. Application copy remains consumer-owned. */
export interface UIMessages {
  close?: string;
  chartCategory?: string;
  chartValue?: string;
  chartX?: string;
  chartSize?: string;
  chartRow?: string;
  chartColumn?: string;
  chartEmpty?: string;
  loading: string;
  clearSearch: string;
  searchLabel: string;
  resultsLabel: string;
  noResults: string;
  resultsError: string;
  resultCountZero: string;
  resultCountOne: string;
  resultCountTwo: string;
  resultCountFew: string;
  resultCountMany: string;
  resultCountOther: string;
}

export const englishMessages: Readonly<UIMessages> = Object.freeze({
  close: 'Close',
  chartCategory: 'Category', chartValue: 'Value', chartX: 'X', chartSize: 'Size', chartRow: 'Row', chartColumn: 'Column', chartEmpty: 'No chart data',
  loading: 'Loading', clearSearch: 'Clear search', searchLabel: 'Search', resultsLabel: 'Results', noResults: 'No results', resultsError: 'Results could not be loaded.',
  resultCountZero: '{count} results', resultCountOne: '{count} result', resultCountTwo: '{count} results', resultCountFew: '{count} results', resultCountMany: '{count} results', resultCountOther: '{count} results'
});

const frenchMessages = Object.freeze({
  close: 'Fermer',
  chartCategory: 'Catégorie', chartValue: 'Valeur', chartX: 'X', chartSize: 'Taille', chartRow: 'Ligne', chartColumn: 'Colonne', chartEmpty: 'Aucune donnée',
  loading: 'Chargement', clearSearch: 'Effacer la recherche', searchLabel: 'Rechercher', resultsLabel: 'Résultats', noResults: 'Aucun résultat', resultsError: 'Impossible de charger les résultats.',
  resultCountZero: '{count} résultat', resultCountOne: '{count} résultat', resultCountTwo: '{count} résultats', resultCountFew: '{count} résultats', resultCountMany: '{count} résultats', resultCountOther: '{count} résultats'
} satisfies UIMessages);

const malayalamMessages = Object.freeze({
  close: 'അടയ്ക്കുക',
  chartCategory: 'വിഭാഗം', chartValue: 'മൂല്യം', chartX: 'X', chartSize: 'വലുപ്പം', chartRow: 'വരി', chartColumn: 'നിര', chartEmpty: 'ഡാറ്റ ലഭ്യമല്ല',
  loading: 'ലോഡ് ചെയ്യുന്നു', clearSearch: 'തിരയൽ മായ്ക്കുക', searchLabel: 'തിരയുക', resultsLabel: 'ഫലങ്ങൾ', noResults: 'ഫലങ്ങളൊന്നുമില്ല', resultsError: 'ഫലങ്ങൾ ലോഡ് ചെയ്യാനായില്ല.',
  resultCountZero: 'ഫലങ്ങളൊന്നുമില്ല', resultCountOne: '{count} ഫലം', resultCountTwo: '{count} ഫലങ്ങൾ', resultCountFew: '{count} ഫലങ്ങൾ', resultCountMany: '{count} ഫലങ്ങൾ', resultCountOther: '{count} ഫലങ്ങൾ'
} satisfies UIMessages);

function safeLocale(locale: string): string {
  try { return new Intl.Locale(locale).toString(); }
  catch { return 'en'; }
}

/** Opt-in built-in catalogs; unsupported languages use the English catalog. */
export function getMessages(locale: string): Readonly<UIMessages> {
  switch (new Intl.Locale(safeLocale(locale)).language) {
    case 'fr': return frenchMessages;
    case 'ml': return malayalamMessages;
    default: return englishMessages;
  }
}

const pluralKeys = {
  zero: 'resultCountZero', one: 'resultCountOne', two: 'resultCountTwo',
  few: 'resultCountFew', many: 'resultCountMany', other: 'resultCountOther'
} as const satisfies Record<Intl.LDMLPluralRule, keyof UIMessages>;

export interface ResultCountOptions {
  locale?: string;
  messages?: Readonly<UIMessages>;
}

/** Format complete messages using all CLDR plural categories and the locale's number system. */
export function formatResultCount(count: number, { locale = 'en', messages = englishMessages }: ResultCountOptions = {}): string {
  if (!Number.isSafeInteger(count) || count < 0) throw new RangeError('Result count must be a non-negative safe integer.');
  const resolvedLocale = safeLocale(locale);
  const category = new Intl.PluralRules(resolvedLocale).select(count);
  const formattedCount = new Intl.NumberFormat(resolvedLocale).format(count);
  return messages[pluralKeys[category]].replaceAll('{count}', formattedCount);
}
