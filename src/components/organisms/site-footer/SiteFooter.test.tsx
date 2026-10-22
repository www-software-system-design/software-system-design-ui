import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { SiteFooter } from "./SiteFooter.js";
it("SiteFooter preserves its consumer contract", async () => {
  render(
    <SiteFooter
      brand="Studio"
      navigation={<a href="/about">About</a>}
      legal="Apache 2.0"
    />,
  );
  expect(screen.getByRole("contentinfo")).toHaveTextContent("Apache 2.0");
  expect(screen.getByRole("link", { name: "About" })).toBeVisible();
});
