import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert.js';
const meta = { title: 'Controls/Feedback/Alert', component: Alert, tags: ['autodocs'], args: { title: 'Draft saved', children: 'You can continue editing.', tone: 'success' } } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = { globals: { viewport: 'compact', direction: 'rtl' } };
export const Assertive: Story = { args: { title: 'Connection lost', tone: 'danger', urgency: 'assertive', children: 'Retry when the connection is restored.' } };
