import type { Meta, StoryObj } from "@storybook/react-vite";
import { MarketingLayout } from "./MarketingLayout.js";
import { SiteHeader } from '../../organisms/site-header/index.js';
import { SiteFooter } from '../../organisms/site-footer/index.js';
import { SectionHeading } from '../../molecules/section-heading/index.js';
import { ContentCard } from '../../molecules/content-card/index.js';
import { Statistic } from '../../molecules/statistic/index.js';
import { Disclosure } from '../../molecules/disclosure/index.js';
import { Badge } from '../../atoms/badge/index.js';
import { BrandLockup } from '../../molecules/brand-lockup/index.js';
const meta = {
  id: 'templates-marketing-layout', title: "Templates/MarketingLayout",
  component: MarketingLayout,
  tags: ["autodocs"],
  args: {
    header: <header>Software-System.Design</header>,
    footer: <footer>Built in the open.</footer>,
    children: (
      <>
        <h1>AI-native system design</h1>
        <p>Compose your application from shared foundations.</p>
      </>
    ),
  },
} satisfies Meta<typeof MarketingLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};

export const Studio: Story = {
  args: {
    header: <SiteHeader brand={<BrandLockup href='https://software-system.design' label='Software-System.Design home' artwork={<img src='./software-system-design-logo.png' width={1254} height={1254} alt='' />} wordmark={<span style={{ display: 'grid', lineHeight: 1.1 }}><span>Software-</span><span>System.</span><span>Design</span></span>} />}
      navigation={<><a href="#plans">Plans</a><a href="#community">Community</a></>}
      actions={<Badge tone="accent">OPEN SOURCE</Badge>}
      navigationLabel="Main navigation" openLabel="Open navigation menu" closeLabel="Close navigation menu" />,
    footer: <SiteFooter brand={<BrandLockup variant='footer' href='https://software-system.design' label='Software-System.Design home' artwork={<img src='./software-system-design-logo.png' width={1254} height={1254} alt='' />} wordmark={<span style={{ display: 'grid', lineHeight: 1.1 }}><span>Software-</span><span>System.</span><span>Design</span></span>} />}
      navigation={<a href="https://software-system.design">Visit the studio</a>}
      legal="Built in the open." />,
    children: <div className="ssd-example-marketing">
      <SectionHeading headingLevel={1} eyebrow="SHARED FOUNDATIONS" title="From idea to software.">
        <p>Reusable components. Independent teams. One visual language.</p>
      </SectionHeading>
      <div className="ssd-example-grid" id="plans">
        <ContentCard title="Your infrastructure" headingLevel={2} header={<Badge>SELF HOSTED</Badge>}
          footer={<a href="#details">Explore deployment options</a>}>
          <p>The application owns its deployment and data.</p>
        </ContentCard>
        <Statistic label="ATOMIC LAYERS" value="4" description="Atoms, molecules, organisms and templates" />
      </div>
      <Disclosure id="details" summary="Who owns application state?">
        <p>The MFE owns data and business state. Components own isolated UI interactions.</p>
      </Disclosure>
    </div>,
  },
};
export const StudioCompactRtl: Story = { ...Studio, globals: {viewport:'compact',direction:'rtl'} };
