import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchPanel } from './SearchPanel.js';
import { UIProvider } from '../../../providers/UIProvider.js';
import { getMessages } from '../../../i18n/index.js';

describe('SearchPanel', () => {
  it('exposes a labelled section, localized results count, and consumer content', () => {
    render(<SearchPanel title="Components" query="" onQueryChange={vi.fn()} resultCount={2}><ul><li>Button</li><li>Input</li></ul></SearchPanel>);
    expect(screen.getByRole('region', { name: 'Components' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Components', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('2 results');
    expect(within(screen.getByRole('region', { name: 'Results' })).getAllByRole('listitem')).toHaveLength(2);
  });

  it('composes a controlled molecule while the consumer filters data', async () => {
    function Consumer() {
      const [query, setQuery] = useState('');
      const items = ['Button', 'TextInput'].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
      return <SearchPanel title="Components" query={query} onQueryChange={setQuery} resultCount={items.length}><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></SearchPanel>;
    }
    render(<Consumer />);
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search' }), 'button');
    expect(screen.getByRole('status')).toHaveTextContent('1 result');
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.queryByText('TextInput')).not.toBeInTheDocument();
  });

  it('announces loading and hides stale results', () => {
    render(<SearchPanel title="Components" query="" onQueryChange={vi.fn()} resultCount={1} status="loading">Stale item</SearchPanel>);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
    expect(screen.getByRole('region', { name: 'Results' })).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText('Stale item')).not.toBeInTheDocument();
  });

  it('renders actionable consumer error text and an explicit empty state', () => {
    const { rerender } = render(<SearchPanel title="Components" query="" onQueryChange={vi.fn()} resultCount={0} status="error" errorMessage="Try again later" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Try again later');
    rerender(<SearchPanel title="Components" query="" onQueryChange={vi.fn()} resultCount={0} emptyMessage="Try another query" />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Try another query')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('0 results');
  });

  it('honors locale messages, explicit labels, and configurable heading depth', () => {
    render(<UIProvider locale="fr" messages={getMessages('fr')}>
      <SearchPanel title="Composants" headingLevel={3} query="x" onQueryChange={vi.fn()} resultCount={0} searchLabel="Filtrer" resultsLabel="Composants trouvés" />
    </UIProvider>);
    expect(screen.getByRole('heading', { name: 'Composants', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Filtrer' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Composants trouvés' })).toHaveTextContent('Aucun résultat');
    expect(screen.getByRole('button', { name: 'Effacer la recherche' })).toBeInTheDocument();
  });
});
