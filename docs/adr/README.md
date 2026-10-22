# Architecture decision records

These records capture the architecture discussed for the shared software-system.design UI library used by its microfrontends (MFEs).

The repository contains a React package with tests, Storybook, CI configuration, and an unpublished Next.js integration consumer. The owner authorized scaffolding and the initial Apache-2.0 npm release. Implementation and external publication status are recorded separately in the ADRs and release guide.

## Decision index

| ADR | Topic | Status |
| --- | --- | --- |
| [0001](0001-shared-react-package-and-mfe-boundaries.md) | Shared React package and MFE boundaries | Accepted |
| [0002](0002-atomic-design-and-stable-component-structure.md) | Atomic design and stable component structure | Accepted |
| [0003](0003-test-driven-development-and-testing-layers.md) | Mandatory TDD and complementary testing layers | Accepted |
| [0004](0004-storybook-as-component-documentation.md) | Mandatory Storybook documentation | Accepted |
| [0005](0005-server-and-client-component-boundaries.md) | Library Client Components and MFE Server Components | Accepted |
| [0006](0006-state-ownership-instead-of-hook-limits.md) | State ownership instead of atomic hook limits | Accepted |
| [0007](0007-localizable-component-contracts.md) | Localizable component contracts | Accepted |
| [0008](0008-semantic-tokens-and-default-themes.md) | Semantic tokens and default light/dark themes | Accepted |
| [0009](0009-packed-package-nextjs-consumer-tests.md) | Packed-package Next.js consumer tests | Accepted |
| [0010](0010-scaffold-tooling-and-initial-compatibility.md) | Scaffold tooling and initial compatibility | Accepted |
| [0011](0011-reference-examples-for-every-atomic-layer.md) | Reference examples for every atomic layer | Accepted |
| [0012](0012-npm-release-and-static-storybook-hosting.md) | npm release tooling and static Storybook hosting | Accepted; owner manages AWS deployment |
| [0013](0013-short-ui-package-name.md) | Short `@software-system.design/ui` package identity | Accepted |
| [0014](0014-container-components-and-brand.md) | Container presentation extraction and shared branding | Accepted for implementation |

The owner requested these requirements and subsequently authorized their implementation as the repository scaffold. Future proposals must be distinguished from accepted decisions. A decision status does not by itself establish that its implementation or validation is complete.

## Maintaining records

- Read relevant records before changing component architecture, tooling, exports, or shared contracts.
- Each record includes context, decision or proposal, alternatives, consequences, and implementation evidence required.
- Number new records sequentially. Use a new ADR for a material change to an accepted decision, and link both records with the supersession relationship.
- Keep implementation status separate from decision status. Record actual validation results in the implementation change; do not claim checks that were not run.
- Resolve proposed details before treating them as mandatory project policy. Carry confirmed requirements into root agent guidance and automated checks during the corresponding implementation work.
