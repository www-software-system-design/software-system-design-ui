import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContentCard } from "./ContentCard.js";
const meta = {
  title: "Molecules/ContentCard",
  component: ContentCard,
  tags: ["autodocs"],
  args: {
    title: "Self hosted",
    header: <span>YOUR INFRASTRUCTURE</span>,
    children: <p>Run on infrastructure you control.</p>,
    footer: <a href="#details">Explore the plan</a>,
  },
} satisfies Meta<typeof ContentCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
