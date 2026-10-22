import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Badge } from "./Badge.js";
it("Badge preserves its consumer contract", async () => {
  render(<Badge tone="success">Passed</Badge>);
  expect(screen.getByText("Passed")).toHaveAttribute("data-tone", "success");
});
