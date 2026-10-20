# ADR 0003: Mandatory TDD and complementary testing layers

- Date: 2026-10-20
- Status: Accepted
- Implementation: Vitest/Testing Library, generator tests, Storybook browser tests, Playwright visual/consumer checks, and CI workflow implemented.

## Context

The library is a foundation for multiple MFEs. Regressions propagate to consumers, and automated development needs a repeatable behavioral specification. Unit tests and component tests overlap: the former describes scope, while the latter describes the subject under test.

## Decision

All new or changed executable behavior follows red, green, refactor:

1. Write a test expressing expected observable behavior.
2. Run it and confirm failure for the intended missing behavior.
3. Implement the smallest change that passes.
4. Refactor while keeping relevant tests passing.

Begin bug fixes with a regression test. Test public behavior rather than private implementation details. Documentation-only changes do not require artificial tests. Pure appearance changes require representative stories and visual review; they do not require meaningless DOM assertions.

Establish missing test tooling before implementing component behavior. Report actual commands and outcomes, including the initial failure; never invent a red/green history. CI can enforce passing checks but cannot by itself prove test-first development.

## Tooling and layers

| Layer | Purpose | Tools |
| --- | --- | --- |
| Unit | Utilities, reducers, focused hooks | Vitest; hook rendering utilities as needed |
| Component behavior | Rendering, callbacks, controlled state, keyboard interaction | Vitest, React Testing Library, user-event, jest-dom |
| Documented compositions | Story interactions and automated accessibility checks | Storybook Vitest integration with a Playwright browser provider; compatible accessibility tooling |
| Browser and visual | Layout, clipping, focus behavior, theme rendering, screenshot regression | Playwright Test against representative stories |
| Package integration | Public imports, SSR/hydration, consumption from MFE Server Components | Packed-package Next.js consumer with Playwright; see [ADR 0009](0009-packed-package-nextjs-consumer-tests.md) |

Testing Library supplies rendering and interaction helpers; it is not a standalone runner. A simulated DOM does not reliably verify layout or visual rendering. Browser tests complement fast tests; do not copy every assertion into every layer. Full business journeys belong primarily in MFE test suites.

Confirm compatible versions and configuration before adopting this stack. Establish scripts and CI gates explicitly; no proposed command should be reported as already available.

## Alternatives considered

- Testing Library alone: omits a runner and browser/visual coverage.
- Browser tests for everything: adds runtime and setup cost for logic that can be tested directly.
- Snapshot-only coverage: does not establish correct interaction behavior.

## Consequences

Behavior changes need test-first evidence and relevant regression coverage. Browser baselines require stable rendering environments and deliberate review. Automated accessibility checks complement keyboard and manual assessment; they do not establish complete accessibility compliance.

## Required implementation evidence

Show meaningful red/green results for behavior changes and passing applicable regression checks. Validate that CI actually runs the configured suites, and review visual changes rather than automatically accepting new baselines.

## References

- [Testing Library](https://testing-library.com/docs/)
- [Storybook testing](https://storybook.js.org/docs/writing-tests)
- [Playwright screenshot assertions](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1)
