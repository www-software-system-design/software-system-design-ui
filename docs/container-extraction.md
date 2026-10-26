# Container extraction and 0.2.0 migration

The package exports every new component from its root and its kebab-case subpath,
for example `@software-system.design/ui/content-card` and
`@software-system.design/ui/site-header`. Import `@software-system.design/ui/styles.css`
once and place components inside UIProvider. There are no new runtime dependencies.

See [ADR 0014](adr/0014-container-components-and-brand.md) for the extraction map.
See the [fd99fbe follow-up extraction](container-commit-fd99fbe.md) for branding,
navigation, principles, feature sections and carousel adoption.

## State and content contracts

- SiteHeader: `brand`, `navigation`, `actions` slots, caller-supplied navigation/open/
  close labels; isolated `defaultOpen` or controlled `open`/`onOpenChange`. Escape
  closes the menu and focuses the trigger. Native link activation closes it.
- Disclosure: native details/summary with `summary`, `defaultOpen` or controlled
  `open`/`onOpenChange`. Keep mode stable for the instance lifetime.
- ThemeToggle: `theme`, `label`, `onThemeChange`. The application changes its provider,
  storage, document metadata and any external theme state.
- Pagination: zero-based `page`, `pageCount`, `onPageChange`; caller formats `pageLabel`
  and supplies navigation/button labels. The application resets pages after filtering.
- TextField: native TextInput props, required `label`, optional `description`/`error`;
  generated label/description IDs. Its ref/id/className address the input;
  `wrapperClassName` addresses the wrapper. TextArea takes native textarea props.
- ContentCard/SectionHeading: heading level/id and React content slots. Applications
  supply heading order, copy, icons and links. ContentCard is a labelled article.
- Statistic: caller-formatted `label`, `value`, optional `description`.
- DataTable: labelled keyboard-scrollable region with a hidden caption; native
  thead/tbody children preserve arbitrary schemas. `emptyState` stays outside table.
- ContentState: application-selected loading/error/empty feedback; caller supplies
  title, children and actions. It does not initiate or retry requests itself.
- Badge: neutral/accent/success/warning/danger tone; always include meaningful text.
- SiteFooter/MarketingLayout: content slots and semantic landmarks. Do not place
  MarketingLayout inside another main. Product-specific layouts remain consumer CSS.

Required new labels come from the caller's localization system; existing provider
catalogs remain compatible. Use logical CSS and matching SSR locale/direction.

## Appearance migration

Default tokens now match software-system.design. Explicit semantic-token overrides
remain supported. New background/divider/success/warning and decorative brand tokens
separate surface structure from contrast-critical control borders. Do not use the
neon identity colors as small body text without checking contrast.

Storybook starts in dark mode and retains light/system, locale, direction and compact
controls. The manager chrome stays dark independently of the preview theme.

## Validate the real container

Run `npm.cmd run check:package` here. Copy the generated
`.artifacts/software-system.design-ui-0.2.0.tgz` into the container's `vendor/` directory,
then run `npm.cmd install ./vendor/software-system.design-ui-0.2.0.tgz` there.
Use the package output, never a source alias or symlink. When refreshing the same
version locally, install the absolute tarball path with `--force` and verify the
installed output matches `dist` before testing.

In the container run lint, TypeScript, existing Node tests and the production build.
Start the built app on port 3110. From this library run
`npx.cmd playwright test --config tests/container/playwright.config.ts`.
The browser suite mocks GitHub responses and never writes to the real project board.

Publishing/deployment is a separate authorized release. After publication replace
the container's file dependency with `@software-system.design/ui@^0.2.0`, update its
lockfile, remove the vendored archive and rerun the consumer checks.
