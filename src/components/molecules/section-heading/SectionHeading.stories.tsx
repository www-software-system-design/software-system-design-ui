import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeading } from "./SectionHeading.js";
const meta = {
  title: "Molecules/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
  args: {
    title: "Build in the open",
    eyebrow: "THE COMMUNITY",
    children: <p>Shared foundations for independent teams.</p>,
  },
} satisfies Meta<typeof SectionHeading>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
