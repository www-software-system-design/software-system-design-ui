import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Pagination } from "./Pagination.js";
it("Pagination preserves its consumer contract", async () => {
  const change = vi.fn();
  render(
    <Pagination
      page={0}
      pageCount={2}
      onPageChange={change}
      label="Pages"
      previousLabel="Previous"
      nextLabel="Next"
      pageLabel="Page 1 of 2"
    />,
  );
  expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(change).toHaveBeenCalledWith(1);
});

it.each([0,1])('does not request pages for a %i-page collection',async(pageCount)=>{
  const change=vi.fn();
  render(<Pagination page={0} pageCount={pageCount} onPageChange={change} label="Pages" previousLabel="Previous" nextLabel="Next" pageLabel="No other pages"/>);
  for(const button of screen.getAllByRole('button')){
    expect(button).toBeDisabled();
    await userEvent.click(button);
  }
  expect(change).not.toHaveBeenCalled();
});
