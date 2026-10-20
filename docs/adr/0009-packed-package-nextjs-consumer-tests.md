# ADR 0009: Test the packed package in a Next.js consumer

- Date: 2026-10-20
- Status: Accepted
- Implementation: Private Next.js fixture installs the tarball and passes production build plus initial HTML, hydration, state, style, and localization checks.

## Context

The library publishes Client Components, while MFEs own Server Components and application server logic, as specified in [ADR 0005](0005-server-and-client-component-boundaries.md). Client Components can still produce initial HTML through SSR and hydrate in the browser.

Unit tests and Storybook do not prove that the published artifact preserves client boundaries or works in an actual RSC-capable application. Tests importing directly from `src/` can miss missing exports, stripped directives, unresolved aliases, omitted styles, and accidental bundled dependencies.

The earlier `tests/integration/ssr/` and `rsc/` scaffold described compatibility checks, not library Server Components. One consumer fixture makes that distinction clearer and avoids duplicated applications.

## Decision

Maintain one small, unpublished Next.js application at `tests/integration/nextjs-consumer/`. It acts as a representative MFE and installs the built npm tarball rather than importing the library's source tree. Its Server Components are test fixtures, excluded from the library artifact.

Use this application for package import, SSR, hydration, and server/client boundary checks. Keep ordinary component behavior in colocated tests and Storybook. Do not recreate a full MFE or duplicate every component test in the fixture.

## Fixture structure

```text
src/                                  Published library source
tests/
  integration/
    nextjs-consumer/
      app/
        layout.tsx                    Consumer stylesheet/theme setup
        page.tsx                      Server Component imports library UI
        controls.tsx                  Client wrapper owns UI state/callbacks
      tests/
        compatibility.spec.ts         HTTP/browser assertions
      package.json                    Private test application
      playwright.config.ts
```

The fixture targets Next.js 16.4.2 and React 19.3.1, with its own package lock and application configuration. Read the relevant installed Next.js guides before modifying it. Run `npm run test:integration` from the repository root to build, pack, install, type-check, and test the actual package. Fixture tests also have a separate TypeScript configuration so Playwright transpilation cannot hide their type errors.

## Package and execution workflow

1. Build the library and its type declarations.
2. Run `npm pack` into a dedicated artifact directory and capture the resulting tarball path. Validate the package contents against an explicit publish-file allowlist.
3. Install that tarball into the fixture using its actual package name. Do not substitute TypeScript path aliases, source imports, workspace links, or resolution overrides pointing at `src/`.
4. Install compatible consumer dependencies and build the Next.js fixture in production mode. This exercises its type checking, public package entry points, CSS imports, and client boundaries.
5. Start the production server on a controlled test port, wait for readiness, and run HTTP and Playwright assertions.
6. Shut down the server and retain useful failure artifacts, such as browser traces and error output. Keep generated tarballs, build output, and browser artifacts out of version control and out of the published package.

Prefer reproducible dependencies and clean fixture builds so previously installed tarballs or cached build output cannot hide failures. The library build must not recursively invoke the fixture's build.

## Required implementation evidence

| Contract | Fixture behavior | Assertion |
| --- | --- | --- |
| Consumption from Server Components | `page.tsx` directly imports representative library components through public entry points | Production build and route request succeed without RSC boundary errors |
| Initial SSR HTML | Server page renders a representative labelled library control | Parse/assert the actual HTTP response markup, or inspect the DOM in a JavaScript-disabled browser; do not mistake text inside scripts for rendered HTML |
| Hydration | Load the same route with JavaScript enabled | Capture browser exceptions and hydration errors from navigation onward; assert no unexpected errors |
| Interactive state | `controls.tsx` supplies a controlled value and callback to library UI | User interaction updates both the control and a visible client-owned summary |
| Server-rendered children | Server page passes content through a library component's children or supported slot | Content is present initially and remains correct after hydration |
| Styles and configuration | Fixture imports documented styles and supplies deterministic theme/locale configuration | Required CSS resolves, representative styling is applied, and initial/client output agree |
| Publish boundary | Inspect packed file list and test installed package resolution | No fixture, story, test, or playground code is published; imports resolve to installed package output |

Where package-root and per-component imports are supported, exercise both. Use compatible shared React peers to avoid duplicate-React failures. Investigate unexpected errors instead of globally suppressing console output or hydration warnings.

Theme and locale tests here check consumer integration and hydration, not every visual combination. Detailed theme, RTL, and component state coverage remains in component and Storybook suites.

## Alternatives considered

- Separate SSR and RSC fixture applications: duplicates setup for capabilities one Next.js consumer can exercise.
- Import library source into the fixture: bypasses the actual published artifact and can conceal packaging defects.
- Rely on Storybook alone: does not exercise a production Next.js Server Component consumer.
- Test only against a deployed MFE: makes package checks dependent on an external application and deployment cycle.

## Consequences

The repository has a small Next.js development dependency for compatibility testing without making Next.js a library runtime dependency. Production fixture builds increase CI time, so keep this suite representative and focused. Run it for release candidates and changes affecting package output, exports, directives, peer compatibility, styles, providers, or rendering behavior; define exact CI triggers during implementation.

A passing fixture establishes compatibility with its configured React/Next.js versions, not every possible MFE or framework. Expand the consumer matrix when the supported-version policy requires it. No npm publication or deployment is needed to run these checks.

## References

- [React client boundaries](https://react.dev/reference/rsc/use-client)
- [React hydration requirements](https://react.dev/reference/react-dom/client/hydrateRoot)
- [npm pack](https://docs.npmjs.com/cli/commands/npm-pack)
- [Playwright web server setup](https://playwright.dev/docs/test-webserver)
