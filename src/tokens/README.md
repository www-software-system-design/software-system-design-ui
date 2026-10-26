# Design tokens

See [current branding and button-token migration](../../docs/branding.md) for the
container palette, official logo provenance and theme-specific contrast choices.

`tokens.css` is the public CSS contract. Import `@software-system.design/ui/styles.css` for tokens and component styles, or `@software-system.design/ui/tokens.css` for tokens alone. Use semantic `--ssd-color-*`, `--ssd-space-*`, typography, shape, and motion properties. Do not duplicate palette values in components.

Override properties on a UIProvider DOM scope or a host scope. Light/dark/system themes remain isolated between roots; use logical CSS properties for RTL. New themes must preserve accessible active-text, control-boundary, and focus contrast. Consumer overrides require their own assessment.

The token tests check WCAG contrast constraints against the actual light/dark CSS properties. Browser stories exercise the real stylesheet, system preference, and scoped overrides. Storybook Foundations/Tokens documents swatches, spacing, and shape. These checks cover specific supported combinations; they are not complete accessibility certification.
