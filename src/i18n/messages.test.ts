import { describe, expect, it } from 'vitest';
import { englishMessages, formatResultCount, getMessages } from './index.js';

describe('message catalogs', () => {
  it('supports regional locales and falls back safely for unsupported or malformed locales', () => {
    expect(getMessages('fr-CA').searchLabel).toBe('Rechercher');
    expect(getMessages('ml-IN').clearSearch).toBe('തിരയൽ മായ്ക്കുക');
    expect(getMessages('ar')).toBe(englishMessages);
    expect(getMessages('de-DE')).toBe(englishMessages);
    expect(getMessages('not_a_locale')).toBe(englishMessages);
    expect(Object.isFrozen(getMessages('fr'))).toBe(true);
  });
});

describe('formatResultCount', () => {
  it.each([[0, '0 results'], [1, '1 result'], [2, '2 results'], [1000, '1,000 results']])('formats English count %i', (count, expected) => {
    expect(formatResultCount(count)).toBe(expected);
  });

  it('uses complete translated messages and locale-aware number formatting', () => {
    expect(formatResultCount(1, { locale: 'fr', messages: getMessages('fr') })).toBe('1 résultat');
    expect(formatResultCount(1000, { locale: 'fr', messages: getMessages('fr') })).toBe('1\u202f000 résultats');
  });

  it.each([[0, '0 ഫലങ്ങൾ'], [1, '1 ഫലം'], [2, '2 ഫലങ്ങൾ'], [3, '3 ഫലങ്ങൾ'], [11, '11 ഫലങ്ങൾ'], [1000, '1,000 ഫലങ്ങൾ']])('formats Malayalam count %i', (count, expected) => {
    expect(formatResultCount(count, { locale: 'ml-IN', messages: getMessages('ml') })).toBe(expected);
  });

  it('respects an explicitly requested Malayalam numbering system', () => {
    expect(formatResultCount(12, { locale: 'ml-u-nu-mlym', messages: getMessages('ml') })).toBe('൧൨ ഫലങ്ങൾ');
  });

  it('uses caller-owned translated patterns and tolerates malformed locales', () => {
    expect(formatResultCount(2, { locale: 'invalid_locale', messages: { ...englishMessages, resultCountOther: '{count} matches' } })).toBe('2 matches');
  });

  it.each([-1, 1.5, NaN, Infinity])('rejects invalid result counts: %s', (count) => {
    expect(() => formatResultCount(count)).toThrow(RangeError);
  });
});
