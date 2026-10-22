# ADR 0002: Atomic design and stable component structure

- Date: 2026-10-20
- Status: Accepted
- Implementation: Atomic scaffold, component generator, and dependency/artifact checks implemented. Every level now has a reference component with tests and stories; see ADR 0011.

## Context

Agents and humans need predictable component locations and extension points. Separate atomic trees for server and client components would encourage duplicated implementations. Atomic classification should describe UI composition rather than execution environment or hook choice.

## Decision

Use atoms, molecules, organisms, and templates for reusable UI. Application pages and domain workflows belong in consuming MFEs. Lower atomic layers must not depend on higher layers; prohibit circular dependencies. Prefer composition, children, slots, and explicit variants over duplicated markup or growing collections of boolean switches.

Do not force every feature through every atomic layer. A component's responsibility determines its classification.

## Scaffold

```text
src/
  components/
    atoms/
      button/
        Button.tsx
        Button.test.tsx
        Button.stories.tsx
        index.ts
    molecules/
    organisms/
    templates/
  hooks/
  providers/
  tokens/
  styles/
  i18n/
  utilities/
  index.ts
.storybook/
tests/
  integration/
    nextjs-consumer/
docs/
  adr/
```

Colocate implementation, tests, stories, and local exports. Add style, type, reducer, or helper files only when useful. Rendering boundaries are addressed in [ADR 0005](0005-server-and-client-component-boundaries.md), within this single hierarchy. The Next.js consumer is an unpublished test application for SSR, hydration, and consumption from MFE Server Components, not a collection of library Server Components; see [ADR 0009](0009-packed-package-nextjs-consumer-tests.md).

Public component entry points omit atomic categories, so reclassification does not change consumer imports. The agreed public package name is `@software-system.design/ui`, as finalized in [ADR 0013](0013-short-ui-package-name.md). Run `npm run generate:component -- atoms Example` to generate an implementation with its client boundary, intentionally failing test, story, and local exports without creating server/client variants. Public entry points remain deliberate review steps rather than automatic exports of unfinished components.

Architecture changes need an ADR explaining alternatives, compatibility, and migration impact. Routine component additions follow the established scaffold.

## Alternatives considered

- Parallel `server/atoms` and `client/atoms` trees: duplicates organization and encourages redundant UI.
- Export source paths containing atomic categories: makes internal reclassification a consumer-breaking change.
- Generate every possible file: increases maintenance without corresponding behavior.

## Consequences

Components have one discoverable home. Contributors must exercise judgment about decomposition rather than treating atomic levels as size or hook limits.

## Required implementation evidence

Verify dependency direction, absence of cycles, public exports, and an example of extending an existing component without duplicating its implementation. Generator verification must cover actual generated output if a generator is introduced.
