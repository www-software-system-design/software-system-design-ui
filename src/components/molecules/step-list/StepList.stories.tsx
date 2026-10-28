import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { StepList } from './StepList.js';

const meta = { title: 'Molecules/StepList', component: StepList, tags: ['autodocs'], args: { label: 'Review process', items: [{id:'define', title:'Define', description:'Describe the intended outcome.'}, {id:'review', title:'Review', description:'Inspect the evidence.'}] } } satisfies Meta<typeof StepList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({canvasElement}) => { const c = within(canvasElement); await expect(c.getByRole('list', {name:'Review process'})).toBeVisible(); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
