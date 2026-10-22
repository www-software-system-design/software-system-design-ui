import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from './Button.js';

const meta = {
  title: 'Atoms/Button', component: Button, tags: ['autodocs'],
  args: { children: 'Save changes', onClick: fn() },
  parameters: { docs: { description: { component: 'Native button with an SSR-safe client boundary. Consumers own click handlers, state, and translated children. Loading prevents activation; loadingLabel overrides provider text. Import @software-system.design/ui/styles.css once in the host. No provider is required for English defaults.' } } }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Save changes' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  }
};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const ExplicitLoadingLabel: Story = { args: { loading: true, loadingLabel: 'Saving your changes' } };
export const LongLabel: Story = { args: { children: 'Alle Änderungen für die ausgewählten Architekturkomponenten speichern' }, globals: { viewport: 'compact' } };
export const Malayalam: Story = { args: { children: 'മാറ്റങ്ങൾ സംരക്ഷിക്കുക' }, globals: { locale: 'ml', direction: 'ltr', theme: 'dark' } };
export const Rtl: Story = { globals: { locale: 'en', direction: 'rtl' } };
