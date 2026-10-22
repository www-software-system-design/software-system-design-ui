import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SearchPanel, type SearchPanelProps } from './SearchPanel.js';
import { formatResultCount, getMessages } from '../../../i18n/index.js';
import { exampleComponents } from '../../../../.storybook/examples/ComponentExplorer.js';

const meta = {
  id: 'organisms-search-panel', title: 'Organisms/SearchPanel', component: SearchPanel, tags: ['autodocs'],
  args: { title: 'Component library', query: '', onQueryChange: fn(), resultCount: 3, children: <ul className="ssd-example-results">{exampleComponents.map((item) => <li key={item}>{item}</li>)}</ul> },
  parameters: { docs: { description: { component: 'Reusable search section composed from a molecule and atoms. Consumers own query, filtering, results, and request state. Ready/loading/error are explicit states. Live result counts use Intl.PluralRules and Intl.NumberFormat. Empty, loading, and error states hide stale results. Heading depth and labels are configurable; no fetching or application store is included.' } } }
} satisfies Meta<typeof SearchPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveExample(args: SearchPanelProps) {
  const [query, setQuery] = useState(args.query);
  const items = exampleComponents.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  return <SearchPanel {...args} query={query} resultCount={items.length} onQueryChange={(next) => { setQuery(next); args.onQueryChange(next); }}>
      <ul className="ssd-example-results">{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </SearchPanel>;
}

export const Interactive: Story = {
  render: (args) => <InteractiveExample key={args.query} {...args} />,
  play: async ({ canvasElement, globals }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('searchbox'), 'Button');
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1);
    await expect(canvas.getByRole('status')).toHaveTextContent(formatResultCount(1, { locale: globals.locale, messages: getMessages(globals.locale) }));
  }
};
export const Ready: Story = {};
export const Loading: Story = { args: { status: 'loading' } };
export const Empty: Story = { args: { resultCount: 0, query: 'No matching component' } };
export const Error: Story = { args: { status: 'error', errorMessage: 'Unable to load components. Try again later.' } };
export const French: Story = { args: { title: 'Bibliothèque de composants' }, globals: { locale: 'fr', theme: 'dark' } };
export const Malayalam: Story = { args: { title: 'ഘടകങ്ങളുടെ ശേഖരം', resultCount: 0 }, globals: { locale: 'ml', direction: 'ltr', theme: 'dark' } };
