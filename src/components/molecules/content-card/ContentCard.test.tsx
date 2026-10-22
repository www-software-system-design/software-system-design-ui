import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ContentCard } from "./ContentCard.js";
it("ContentCard preserves its consumer contract", async () => {
  render(
    <ContentCard
      title="Self hosted"
      headingLevel={2}
      footer={<a href="/plans">Explore</a>}
    >
      Your infrastructure
    </ContentCard>,
  );
  expect(screen.getByRole("article")).toHaveAccessibleName("Self hosted");
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Self hosted",
  );
  expect(screen.getByRole("link")).toHaveAttribute("href", "/plans");
});
