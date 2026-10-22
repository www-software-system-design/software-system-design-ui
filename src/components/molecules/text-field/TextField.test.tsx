import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { TextField } from "./TextField.js";
it("TextField preserves its consumer contract", async () => {
  render(
    <>
      <TextField label="Email" error="Enter an address" />
      <TextField label="Email" description="Optional" />
    </>,
  );
  const inputs = screen.getAllByRole("textbox", { name: "Email" });
  expect(inputs[0]).toHaveAccessibleDescription("Enter an address");
  expect(inputs[0]).toHaveAttribute("aria-invalid", "true");
  expect(inputs[0]?.id).not.toBe(inputs[1]?.id);
});
