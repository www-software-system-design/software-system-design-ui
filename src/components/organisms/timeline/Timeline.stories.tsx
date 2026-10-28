import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Timeline } from './Timeline.js';

const meta = { title: 'Organisms/Timeline', component: Timeline, tags: ['autodocs'], args: { label: 'Delivery journey', items: [{id:'foundation', phase:'01 / Foundation', status:'Planned', title:'Define the system', description:'Connect intent to delivery.'}, {id:'preview', phase:'02 / Preview', status:'Planned', title:'Verify the increment', description:'Inspect a working preview.'}] } } satisfies Meta<typeof Timeline>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({canvasElement}) => { const c = within(canvasElement); await expect(c.getByRole('list', {name:'Delivery journey'})).toBeVisible(); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
