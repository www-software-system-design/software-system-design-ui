import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ContentState } from "./ContentState.js";
it("ContentState preserves its consumer contract", async () => {
  render(
    <ContentState status="loading" title="Loading contributors">
      Please wait
    </ContentState>,
  );
  expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  expect(
    screen.getByRole("heading", { name: "Loading contributors" }),
  ).toBeVisible();
});
