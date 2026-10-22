# Templates

Provide reusable layouts and slots. Consuming MFEs own pages, routing, business workflows, and data loading. Do not create placeholder templates merely to fill the atomic hierarchy.

`explorer-layout/` is the reference example: header, optional toolbar/sidebar/footer, and a named content slot. It has no business state and adds no main landmark. Container queries adapt to the available MFE width. Tests verify slot semantics and preservation of consumer state; stories compose all atomic levels. Browser checks cover narrow widths, RTL placement, and light/dark appearance.
