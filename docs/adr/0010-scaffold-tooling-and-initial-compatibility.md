# ADR 0010: Scaffold tooling and initial compatibility

- Date: 2026-10-20
- Status: Accepted as part of the authorized scaffold implementation.
- Implementation: Configured and locally validated; remote CI has not been run from this session.

## Context

The earlier ADRs defined component contracts and proposed tools. The owner authorized implementation of that scaffold. Concrete build, version, validation, and package-identity choices are needed without introducing a framework runtime into the library.

## Decision

- Use TypeScript to emit individual ESM modules and declarations. Explicit `.js` source import specifiers resolve correctly in emitted code. This preserves leading client directives without a bundler plugin. No CommonJS distribution is promised initially.
- Copy plain CSS and semantic tokens to `dist/` while preserving their relative import paths. Consumers import the documented stylesheet; Tailwind and CSS-in-JS runtimes are not required.
- Retain the existing `component-lib` identity and `private: true` until the npm scope/name, ownership, and license are confirmed. Packing and consumer installation work without publishing.
- Declare React and React DOM `^19.3.0` peers. Pin the initial test consumer to React 19.3.1 and Next.js 16.4.2. This does not claim validation of every version permitted by the peer range. Broader version support requires additional fixtures or a version matrix.
- Use Node.js 24 for the CI tooling, with a declared tooling minimum of 22.12.0. This does not set the browser support policy for every MFE.
- Use Storybook 10.6.3 with its React/Vite adapter and Vitest integration, Vitest 5.0.5, and Vite 8.3.4. Keep fast jsdom tests separate from Storybook browser configuration so the TDD loop does not require Storybook startup.
- Use ESLint 9 with TypeScript, React hooks, and JSX accessibility plugins. The installed JSX accessibility plugin declares support through ESLint 9. npm reports ESLint 9 as unsupported upstream; upgrading the linter and its compatible accessibility tooling remains a maintenance item rather than forcing incompatible peer dependencies.
- Enforce dependency cycles and atomic direction with dependency-cruiser. Check that component implementations have client directives, tests, stories, and local exports. These gates verify artifacts, not whether tests were written first or whether all behavior is covered.
- Use a component generator that refuses existing directories and invalid names/levels. Generated tests intentionally fail until replaced with the required behavior. Public package exports remain deliberate review steps.
- Use Windows Chromium for initial screenshot baselines and the initial GitHub Actions workflow. Baselines are platform-specific; future platforms need reviewed references. Pinning via lockfiles reduces browser/tool drift, but rendering environment changes still require review.

## Alternatives considered

- Bundle the package into one client module: obscures fine-grained entry points and makes directive preservation more complicated.
- Keep the Next.js app at the repository root: leaves the library build and application build coupled.
- Introduce a styling runtime or global state dependency during scaffolding: imposes consumer requirements without an established need.
- Enable publishing immediately: the public npm identity and license have not been chosen.
- Force a newer ESLint major despite plugin peer constraints: produces an unsupported dependency combination rather than a validated upgrade.

## Consequences

The package has a deliberately small runtime surface and an ESM-only initial contract. Higher atomic levels exist as documented extension points, not artificial example components. The scaffold demonstrates one Button and an optional UI configuration provider; it is not a complete design-system component catalog.

The local Windows host lacks the Visual C++ runtime required by Storybook's native resolver. Local validation used an uncommitted WebAssembly resolver fallback installed without changing the manifest or lockfile. The normal setup should provide the standard Windows runtime; this workaround is not a package runtime dependency or a prerequisite for Linux consumers.

Remote CI, registry publication, a release workflow, a broader framework/browser matrix, overlay/portal behavior, and a complete component catalog are outside this scaffold's completed validation.

## Required implementation evidence

Local checks cover lint/atomic constraints, strict types, nine component/provider tests, two generator tests, nine browser story tests including configured accessibility checks, four theme/layout/visual tests, and three packed-package Next.js compatibility tests. Initial screenshot baselines were inspected. The Next.js fixture builds in production mode and verifies initial HTML with JavaScript disabled plus hydration and interaction with JavaScript enabled.

For the initial TDD cycle, minimal Button/provider stubs produced six failing behavior assertions and three passing native/default assertions. Implementing the contracts made all nine pass. The generator's two tests failed against its unimplemented stub and passed after implementation. Browser/consumer results above record integration verification, not a claim that every scaffold configuration file had its own test-first cycle.

Future changes must rerun relevant checks and report actual results. Do not treat this historical evidence as proof that a later change passes.
