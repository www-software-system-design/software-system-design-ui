# Container component extraction — 2026-10-22

This implementation decomposed presentation from `ssd-info-ui-container` into
`@software-system.design/ui`, prepared version 0.2.0, and adopted the container's
modern light/dark palette and supplied Storybook identity. No npm publication or
deployment was performed.

The [migration guide](../container-extraction.md) documents the public contracts;
[ADR 0014](../adr/0014-container-components-and-brand.md) records boundaries and
alternatives. All fourteen components have local exports, client directives,
typed stories, and behavior tests. They also have deliberate package subpaths.

## Changes in the library and consumer

- Atoms: Badge, TextArea, ThemeToggle.
- Molecules: SectionHeading, ContentCard, Disclosure, TextField, Pagination, Statistic.
- Organisms: SiteHeader, SiteFooter, DataTable, ContentState.
- Template: MarketingLayout.

The seven routes use shared chrome and relevant content primitives. Product
diagrams, page copy, pricing definitions, Next navigation/images, contributor
loading, dataset processing, board authentication/permissions/mutations, draft
editing and theme persistence remain application-owned. Menu/disclosure state
can be controlled or isolated; pagination and theme changes remain controlled.

The container installs `vendor/software-system.design-ui-0.2.0.tgz` with a file
dependency and lockfile. It is a real npm archive, independently installable
without this sibling checkout. Installed CSS and heading output were compared
with the final dist files. Registry adoption after an authorized release is
documented in both repositories.

Storybook now uses the supplied logo/favicon, branded dark manager and dark
initial preview. Light/system themes, scoped overrides, RTL, French and Malayalam
remain available. New semantic background/divider/status tokens preserve
contrast-critical borders and focus indicators.

## Actual test-first evidence

1. Generated fourteen colocated scaffolds using the existing generator. Replaced
   each placeholder test with an observable consumer contract before implementation.
   Vitest reported **14 failed / 55 passed**; after implementation, **69 passed**.
2. Added brand-background/accent assertions before changing tokens: **2 failed /
   4 passed**. After applying the palette, all six token tests passed, including
   existing AA text/action and control/focus contrast requirements.
3. The plans page landmark regression failed because the original header lived
   inside main. The new template exposes header/footer landmarks outside main;
   all seven route checks subsequently passed.
4. Browser story checks caught an invalid group role on an article, insufficient
   foreground contrast in a scoped action override, and a skipped heading level
   in the composed example. Fixed semantics, paired foreground/background tokens,
   and the example's heading level; the full story suite passed afterward.
5. The persisted-theme browser test failed after reloading light mode. Removed
   an application effect that reapplied the server's initial dark theme during
   hydration. The application now applies document changes through its prepaint
   script, explicit toggle handler, and storage subscription. The test passed.
6. Screenshot review exposed a desktop menu trigger overriding its hidden state.
   Added a failing desktop regression, increased the component selector's
   specificity, and confirmed it passed while compact navigation remained usable.
7. Added a failing heading-grouping regression before restoring the eyebrow/title
   group separately from supporting content. This preserves split heading layouts.

## Final verification

| Command / check | Observed result |
| --- | --- |
| `npm.cmd run check` | Passed: architecture/lint, TypeScript, **77 unit**, **2 generator**, **3 Vitest configuration**, **8 release** tests; build and **95 packed files** validated |
| `npm.cmd run test:stories` | **73 passed**, including interaction and accessibility checks |
| `npm.cmd run build:storybook` | Static build passed, supplied assets copied |
| `npm.cmd run test:integration` | Production Next.js consumer built from the tarball; **5 browser tests passed**, including JavaScript-disabled initial HTML and hydration |
| Visual suite with isolated port 6016 | **15 passed**; three new light/dark/compact RTL screenshots reviewed before acceptance |
| Container lint and TypeScript | Passed |
| Container `npm.cmd run build` | Passed; all seven pages prerendered and API routes remained server routes |
| Existing container Node tests | **21 passed**, covering board reads/writes, sessions/origin enforcement and dataset processing |
| Container Playwright suite | **13 passed** against the production app, including all seven wide/compact page layouts, theme persistence, contributor retry/search, dataset controls, read-only board behavior, draft failure/retry and presentation slides |
| Packed output comparison and Git whitespace checks | Passed |

The visual suite used the existing ignored `.artifacts/visual-release.config.mjs`
to select port 6016 without stopping another Storybook instance. Container browser
tests use port 3110 and mock GitHub responses and writes; they made no real board
mutations. Desktop and compact consumer screenshots were also inspected manually.

The library lint run retains one warning in generated coverage JavaScript.
Storybook's browser bundle warns about client directives; the actual npm output
is built with tsc, and its directives were separately verified. These warnings
did not fail the checks. Passing automated accessibility checks is not a claim
of complete accessibility compliance.

Next dev generated the container's Next.js guidance/feedback blocks in AGENTS.md;
they were retained as instructed by the installed framework. No qualifying
framework issue remained for its feedback reporting pass.
