# Organisms

Compose reusable UI sections from lower layers. Expose consumer-controlled state and use scoped context only when justified. Do not fetch application data or import MFE stores.

`search-panel/` is the reference example. It composes SearchField, accepts query/results/request state from the consumer, and presents localized counts plus ready/loading/error/empty states. Tests exercise a real consumer-owned filtering composition; stories show interactions, French, and Malayalam. No store or networking dependency is introduced.
