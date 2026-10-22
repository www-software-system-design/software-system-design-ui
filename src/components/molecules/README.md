# Molecules

Compose focused groups of controls from atoms. Keep business workflows in MFEs. Choose state tools by behavior, not atomic level. Generate a new component with `npm run generate:component -- molecules FilterGroup`.

`search-field/` is the reference example: TextInput + Button + useControllableState, with a visible label, stable IDs, descriptions/errors, and localized clear action. Its tests cover controlled and uncontrolled behavior, keyboard focus, disabled/read-only states, and message overrides. Stories include long labels and Malayalam with left-to-right direction.
