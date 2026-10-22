import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "./DataTable.js";
const meta = {
  title: "Organisms/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    label: "Run records",
    caption: "Example agent runs",
    children: (
      <>
        <thead>
          <tr>
            <th scope="col">Run</th>
            <th scope="col">Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">RUN-001</th>
            <td>Passed</td>
          </tr>
        </tbody>
      </>
    ),
  },
} satisfies Meta<typeof DataTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
