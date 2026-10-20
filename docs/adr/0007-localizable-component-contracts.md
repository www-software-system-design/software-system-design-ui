# ADR 0007: Localizable component contracts

- Date: 2026-10-20
- Status: Accepted
- Implementation: Typed English defaults, optional scoped messages, label overrides, dynamic locale updates, and RTL examples/tests implemented.

## Context

Shared UI must work across locales without forcing every MFE to use the same application i18n framework. Localization includes assistive text and layout direction, not only visible button labels. MFE Server Components must be able to supply resolved content to library Client Components.

## Decision

Every component must support localization of its visible and assistive text, including accessible names, validation messages, tooltips, loading messages, and empty states. Do not assemble sentences by concatenating translated fragments. Accept translated content through public props where practical.

## Integration contract

Provide typed message contracts, English fallback messages for library-owned default text, and optional scoped locale/message configuration for interactive components. Caller-provided labels take precedence over provider messages, which take precedence over documented fallback messages. Do not require a particular consumer translation framework.

Library Client Components accept resolved content and locale-sensitive values through props, including values prepared by an MFE Server Component. A provider must not be mandatory merely to display caller-supplied text. Define locale and direction explicitly where needed, including initial SSR values. Avoid runtime-dependent default formatting that changes between server and browser. Component ownership follows [ADR 0005](0005-server-and-client-component-boundaries.md).

Use locale-aware formatting and support RTL with logical layout properties. Test long translations, missing-message fallback, dynamic locale changes for provider consumers, and direction changes. Not every component needs an internal translation key: caller-supplied children are often sufficient.

## Alternatives considered

- Hardcoded English labels: prevents complete localization, particularly for assistive text.
- Mandatory application i18n dependency: couples otherwise independent MFEs.
- Require a client provider for every text component: adds client boundaries to static content.

## Consequences

Translation ownership is explicit: the library supplies its defaults, while MFEs own application copy. Message keys and their interpolation contracts become compatibility-sensitive public APIs. Locale-dependent layout and hydration need dedicated coverage.

## Required implementation evidence

Demonstrate visible and accessible label overrides, fallback precedence, representative non-English content, RTL layout, and long text. Verify deterministic SSR/hydration and provider updates where supported. Storybook must expose locale and direction controls.
