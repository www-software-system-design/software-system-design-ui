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

## Subsequent releases

Configure npm trusted publishing for:

Configure these settings on the `@software-system.design/ui` npm package. Trusted publisher settings belong to each package identity separately.

| Field | Value |
| --- | --- |
| GitHub owner | `www-software-system-design` |
| Repository | `software-system-design-ui` |
| Workflow filename | `release.yml` |
| Environment | Leave empty; the workflow does not declare one |
| Allowed action | `npm publish` |

The workflow uses GitHub-hosted Windows runners for the reviewed visual baselines, Node 24, and npm 11.19.0. It grants `id-token: write` to the publishing job and publishes the tarball tested by the packed Next.js consumer. No npm write token is stored in GitHub. See [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/).

Pushes to **main** now run **Publish npm package** automatically. The version in
`package.json` controls the release; the workflow does not increment versions or
write commits back to main. For a new release:

1. Update the manifest and lockfile together, for example with
   `npm.cmd version patch --no-git-tag-version` (choose minor/major when appropriate).
2. Add a matching `## <version>` changelog entry describing the release and migration.
3. Commit those updates with the implementation and push/merge to main.

The workflow pins the triggering commit SHA, validates release metadata, and runs
all repository, story, visual and packed-consumer checks. It then creates
`v<version>` at that exact commit, publishes the tested tarball to npm with
provenance, checks registry SHA-512 integrity, and creates the GitHub release from
that version's changelog section. Stable versions publish to npm's `latest` tag.
Prereleases, version downgrades and moving existing tags are rejected.

If npm, the tag and GitHub release already exist, later pushes with that same
version skip release work; ordinary CI still validates the changes. Bump the
version to ship further code changes. The initial push containing this workflow
is eligible to release the manifest's version if it is new on npm.

For a transient failure, use **Re-run failed jobs** on the original Actions run.
A created tag is reused only for the original commit. If npm publication succeeded
but GitHub release creation failed, retrying verifies npm integrity and creates
the missing GitHub release without republishing. If main has advanced while a
release is incomplete, rerun the original run rather than moving its tag. The
**Run workflow** button remains available for main without a tag input.

The job requests `contents: write` for tags/releases and `id-token: write` for npm.
Ensure repository tag rules permit the release workflow and that the npm trusted
publisher above is configured; no personal access token or npm write token is
required. Runs are serialized with a bounded pending queue and do not cancel a
release already running. Workflow-created tags do not need to trigger a second
workflow: npm and GitHub publication happen in this same run. See
[GitHub concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency)
and [release API](https://docs.github.com/en/rest/releases/releases).

See [ADR 0015](adr/0015-automatic-main-releases.md). This supersedes the previous
manual tagged-release procedure; historical publication records remain unchanged.

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
