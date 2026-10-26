import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { FeatureSection } from './FeatureSection.js';
import { ContentCard } from '../../molecules/content-card/index.js';
import { BrandLockup } from '../../molecules/brand-lockup/index.js';
import { NavigationDisclosure } from '../../molecules/navigation-disclosure/index.js';
import { PageNavigation } from '../../molecules/page-navigation/index.js';
import { PrincipleList } from '../../molecules/principle-list/index.js';
import { Carousel } from '../carousel/index.js';
const meta = { title: 'Organisms/FeatureSection', component: FeatureSection, tags: ['autodocs'], args: { title: 'Build through shared standards', eyebrow: 'OPEN PARTICIPATION', description: <p>Caller-owned copy and links stay with the application.</p>, children: <><ContentCard title='People'>People set direction.</ContentCard><ContentCard title='Contracts'>Keep contracts open.</ContentCard><ContentCard title='Quality'>Make quality a shared practice.</ContentCard></>, footer: <a href='#contribute'>Contribute to the initiative</a> }, } satisfies Meta<typeof FeatureSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({ canvasElement }) => { const c = within(canvasElement); await expect(c.getByRole('region', { name: 'Build through shared standards' })).toBeVisible(); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const ContainerPatterns: Story = {
  render: args => <div style={{ maxWidth: '70rem', padding: '1rem' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <BrandLockup href='#home' label='Example Studio home' artwork={<svg width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' rx='10' fill='currentColor'/></svg>} wordmark={<>Example<br/>Studio</>} />
      <NavigationDisclosure label='Product'><a href='#product'>Product overview</a><a href='#plans'>Plans</a></NavigationDisclosure>
    </div>
    <PageNavigation label='Initiative pages' currentHref='#standards' items={[{ href: '#overview', label: 'Product overview' }, { href: '#standards', label: 'Open standards and shared engineering contracts' }]} />
    <FeatureSection {...args} />
    <Carousel label='Community highlights'
      labels={{ previous: 'Previous slide', next: 'Next slide', pause: 'Pause slides', resume: 'Resume slides', indicators: 'Choose slide', carousel: 'carousel', slide: 'slide' }}
      slides={[
        { id: 'principles', label: 'Shared principles', content: <PrincipleList label='Community principles' items={[{ id: 'people', title: 'People set direction', description: 'Keep human responsibility explicit.' }, { id: 'open', title: 'Open participation', description: 'Build reusable tools and knowledge together.' }]} /> },
        { id: 'contribute', label: 'Contribute', content: <ContentCard title='Build in the open'><a href='#contribute'>Explore the initiative</a></ContentCard> },
      ]} />
  </div>,
};
