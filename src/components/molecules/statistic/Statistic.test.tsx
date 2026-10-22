import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Statistic } from "./Statistic.js";
it("Statistic preserves its consumer contract", async () => {
  render(
    <Statistic
      label="Recorded runs"
      value="120"
      description="Synthetic data"
    />,
  );
  expect(
    screen.getByRole("group", { name: "Recorded runs" }),
  ).toHaveTextContent("120");
  expect(screen.getByText("Synthetic data")).toBeVisible();
});
