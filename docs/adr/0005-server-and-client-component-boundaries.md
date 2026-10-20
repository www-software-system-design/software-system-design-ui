# ADR 0005: Library Client Components and MFE Server Components

- Date: 2026-10-20
- Status: Accepted
- Implementation: Client component directives preserved by TypeScript ESM build and checked in the packed-package Next.js consumer.

## Context

The owner clarified that the library should provide Client Components while MFEs own Server Components and application server logic. This replaces the earlier unaccepted recommendation to publish universal presentational components alongside focused client boundaries. Maintaining parallel server/client atomic trees would duplicate structure.

SSR and React Server Components (RSC) are separate capabilities. Client Components can participate in SSR and hydrate in the browser. A library containing Client Components must still be safe to consume from an MFE Server Component.

## Decision

Keep Server Components, Server Functions, data fetching, and application server logic in MFEs. Publish reusable Client Components within one atomic hierarchy. Require SSR safety by default; client does not mean browser-only rendering.

- Use `Component.tsx` with a leading `'use client'` directive for public component implementation modules; a `.client` suffix is unnecessary when all public components follow this policy.
- Do not create library Server Components or parallel server/client implementations.
- Preserve component-level client directives and appropriate module boundaries in the published build. Do not rely solely on a package-root directive, since direct component entry points must work independently.
- Keep pure utilities, types, and design tokens independent of component client boundaries where appropriate. Client-only UI does not require every non-component export to be client-marked.

A Server Component can import and render a Client Component without becoming a Client Component itself. Props crossing that boundary must be React-serializable; ordinary state callbacks cannot cross it. MFEs provide client wrappers for shared interactive state. Server Functions are network operations, not local state setters.

Client wrappers may receive server-rendered content through children or slots. They must not import genuinely server-only implementations. Do not access browser globals during module initialization or server rendering. Initial server/client output must agree for locale, theme, IDs, and formatting.

`'use server'` marks Server Functions, not Server Components. Atomic level does not determine rendering capability.

## Alternatives considered

- Universal presentation plus interactive Client Components: avoids some browser JavaScript, but is not the selected component contract. Reconsider through a future ADR if measured consumer needs justify it.
- Separate server/client atomic trees: duplicates component organization and encourages divergent implementations.
- Universal-only components: cannot support stateful, accessible interactive controls that need client APIs.

## Consequences

The package supports client-rendered applications and consumption from MFE Server Components without requiring business-server dependencies. Static component implementations also contribute browser JavaScript under this policy; this is an explicit tradeoff for a uniform component contract. Props crossing server/client boundaries remain subject to React serialization rules. Build configuration and packed-package integration tests must preserve and verify boundaries. Storybook alone does not validate RSC consumption.

## Required implementation evidence

Test the packed package in the unpublished Next.js consumer described in [ADR 0009](0009-packed-package-nextjs-consumer-tests.md). Verify direct imports from an MFE Server Component, server-rendered children composition, preserved client directives, initial HTML, interactive hydration, and no unexpected runtime or hydration errors. The fixture's Server Components must never be published as library components.

## References

- [React client boundaries and serializable props](https://react.dev/reference/rsc/use-client)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [React hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
- [React Server Functions](https://react.dev/reference/rsc/server-functions)
