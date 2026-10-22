import type { Meta, StoryObj } from "@storybook/react-vite";
import { Statistic } from "./Statistic.js";
const meta = {
  title: "Molecules/Statistic",
  component: Statistic,
  tags: ["autodocs"],
  args: {
    label: "RECORDED RUNS",
    value: "120",
    description: "Synthetic records in this view",
  },
} satisfies Meta<typeof Statistic>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
