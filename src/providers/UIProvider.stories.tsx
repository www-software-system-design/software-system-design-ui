import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIProvider } from './UIProvider.js';
import { Button } from '../components/atoms/button/Button.js';

const meta = {
  title: 'Foundations/UIProvider', component: UIProvider, tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Optional DOM scope for theme, locale, direction, and library messages. Nested providers inherit unspecified values. Direction is explicit; locale does not automatically infer RTL. Does not mutate document globals or persist preferences. Place portal containers inside the scope. Consumers own preference storage and first-paint setup.' } } }
} satisfies Meta<typeof UIProvider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const IsolatedScopes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <UIProvider theme="light" style={{ padding: '1rem' }}><Button>Light scope</Button></UIProvider>
      <UIProvider theme="dark" style={{ padding: '1rem' }}>
        <Button>Dark scope</Button>
        <UIProvider theme="light" style={{ padding: '1rem', marginBlockStart: '1rem' }}><Button variant="secondary">Nested light scope</Button></UIProvider>
      </UIProvider>
    </div>
  )
};
export const LocalizedLoading: Story = {
  args: { locale: 'ml', direction: 'ltr', messages: { loading: 'ലോഡ് ചെയ്യുന്നു' }, children: <Button loading>Save</Button> }
};
