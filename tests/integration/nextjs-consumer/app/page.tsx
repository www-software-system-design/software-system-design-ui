import { Button, TextInput } from '@software-system.design/ui';
import { UIProvider } from '@software-system.design/ui/provider';
import { Button as DirectButton } from '@software-system.design/ui/button';
import { SearchField } from '@software-system.design/ui/search-field';
import { ExplorerLayout } from '@software-system.design/ui/explorer-layout';
import { getMessages } from '@software-system.design/ui/i18n';
import { Controls, SearchExperience } from './controls';

function ServerContent() {
  return <span>Content prepared by the server</span>;
}

export default function Page() {
  return (
    <main>
      <h1>Packed package compatibility</h1>
      <UIProvider theme="light">
        <Button>Imported from package root</Button>
        <DirectButton variant="secondary"><ServerContent /></DirectButton>
        <Controls />
        <label htmlFor="public-atom">Published input</label>
        <TextInput id="public-atom" defaultValue="Server-provided value" />
        <SearchField label="Standalone field" defaultValue="Button" description="Stable label associations from an MFE Server Component." />
        <ExplorerLayout
          header={<h2>Atomic composition</h2>}
          contentLabel="Example component explorer"
          sidebar={<p>Reusable UI with consumer-owned state.</p>}
          sidebarLabel="Example information"
        >
          <SearchExperience />
        </ExplorerLayout>
      </UIProvider>
      <UIProvider theme="dark" locale="fr" messages={{ loading: 'Chargement' }}><Button loading>Save</Button></UIProvider>
      <UIProvider theme="light" locale="ml" direction="ltr" messages={getMessages('ml-IN')}><Button loading>സംരക്ഷിക്കുക</Button></UIProvider>
    </main>
  );
}
