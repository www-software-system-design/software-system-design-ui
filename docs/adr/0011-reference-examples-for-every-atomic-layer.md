# ADR 0011: Reference examples for every atomic layer

- Date: 2026-10-20
- Status: Accepted as part of the owner's request for examples across all layers.
- Implementation: Components, hooks, catalogs, tokens, stories, and tests implemented; see current validation results in the implementation change.

## Context

The initial scaffold demonstrated Button and UIProvider, leaving higher atomic layers as extension points. Humans and agents need concrete examples of composition, state ownership, internationalization, token use, and testing at every level without duplicating server/client hierarchies or adding business dependencies.

## Decision

Use a coherent exploration pattern: TextInput and Button atoms compose into SearchField, SearchField composes into SearchPanel, and ExplorerLayout arranges content through slots. The examples extend the existing structure rather than introducing new architectural layers.

- TextInput forwards native input semantics and React 19 refs. It requires the consumer to supply a visible label or a suitable containing composition.
- SearchField supplies visible labels, useId associations, hint/error descriptions, and a localized clear action that returns keyboard focus. A shared useControllableState hook supports controlled values or isolated defaults. Its concrete-value setter is intentionally distinct from React's functional-updater setter.
- SearchPanel receives query, result count, children, and explicit request state. It does not fetch or filter application data. It uses configurable heading depth, status feedback, and full localized plural messages.
- ExplorerLayout owns layout only, uses named slots and container queries, and does not introduce a main landmark. A sidebar requires an accessible label at the type level.
- Story-only fixtures and consumer filtering live outside the published runtime. Controlled story examples use real React wrappers so browser tests exercise the same ownership pattern as an MFE.

Provide opt-in frozen English, French, and Malayalam catalogs, preserving explicit catalog/direction setup. Count formatting uses all six CLDR categories and locale-aware numbering, with safe English fallback for malformed locales. Locale numbering systems are not inferred from script stereotypes; `ml-u-nu-mlym` explicitly requests Malayalam digits.

Add semantic muted/error/subtle-surface tokens and demonstrate public CSS overrides. Verify active-text and control/focus contrast independently of screenshots. Existing light/dark/system contracts remain unchanged.

Public imports use component names rather than atomic paths: text-input, search-field, search-panel, explorer-layout, hooks, i18n, and token-only CSS. The message interface gains search/result labels and plural patterns; consumers defining a complete UIMessages catalog must add these keys. Partial provider overrides continue to inherit unspecified defaults. Record this compatibility impact before release.

## Alternatives considered

- Unrelated examples at each level: demonstrates files without showing how the library composes into a usable interface.
- Business data/state inside the organism: couples MFEs to application behavior and obscures component contracts.
- Hook ceilings by atomic level: conflicts with the state-ownership decision in ADR 0006.
- Concatenate translated count/suffix fragments: fails languages with different plural forms and sentence structures.
- Use screenshots as the only token/accessibility checks: can preserve visually similar but inaccessible values.

## Consequences

Every atomic level has executable examples and component tests. Unit tests cover the reusable hook, pure localization, and token contrast invariants. Storybook covers variants, controlled/uncontrolled use, localization, themes, and real interactions. The private packed-package consumer now exercises every layer and a public hook, including initial HTML and hydration.

These examples target relevant WCAG 2.2 AA practices and strict TypeScript conventions. They do not certify every international standard, every assistive technology, or every consumer override. Browser references remain Windows Chromium; the existing compatibility and tooling limitations in ADR 0010 still apply.

## Required implementation evidence

The stub run produced 36 expected failing behavior assertions, followed by a passing 49-test fast suite. Separate token tests first failed for missing semantic values, then all four contrast checks passed. The new consumer composition test failed before the fixture exposed the example, then passed after installing the updated tarball.

Current validation covers 53 fast unit/component/token tests, two generator tests, 41 Storybook browser tests with configured accessibility checks, ten browser/visual checks, and four packed Next.js consumer tests. Initial light/dark composition screenshots were inspected. Later changes must report their own results rather than reuse these counts as proof.

See [reference examples](../examples.md) for responsibilities, API usage, and standards references.
