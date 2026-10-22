# History: from the Next.js starter to a published React UI package

The workflow preparation described here is historical. On 2026-10-23 the owner
replaced publishing automation with local manual publication; use the current
[release guide](../releases.md) and [ADR 0016](../adr/0016-manual-npm-publication.md).

Recorded publication date: **22 October 2026**. Final package: **[@software-system.design/ui@0.1.0](https://www.npmjs.com/package/@software-system.design/ui/v/0.1.0)**. Organization: `software-system.design`. Publishing account: `vaniyathans`. License: Apache-2.0.

This is a history of the work performed, including preparation, failed attempts, corrections, authentication, publication, and verification. It is not an architecture decision record. Earlier scaffold work is described from the initial Git manifest, repository scripts, and recorded scaffold evidence; the publication sequence and results were observed during this conversation. Commands inside the build and integration scripts are expanded below so their individual steps are visible. This document does not claim to be a complete terminal transcript or invent missing original scaffold commands.

The starting repository was a Next.js application named `component-lib`. The published artifact is a **shared React component library**, not a deployable Next.js application. Next.js was retained as a private application that tests installation, Server Component consumption, SSR, hydration, styles, and interaction with the actual packed library.

## 1. Established the starting point and publication boundary

1. Inspected the working tree, package manifest, existing tests/stories, scripts, and relevant repository instructions. Existing unrelated changes were preserved.
2. Read the ADR index and the decisions covering the shared package, atomic components, test layers, Storybook, client/server boundaries, packed Next.js consumer, and initial tooling.
3. Compared the initial manifest from commit `0dd541b` with the library configuration. Initially, `dev`, `build`, and `start` ran Next.js; `next`, `react`, and `react-dom` were application dependencies, and the package was private. Tailwind and Next.js-specific lint tooling also belonged to that starter.
4. Established `src/` as the library source and `tests/integration/nextjs-consumer/` as the unpublished Next.js application. Framework routing, fetching, authentication, persistence, and server operations remained consumer responsibilities.
5. Changed the root development experience to Storybook and the root production build to the library's TypeScript/CSS build. `next build` remained a fixture command; it was not used to generate the npm package.
6. Kept Next.js out of library runtime dependencies and prohibited Next.js imports in `src/`. React and React DOM became consumer-supplied peers. No runtime dependency was added just to package the components.

The original package and boundary work is described in [ADR 0001](../adr/0001-shared-react-package-and-mfe-boundaries.md), [ADR 0005](../adr/0005-server-and-client-component-boundaries.md), and [ADR 0009](../adr/0009-packed-package-nextjs-consumer-tests.md).

## 2. Prepared the reusable library and its contracts

1. Organized visual components under `src/components/{atoms,molecules,organisms,templates}/<kebab-case-name>/`, with PascalCase implementations, behavior tests, typed stories, and local `index.ts` exports.
2. Supplied Button, TextInput, SearchField, SearchPanel, and ExplorerLayout examples, plus UIProvider, the controllable-state hook, localization helpers/catalogs, semantic tokens, and opt-in CSS.
3. Preserved leading `'use client'` directives for public visual components. Kept imports and initial rendering SSR-safe and deterministic; browser-only operations belonged in effects or handlers.
4. Kept application data and business operations outside the runtime package. Story fixtures and example filtering stayed in development/consumer code.
5. Used explicit relative `.js` specifiers in TypeScript source so emitted ESM imports resolve without source aliases.
6. Provided public package entry points independent of atomic folder names. Consumers import `/button`, `/text-input`, `/search-field`, `/search-panel`, `/explorer-layout`, `/provider`, `/hooks`, and `/i18n`, together with root imports and the `/styles.css` and `/tokens.css` assets.
7. Kept locale, explicit direction, theme scope, caller-supplied labels, provider fallbacks, and CSS tokens as consumer contracts. The final examples used English, French, and Malayalam with explicit RTL support where requested by the consumer.
8. Added lint checks for required component artifacts, atomic dependency direction, cycles, hooks, and accessibility rules. These automated checks did not stand in for test-first history or full accessibility certification.

Earlier TDD evidence is retained in [ADR 0010](../adr/0010-scaffold-tooling-and-initial-compatibility.md) and [ADR 0011](../adr/0011-reference-examples-for-every-atomic-layer.md). Their older test counts describe those earlier implementations, not the final release's check counts.

## 3. Configured the build output and package manifest

The library build used `scripts/build.mjs` and `tsconfig.build.json`:

1. Cleared the script's fixed workspace-local `dist/` output directory.
2. Executed TypeScript with:

   ```sh
   node node_modules/typescript/bin/tsc -p tsconfig.build.json
   ```

3. Used `module: NodeNext` and `moduleResolution: NodeNext`, enabled declaration emission, and set `rootDir: src` and `outDir: dist`.
4. Included library `.ts`/`.tsx` files and excluded colocated `.test.*` and `.stories.*` files. The Next.js consumer was outside `rootDir` and the publication input.
5. Emitted separate ESM modules and `.d.ts` files. TypeScript preserved module boundaries and client directives instead of combining the library into a framework bundle.
6. Copied `src/styles/index.css` to `dist/styles/index.css` and `src/tokens/tokens.css` to `dist/tokens/tokens.css`, preserving the styles-to-tokens relative layout.

The manifest then described the npm artifact explicitly:

| Field | Final setting and purpose |
| --- | --- |
| `name` | `@software-system.design/ui` |
| `version` | `0.1.0`, the initial version of this package identity |
| `private` | Initially `true`; changed to `false` after the owner settled licensing and ownership |
| `license` | `Apache-2.0`, with the complete root `LICENSE` file |
| `type` | `module` |
| `files` | `dist`; npm also included the root README and LICENSE |
| `types` | `./dist/index.d.ts` |
| `exports` | Deliberate root, component/foundation, and CSS entry points targeting `dist/` |
| `sideEffects` | `**/*.css`, preserving consumer stylesheet imports |
| `peerDependencies` | React and React DOM `^19.3.0` |
| `engines.node` | `>=22.12.0` for the package's declared tooling minimum |
| `publishConfig` | Public access and `https://registry.npmjs.org/` |
| Repository/bugs/homepage | The existing GitHub repository and issue tracker |

The folder and GitHub repository remained named `software-system-design-ui`; npm's shorter installation name did not require renaming either.

## 4. Established the local execution environment

1. Used Windows PowerShell with Node.js 24 tooling and npm 11.19.0 during publication. The checked-in `.nvmrc` contains `24`; the Next.js consumer used Next.js 16.4.2 and React/React DOM 19.3.1.
2. The repository setup recipe was `npm ci` followed by Playwright's Chromium installation. The published dependencies and tests used the lockfiles. This history does not claim that root `npm ci` was rerun for every publication attempt; the integration script did reinstall its fixture dependencies.
3. Used `npm.cmd` and `npx.cmd` when PowerShell blocked the corresponding `.ps1` entry points because script execution was disabled.
4. Ran subprocess/browser checks with the execution permissions they needed after the restricted environment initially returned `spawn EPERM`. That was an execution-environment restriction, not a failed component assertion.
5. Kept generated builds, npm caches, tarballs, ZIP archives, temporary verification helpers, and browser artifacts outside version control through ignored output directories.

## 5. Fixed Storybook/Vitest project discovery before publishing

The Storybook test panel initially failed with:

```text
No projects matched the filter "storybook:D:/OpenSource/Software-System-Design/software-system-design-ui/.storybook".
```

1. Inspected both Vitest configuration files and the installed Storybook addon's project selection behavior.
2. Found that the addon loaded the root `vitest.config.ts`, which exposed only `unit`. The browser project existed only in `vitest.storybook.config.ts`.
3. Added configuration regression tests in `scripts/vitest-projects.test.mjs` and ran them. The Storybook discovery test reproduced the exact filter error; the unit discovery test passed.
4. Changed the root configuration to register an inline unit project and `./vitest.storybook.config.ts` through `test.projects`.
5. Kept unit tests in jsdom with the existing React plugin, setup file, include pattern, and mock restoration. Kept browser stories in the separate Storybook configuration with headless Chromium through Playwright.
6. Reran discovery tests: both passed. Kept the addon environment's dynamic project naming behavior rather than hardcoding a machine-specific path into the configuration.
7. Added `test:config` to the repository check chain and documented the command.

## 6. Fixed coverage initialization and restored the local resolver workaround

The next Storybook failure was a missing `@vitest/coverage-v8` package.

1. Added a regression test that initializes the Storybook browser configuration with V8 coverage enabled. It reproduced `ERR_MODULE_NOT_FOUND` for the coverage provider.
   While establishing that test, selecting the root configuration through the raw Vitest API also produced a project-filter setup error. The final coverage test ran in a fresh subprocess with the explicit Storybook configuration; separate discovery tests exercised root project selection. The recorded missing-provider failure came from this corrected test setup.
2. Installed the development-only provider at exactly the Vitest version in use:

   ```powershell
   npm.cmd install --save-dev --save-exact @vitest/coverage-v8@5.0.5 --cache .npm-cache --no-audit --no-fund
   ```

3. Updated the manifest and lockfile together. React/React DOM peers and library runtime dependencies were unaffected.
4. The install pruned an existing uncommitted WebAssembly resolver fallback. Storybook then exposed the documented Windows `oxc-resolver` native-binding/Visual C++ runtime problem.
5. Attempted to restore `@oxc-resolver/binding-wasm32-wasi@11.21.2` without saving it or changing the lockfile. npm rejected its `wasm32` platform label with `EBADPLATFORM`.
6. Restored that local workaround with:

   ```powershell
   npm.cmd install --no-save --package-lock=false --force @oxc-resolver/binding-wasm32-wasi@11.21.2 --cache .npm-cache --no-audit --no-fund
   ```

7. This fallback remained a local environment workaround, not a published runtime dependency or a new manifest/lockfile requirement. The repository's normal Windows setup guidance remained the standard native runtime installation.
8. Reran the configuration tests and the full browser suite with coverage:

   ```powershell
   npm.cmd run test:config
   npm.cmd run test:stories -- --coverage
   ```

9. Coverage initialization and all 43 story tests passed. The recorded coverage run reported 95.94% statements, 95.45% branches, 100% functions, and 98.43% lines for its reported files. These figures describe that run, not a promise of complete library or accessibility coverage.

## 7. Prepared publication metadata and release checks

1. Inspected Git remotes and used the existing `www-software-system-design/software-system-design-ui` repository for package source, issue, and homepage metadata.
2. Queried npm authentication and name availability. Initially `npm whoami` returned `ENEEDAUTH`, and the unscoped name returned 404. A 404 was treated as a lookup result, not a reservation or guarantee of publish permission.
3. Added a failing metadata contract test before adding the missing repository, bugs, homepage, registry, and public-access settings.
4. Added `scripts/check-release.mjs` and test-first checks rejecting an unready release: a wrong package identity, `private: true`, a missing/unpublished license choice, empty LICENSE text, unsupported prerelease version, mismatched release tag, missing versioned changelog heading, or unintended registry/access settings.
5. Confirmed the guard tests failed before the checks were implemented, then passed afterward. The real package readiness command still failed while licensing/ownership were undecided.
6. Added `test:release`, `check:release`, and `prepublishOnly` scripts. The guard tests joined `npm run check`. `prepublishOnly` runs release and packed-file checks for normal directory publication; the actual tarball publication was preceded by the explicit checks described here.
7. Created `.github/workflows/release.yml` for future manually dispatched, tagged releases. Its existence was not reported as a completed remote release.
   Parsed the release and Amplify YAML to check their syntax. An initial attempt to import a package named `yaml` failed because it was unavailable; using the already installed `js-yaml` parser succeeded. No YAML runtime dependency was added to the library for this check.
8. Created the release guide, migration notes, and relevant architecture records. This history supplements those records without creating another ADR.

## 8. Finalized the license and authenticated publishing account

1. The owner selected Apache License 2.0 and completed local npm login. `npm whoami --registry https://registry.npmjs.org/` then reported `vaniyathans`.
2. Added a regression test for the actual public manifest's Apache-2.0 setting, matching lockfile metadata, a complete LICENSE file, and the consumer's continued `private: true`. It failed before the license was applied.
3. Downloaded the unmodified official license text:

   ```powershell
   Invoke-WebRequest -Uri https://www.apache.org/licenses/LICENSE-2.0.txt -OutFile LICENSE
   Get-FileHash -LiteralPath LICENSE -Algorithm SHA256
   ```

4. The file was 11,358 bytes; its SHA-256 was `cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30`.
5. Set root `license: Apache-2.0` and `private: false`; added the license to the root lockfile entry. Kept the Next.js fixture private. No copyright owner was invented to replace the standard license text's appendix example.
6. Updated documentation and versioned release notes to reflect the owner-selected license and publishing identity.
7. Reran the tests and `npm run check:release`; the license contract and readiness checks passed.

## 9. Built, packed, and inspected each release candidate

These steps were repeated after package-name changes so the tested archive matched the name actually published.

1. Ran the library build before packaging. The package validator explicitly builds first so lifecycle text does not pollute npm's JSON output.
2. Ran the packing operation used by `scripts/check-package.mjs`:

   ```powershell
   npm.cmd pack --ignore-scripts --json --pack-destination .artifacts
   ```

3. Read npm's returned artifact name and file list. `--ignore-scripts` here followed the explicit build; it did not skip building the candidate.
4. Checked an allowlist permitting `package.json`, README/LICENSE files, and emitted `.js`, `.d.ts`, and `.css` files under `dist/`.
5. Rejected stories, tests, the Next.js fixture, source-only development files, and unexpected packed paths.
6. Verified the archive identity matched the manifest, every exported target existed in the archive, Next.js was not a runtime dependency, and React/React DOM peers were declared.
7. Inspected emitted visual component/provider modules for preserved leading client directives.
8. Recorded the exact tarball path in `.artifacts/package.json`. After adding LICENSE, the release archives contained 39 validated files.
9. Separately inspected archive contents with `tar`: verified the public manifest and compared the archive's LICENSE bytes with the downloaded root LICENSE. The first subprocess inspection was blocked by the execution sandbox; the permitted inspection succeeded.
10. Computed archive integrity from the actual bytes, rather than assuming an archive with the same filename was unchanged.

The final short-name archive was `.artifacts/software-system.design-ui-0.1.0.tgz`. The long-name archive was `.artifacts/software-system.design-software-system-design-ui-0.1.0.tgz`.

## 10. Validated behavior, stories, appearance, and the installed package

The release validation commands were:

```powershell
npm.cmd run check:release
npm.cmd run check
npm.cmd run test:stories
npm.cmd run build:storybook
npm.cmd run test:visual
npm.cmd run test:integration
```

`npm run check` expanded into lint/component-boundary/dependency checks, TypeScript type checking, unit tests, generator tests, configuration tests, release tests, and the build/packed-file validator.

The default visual command could not start because the user's existing Storybook occupied port 6006. That failed attempt was not recorded as a pass and the existing server was not stopped. An ignored temporary configuration imported the real visual configuration and changed only the server/base URL to port 6016 while preserving the test directory and screenshot paths. Its first `.ts` form failed because the nearest generated `package.json` did not declare ESM; an `.mjs` configuration resolved that execution issue. The actual successful command was:

```powershell
node node_modules/@playwright/test/cli.js test --config .artifacts/visual-release.config.mjs
```

No screenshot baselines were changed during these publication runs.

`npm run test:integration` performed all of the following, in order:

1. Rebuilt, packed, inspected, and recorded the exact tarball through `check:package`.
2. Installed the private consumer's dependencies using its lockfile (`npm ci`, or `npm install` if no lockfile existed), with a workspace-local cache and network access enabled for those fixture operations.
3. Installed the tarball with `npm install <tarball> --no-save --package-lock=false`; it did not replace the package with a source alias, symlink, workspace dependency, or linked `dist/` directory.
4. Used `import.meta.resolve()` to assert that the library resolved inside the consumer's own `node_modules/@software-system.design/ui/dist/` path.
5. Type-checked the fixture's tests with `tsconfig.tests.json`.
6. Ran the private Next.js consumer's production build with telemetry disabled.
7. Started its production server on port 3100 and ran Chromium compatibility tests.
8. Checked actual initial HTML with JavaScript disabled, hydration and client-owned state updates, documented stylesheet/theme/direction behavior, and composition of all atomic layers with a public hook.
9. Let the Playwright-managed server lifecycle finish after the suite. The fixture and its build output remained unpublished.

Final short-name release results:

| Check | Recorded result |
| --- | --- |
| Lint, component artifacts, dependency direction/cycles, types | Passed |
| Unit/component/hook/i18n/token tests | 55 passed |
| Generator tests | 2 passed |
| Vitest configuration regressions | 3 passed |
| Release metadata/identity/license tests | 8 passed |
| Packed files and library build | Passed; 39 files |
| Storybook browser interactions/accessibility checks | 43 passed |
| Storybook production build | Passed |
| Visual/browser suite on isolated port 6016 | 11 passed; no baseline updates |
| Packed Next.js production consumer | 4 passed |

The build emitted Storybook bundler warnings about module-level client directives, and lint reported an unused disable in generated coverage output. They were warnings, not silently corrected runtime changes. The separate library output checks confirmed preservation of client directives in the npm artifact.

## 11. Attempted the unscoped publication and encountered npm's 2FA requirement

The first proposed public name was `software-system-design-ui`.

1. After successful validation, attempted:

   ```powershell
   npm.cmd publish .artifacts/software-system-design-ui-0.1.0.tgz --access public --registry https://registry.npmjs.org/ --tag latest
   ```

2. The registry rejected the PUT with `E403`, requiring two-factor authentication or an eligible granular publishing token with 2FA bypass. Login success alone had not established publishing-compatible authentication.
3. Reported the actual rejection. This was an npm registry authentication requirement, not a local approval-review rejection.
4. Asked the owner to configure account security and authenticate locally. Passwords, access tokens, and one-time codes were not requested in chat or added to the repository.
5. The unscoped name was not successfully published.

## 12. Changed to organization ownership and published the first scoped name

The owner clarified that the npm organization should own the package, with publication performed through `vaniyathans`.

1. Queried authentication, organization membership, and candidate availability. The selected organization lookup was:

   ```powershell
   npm.cmd whoami --registry https://registry.npmjs.org/
   npm.cmd org ls software-system.design --json --registry https://registry.npmjs.org/
   npm.cmd view @software-system.design/software-system-design-ui name version --json --registry https://registry.npmjs.org/
   ```

2. Confirmed `vaniyathans` had the organization's `owner` role. Selected the exact dotted scope requested by the owner.
3. Added failing regression tests for the organization package name and rejection of the former unscoped name.
4. Renamed the manifest and root lockfile entries to `@software-system.design/software-system-design-ui`.
5. Updated the release/package validators, real consumer imports and resolution assertion, README, component documentation, CSS examples, and migration notes. Kept GitHub repository URLs unchanged.
6. Confirmed the scope regressions passed; reran the required checks, rebuilt/repacked, and tested the actual scoped installation.
7. Removed the earlier generated unscoped archive to prevent the obsolete command from publishing the wrong identity. The validator recorded the new scoped tarball path.
8. Checked account security; npm reported 2FA mode `auth-and-writes`.
9. Published the tested organization-scoped tarball:

   ```powershell
   npm.cmd publish .artifacts/software-system.design-software-system-design-ui-0.1.0.tgz --access public --registry https://registry.npmjs.org/ --tag latest
   ```

10. npm displayed an interactive browser-verification prompt. Opened the verification page and waited for the owner to complete it locally. No authentication URL nonce or credential is reproduced in this history.
11. After the owner confirmed completion, resumed the pending process. npm exited with code 0 and printed `+ @software-system.design/software-system-design-ui@0.1.0`, followed by a processing notice.
12. Did not republish while processing was pending. The public lookup initially returned 404, then a package entry without the requested version, before exposing 0.1.0.
13. Verified public metadata, the `latest` tag, Apache-2.0, the metadata's archive integrity, and an anonymous download's integrity against the tested tarball. A temporary verifier initially asserted too early when the package existed without the version; the next check succeeded after processing completed. The later verifier explicitly treated that intermediate state as pending.
14. Queried the published version's `_npmUser.name` and confirmed `vaniyathans`.

Long-name verification was recorded at **15:47:27 IST on 22 October 2026** (`2026-10-22T10:17:27.348Z`). Its SHA-512 integrity was:

```text
sha512-qD7GBkz5puSH7Z9mS05+K724IhFvRJTsS3wmx8PSdmQR6LWJFiL7hae3u0KFqyYSZc+XiwIjf971I8N4xppIrg==
```

## 13. Shortened the package to the requested installation name

The owner then requested `npm install @software-system.design/ui`.

1. Acknowledged that carrying the old project name into the scope had made the installation command unnecessarily long.
2. Verified the authenticated account and looked up `@software-system.design/ui`. It was not publicly present at that check.
3. Changed the regression candidate to the short name and added rejection of the former long organization name. The test run failed before implementation, including the manifest-name assertion and the missing rejection of the old name.
4. Changed root manifest/lockfile names, package/release guards, and the private consumer's actual imports and installed-package resolution assertion to `@software-system.design/ui`.
5. Updated active install examples, root/component/provider/hook/i18n imports, stylesheet/token imports, Storybook descriptions, README, release guide, and migration instructions.
6. Kept the old publication's historical evidence intact and added a separate name-change record. The existing GitHub repository and source directories kept their long names.
7. Kept version 0.1.0 because the shorter identity was a new npm package, not an overwrite of the already published long-name package. Component APIs, export suffixes, licensing, peers, styles, and runtime behavior were preserved.
8. Preserved the long-name verification record separately as `.artifacts/publication-long-name.json`.
9. Confirmed all eight release tests passed after implementation, then reran repository checks, stories, the Storybook build, isolated visual checks, and the four packed-consumer tests listed above.
10. Rebuilt the Storybook upload archive so its documented import examples also used the short package name.
11. Read the new tarball path from `.artifacts/package.json` and started publication:

    ```powershell
    npm.cmd publish .artifacts/software-system.design-ui-0.1.0.tgz --access public --registry https://registry.npmjs.org/ --tag latest
    ```

12. npm required another browser security check for this operation. Opened that page, waited for the owner, and resumed the same pending publish after the owner confirmed completion.
13. npm returned exit code 0 and `+ @software-system.design/ui@0.1.0`. It again reported processing before the public version was downloadable.
14. Polled the public registry using an anonymous request and no-cache headers. Both 404 and an existing package without 0.1.0 were treated as pending, with 15-second intervals and a bounded retry limit. No duplicate publish was submitted.
15. After 0.1.0 appeared, checked the package name, version, Apache-2.0 license, and `latest: 0.1.0` tag.
16. Computed `sha512-` plus the Base64 SHA-512 digest of the local tested archive and compared it to the registry's `dist.integrity`.
17. Downloaded `dist.tarball` anonymously, required HTTP 200, and computed its digest independently. It matched both the registry metadata and local tested archive exactly.
18. Wrote `.artifacts/publication.json` with the verified name, version, license, tag, integrity, and timestamp. Checked the published version's publisher field separately and confirmed `vaniyathans`.
19. Updated release history/status and reported the successful short-name installation command. The earlier long package remained a separate registry entry; it was not unpublished or deprecated during this work.

Final verification was recorded at **16:00:04 IST on 22 October 2026** (`2026-10-22T10:30:04.680Z`). The final SHA-512 integrity was:

```text
sha512-Bs2XyAsbzzmEVzynCkcFj4ILTzHmVzntcdzD0/PgW53D5HCEnQJqRTHkiqs+naluFEB76t2OTXkiV3Ts20s9tg==
```

The public result was [@software-system.design/ui@0.1.0](https://www.npmjs.com/package/@software-system.design/ui/v/0.1.0):

```sh
npm install @software-system.design/ui
```

```tsx
'use client';

import '@software-system.design/ui/styles.css';
import { Button } from '@software-system.design/ui/button';
import { UIProvider } from '@software-system.design/ui/provider';

export function SaveButton() {
  return (
    <UIProvider theme="system" locale="en" direction="ltr">
      <Button onClick={() => console.log('Save requested')}>Save</Button>
    </UIProvider>
  );
}
```

The consumer still supplies compatible React and React DOM peers and places its stylesheet import according to its application layout conventions.

## 14. Prepared Storybook hosting separately from npm publication

1. Confirmed the requested hostname was `storybook.software-system.design` on Amplify with Route 53.
2. Added `amplify.yml` with Node 24 setup, dependency installation, `npm run build:storybook`, and `storybook-static/**/*` as the only hosting output. Next.js fixture output was not the hosting artifact.
3. Built and compressed the output contents into `.artifacts/storybook-0.1.0.zip`:

   ```powershell
   Compress-Archive -Path storybook-static/* -DestinationPath .artifacts/storybook-0.1.0.zip -Force
   ```

4. Checked that the ZIP exposed `index.html`, `iframe.html`, and `index.json` at its root instead of nesting them inside another build directory. Refreshed the ZIP when the package examples changed.
5. Checked available deployment access. This environment had no AWS CLI in the standard installation location, AWS environment credentials, or user AWS config/credentials files. Deployment integration discovery did not provide a connected Amplify/Route 53 capability. GitHub access was suggested but not confirmed connected.
6. The owner explicitly chose to perform AWS work themselves. Supplied manual Amplify ZIP upload instructions, subdomain-only mapping, managed TLS/DNS validation steps, and a GitHub-connected hosting alternative in the [release guide](../releases.md#storybook-under-software-systemdesign).
7. No Amplify app, DNS record, TLS certificate, or hosted Storybook deployment was provisioned by this agent. Final hostname verification was left to the owner. npm publication did not depend on completing that separate deployment.

## 15. Prepared future release automation without claiming it ran

The local GitHub workflow was prepared to:

1. Accept a stable `release_tag` through `workflow_dispatch`.
2. Check out `refs/tags/<release_tag>` using `actions/checkout@v6`.
3. Use a GitHub-hosted Windows runner for the existing reviewed screenshot platform, Node 24 through `actions/setup-node@v6`, and npm 11.19.0. Package-manager caching was disabled for this workflow.
4. Install dependencies, run the release-tag/readiness check, install Chromium, and run the full repository/story/build/visual/packed-consumer checks.
5. Read the exact tarball path from `.artifacts/package.json` and publish that archive with public access and provenance.
6. Grant `id-token: write` for npm trusted publishing and retain failure artifacts.

The guide documented the npm trusted publisher fields: GitHub owner `www-software-system-design`, repository `software-system-design-ui`, workflow filename `release.yml`, no environment name, and allowed action `npm publish`. These settings must be configured for the current `@software-system.design/ui` package separately from the older package.

No Git commit, tag, push, GitHub release, remotely executed publishing workflow, or remotely configured npm trusted publisher was performed as part of these manual publications. Existing uncommitted source changes were preserved. The successful releases used local npm authentication and browser verification; they were not presented as OIDC/provenance-attested CI releases. Future tagged releases require the intended source and workflow to be committed and the trusted publisher configured before execution.

## 16. Retained evidence and publication limits

| Evidence | Location or result |
| --- | --- |
| Current package and public API settings | Root `package.json` and `package-lock.json` |
| License | Root `LICENSE`; official Apache-2.0 text |
| Build and publish-file validator | `scripts/build.mjs`, `scripts/check-package.mjs` |
| Release guards and red/green contracts | `scripts/check-release.mjs`, `scripts/release.test.mjs` |
| Installed-package compatibility | `scripts/test-integration.mjs`, private Next.js fixture |
| Actual short-name tarball path | `.artifacts/package.json` |
| Final public integrity verification | `.artifacts/publication.json`; digest reproduced above |
| Previous scoped publication verification | `.artifacts/publication-long-name.json`; digest reproduced above |
| Storybook upload output | `.artifacts/storybook-0.1.0.zip` |
| Owner deployment and future release instructions | [Release guide](../releases.md) |

The `.artifacts` files are local ignored evidence and may not exist in a fresh clone. Important publication names, timestamps, results, and digests are recorded here so the history does not rely solely on those temporary files.

Published versions were not overwritten. Neither initial unscoped name was successfully published in this work. The two organization-scoped names are separate published package identities. The final supported installation example uses the shorter name, and migration changes the package/import prefix while preserving component subpaths and APIs.

This document was added after publication. Documentation validation does not publish another version, modify the published registry artifacts, or deploy Storybook. The history and its link in the release guide are outside the npm publish-file allowlist.
