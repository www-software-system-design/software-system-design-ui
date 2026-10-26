import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { PrincipleList } from './PrincipleList.js';

const meta = { title: 'Molecules/PrincipleList', component: PrincipleList, tags: ['autodocs'], args: { label: 'Principles', items: [{ id: 'people', title: 'People set direction', description: 'Keep human responsibility explicit.' }, { id: 'contracts', title: 'Shared contracts', description: 'Document open participation.' }, { id: 'quality', title: 'Quality engineering', description: 'Build and learn together.' }] }, } satisfies Meta<typeof PrincipleList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { play: async ({ canvasElement }) => { const c = within(canvasElement); await expect(c.getAllByRole('listitem')).toHaveLength(3); } };
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };


