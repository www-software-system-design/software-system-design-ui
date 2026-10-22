# Changelog

## Unreleased

## 0.1.0 - 2026-10-22

- Publish the shorter `@software-system.design/ui@0.1.0` package. Migrate dependency and import prefixes from `@software-system.design/software-system-design-ui`, including CSS imports; component APIs and subpaths are unchanged.
- Publish `@software-system.design/software-system-design-ui@0.1.0` under Apache-2.0 for the `software-system.design` npm organization through owner account `vaniyathans`.
- Add public npm metadata, release validation, GitHub OIDC publishing for subsequent releases, and static Storybook hosting configuration for `storybook.software-system.design` on Amplify/Route 53.

- Add the matching Vitest V8 coverage development dependency so Storybook's test panel can initialize with coverage enabled.

- Fix Storybook's Vitest startup by registering the browser project in the root Vitest configuration; preserve separate unit and browser test commands.

- Replace the built-in Arabic catalog and examples with Malayalam (`ml`, including `ml-IN`). Use `getMessages('ml')` with `direction="ltr"`; Arabic locales now receive the unsupported-language English fallback. Caller-supplied Arabic catalogs and explicit RTL remain supported. This change is included in the initial 0.1.0 release.

- Rename the npm package from `component-lib` and its interim `software-system-design-ui` name to `@software-system.design/software-system-design-ui`. Consumers must replace the dependency name and all root, component, provider, hook, i18n, and CSS import prefixes; subpaths and component APIs are unchanged. This is the initial 0.1.0 release; neither earlier package name was published.

- Add TextInput, SearchField, SearchPanel, and ExplorerLayout with colocated tests and stories for every atomic level.
- Export useControllableState, opt-in English/French/Malayalam catalogs, plural formatting, and token-only CSS.
- Add semantic error/muted/surface tokens, palette contrast tests, responsive/RTL composition checks, and packed-consumer examples.
- Extend UIMessages with search/result labels and plural patterns. Consumers implementing a complete UIMessages catalog must add the new keys; partial UIProvider overrides continue to inherit defaults.
- Establish the ESM React component-library scaffold with typed public exports and React peers.
- Add the foundational Button and scoped theme/localization provider.
- Add test-first contributor guidance, atomic component generation, Storybook, architectural checks, and browser tests.
- Verify the npm tarball with an unpublished Next.js consumer.

The root library is publishable; the Next.js integration fixture remains private.
