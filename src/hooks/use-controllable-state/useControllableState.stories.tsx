import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../../components/atoms/button/index.js';
import { useControllableState } from './useControllableState.js';

function HookExample() {
  const [value, setValue] = useControllableState({ defaultValue: 'First' });
  return <div><p>Selected value: <output aria-label="Selected value">{value}</output></p><Button onClick={() => setValue(value === 'First' ? 'Second' : 'First')}>Toggle value</Button></div>;
}

const meta = {
  title: 'Foundations/Hooks/ControllableState', component: HookExample,
  parameters: { docs: { description: { component: 'Concrete-value setter with controlled or isolated uncontrolled ownership. Undefined means uncontrolled. Keep mode stable; defaultValue is initialization only. Notifications run outside React state updaters. This demonstration is story-only and excluded from publication.' } } }
} satisfies Meta<typeof HookExample>;
export default meta;
export const IsolatedState: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle value' }));
    await expect(canvas.getByLabelText('Selected value')).toHaveTextContent('Second');
  }
};
