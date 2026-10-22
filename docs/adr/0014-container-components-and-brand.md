# 0014 — Extract container presentation and adopt its brand

Status: Accepted for implementation, 2026-10-22. Requested by the owner.

## Context

The informational container repeats page shells, navigation, section headings,
cards, disclosures, fields, feedback, metrics, and table pagination across seven
routes. The shared package already defines atomic levels, client boundaries,
state ownership, localization, and packed-consumer validation.

## Decision

Extract domain-independent presentation into the existing hierarchy. Keep
application content, Next links/images, routing, server loaders, contributor
fetching, dataset filtering/sorting/aggregation, GitHub authentication/writes,
draft editing, theme persistence, and fullscreen presentation in the container.

| Level | Public components | Responsibility |
| --- | --- | --- |
| Atoms | Badge, TextArea, ThemeToggle | Native status/form controls and a controlled theme action |
| Molecules | SectionHeading, ContentCard, Disclosure, TextField, Pagination, Statistic | Labelled presentation and small composed interactions |
| Organisms | SiteHeader, SiteFooter, DataTable, ContentState | Navigation chrome, scrollable records, and application-supplied async feedback |
| Templates | MarketingLayout | Header/main/footer landmarks and content slots |

All receive caller content and labels; none fetch business data or import Next.
Disclosure and SiteHeader allow controlled state or isolated default state via
the existing hook. ThemeToggle and Pagination always report requests to their
owner. Text controls preserve native controlled/uncontrolled input semantics.
Slots accept Server Component content; callbacks originate in MFE client adapters.

Use the container's modern palette: dark background `#090e19`, surface `#111927`,
text `#eef3fc`, accent `#94baff`; light background `#f7f9fc`, surface white,
text `#162339`, accent `#245bc2`. Keep accessible control borders and focus
indicators distinct from decorative divider colors. Preserve explicit
light/dark/system, locale, RTL, and reduced-motion scopes.

Storybook uses the supplied logo/icon and a dark branded manager. Its toolbar
continues to control the canvas independently. Brand assets are documentation
assets, excluded from the npm runtime.

## Alternatives

- Copy entire pages into the library: rejected because product copy, API schemas,
  permissions, datasets, diagrams and routing are application responsibilities.
- Publish a Next-specific library: rejected because React MFEs must remain portable.
- Link source into the container: rejected because it bypasses package exports,
  declarations, client directives and CSS verification.
- Require a global store: rejected; local UI state and explicit values suffice.

## Migration and consequences

Prepare 0.2.0 with additive root/subpath exports and changed default appearance.
Do not publish as part of extraction. The container installs a checked-in local
npm tarball under `vendor/`, making its checkout independently installable before
registry publication. Replace that dependency with `^0.2.0` only after an authorized
release. Refresh the tarball whenever library output changes.

MarketingLayout places the header and footer outside main. The container's
fullscreen selectors must account for the new main wrapper. Existing content
anchors remain stable. Unique IDs use React useId for SSR/hydration.

## Required evidence

Actual failing component contracts followed by passing implementations; brand
contrast tests; story interactions/accessibility; package allowlist/client boundary
checks; production packed Next consumer; container route/state regressions;
reviewed light/dark and compact/RTL screenshots. Record executed results separately;
this decision does not assert that validation has passed.
