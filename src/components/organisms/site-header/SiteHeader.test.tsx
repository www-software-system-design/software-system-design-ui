import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { SiteHeader } from "./SiteHeader.js";
it("SiteHeader preserves its consumer contract", async () => {
  render(
    <>
      <SiteHeader
        brand={<a href="/">Studio</a>}
        navigation={<a href="/plans">Plans</a>}
        navigationLabel="Main"
        openLabel="Open menu"
        closeLabel="Close menu"
      />
      <SiteHeader
        brand="Other"
        navigation="Links"
        navigationLabel="Other"
        openLabel="Open menu"
        closeLabel="Close menu"
      />
    </>,
  );
  const triggers = screen.getAllByRole("button", { name: "Open menu" });
  expect(triggers[0]?.getAttribute("aria-controls")).not.toBe(
    triggers[1]?.getAttribute("aria-controls"),
  );
  await userEvent.click(triggers[0]!);
  expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
  await userEvent.keyboard("{Escape}");
  expect(triggers[0]).toHaveAttribute("aria-expanded", "false");
  expect(triggers[0]).toHaveFocus();
});

it('reports link activation without replacing the controlled owner',async()=>{
  const change=vi.fn();
  render(<SiteHeader brand="Studio" navigation={<a href="#details">Details</a>} navigationLabel="Main" openLabel="Open" closeLabel="Close" open onOpenChange={change}/>);
  await userEvent.click(screen.getByRole('link',{name:'Details'}));
  expect(change).toHaveBeenCalledWith(false);
  expect(screen.getByRole('button',{name:'Close'})).toHaveAttribute('aria-expanded','true');
});
