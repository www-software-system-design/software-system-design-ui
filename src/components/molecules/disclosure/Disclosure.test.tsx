import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Disclosure } from "./Disclosure.js";
it("Disclosure preserves its consumer contract", async () => {
  render(<Disclosure summary="Source details">Public records</Disclosure>);
  const trigger = screen.getByText("Source details");
  expect(trigger.tagName).toBe("SUMMARY");
  await userEvent.click(trigger);
  expect(trigger.parentElement).toHaveAttribute("open");
});

it('reports requests while the controlled owner keeps it closed',async()=>{
  const change=vi.fn();
  render(<Disclosure summary="Controlled details" open={false} onOpenChange={change}>Content</Disclosure>);
  const summary=screen.getByText('Controlled details');
  await userEvent.click(summary);
  await waitFor(()=>expect(change).toHaveBeenCalledWith(true));
  expect(summary.parentElement).not.toHaveAttribute('open');
});

it('keeps separate uncontrolled disclosures independent',async()=>{
  render(<><Disclosure summary="First">A</Disclosure><Disclosure summary="Second" defaultOpen>B</Disclosure></>);
  await userEvent.click(screen.getByText('First'));
  expect(screen.getByText('First').parentElement).toHaveAttribute('open');
  expect(screen.getByText('Second').parentElement).toHaveAttribute('open');
});
