import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea.js";
const meta = {
  title: "Atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    "aria-label": "Description",
    defaultValue: "Describe your contribution",
    rows: 4,
  },
} satisfies Meta<typeof TextArea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
