import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ExplorerLayout } from './ExplorerLayout.js';
import { ComponentExplorer } from '../../../../.storybook/examples/ComponentExplorer.js';

const meta = {
  id: 'templates-explorer-layout', title: 'Templates/ExplorerLayout', component: ExplorerLayout, tags: ['autodocs'],
  args: {
    header: <h1>Component explorer</h1>, contentLabel: 'Browse the library',
    sidebar: <><h2>Library foundations</h2><p>Atoms, molecules, organisms, and templates.</p></>, sidebarLabel: 'Library information',
    children: <ComponentExplorer />,
    footer: <p>Reusable UI. Consumer-owned data and state.</p>
  },
  parameters: { docs: { description: { component: 'Stateless composition template with header, toolbar, sidebar, content, and footer slots. Uses container queries to adapt to available MFE width. The host supplies page landmarks; this component never adds a main element. A sidebar requires its own accessible label at the type level. The example composes every atomic layer with consumer-owned filtering.' } } }
} satisfies Meta<typeof ExplorerLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
export const Composed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('searchbox'), 'TextInput');
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1);
    await expect(canvas.getByRole('listitem')).toHaveTextContent('TextInput');
  }
};
export const Compact: Story = { globals: { viewport: 'compact' } };
export const Dark: Story = { globals: { theme: 'dark' } };
export const Rtl: Story = { globals: { locale: 'en', direction: 'rtl' } };
export const WithoutSidebar: Story = {
  render: () => <ExplorerLayout header={<h1>Focused view</h1>} contentLabel="Components"><ComponentExplorer /></ExplorerLayout>
};
export const Malayalam: Story = {
  args: { header: <h1>ഘടകങ്ങൾ കണ്ടെത്തുക</h1>, contentLabel: 'ശേഖരം കാണുക', sidebar: <p>വീണ്ടും ഉപയോഗിക്കാവുന്ന ഘടകങ്ങൾ</p>, sidebarLabel: 'ശേഖരത്തെക്കുറിച്ചുള്ള വിവരങ്ങൾ', footer: <p>എല്ലാ ആപ്പുകൾക്കും പൊതുവായ ഇന്റർഫേസ്</p>, children: <ComponentExplorer title="ഘടകങ്ങൾ കാണുക" /> },
  globals: { locale: 'ml', direction: 'ltr', theme: 'dark' }
};
