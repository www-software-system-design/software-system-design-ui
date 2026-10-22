# ADR 0016: Manual npm publication

- Date: 2026-10-23
- Status: Accepted at the owner's request.
- Supersedes: [ADR 0015](0015-automatic-main-releases.md) and the trusted-publishing/tagged-workflow part of [ADR 0012](0012-npm-release-and-static-storybook-hosting.md).

## Context

The owner now wants npm publication to be manual and has requested removal of
the publishing GitHub Action and Git tag/GitHub release creation. Version 0.2.0
was published manually using the maintainer's npm login and browser security check.

## Decision

Remove release.yml, its automatic-release helper and its tests. Keep ci.yml as
validation-only CI with read access. No repository workflow publishes npm packages,
creates Git tags, or creates GitHub releases.

Keep the local publication guard and its tests for package scope, license, stable
version, versioned changelog, public access and registry. Remove its tag argument
and RELEASE_TAG environment input. Keep build/pack hooks and packed-consumer
checks, which validate artifacts without publishing them.

Maintainers select an unused version, update the manifest/lockfile/changelog,
run checks, and publish the exact tested tarball using their own npm login. Verify
public metadata and downloaded tarball integrity after npm processing completes.
The [release guide](../releases.md) is the current procedure. Git tags and GitHub
releases are neither required nor created by that procedure.

## Alternatives

- Retain a manually dispatched publishing Action: rejected because publication
  must now be performed locally without a release workflow.
- Keep automatic tag/release creation but publish npm manually: rejected because
  the owner explicitly requested removal of both creation steps.

## Migration and consequences

Main pushes continue to run validation, and a successful CI run does not publish
anything. Existing published versions, Git tags, GitHub releases, and historical
records remain intact. No external npm trusted-publisher settings are changed by
this repository edit; any old workflow association is unused after its removal
is committed and pushed. Stop any already-running old release job in GitHub before
publishing manually; deleting a workflow does not cancel a run already in progress.

Package identity, exports, peers, and runtime behavior are unchanged. The manual
guard no longer requires a tag, and its regression is confirmed failing before
that requirement is removed and passing afterward.
