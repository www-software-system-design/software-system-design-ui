import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { TextField } from "./TextField.js";
const meta = {
  title: "Molecules/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    label: "Email address",
    type: "email",
    description: "Used only by your application.",
    placeholder: "you@example.com",
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox");
    await userEvent.type(input, "builder@example.com");
    await expect(input).toHaveValue("builder@example.com");
  },
};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
