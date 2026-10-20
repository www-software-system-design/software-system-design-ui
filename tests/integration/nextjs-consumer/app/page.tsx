import { Button } from 'component-lib';
import { UIProvider } from 'component-lib/provider';
import { Button as DirectButton } from 'component-lib/button';
import { Controls } from './controls';

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
      </UIProvider>
      <UIProvider theme="dark" locale="fr" messages={{ loading: 'Chargement' }}><Button loading>Save</Button></UIProvider>
      <UIProvider theme="light" locale="ar" direction="rtl" messages={{ loading: 'جار التحميل' }}><Button loading>Save</Button></UIProvider>
    </main>
  );
}
