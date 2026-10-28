# About, Governance and Legislation extraction

Reviewed container commits `db48d6e7243e773ef327aa31c28ab34cbd3d8677`
(About and founder biography) and `8db2d75152e8a48070196402a5d64594f84e67eb`
(Governance and expanded Legislation). This prepares additive APIs for 0.4.0;
npm publication remains manual. The container still uses its published dependency.

## Atomic decomposition

| Source pattern | Reusable API | Level | Status |
| --- | --- | --- | --- |
| Links, phase status, navigation actions | Link, Button, Badge | Atoms | Existing |
| Section title, eyebrow, description | SectionHeading | Molecule | Existing |
| Vision, mission, principles, responsibility cards | ContentCard | Molecule | Existing |
| About section anchors and initiative destinations | PageNavigation | Molecule | Existing |
| Governance controls, rule lifecycle, court process, About production pillars | StepList | Molecule | New |
| Policy limits, examples and review guidance | Callout | Molecule | New |
| About phase-based journey | Timeline | Organism | New; composes Badge |
| Introductory copy, responsibility grid, invitation sections | FeatureSection + ContentCard | Organism composition | Existing |
| Header and footer | SiteHeader, SiteFooter | Organisms | Existing |
| About story, founder profile and policy evidence beside guidance | SplitLayout | Template | New |
| Informational page shell | MarketingLayout | Template | Existing |

Do not create separate GovernancePage, Court, FounderCard or AboutPage library
components: these are application compositions. The conceptual blueprint remains
an application diagram. Biography edits, metadata, official imagery, initiative
data, consent, authorization, dispute rules, and Next Link/Image remain in the MFE.
No new atoms, runtime dependencies or domain abstractions are necessary.

## Contracts

- **StepList** requires a localized `label` and readonly `items` with unique
  `id`, React `title` and `description`. `headingLevel` defaults to 3. Native
  ordered markers convey sequence; native `start`, `reversed`, `dir` and refs
  are forwarded. It displays a process; it does not execute or track it.
- **Timeline** requires `label` and readonly `items` with unique `id`, React
  `title` and `description`; `phase` and `status` are optional React content.
  `headingLevel` defaults to 3. The caller decides status and formats dates or
  phase labels. Planned direction is never inferred as completed history.
  Empty arrays render an empty labelled list; no fallback copy is invented.
- **Callout** is a static, labelled `aside`, with required React `title`,
  `children`, optional `headingId`, and `headingLevel` defaulting to 3. Generated
  IDs support multiple SSR instances. It adds no live region: use existing
  Alert for asynchronous announcements. Do not nest it inside another aside.
- **SplitLayout** takes primary `children` and a required `secondary` React
  slot. It adds no landmarks, ordering controls or business state. DOM reading
  order is primary then secondary; above 40rem of container width these form
  two columns, otherwise they stack. Place the desired aside, image or card
  inside the secondary slot. Timeline also stacks using its container width.

All four preserve native refs and attributes, deterministic rendering, client
boundaries, scoped theme tokens and logical RTL styling. Supply complete
translations through content and labels; no application translation system is
required. Keep heading depth consistent with the surrounding document.

## Reference after publication

Storybook destinations (relative to your published Storybook host):

| Component | Reference |
| --- | --- |
| StepList | `/?path=/docs/molecules-steplist--docs` |
| Callout | `/?path=/docs/molecules-callout--docs` |
| Timeline | `/?path=/docs/organisms-timeline--docs` |
| SplitLayout | `/?path=/docs/templates-splitlayout--docs` |

Each includes Default and CompactRtl examples and appears in the searchable
Reference / UI dictionary. Root and kebab-case imports are public APIs; atomic
source directories are private implementation paths.

After the maintainer publishes and verifies 0.4.0 using [the release guide](releases.md),
install it in the consumer:

```powershell
npm.cmd install @software-system.design/ui@^0.4.0
```

```tsx
import '@software-system.design/ui/styles.css'; // once in the host layout
import { Timeline } from '@software-system.design/ui/timeline';
import { StepList } from '@software-system.design/ui/step-list';
import { Callout } from '@software-system.design/ui/callout';
import { SplitLayout } from '@software-system.design/ui/split-layout';

// Wrap this composition in the host's UIProvider and section/heading.
<SplitLayout secondary={
  <Callout title="Authority and limits">
    <p>Application-owned explanation and review guidance.</p>
  </Callout>
}>
  <Timeline label="Our journey" items={[
    { id: 'foundation', phase: '01 / Foundation', status: 'Planned direction',
      title: 'Define the system', description: <p>Application-owned copy.</p> },
  ]} />
  <StepList label="Review process" items={[
    { id: 'review', title: 'Inspect evidence', description: <p>Application-owned instructions.</p> },
  ]} />
</SplitLayout>
```

For actual adoption, map `journey` to Timeline items, `controls`, `ruleLifecycle`
and `courtProcess` to StepList items, and preserve existing section IDs and
headings. Replace static `policy-callout` markup with Callout and `policy-split`
with SplitLayout. Use ContentCard for responsibility articles and existing
FeatureSection for card grids. Remove obsolete consumer CSS rather than target
private library descendants. Brand copy, links, image optimization and business
rules stay in the container. Validate with the commands in its SHARED-UI.md.

Before publication, packed-package tests exercise the real archive, including
root/subpath imports and initial HTML without JavaScript. No source aliases or
workspace links are introduced. No container runtime migration is required to
publish these reusable additions.

## Validation evidence

Executed on Windows, 28 October 2026:

- All seven new behavioral tests failed against generated placeholders before
  implementation. The initial sandbox run could not spawn Vitest; rerunning
  with subprocess access produced the expected assertion failures.
- `npm.cmd run check`: passed, including 157 unit tests, strict types,
  architecture/dictionary checks, tooling tests and 236 verified packed files.
  One existing warning remains in ignored generated coverage output.
- `npm.cmd run test:stories`: 200 passed across 70 story files.
- `npm.cmd run build:storybook`: passed. Storybook's client-only Vite bundle
  emits directive warnings; the npm build preserves client directives.
- `npm.cmd run test:visual`: 41 passed, including four new compact RTL and
  split-layout browser checks. Existing screenshot baselines were unchanged.
- `npm.cmd run test:integration`: production build and seven packed Next.js
  SSR/browser checks passed, including new root/subpath imports without JavaScript.
- `npm.cmd run check:release` and `git diff --check`: passed.

No checks remain incomplete. No npm package was published, and no container
runtime or deployment was changed.
