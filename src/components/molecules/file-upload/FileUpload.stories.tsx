import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload.js';
const meta = { title: 'Controls/Forms/FileUpload', component: FileUpload, tags: ['autodocs'], args: { label: 'Attach documents', description: 'Files stay on your device until your application uploads them.', multiple: true } } satisfies Meta<typeof FileUpload>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { error: 'Review this field before continuing.' } };
