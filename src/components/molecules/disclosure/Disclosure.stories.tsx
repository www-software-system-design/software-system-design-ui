import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Disclosure } from "./Disclosure.js";
const meta = {
  title: "Molecules/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  args: {
    summary: "Where does this data come from?",
    children: <p>Records are supplied by the application.</p>,
  },
} satisfies Meta<typeof Disclosure>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByText("Where does this data come from?"));
    await expect(
      c.getByText("Records are supplied by the application."),
    ).toBeVisible();
  },
};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
