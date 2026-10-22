import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteHeader } from "./SiteHeader.js";
const meta = {
  title: "Organisms/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  args: {
    brand: <a href="/">Software-System.Design</a>,
    navigation: (
      <>
        <a href="/plans">Plans</a>
        <a href="/datasets">Datasets</a>
        <a href="/authors">Authors</a>
      </>
    ),
    navigationLabel: "Main navigation",
    openLabel: "Open navigation menu",
    closeLabel: "Close navigation menu",
  },
} satisfies Meta<typeof SiteHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
