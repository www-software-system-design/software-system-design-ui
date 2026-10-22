import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContentState } from "./ContentState.js";
const meta = {
  title: "Organisms/ContentState",
  component: ContentState,
  tags: ["autodocs"],
  args: {
    status: "loading",
    title: "Gathering the builders",
    children: <p>Loading public contributor records.</p>,
  },
} satisfies Meta<typeof ContentState>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
  args: { status: "empty", title: "No matching records" },
};
