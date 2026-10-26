import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Carousel } from './Carousel.js';
import { ContentCard } from '../../molecules/content-card/index.js';
const meta = { title: 'Organisms/Carousel', component: Carousel, tags: ['autodocs'], args: { label: 'Highlights', labels: { previous: 'Previous slide', next: 'Next slide', pause: 'Pause slides', resume: 'Resume slides', indicators: 'Choose a slide', carousel: 'carousel', slide: 'slide' }, slides: [{ id: 'product', label: 'Product', content: <ContentCard title='Build in the open'><p>Consumer-supplied product overview.</p><a href='#product'>Explore the product</a></ContentCard> }, { id: 'standards', label: 'Standards', content: <ContentCard title='Shared contracts'><p>Open participation and reusable tools.</p><a href='#standards'>Explore standards</a></ContentCard> }] }, } satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({ canvasElement }) => { const c = within(canvasElement); await userEvent.click(c.getByRole('button', { name: 'Next slide' })); await expect(c.getByRole('link', { name: 'Explore standards' })).toBeVisible(); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Automatic: Story = { args: { interval: 6500 } };

