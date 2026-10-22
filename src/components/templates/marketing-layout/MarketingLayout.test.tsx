import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { MarketingLayout } from "./MarketingLayout.js";
it("MarketingLayout preserves its consumer contract", async () => {
  render(
    <MarketingLayout
      header={<header>Navigation</header>}
      footer={<footer>Legal</footer>}
    >
      <h1>Studio</h1>
    </MarketingLayout>,
  );
  const main = screen.getByRole("main");
  expect(main).toContainElement(screen.getByRole("heading"));
  expect(main).not.toContainElement(screen.getByRole("banner"));
  expect(main).not.toContainElement(screen.getByRole("contentinfo"));
});
