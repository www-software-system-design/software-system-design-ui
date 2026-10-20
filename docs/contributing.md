# Contributing

Read [AGENTS.md](../AGENTS.md) and the [ADRs](adr/README.md). Requirements apply equally to human and agent changes.

## Test-first component workflow

1. Find the closest existing component or composition. Extend a supported contract before creating a duplicate.
2. Choose an atomic responsibility. Run `npm run generate:component -- atoms Example` if a new component is justified. Generated output is not a finished component.
3. Replace the generated placeholder assertion with a meaningful user-observable behavior test. Run the focused test and observe the intended failure.
4. Implement the minimum behavior, rerun the test, then refactor. Cover relevant state transitions, keyboard behavior, callbacks, and instance isolation.
5. Update typed stories, local exports, and reviewed public entry points in `package.json` and `src/index.ts`. Colocated component tests do not replace public artifact tests.
6. Verify theme, locale, long text, direction, focus, and applicable disabled/loading/error states. Add messages only for library-owned text.
7. Run the checks in the root README. Include test-first evidence and actual validation results in the change description.

## State and composition

Atoms may consume library locale context; organisms do not automatically need context. Choose hooks by behavior. Keep business state and persistence in the MFE. Use controlled APIs when the consumer owns a value, and scope compound-component state so instances remain independent.

The foundational Button owns no business state. Its consumer controls `loading` and supplies `onClick`. The integration fixture demonstrates state ownership in a client wrapper under an MFE Server Component.

## Themes and messages

Import `component-lib/styles.css` once. `UIProvider` creates a DOM scope and inherits omitted settings from its parent. Supply `theme`, `locale`, and `direction` explicitly when required. Locale does not infer RTL or load translation catalogs automatically. `messages` configures library-owned strings; application content is passed through props/children.

Use `--ssd-*` variables for deliberate overrides. Place portal containers inside the relevant scope. This scaffold has no overlay component or portal helper yet. Theme preference storage and any pre-hydration bootstrap belong to the MFE; the provider does not read localStorage or mutate the document.

## Visual review

Run `npm run build:storybook`, then `npm run test:visual`. To propose intentional baseline changes, run `npm run test:visual -- --update-snapshots`, inspect the PNG diffs, and commit reviewed baselines. Never auto-update screenshots in CI to hide failures.

Baselines are scoped by operating system; initial references use Windows Chromium. A new platform requires reviewed baselines before its screenshot checks can pass. Keep the Playwright version and rendering environment consistent. Accessibility assertions and browser coverage complement manual assessment.

## Release preparation

The current npm identity is provisional and `private: true` prevents accidental publication. Before the first release, confirm name/ownership, license, supported versions, changelog, and versioning/release workflow. No publishing automation is enabled. Runtime is ESM with React 19.3 peers; the tested consumer uses React 19.3.1 and Next.js 16.4.2. Expand compatibility only with corresponding consumer evidence.
