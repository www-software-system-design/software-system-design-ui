# ADR 0015: Automatic versioned releases from main

- Date: 2026-10-22
- Status: Accepted at the owner's request.
- Supersedes: the manual dispatch/tagging part of [ADR 0012](0012-npm-release-and-static-storybook-hosting.md).

## Context

The owner wants a push to main to create a version tag and GitHub release, along
with the existing npm publication. The previous workflow required a manually
created tag and a dispatch input. Package versions and changelog notes remain
reviewed contracts, and npm versions cannot be overwritten.

## Decision

Trigger release.yml on main pushes and retain manual dispatch on main for retries.
Use the exact triggering SHA and the manifest's stable version, with a matching
lockfile and changelog. Do not automatically bump versions or commit from CI.
Skip release work when npm, the version tag and a published GitHub release already
exist; normal CI continues to run on every push.

Before external writes, run metadata, lint/architecture, types, unit/tooling, story,
visual, static documentation, package-content and production packed-consumer checks.
Then create a lightweight version tag, publish that validated archive through npm
OIDC, verify registry integrity and create the GitHub release with version-specific
changelog notes. Keep Windows runners and existing visual baselines. Node scripts
and workflow imports must work with Windows file URLs.

Use contents:write only in the release job and id-token:write for trusted publishing.
Retain the existing npm trusted-publisher workflow identity. Serialize release runs
without cancelling a running publication; use GitHub's bounded multi-run queue.
Registry/API failures fail closed rather than being treated as missing releases.

Retries reuse a tag only at the original SHA. An npm version already published at
that tag is verified against the rebuilt archive before creating a missing GitHub
release. Never move tags, overwrite versions or mark mismatched bytes as released.
Reject new versions that would downgrade npm latest. Fully completed older releases
are harmless no-ops when later commits keep their version.

## Alternatives

- Increment a patch version on every push: rejected because it removes explicit
  semver choice and requires CI-generated commits or publishing a version absent
  from the validated source. Major/minor changes still need deliberate review.
- Create a tag and rely on another tag-triggered workflow: rejected because default
  workflow-token event behavior can suppress that second run; one workflow is clearer.
- Retain manual release dispatch: superseded by the owner's requested main trigger.
- Use a long-lived npm token or personal GitHub token: unnecessary with OIDC and the
  repository workflow token.

## Migration and evidence

Maintainers now commit version/lockfile/changelog changes and merge to main; CI
creates the tag and release. Existing historical tags/releases remain unchanged.
The Run workflow tag input is removed. For incomplete releases rerun the original
Actions run, or choose a new version for changed source; do not move the old tag.

Tests must cover new/duplicate/partial releases, tag collisions, registry and API
errors, version rollback, annotated tags, integrity mismatch, workflow validation
ordering and execution of the actual planning script on the local runner. Local
tests mock remote writes. Successful remote publication can only be established
after this workflow is pushed and run with the configured npm trusted publisher.
