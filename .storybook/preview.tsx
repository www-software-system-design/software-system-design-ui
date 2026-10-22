import type { Preview } from '@storybook/react-vite';
import { UIProvider } from '../src/providers/UIProvider.js';
import '../src/styles/index.css';
import './examples/examples.css';
import { getMessages } from '../src/i18n/index.js';

const preview: Preview = {
  initialGlobals: { theme: 'dark', locale: 'en', direction: 'ltr', viewport: 'wide' },
  globalTypes: {
    theme: { description: 'Color scheme', toolbar: { icon: 'circlehollow', items: ['light', 'dark', 'system'] } },
    locale: { description: 'Language', toolbar: { icon: 'globe', items: ['en', 'fr', 'ml'] } },
    direction: { description: 'Text direction', toolbar: { icon: 'transfer', items: ['ltr', 'rtl'] } },
    viewport: { description: 'Preview width', toolbar: { icon: 'browser', items: ['compact', 'wide'] } }
  },
  parameters: { layout: 'padded', a11y: { test: 'error' }, controls: { expanded: true } },
  decorators: [(Story, context) => (
    <UIProvider
      theme={context.globals.theme}
      locale={context.globals.locale}
      direction={context.globals.direction}
      messages={getMessages(context.globals.locale)}
      style={{ padding: '1rem', width: context.globals.viewport === 'compact' ? 'min(100%, 320px)' : 'min(100%, 960px)', boxSizing: 'border-box' }}
    >
      <Story />
    </UIProvider>
  )]
};

export default preview;
