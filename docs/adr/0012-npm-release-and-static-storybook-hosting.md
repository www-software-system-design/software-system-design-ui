# ADR 0012: npm releases and static Storybook hosting

The original publication recorded here used the long package name. [ADR 0013](0013-short-ui-package-name.md) supersedes that identity with `@software-system.design/ui`; the release and hosting workflow still applies.

[ADR 0015](0015-automatic-main-releases.md) supersedes the manual dispatch/tagging policy with automatic versioned releases on main pushes. Hosting remains independent.

- Date: 2026-10-22
- Status: Accepted. Apache-2.0, organization scope `@software-system.design`, publishing account `vaniyathans`, and `storybook.software-system.design` on Amplify/Route 53 are confirmed. The owner will perform AWS deployment and DNS configuration.
- Implementation: Release metadata validation, a tagged publishing workflow, and Amplify static build settings added. Scoped version 0.1.0 is published and publicly verified, including an anonymous tarball download matching the tested artifact's SHA-512 integrity. The owner performs Storybook hosting and domain verification using the supplied archive and guide.

## Context

The owner requested publication of the shared npm library and Storybook under a software-system.design subdomain. The initial package lacked a license decision and retained its first-release publication guard. The owner subsequently chose Apache-2.0, authenticated npm as `vaniyathans`, and confirmed the Storybook subdomain and AWS hosting target. The working tree has substantial uncommitted implementation changes; the sibling application documents Amplify hosting and Route 53 DNS.

## Decision

Publish `@software-system.design/software-system-design-ui@0.1.0` for the `software-system.design` npm organization using authenticated owner account `vaniyathans`. The package prefix changes from the interim unscoped name; component subpaths and runtime APIs stay the same. The root manifest declares `private: false` and `license: Apache-2.0`, with the official Apache license text in `LICENSE`. The integration fixture remains private and installs the scoped tarball. This completes the first-release license/ownership condition recorded in ADR 0010. Public package metadata identifies the GitHub repository and npm registry. A release check rejects a wrong package scope, private or unlicensed packages, mismatched tags, missing versioned release notes, and unintended registry/access settings.

Bootstrap the first publication through an authenticated maintainer. Configure npm trusted publishing for later manually dispatched tagged releases, using OIDC and provenance rather than a stored write token. Validate unit, configuration, generator, story, visual, package-content, and packed-consumer checks before publishing the tested tarball. Keep Windows runners for the existing reviewed screenshot baselines.

Build Storybook as static assets in `storybook-static`. Use Amplify and Route 53 for the confirmed `storybook.software-system.design` hostname. Use a separate app and a subdomain association without taking over the main site's root or `www` records. Keep Storybook hosting independent of npm publication and the Next.js integration fixture.

## Alternatives

- Publishing directly on every push risks unintended releases and omits explicit versioned release notes.
- A long-lived npm write token requires secret management that OIDC avoids for subsequent releases.
- Hosting Storybook through the Next.js fixture couples a published library's documentation to its unpublished consumer.
- GitHub Pages, Cloudflare Pages, and other static hosts can serve the same build; Amplify is prepared because it matches the documented adjacent system, not because Storybook requires AWS.

## Consequences and migration

Licensing, organization membership, and account 2FA are confirmed. The organization-scoped package is publicly available as version 0.1.0 and npm's `latest` tag. Tagged CI releases require committed release contents. Consumers must replace `software-system-design-ui` import and dependency prefixes with `@software-system.design/software-system-design-ui`, including CSS imports. Neither earlier name was published. The owner requested instructions and a static archive for their own Storybook provisioning, so AWS access is not needed by this agent. Versioning and migration notes remain mandatory for future public API changes.

## Evidence required

Record the test-first release guard failures and passing tests, repository checks, Storybook browser/build checks, reviewed visual results, and packed-consumer results. Separately record the actual npm version URL and final HTTPS Storybook hostname after external publication and DNS validation.

## Initial release evidence

- The two organization-scope regression tests failed before the rename and passed afterward; all seven release tests passed.
- `npm run check`, `npm run test:stories` (43 tests), and `npm run build:storybook` passed. The 11 visual tests passed on isolated port 6016 without baseline changes; port 6006 was occupied by an existing Storybook server.
- `npm run test:integration` passed all four production Next.js consumer checks using the scoped npm tarball.
- Publication succeeded after browser authentication. Public npm metadata and an anonymous tarball download confirmed [0.1.0](https://www.npmjs.com/package/@software-system.design/software-system-design-ui/v/0.1.0), Apache-2.0, the `latest` tag, and matching SHA-512 integrity.
- AWS deployment and final Storybook hostname verification are owner-managed; the upload archive and instructions were supplied. The GitHub publishing workflow has not been run remotely.
