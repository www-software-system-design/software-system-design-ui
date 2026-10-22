import { useState } from 'react';
import { SearchPanel } from '../../src/components/organisms/search-panel/index.js';

/** Consumer-owned fixtures, filtering, and state. Never part of the npm runtime. */
export const exampleComponents = ['Button', 'TextInput', 'SearchField'] as const;

export function ComponentExplorer({ title = 'Browse components' }: { title?: string }) {
  const [query, setQuery] = useState('');
  const items = exampleComponents.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  return (
    <SearchPanel title={title} query={query} onQueryChange={setQuery} resultCount={items.length}>
      <ul className="ssd-example-results">{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </SearchPanel>
  );
}
