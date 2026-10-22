import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge.js";
const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Checks passed", tone: "success" },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
