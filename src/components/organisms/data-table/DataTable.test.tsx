import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { DataTable } from "./DataTable.js";
it("DataTable preserves its consumer contract", async () => {
  render(
    <DataTable label="Run records" caption="Synthetic runs">
      <thead>
        <tr>
          <th scope="col">Run</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>R1</td>
        </tr>
      </tbody>
    </DataTable>,
  );
  expect(screen.getByRole("table", { name: "Synthetic runs" })).toBeVisible();
  expect(screen.getByRole("region", { name: "Run records" })).toHaveAttribute(
    "tabindex",
    "0",
  );
});
