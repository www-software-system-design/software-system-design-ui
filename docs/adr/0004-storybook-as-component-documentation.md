# ADR 0004: Storybook as component documentation

- Date: 2026-10-20
- Status: Accepted
- Implementation: React/Vite Storybook, global controls, Button/provider stories, browser tests, and accessibility checks implemented.

## Context

Humans and agents need executable examples of supported component behavior. A component source file or API type alone does not show valid visual states, composition, themes, or localization behavior.

## Decision

Every public visual component must have colocated, typed Storybook stories. Component changes must update affected stories and documentation as part of the same work.

Document props, defaults, controlled/uncontrolled usage where supported, accessibility expectations, and rendering boundaries. Cover applicable variants, sizes, disabled, loading, error, empty, and interactive states. Do not invent states that are irrelevant to the component.

Include realistic compositions. Keep stories deterministic and independent of live services; use stable fixtures and explicit mocks. Stories are examples and test fixtures, not a replacement for behavioral assertions or SSR/RSC integration tests.

## Integration

Provide global controls for theme, locale, text direction, and viewport. Reuse story setup for browser interaction, accessibility, and selected visual regression tests. Prefer Storybook's compatible Vitest integration rather than maintaining duplicate interaction suites for the same behavior.

Require a Storybook production build in CI and relevant story tests for component changes. The scaffold uses the React/Vite adapter independently of the Next.js integration consumer; concrete tooling versions are recorded in [ADR 0010](0010-scaffold-tooling-and-initial-compatibility.md).

## Alternatives considered

- Optional stories: allows documentation to drift and leaves new components undiscoverable.
- Static screenshots alone: cannot explain interaction or controlled usage.
- Treat every story as proof of correctness: a rendered example does not establish behavior without assertions.

## Consequences

Stories are part of the component contract and completion criteria. Maintaining deterministic fixtures takes effort but supports reusable tests and consistent review.

## Required implementation evidence

Build Storybook, run applicable interactions and accessibility checks, and inspect representative responsive, theme, and locale states. Document SSR/RSC limitations separately rather than inferring compatibility from a successful story render.

## References

- [Storybook testing](https://storybook.js.org/docs/writing-tests)
