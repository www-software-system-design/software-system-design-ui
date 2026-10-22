import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent, within } from "storybook/test";
import { Pagination } from "./Pagination.js";
const meta = {
  title: "Molecules/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    page: 0,
    pageCount: 3,
    onPageChange: fn(),
    label: "Record pages",
    previousLabel: "Previous page",
    nextLabel: "Next page",
    pageLabel: "Page 1 of 3",
  },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    await expect(
      c.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    await userEvent.click(c.getByRole("button", { name: "Next page" }));
    await expect(args.onPageChange).toHaveBeenCalledWith(1);
  },
};
export const CompactRtl: Story = {
  globals: { viewport: "compact", direction: "rtl" },
};
