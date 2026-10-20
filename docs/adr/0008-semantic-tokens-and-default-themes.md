# ADR 0008: Semantic tokens and default light/dark themes

- Date: 2026-10-20
- Status: Accepted
- Implementation: Namespaced CSS tokens, scoped light/dark/system themes, reduced motion, and browser/screenshot checks implemented. No overlay/portal component exists yet.

## Context

All MFEs need consistent light/dark UI with controlled extension. Hardcoded component colors and global stylesheet assumptions make themes difficult to evolve and can cause styling collisions between MFEs.

## Decision

Every component supports light and dark themes by default. Components use semantic design tokens for color, spacing, typography, borders, elevation, and motion rather than independent visual constants. Themes must cover interactive and feedback states, including focus, disabled, loading, and error states where applicable.

## Implementation contract

Expose documented, namespaced CSS custom properties and deliberate stylesheet entry points. Define explicit light/dark selection and system-preference behavior. Allow scoped overrides so independently mounted MFEs can coexist and opt into host-level theme inheritance without a shared mutable singleton.

Use CSS for presentational theme resolution where possible. An optional client provider can coordinate interactive theme selection; static components should not need a client hook to consume CSS tokens. Initial server and client markup must agree. Configure any theme preference bootstrap at the consumer boundary and verify that it avoids visible theme flashes in supported scenarios.

Avoid unscoped resets or global selectors that unexpectedly affect the host. Define token extension points and compatibility policy; consumers should not override private component selectors. Reduced-motion preferences and usable focus indicators must remain supported across themes.

## Alternatives considered

- Per-component hardcoded palettes: creates inconsistent themes and costly updates.
- One global mutable theme singleton: prevents independent MFE roots and scoped themes.
- Client context for every style decision: adds unnecessary JavaScript and hydration dependencies to presentation.

## Consequences

Tokens become a public contract and require deliberate versioning. Nested scopes, portals, and overlays need an explicit strategy to inherit the intended theme. Visual regression baselines must cover representative light/dark states.

## Required implementation evidence

Verify explicit light/dark themes, system preference, independent and nested theme scopes, and themed overlays/portals where present. Review contrast and focus visibility; run relevant accessibility and screenshot checks. Test initial SSR/hydration behavior and document stylesheet installation and token overrides. Storybook must expose theme controls.
