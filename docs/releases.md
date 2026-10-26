# Package releases and Storybook hosting

For the chronological account of the conversion, failed attempts, fixes, authentication, and both successful package publications, read the [publication history](history/npm-publication-2026-10-22.md).

The public package is `@software-system.design/ui`, starting at `0.1.0`. Its source is [www-software-system-design/software-system-design-ui](https://github.com/www-software-system-design/software-system-design-ui). The package contains ESM modules, declarations, and opt-in CSS. React and React DOM `^19.3.0` are consumer peers; the representative consumer uses React 19.3.1 and Next.js 16.4.2.

The package belongs to the `software-system.design` npm organization. Publish while authenticated as `vaniyathans`, whose organization owner membership was verified with `npm org ls software-system.design --json`. The owner selected Apache-2.0 and confirmed `storybook.software-system.design` on AWS Amplify with Route 53. The root package includes the official Apache license text; the integration fixture stays private. The owner will perform AWS deployment and DNS configuration; this environment does not need AWS credentials.

## Short package release

Published and publicly verified on 2026-10-22: [`@software-system.design/ui@0.1.0`](https://www.npmjs.com/package/@software-system.design/ui/v/0.1.0), under Apache-2.0 with the `latest` tag. The manifest, lockfile, release guard, examples, and packed consumer use the shorter name. Repository checks, 43 story tests, 11 visual tests, the Storybook build, and four packed-consumer tests passed. The anonymously downloaded npm archive exactly matches the tested tarball's SHA-512 integrity; the verification record is `.artifacts/publication.json`.

```sh
npm install @software-system.design/ui
```

The following publication procedure was used. For subsequent releases, choose a new version; 0.1.0 is already published:

```powershell
npm.cmd run check:release
npm.cmd run check
npm.cmd run test:stories
npm.cmd run build:storybook
npm.cmd run test:visual
npm.cmd run test:integration
$artifact = Get-Content -LiteralPath .artifacts/package.json -Raw | ConvertFrom-Json
npm.cmd publish $artifact.tarball --access public --registry https://registry.npmjs.org/
```

Authenticate as `vaniyathans` and complete npm's browser security check when requested. The account must have publishing-compatible 2FA. Keep authentication secrets out of repository files and chat. Verify the published version, latest tag, and tarball integrity against the tested archive before reporting success.

The previously published package [@software-system.design/software-system-design-ui@0.1.0](https://www.npmjs.com/package/@software-system.design/software-system-design-ui/v/0.1.0) was verified on 2026-10-22. It remains a separate registry entry. Migrate by replacing its dependency and every import prefix with `@software-system.design/ui`, including CSS imports. Component APIs and subpaths stay the same. Version 0.1.0 is the initial version for the new package identity.

## Manual releases

Version **0.2.0** was manually published and publicly verified on 2026-10-23.
It cannot be published again. Choose a new version for subsequent changes.

Publication is local and manual. Pushes and pull requests run the validation-only
`ci.yml` workflow. There is no npm publishing Action, Git tag creation step, or
GitHub release creation step. No Git tag or GitHub release is required to publish.
See [ADR 0016](adr/0016-manual-npm-publication.md).

1. Use Node 24, install dependencies with `npm.cmd ci`, and install Chromium with
   `npx.cmd playwright install chromium` if needed. Work from the intended source
   revision and preserve any unrelated changes.
2. Inspect existing versions with `npm.cmd view @software-system.design/ui versions --json`.
   Select an unused version higher than the current latest. Update the manifest
   and lockfile together using, for example,
   `npm.cmd version patch --no-git-tag-version`. Choose minor/major as appropriate.
   This command updates version metadata without creating a commit or Git tag.
3. Add a matching `## <version>` changelog entry with relevant migration notes.
   Review and commit the intended release contents before preparing the archive.
4. Run all validation commands below. Stop on any failure. Review any intentional
   screenshot differences before accepting baselines. Integration testing creates
   and installs the exact archive recorded in `.artifacts/package.json`.
5. Authenticate locally with `npm.cmd login --registry https://registry.npmjs.org/`
   if needed, and verify the publishing account using
   `npm.cmd whoami --registry https://registry.npmjs.org/`.
6. Publish that tested archive using the separate publication command below.
   Complete npm's browser security check when requested. Do not share credentials.
7. Wait for npm processing, then verify the exact version and the `latest` npm
   dist-tag. Compare the registry's SHA-512 integrity and an anonymously downloaded
   archive against the tested tarball before reporting it available. A successful
   CLI exit alone does not establish public availability. If a version was
   accepted but is still processing, verify it before attempting publication again.

### Windows resolver setup after a clean install

On the Windows host described in [ADR 0010](adr/0010-scaffold-tooling-and-initial-compatibility.md),
the installed native `oxc-resolver` binding cannot load its required Visual C++
runtime. Vitest can report `Cannot find native binding` while initializing the
Storybook project, including during `npm run check`. The native file can exist
even though Windows cannot load it.

For this documented local workaround, restore the matching WebAssembly fallback
after `npm.cmd ci` and before validation:

```powershell
$resolverVersion = node -p "require('./node_modules/oxc-resolver/package.json').version"
npm.cmd install --force --no-save --package-lock=true --no-audit --no-fund --cache .npm-cache "@oxc-resolver/binding-wasm32-wasi@$resolverVersion"
if ($LASTEXITCODE -ne 0) { throw 'Resolver fallback installation failed' }
node -e "require('oxc-resolver'); console.log('Resolver ready')"
if ($LASTEXITCODE -ne 0) { throw 'Resolver startup failed' }
```

`--force` permits this specific fallback's `wasm32` CPU label on the Node host.
`--no-save` keeps the fallback out of the manifest and prevents lockfile writes;
`--package-lock=true` retains the pinned dependency resolution. Do not use
`--package-lock=false` for this restore, because it ignores the pinned versions.
See [npm install configuration](https://docs.npmjs.com/cli/v11/commands/npm-install/#save).
The fallback is a local development-tool dependency and is excluded from the
published UI package. A later `npm ci` removes it, so repeat this step on this
host after each clean install.

The 0.3.0 failure was reproduced at resolver startup. A clean install followed by
this restore loaded the resolver successfully, preserved package metadata and
matched all installed dependency versions represented in the lockfile.
The subsequent `npm.cmd run check` passed with 150 unit tests and a validated
0.3.0 archive; all 192 Storybook tests and the Storybook build also passed.

Validation (each failed command stops this PowerShell sequence):

```powershell
$checks = 'check:release', 'check', 'test:stories', 'build:storybook', 'test:visual', 'test:integration'
foreach ($check in $checks) {
  npm.cmd run $check
  if ($LASTEXITCODE -ne 0) { throw "Validation failed: $check" }
}
```

Publication, after successful validation and authentication:

```powershell
$artifact = Get-Content -LiteralPath .artifacts/package.json -Raw | ConvertFrom-Json
npm.cmd publish $artifact.tarball --access public --registry https://registry.npmjs.org/
if ($LASTEXITCODE -ne 0) { throw 'npm publication failed' }
$package = Get-Content -LiteralPath package.json -Raw | ConvertFrom-Json
npm.cmd view "$($package.name)@$($package.version)" version dist.integrity --registry https://registry.npmjs.org/
npm.cmd view $package.name dist-tags --json --registry https://registry.npmjs.org/
```

Existing tags, GitHub releases, and historical publication records remain intact.
No external npm account or trusted-publisher settings are changed by removing
repository automation. Stop any old release job still running in GitHub before a
manual publication; removing its workflow does not cancel an in-progress run.

## Storybook under software-system.design

`amplify.yml` builds the static documentation using Node 24 and deploys only `storybook-static/**/*`. The root library build and unpublished Next.js fixture are not the hosting output. See the [Amplify build specification](https://docs.aws.amazon.com/amplify/latest/userguide/yml-specification-syntax.html).

### First deployment using the prepared archive

1. In the AWS Amplify console, select **Create new app → Deploy without Git → Next**.
2. Set the app name to `software-system-design-storybook`, branch name to `production`, and deployment method to **Drag and drop**.
3. Upload `.artifacts/storybook-0.1.0.zip` from this checkout and choose **Save and deploy**. The archive contains `index.html`, `iframe.html`, and `index.json` at its root. Upload this archive directly; do not wrap it inside another `storybook-static` folder.
4. Open the resulting Amplify HTTPS URL and verify the story list and a working interactive story. These steps follow [AWS's manual deployment guide](https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html).
5. In this app, open **Hosting → Custom domains → Add domain**. Enter `software-system.design`, then choose **Configure domain**.
6. Choose **Exclude root**, keep only subdomain `storybook`, and map it to branch `production`. Remove any proposed `www` mapping. Choose an Amplify-managed TLS certificate and add the domain. Follow [AWS's subdomain-only instructions](https://docs.aws.amazon.com/amplify/latest/userguide/to-manage-subdomains.html).
7. Complete any DNS validation instructions Amplify displays for the Route 53 zone. Wait until the domain and certificate are available, then verify `https://storybook.software-system.design`, a story permalink, its iframe, and JS/CSS assets. Preserve the existing apex and `www` site's records.

For later manual deployments, rebuild with `npm run build:storybook`, zip the contents of `storybook-static`, and upload the new archive to the same Amplify app/branch. Build the archive in PowerShell with:

```powershell
npm.cmd run build:storybook
Compress-Archive -Path storybook-static/* -DestinationPath .artifacts/storybook-0.1.0.zip -Force
```

### Continuous deployment from GitHub

For automatic rebuilds instead of manual archive uploads, connect a GitHub-backed Amplify app using these settings:

1. Create a separate Amplify Hosting app connected to this repository and its intended documentation branch, initially `main`. Configure it as a static web app (`WEB`), rather than a Next.js compute app. Use the repository's `amplify.yml` build settings and confirm the first deployment at the Amplify-provided HTTPS URL.
2. In Hosting → Custom domains, add `software-system.design` and map the confirmed `storybook` subdomain to the documentation branch. Remove automatically proposed root and `www` mappings from this new association so the existing main site remains on its current hosting.
3. Use an Amplify-managed TLS certificate. In the account managing the Route 53 zone, create or approve only the DNS validation and subdomain records requested by Amplify. If the hosted zone belongs to another account, its administrator must add those records there. Follow [AWS's Route 53 custom-domain instructions](https://docs.aws.amazon.com/amplify/latest/userguide/to-add-a-custom-domain-managed-by-amazon-route-53.html).
4. Verify HTTPS, the Storybook index, `iframe.html`, static JS/CSS assets, and an interaction story on the final hostname. Keep missing asset URLs as real 404s; Storybook's normal `/?path=/story/...` links do not require a blanket SPA rewrite.

No AWS resources or DNS records have been created by adding this configuration. The owner performs the AWS console steps above. Roll back documentation by redeploying a previously verified Amplify build; that is independent of npm versioning.
