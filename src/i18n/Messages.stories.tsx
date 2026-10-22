import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIProvider } from '../providers/UIProvider.js';
import { SearchField } from '../components/molecules/search-field/index.js';
import { formatResultCount, getMessages } from './index.js';

const meta = { title: 'Foundations/Internationalization', parameters: { docs: { description: { component: 'Opt-in English, French, and Malayalam catalogs. Pass getMessages(locale) to UIProvider, or provide your own typed messages. Locale does not automatically load a catalog or infer direction. Complete plural messages support all six CLDR categories. Numbering follows the locale; request ml-u-nu-mlym explicitly for Malayalam digits. No translation framework is required.' } } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const CatalogsAndPlurals: Story = {
  render: () => <div><h2>Messages and plural forms</h2><div className="ssd-example-grid">
    {['en', 'fr', 'ml-u-nu-mlym'].map((locale) => {
      const messages = getMessages(locale);
      return <UIProvider key={locale} locale={locale} direction="ltr" messages={messages}>
        <h3>{locale}</h3>
        <SearchField label={messages.searchLabel} defaultValue={locale === 'fr' ? 'Composants' : locale.startsWith('ml') ? 'ഘടകങ്ങൾ' : 'Components'} />
        <ul>{[0, 1, 2, 3, 11, 102].map((count) => <li key={count}>{formatResultCount(count, { locale, messages })}</li>)}</ul>
      </UIProvider>;
    })}
  </div></div>
};
export const CustomMessages: Story = {
  render: () => <UIProvider messages={{ clearSearch: 'Reset filter' }}><SearchField label="Filter catalog" defaultValue="Button" /></UIProvider>
};
