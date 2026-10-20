# ADR 0001: Shared React package and MFE boundaries

- Date: 2026-10-20
- Status: Accepted
- Implementation: Scaffold implemented with ESM modules, declarations, public exports, React peers, and packed-file validation. Publication remains disabled pending npm identity and license confirmation.

## Context

All MFEs under software-system.design need a reusable npm component library. Its structure and public contracts must remain dependable as humans and agents add components. Application-specific dependencies would make the shared foundation difficult to reuse.

## Decision

Build a TypeScript React UI package. Consuming MFEs own routing, authentication, API clients, database access, server operations, business state, and application workflows. The library owns reusable presentation, UI behavior, accessibility, themes, and localization contracts.

Keep Next.js outside the published library runtime. The starter application has been replaced by the private integration consumer in `tests/integration/nextjs-consumer/`; Storybook is the component development environment. React and React DOM must be compatible peer dependencies rather than bundled private copies.

Publish explicit entry points and type declarations. Consumers must not depend on private source paths. Keep stories, tests, playground code, and development tooling out of the published artifact. Preserve CSS assets and declare their side effects accurately while supporting tree shaking.

Finalize the public npm name before the first release. The initial ESM-only distribution and React version policy are recorded in [ADR 0010](0010-scaffold-tooling-and-initial-compatibility.md). Public API changes require semantic versioning, release notes, and migration guidance where applicable. Favor additive extension and deprecation over abrupt removal.

## Alternatives considered

- Publish the Next.js application itself: couples the UI package to an application framework and build output.
- Let each MFE maintain its own component copies: creates behavioral and visual divergence.
- Put application services in shared UI: introduces hidden dependencies and reduces portability.

## Consequences

Consumers provide domain data, callbacks, and adapters. Some integration code remains in MFEs intentionally. Package configuration is established; release and publication automation remain future work.

## Required implementation evidence

Build and inspect an npm-packed artifact, install it in a representative consumer, and verify public imports, types, styles, peer dependencies, and absence of development-only files. A successful Next.js application build alone is insufficient.
