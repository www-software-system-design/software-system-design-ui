import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent, within } from "storybook/test";
import { ThemeToggle } from "./ThemeToggle.js";
const meta = {
  title: "Atoms/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  args: { theme: "dark", label: "Switch to light theme", onThemeChange: fn() },
} satisfies Meta<typeof ThemeToggle>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button"));
    await expect(args.onThemeChange).toHaveBeenCalledWith("light");
  },
};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
