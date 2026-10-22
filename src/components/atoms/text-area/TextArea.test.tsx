import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { TextArea } from "./TextArea.js";
it("TextArea preserves its consumer contract", async () => {
  render(<TextArea aria-label="Description" disabled defaultValue="Draft" />);
  expect(screen.getByRole("textbox", { name: "Description" })).toBeDisabled();
  expect(screen.getByRole("textbox")).toHaveValue("Draft");
  expect(screen.getByRole("textbox")).toHaveClass("ssd-text-area");
});
