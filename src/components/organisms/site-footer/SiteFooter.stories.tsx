import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteFooter } from "./SiteFooter.js";
const meta = {
  title: "Organisms/SiteFooter",
  component: SiteFooter,
  tags: ["autodocs"],
  args: {
    brand: <strong>Software-System.Design</strong>,
    navigation: (
      <nav aria-label="Footer">
        <a href="/open-source">Open source</a>
      </nav>
    ),
    legal: "Built in the open.",
  },
} satisfies Meta<typeof SiteFooter>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
