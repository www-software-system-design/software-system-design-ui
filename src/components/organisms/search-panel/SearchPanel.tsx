'use client';

import { useId, type ComponentPropsWithRef } from 'react';
import { SearchField } from '../../molecules/search-field/index.js';
import { useUI } from '../../../providers/UIProvider.js';
import { formatResultCount } from '../../../i18n/index.js';

export interface SearchPanelProps extends Omit<ComponentPropsWithRef<'section'>, 'title' | 'onChange' | 'aria-label' | 'aria-labelledby' | 'dangerouslySetInnerHTML'> {
  title: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  query: string;
  onQueryChange: (value: string) => void;
  resultCount: number;
  status?: 'ready' | 'loading' | 'error';
  searchLabel?: string;
  resultsLabel?: string;
  emptyMessage?: string;
  errorMessage?: string;
  disabled?: boolean;
}

/** The consumer supplies query, results, and request state; no fetching or filtering occurs here. */
export function SearchPanel({
  title, headingLevel = 2, query, onQueryChange, resultCount, status = 'ready',
  searchLabel, resultsLabel, emptyMessage, errorMessage, disabled, children, className, ...props
}: SearchPanelProps) {
  const titleId = useId();
  const { locale, messages } = useUI();
  const Heading = `h${headingLevel}` as const;

  return (
    <section {...props} className={['ssd-search-panel', className].filter(Boolean).join(' ')} aria-labelledby={titleId}>
      <Heading className="ssd-search-panel__title" id={titleId}>{title}</Heading>
      <SearchField label={searchLabel ?? messages.searchLabel} value={query} onValueChange={onQueryChange} disabled={disabled} />
      <p className="ssd-search-panel__status" role="status" aria-atomic="true">
        {status === 'loading' ? messages.loading : status === 'ready' ? formatResultCount(resultCount, { locale, messages }) : null}
      </p>
      <section className="ssd-search-panel__results" aria-label={resultsLabel ?? messages.resultsLabel} aria-busy={status === 'loading'}>
        {status === 'error'
          ? <p className="ssd-field-error" role="alert">{errorMessage ?? messages.resultsError}</p>
          : status === 'loading' ? null
            : resultCount === 0 ? <p>{emptyMessage ?? messages.noResults}</p> : children}
      </section>
    </section>
  );
}
