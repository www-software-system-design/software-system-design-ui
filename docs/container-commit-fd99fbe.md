# Components identified in container commit fd99fbe

Reviewed commit: `fd99fbeef3a3c47e17feed29630f27e89dac09bc`,
"update the branding and introduce legislation and open standards".
These additions follow ADR 0014's presentation boundary and target the next
minor release. Existing APIs remain compatible. This work prepares the library;
the container dependency and application imports are unchanged.

| Container source / pattern | Shared API | Atomic level |
| --- | --- | --- |
| site-brand.tsx: artwork and stacked wordmark | BrandLockup | Molecule |
| site-interactions.tsx: ProductNavigation | NavigationDisclosure | Molecule |
| initiative-page.tsx: destination links | PageNavigation | Molecule |
| hero-carousel.tsx: initiative diagram's numbered principles | PrincipleList | Molecule |
| initiative-content.tsx: heading, lead, card grid, note/action | FeatureSection | Organism |
| hero-carousel.tsx: slides, indicators, rotation controls | Carousel | Organism |

No new atom is needed: existing Button and Link supply native controls.
FeatureSection composes SectionHeading and accepts existing ContentCard children.
Carousel owns its indicators and controls so these cannot drift out of sync.
NavigationDisclosure uses ordinary links, not application menu roles.
PageNavigation uses navigation links, not in-page Tabs.

The remaining changes use existing ContentCard, Badge, DataTable, Disclosure,
SiteHeader, SiteFooter and MarketingLayout. InitiativePage is application
composition of MarketingLayout, PageNavigation and FeatureSection; it does not
need another library template. PlanCards remains a consumer-owned composition
of ContentCard with sponsorship data and actions.

## Adoption contracts

Each API is exported from the package root and its kebab-case subpath, such as
`@software-system.design/ui/carousel`. Import the existing `styles.css` entry.
No runtime dependencies, Next.js imports, bundled artwork or global state are added.

- **BrandLockup** requires `href`, translated `label`, `artwork` and `wordmark`.
  Its header/footer variant changes artwork sizing. Artwork is decorative and must
  not contain focusable controls; use empty image alt text. The container keeps
  its official assets, Next image optimization, metadata and share images.
- **NavigationDisclosure** requires `label` and link children. It supports
  `defaultOpen` or controlled `open/onOpenChange`. Escape returns focus to the
  trigger; outside pointer, leaving focus and link activation dismiss it.
  The consumer supplies active link state and resolves destinations.
- **PageNavigation** accepts a translated `label`, unique `items[].href` with
  React labels and optional `currentHref`. Native anchors preserve normal
  browser navigation. Keep route resolution in the consumer.
- **PrincipleList** accepts a translated `label` and unique `items[].id` with
  title/description content. Native ordered markers respect scoped direction.
- **FeatureSection** accepts title, eyebrow, headingLevel/headingId, description,
  children and footer slots. It owns no main landmark. Pass ContentCard children
  and keep their heading depth consistent with the section. Its three-column
  grid stacks according to the containing section's width.
- **Carousel** requires a translated region `label`, a complete `labels` object
  (previous, next, pause, resume, indicators, carousel and slide), and slides
  with unique id, accessible label and React content. It supports
  `defaultIndex` or controlled `index/onIndexChange` (zero-based); invalid
  indices display the first slide. Empty collections render nothing. Inactive
  slides stay mounted, hidden and inert so local state survives navigation.
  One slide omits controls. All labels are caller-owned; no catalog extension
  is necessary. Controls sit before slide content for keyboard access.

Rotation is opt-in via a finite positive `interval` in milliseconds. Reduced
motion disables it. Hover, hidden documents, offscreen placement and
`suspended` prevent advancement. Focus and manual selection pause it until
the user explicitly resumes. The container can set `suspended` from its
presentation-mode visibility state; the library never inspects global CSS
classes. Keep controlled/uncontrolled ownership stable for each instance.

## Example consumer composition

```tsx
import {
  Carousel, ContentCard, FeatureSection, PageNavigation, PrincipleList,
} from '@software-system.design/ui';

<FeatureSection
  title="Shared contracts"
  description={<p>Application-owned initiative description.</p>}
  footer={<a href="/careers">Contribute</a>}
>
  <ContentCard title="Open participation">Application-owned copy.</ContentCard>
</FeatureSection>
```

Supply links and server-prepared content through slots. Callbacks must originate
in a consumer Client Component. Do not transfer initiative data, Next routes,
presentation mode, theme persistence, GitHub actions, sponsorship rules, page
metadata or document-global styles into this library.

Before replacing container components, install the actual next-minor package
tarball, adapt consumer CSS to documented slots/tokens, preserve anchors and
heading hierarchy, and run the container's route and presentation tests.
Follow the existing manual release procedure; extraction does not publish.

## Validation evidence

Executed on Windows, 26 October 2026:

- TDD: all nine initial component assertions failed against the generated
  scaffolds, then passed after implementation. Expanded coverage now includes
  twelve new tests. A visibility regression failed for a zero-size carousel
  before its fix. The package assertion and Next build both reproduced a
  missing imported stylesheet before the build-copy fix.
- `npm.cmd run check`: passed, including 147 unit tests, lint/type checking,
  generator/configuration/dictionary/release checks and 220 packed files.
  A nonblocking lint warning remains in generated coverage output.
- `npm.cmd run test:stories`: 190 passed across 66 story files.
- `npm.cmd run build:storybook`: passed.
- `npm.cmd run test:visual`: 35 passed against reviewed baselines. Reviewed
  five new light/dark, dropdown-open and compact RTL screenshots; existing
  tracked screenshots did not change.
- `npm.cmd run test:integration`: production tarball consumer build and all
  six browser/SSR tests passed, including new navigation, content slots,
  carousel hydration and stylesheet checks.

No checks remain incomplete. The informational container was not modified,
and no package was published or site deployed.
