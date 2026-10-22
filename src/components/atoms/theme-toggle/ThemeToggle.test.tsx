import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle.js";
it("ThemeToggle preserves its consumer contract", async () => {
  const change = vi.fn();
  render(
    <ThemeToggle theme="dark" label="Light mode" onThemeChange={change} />,
  );
  await userEvent.click(screen.getByRole("button", { name: "Light mode" }));
  expect(change).toHaveBeenCalledWith("light");
  expect(document.documentElement).not.toHaveAttribute("data-theme");
});
