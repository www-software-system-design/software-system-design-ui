import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion.js';
const meta = { title: 'Controls/Content/Accordion', component: Accordion, tags: ['autodocs'], args: { label: 'Frequently asked questions', items: [{ id: 'usage', title: 'How do MFEs use these controls?', content: 'Import the package and its styles once.', defaultOpen: true }, { id: 'data', title: 'Who owns application data?', content: 'The consuming MFE owns data and business state.' }] } } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
