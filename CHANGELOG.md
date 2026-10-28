# Changelog

## 0.3.1 - 2026-10-28

- Use the supplied complete logo with its built-in wordmark in the Storybook
  sidebar, replacing the separate icon and rendered text.
  Published component APIs are unchanged.

## 0.3.0 - 2026-10-26

- Adopt the container's current blue SD logo and app icon in Storybook, with
  official header/footer lockup stories. Match electric-blue primary and gray
  secondary buttons in both themes using dedicated button tokens. Preserve
  readable theme-specific link accents and focus/control contrast. See
  [brand tokens and migration](docs/branding.md).

- Add BrandLockup, NavigationDisclosure, PageNavigation and PrincipleList
  molecules plus FeatureSection and Carousel organisms, extracted from container
  commit fd99fbe. Include root/subpath exports, scoped styles, behavior tests and
  typed stories. Container adoption is separate. See
  [extraction map](docs/container-commit-fd99fbe.md).

- Add `DataChart` with 15 native SVG chart variants grouped by category, visible
  data tables, scoped localization, typed stories, and `/data-chart` exports.
  No new runtime dependencies. See [chart contracts and adoption](docs/charts.md).

- Migrate button color overrides to dedicated tokens:
  `--ssd-color-button-primary`, `--ssd-color-on-button-primary`,
  `--ssd-color-button-primary-hover`, `--ssd-color-button-secondary`,
  `--ssd-color-on-button-secondary`, `--ssd-color-button-secondary-hover`,
  and `--ssd-color-button-secondary-border`. Existing action tokens continue
  to style links and selected controls; consumers that used them to customize
  primary buttons must also set the new button tokens. Component props and
  import paths are unchanged. See [migration guidance](docs/branding.md).

- Remove automated npm publication, Git tagging and GitHub release creation.
  Keep validation-only CI and local publication checks; follow the manual
  [release procedure](docs/releases.md). Git tags are no longer required.

## 0.2.0

- Automatically validate and release new manifest versions on main pushes: create
  the version tag, publish the tested npm archive with provenance, verify registry
  integrity and create a GitHub release. Repeated versions skip and partial releases
  can resume from their original Actions run. See [release instructions](docs/releases.md).

- Extract fourteen atomic React components for navigation, page layouts, cards,
  headings, disclosures, fields, metrics, records, pagination and async feedback.
  Add root and deliberate component subpath exports with tests and typed stories.
- Adopt the container's modern light/dark palette and supplied Storybook branding.
  Existing semantic-token overrides and English/French/Malayalam catalogs remain compatible.
- Keep all routing, product content, application data, permissions, business state,
  persistence and server operations in the container. See
  [migration guidance](docs/container-extraction.md) for APIs and appearance changes.

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
