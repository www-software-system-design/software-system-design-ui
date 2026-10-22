# ADR 0013: Short UI package name

- Date: 2026-10-22
- Status: Accepted by the owner.
- Supersedes: The package-name portion of ADRs 0010 and 0012.
- Implementation: Manifest, lockfile, release guard, packed consumer, examples, and active documentation use `@software-system.design/ui`. Version 0.1.0 is published and publicly verified; its anonymous npm download matches the tested archive's SHA-512 integrity.

## Context and decision

The first organization package was published as `@software-system.design/software-system-design-ui@0.1.0`. The owner requested the shorter installation command `npm install @software-system.design/ui` because the organization scope already identifies the system.

Publish the same library under `@software-system.design/ui@0.1.0`, with Apache-2.0 licensing, public access, and npm organization owner `vaniyathans` as publisher. This is a distinct npm package identity and its initial version. Preserve component APIs, export subpaths, React peers, client directives, and CSS contracts. Install the actual new tarball in the private Next.js consumer.

## Alternatives and migration

Keeping the long name duplicates information in the organization scope. Publishing a wrapper would add an unnecessary runtime dependency and another package boundary. Direct publication under the short identity keeps the artifact self-contained.

Consumers migrating from the former package must replace the dependency and all import prefixes, including CSS, with `@software-system.design/ui`. For example, use `@software-system.design/ui/button` and `@software-system.design/ui/styles.css`. The previous registry entry remains available; this change does not mutate the already published artifact.

## Required evidence

Record failing and passing identity regression tests, repository checks, story tests/build, and packed-consumer results. Verify the public registry version and the downloaded archive's integrity against the tested artifact after publication. Storybook hosting remains owner-managed under ADR 0012.

The identity regression run failed before the change, including the manifest-name assertion and rejection of the former long package name. All eight release tests passed afterward. `npm run check`, 43 Storybook tests, the Storybook build, 11 visual tests on isolated port 6016 without baseline changes, and four packed-consumer checks passed. The prepared Storybook archive includes the shorter import examples. After browser authentication and npm processing, [version 0.1.0](https://www.npmjs.com/package/@software-system.design/ui/v/0.1.0), Apache-2.0 licensing, the `latest` tag, and exact anonymous download integrity were verified. The GitHub publishing workflow was not run; AWS deployment remains owner-managed.
