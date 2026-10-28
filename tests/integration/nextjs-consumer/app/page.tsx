import { Timeline, StepList, Callout, SplitLayout } from '@software-system.design/ui';
import { Timeline as DirectTimeline } from '@software-system.design/ui/timeline';
import { StepList as DirectStepList } from '@software-system.design/ui/step-list';
import { Callout as DirectCallout } from '@software-system.design/ui/callout';
import { SplitLayout as DirectSplitLayout } from '@software-system.design/ui/split-layout';
import { Button, TextInput } from '@software-system.design/ui';
import {Checkbox,NativeField,SelectField,Fieldset} from '@software-system.design/ui';
import {ReferenceControls} from './controls';
import { DataChart as RootDataChart } from '@software-system.design/ui';
import { DataChart } from '@software-system.design/ui/data-chart';
import { UIProvider } from '@software-system.design/ui/provider';
import { Button as DirectButton } from '@software-system.design/ui/button';
import { SearchField } from '@software-system.design/ui/search-field';
import { ExplorerLayout } from '@software-system.design/ui/explorer-layout';
import { getMessages } from '@software-system.design/ui/i18n';
import { Controls, SearchExperience } from './controls';
import {ContentCard,SectionHeading,TextField,TextArea,Statistic,DataTable,Disclosure,Badge,ContentState} from '@software-system.design/ui';
import {MarketingControls} from './controls';
import { BrandLockup, NavigationDisclosure, PageNavigation, PrincipleList, FeatureSection } from '@software-system.design/ui';
import { Carousel } from '@software-system.design/ui/carousel';

function ServerContent() {
  return <span>Content prepared by the server</span>;
}

export default function Page() {
  return (
    <main>
      <h1>Packed package compatibility</h1>
      <UIProvider theme="light">
        <SplitLayout secondary={<Callout title="Packed limits"><ServerContent /></Callout>}>
          <Timeline label="Packed journey" items={[{id:'first',phase:'Foundation',status:'Planned',title:'Packed milestone',description:<ServerContent />}]} />
          <StepList label="Packed review" items={[{id:'review',title:'Inspect evidence',description:<ServerContent />}]} />
        </SplitLayout>
        <DirectSplitLayout secondary={<DirectCallout title="Direct limits" />}>
          <DirectTimeline label="Direct journey" items={[]} /><DirectStepList label="Direct steps" items={[]} />
        </DirectSplitLayout>
        <BrandLockup href="/" label="Packed studio home" artwork={<svg width="32" height="32" aria-hidden="true"><rect width="32" height="32" fill="currentColor" /></svg>} wordmark="Packed studio" />
        <NavigationDisclosure label="Packed product"><a href="#packed-feature">Packed overview</a></NavigationDisclosure>
        <PageNavigation label="Packed initiatives" currentHref="#packed-feature" items={[{ href: '#packed-feature', label: 'Packed standards' }]} />
        <FeatureSection id="packed-feature" title="Packed feature" description={<ServerContent />}>
          <ContentCard title="Packed principle card"><PrincipleList label="Packed principles" items={[{ id: 'people', title: 'People lead', description: 'Server-prepared principle' }]} /></ContentCard>
        </FeatureSection>
        <Carousel label="Packed highlights" labels={{ previous: 'Packed previous', next: 'Packed next', pause: 'Packed pause', resume: 'Packed resume', indicators: 'Packed slide choice', carousel: 'carousel', slide: 'slide' }}
          slides={[{ id: 'first', label: 'Packed first', content: <p>First server slide</p> }, { id: 'second', label: 'Packed second', content: <p>Second server slide</p> }]} />
      </UIProvider>
      <UIProvider theme="light">
        <Fieldset legend="Reference form">
          <Checkbox label="Reference consent" name="reference-consent" defaultChecked/>
          <NativeField type="number" label="Reference quantity" defaultValue={2}/>
          <SelectField label="Reference region" defaultValue="in"><option value="in">India</option><option value="eu">Europe</option></SelectField>
        </Fieldset>
      </UIProvider>
      <ReferenceControls/>
      <UIProvider theme="light">
        <DataChart type="bar" title="Packed chart" data={[{ label: 'Server data', value: 42 }]} />
        <RootDataChart type="donut" title="Root chart" data={[{ label: 'Used', value: 25 }, { label: 'Free', value: 75 }]} />
      </UIProvider>
      <UIProvider theme="dark">
        <section aria-label="Extracted presentation">
          <SectionHeading title="Reusable studio" />
          <ContentCard title={<ServerContent />}><Badge tone="success">Ready</Badge></ContentCard>
          <TextField label="Draft title" defaultValue="Server draft" />
          <TextArea aria-label="Draft description" defaultValue="Server description" />
          <Statistic label="Runs" value="12" />
          <DataTable label="Records" caption="Supplied runs"><thead><tr><th scope="col">Run</th></tr></thead><tbody><tr><td>R1</td></tr></tbody></DataTable>
          <Disclosure summary="More details"><ServerContent /></Disclosure>
          <ContentState status="empty" title="No pending requests" />
          <MarketingControls />
        </section>
      </UIProvider>
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
