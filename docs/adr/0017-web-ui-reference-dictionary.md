# ADR 0017: Shared web UI control dictionary

- Date: 2026-10-26
- Status: Accepted for implementation under the owner's request
- Scope: Web React controls; native mobile and desktop UI toolkits are excluded

## Context and decision

The MFEs need one vocabulary, import contract, and reference catalogue for common
web controls. A flat list of component names obscures native recipes and can
advertise unsupported behavior.

Keep `docs/ui-dictionary.json` as the canonical categorized inventory. Each entry
has a stable ID, name, aliases, purpose, availability, public API where present,
Storybook destination, and a primary standards reference. Publish the controls
through the established atomic hierarchy, root exports and deliberate subpaths.
The dictionary and its searchable browser stay outside the npm runtime.

Distinguish shipped components, composition/native HTML recipes, and specialized
reference patterns. Reference entries do not imply an implemented package API.
Cover native form semantics before custom widgets. Reuse the scoped provider,
semantic tokens and state hook. Add no runtime dependency for this work.

Use native dialog modality in its existing DOM scope. Open it after hydration;
server markup stays closed and deterministic. The browser owns focus containment
and restoration. Do not portal it to the document body or mutate document styles.
Use native controls for date/time/number/color/file picking. Browser picker UI
and its translations depend on the browser and operating system, while the
library's visible labels and hints remain caller-owned.

Automatically verify unique IDs, public API/source/story targets, and inventory
coverage of public components during lint. Keep behavior tests, browser keyboard
tests, accessibility checks, visual review, and packed-consumer tests as separate
evidence; inventory validation alone establishes none of these behaviors.

## Alternatives

- Treat Storybook titles as the only inventory: lacks stable alias/availability
  metadata and makes searching by common platform terms harder.
- Put the dictionary in the published runtime: ships documentation and example
  metadata to every MFE without a runtime need.
- Introduce a large third-party widget suite: adds dependency and API surface
  before native and existing composition options have been assessed.
- Advertise every known pattern as implemented: makes the reference unreliable.

## Compatibility and migration

This is an additive API for the next minor release. Existing input APIs keep their
text-only restrictions. New `NativeField` contracts cover other native input
types; file values cannot be controlled. New optional localization keys preserve
existing complete and partial message catalogs. MFEs adopt controls individually
without replacing routing, forms, data stores, or business services.

Modern native dialog, details, datalist and HTML form behavior is required where
used. Chromium is the repository's automated browser target; other browsers,
assistive technologies and devices need explicit verification before a broader
support claim. This is not universal compliance certification.

Implementation and actual check results must be reported with the change.
