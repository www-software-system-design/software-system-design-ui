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
