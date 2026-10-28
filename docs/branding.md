# Shared brand and theme

The current source of identity is the informational container's
`app/site-identity.ts`, `app/brand-theme.css`, `app/modern-theme.css` and
`app/button-theme.css`, reviewed on 26 October 2026.

Storybook's `software-system-design-logo.png` is an exact copy of the official
1254 by 1254 transparent blue SD mark. Its SHA-256 is
`35fa27d383fefe68aca7b4dbcdb72df30935a52f99e480a9d149f0d865beb37c`.
The favicon copies the container's 512px app icon. Earlier ribbon artwork is
replaced. Assets remain documentation-only and are excluded from the npm package.
BrandLockup and the studio layout stories show the official mark alongside the
three-line Software- / System. / Design wordmark.
The Storybook sidebar uses the supplied `ssd-logo-dark.png`, an exact copy of
the 1774 by 887 image supplied on 28 October 2026, including its built-in
wordmark. Its SHA-256 is
`7356e57aaef59492c63b7ebc1aa1c01f6d2b2d7902aaf8fd9c7543dcadc9c51a`.
It renders at 220px wide with proportional height and no separate text or
cropping. The link retains its accessible Software-System.Design UI name.

| Role | Light | Dark |
| --- | --- | --- |
| Background | #f7f9fc | #090e19 |
| Surface | #ffffff | #111927 |
| Raised surface | #edf2f9 | #172234 |
| Text | #162339 | #eef3fc |
| Muted text | #51627b | #a4b2c9 |
| Readable link/control accent | #245bc2 | #94baff |
| Primary button / text | #0055ff / #ffffff | #0055ff / #ffffff |
| Primary hover | #0048d9 | #0048d9 |
| Secondary button / text | #e5e7eb / #111827 | #e5e7eb / #111827 |
| Secondary hover | #d1d5db | #d1d5db |

Decorative brand tokens retain cyan #00e5ff, blue #0055ff, violet #881bff and
magenta #ef26ff; indigo #1610d8 is now exposed as well. Restrained surfaces
continue to come from the modern theme.

Blue buttons and blue links have separate purposes: the vivid button has white
text, while links and other accents retain their theme-specific readable tones.
Existing contrast-tested focus rings are preserved. The light secondary border
uses #667085 to remain distinguishable from the light surface; dark mode uses
the container's #cbd5e1. No document-global theme mutations or persistence are
introduced. UIProvider still supports light/dark/system and nested scopes.

## Overrides and compatibility

This appearance update targets the next minor release. Component props and
import paths are unchanged. Existing `--ssd-color-action` and
`--ssd-color-on-action` continue to style links and selected controls.
Button backgrounds/text now use dedicated tokens so both themes match the
container without reducing dark-link contrast:

- `--ssd-color-button-primary`, `--ssd-color-on-button-primary`,
  `--ssd-color-button-primary-hover`.
- `--ssd-color-button-secondary`, `--ssd-color-on-button-secondary`,
  `--ssd-color-button-secondary-hover`,
  `--ssd-color-button-secondary-border`.

Consumers customizing primary buttons through action tokens must also set the
new button tokens. The ScopedOverride story demonstrates this.
BrandLockup uses `--ssd-brand-mark-size` to coordinate artwork and wordmark
size. Default artwork widths match the container: 64px/56px header and
160px/112px footer at desktop/compact sizes. Header/footer container queries
also select compact artwork inside narrow MFEs on wide browser windows.

Brand assets remain caller-supplied slots in runtime components. Install styles
through the existing `@software-system.design/ui/styles.css` entry. Product
assets, theme preference storage and document metadata remain application-owned.

## Validation evidence

Complete sidebar logo update, Windows, 28 October 2026:

- Red: the manager browser test expected `./ssd-logo-dark.png` and failed
  against the previous `./software-system-design-logo.png`.
- Green: the new image loads at its original 1774 by 887 dimensions, preserves
  its 2:1 aspect ratio, and has no duplicate rendered text. Reviewed and updated
  only `storybook-brand.png`.
- `npm.cmd run check`: all underlying checks completed successfully, including
  150 unit tests and validation of 220 packed files.
- `npm.cmd run test:stories`: 192 passed across 66 files.
- `npm.cmd run build:storybook`: reported successful completion.
  These three redirected PowerShell invocations returned status 1 because
  native stderr warnings were surfaced as PowerShell errors; their logs record
  the successful checks/build above.
- `npx.cmd playwright test --config .artifacts/brand-alignment-visual.config.mjs
  --workers=3`: 37 passed, using port 6007; the reviewed baseline passed without
  further updates.
- Packed-consumer integration was not rerun: only Storybook manager assets and
  styles changed; published runtime components, styles and exports are unchanged.

Sidebar wordmark update, Windows, 28 October 2026:

- The manager regression test first failed because the wordmark was absent.
  After implementation, its three-line and right-side alignment assertions
  passed. Reviewed and updated only `storybook-brand.png`.
- The follow-up alignment regression failed before the larger artwork frame
  existed, then passed with a 72px visible mark and matching top/bottom text
  bounds. Reviewed the revised screenshot, including the source-image padding.
- `npm.cmd run check`: passed, including 150 unit tests and package validation.
- `npm.cmd run test:stories`: 192 passed across 66 files.
- `npm.cmd run build:storybook`: passed.
- `npm.cmd run test:visual -- --workers=3`: all 37 passed.
  The alignment follow-up uses the same suite on port 6007 via the ignored
  `.artifacts/brand-alignment-visual.config.mjs` override because 6006 is occupied.
- Packed-consumer integration was not rerun: this change affects only the
  Storybook manager, with no published runtime, styles, or export changes.

Executed on Windows, 26 October 2026:

- Red/green: the light/dark button-palette assertions and canonical-logo hash
  check failed before the update, then passed. Screenshot review exposed a
  compact footer regression; its browser test reproduced 160px artwork where
  112px was required, then passed with the container-query fix.
- `npm.cmd run check`: passed with 150 unit tests and all lint, type,
  generator, configuration, dictionary, release and package checks. A parallel
  attempt hit 13 unit-test timeouts; the standalone rerun passed. The existing
  generated-coverage lint warning remains nonblocking.
- `npm.cmd run test:stories`: 192 passed across 66 story files.
- `npm.cmd run build:storybook`: passed with the new assets and styles.
- Visual suite: 37 passed without updating snapshots after reviewing and
  accepting 13 branding screenshots. Port 6006 was occupied, so the same visual
  configuration ran on 6007 through the ignored
  `.artifacts/branding-visual.config.mjs` override:
  `npx.cmd playwright test --config .artifacts/branding-visual.config.mjs --workers=3`.
- `npm.cmd run test:integration`: the actual 220-file tarball installed and
  built in the production Next.js fixture; all six SSR/browser tests passed.

The container checkout remains unchanged. No publication or deployment occurred.
