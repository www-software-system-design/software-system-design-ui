import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { SectionHeading } from "./SectionHeading.js";
it("SectionHeading preserves its consumer contract", async () => {
  render(
    <SectionHeading title="Build together" eyebrow="COMMUNITY" headingLevel={1}>
      Open to everyone
    </SectionHeading>,
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "Build together" }),
  ).toBeVisible();
  expect(screen.getByText("Open to everyone")).toBeVisible();
});

it('keeps the eyebrow and title together beside supporting content',()=>{
  render(<SectionHeading title="How it works" eyebrow="THE PROCESS"><p>Supporting description</p></SectionHeading>);
  const titleGroup=screen.getByRole('heading',{name:'How it works'}).parentElement;
  expect(titleGroup).toContainElement(screen.getByText('THE PROCESS'));
  expect(titleGroup).not.toContainElement(screen.getByText('Supporting description'));
});
