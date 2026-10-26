# Reference examples across the library

These examples follow the stable architecture in the [ADRs](adr/README.md). Components are reusable Client Components with SSR-safe boundaries; business data and server operations remain in consuming MFEs.

## Example map

The [web UI dictionary](ui-dictionary.md) is the categorized reference for public
controls, native composition recipes, and specialized patterns. Search it in
Storybook under **Reference / UI dictionary**.

For categorized comparison, trend, composition, distribution, relationship,
intensity, flow, and progress charts, see [charts and visualization](charts.md).

| Area | Reference | Responsibility | Verification |
| --- | --- | --- | --- |
| Atoms | Button, TextInput | Native controls, explicit props, token-based presentation | Native semantics, refs, keyboard events, controlled values, disabled/read-only/loading states |
| Molecules | SearchField | Label + input + clear action + isolated UI state | Unique IDs, accessible descriptions, controlled/default values, keyboard clear/focus, translations |
| Organisms | SearchPanel | Compose search and consumer-owned results/request state | Real filtering composition, result announcements, loading, errors, empty results, heading depth |
| Templates | ExplorerLayout | Named slots and responsive layout without business state | Landmark semantics, state preservation, mobile stacking, wide RTL placement, visual references |
| Hooks | useControllableState | Shared controlled/uncontrolled ownership mechanics | StrictMode callback behavior, owner updates, latest callbacks, initialization, isolation |
| i18n | getMessages, formatResultCount | Typed opt-in catalogs and full plural messages | Regional fallback, malformed locales, English/French/Malayalam plural/number rules, invalid counts |
| Tokens | tokens.css | Semantic colors, typography, spacing, shape, motion | Independent active-text/control/focus contrast constraints, browser themes, scoped overrides |

Each public component has colocated typed stories and behavior tests. Hook and pure i18n tests are unit tests; rendered component tests also cover integration where lower layers are composed. Storybook browser interactions and accessibility checks complement these tests. Tests never replace manual accessibility assessment.

## Consumer composition

Import styles once in the application entry or layout:

```tsx
import '@software-system.design/ui/styles.css';
```

An interactive consumer owns data and query changes:

```tsx
'use client';

import { useState } from 'react';
import { ExplorerLayout } from '@software-system.design/ui/explorer-layout';
import { SearchPanel } from '@software-system.design/ui/search-panel';
import { UIProvider } from '@software-system.design/ui/provider';
import { getMessages } from '@software-system.design/ui/i18n';

const items = ['Button', 'TextInput', 'SearchField'];

export function ComponentExplorer() {
  const [query, setQuery] = useState('');
  const results = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <UIProvider theme="system" locale="fr" direction="ltr" messages={getMessages('fr')}>
      <ExplorerLayout
        header={<h1>Bibliothèque de composants</h1>}
        contentLabel="Explorer la bibliothèque"
        sidebar={<p>Composants partagés</p>}
        sidebarLabel="Informations sur la bibliothèque"
      >
        <SearchPanel
          title="Composants"
          query={query}
          onQueryChange={setQuery}
          resultCount={results.length}
        >
          <ul>{results.map((item) => <li key={item}>{item}</li>)}</ul>
        </SearchPanel>
      </ExplorerLayout>
    </UIProvider>
  );
}
```

SearchPanel composes SearchField, which composes TextInput/Button and uses the shared hook. Templates also support arbitrary consumer content; they do not force every screen to use SearchPanel. The host owns its main landmark, routing, request cancellation, server operations, retry actions, and application error boundaries.

## State and API contracts

- SearchField supports `value/onValueChange` or `defaultValue`. Do not switch controlled/uncontrolled mode. `id` targets its input, while its ref targets its wrapper. A visible label is required. Its custom clear button is omitted for empty, disabled, or read-only fields.
- useControllableState has a concrete-value setter rather than React's functional-updater API. Undefined marks uncontrolled ownership. Callbacks run outside React state updaters and receive the next value. It is not an application store.
- SearchPanel owns no query or data fetching. Supply a non-negative safe-integer result count and `ready`, `loading`, or `error` request state. It hides stale results during loading/error states. Supply consumer-specific errors through props.
- ExplorerLayout requires an accessible sidebar name when a sidebar is supplied. It preserves child identity as slots change and uses container width, rather than the whole browser width, for layout.
- Public entry points omit atomic categories. Reclassifying a component must not break consumer imports.

## Internationalization and styles

Catalogs are opt-in and immutable. Explicit component labels override scoped messages, then English defaults. Locale does not infer direction or automatically load translations in the library. The Storybook toolbar performs that setup for examples. Supply a consistent initial locale, messages, direction, and theme for SSR/hydration.

The formatter supports all six CLDR plural categories; Malayalam uses singular and plural messages. Malayalam examples use locale `ml` and left-to-right direction, while separate explicit RTL stories verify direction support. Locale-specific number systems are respected; request `ml-u-nu-mlym` when Malayalam digits are required. Full translated sentences avoid English-centric suffix concatenation. Date/currency formatting remains consumer-owned until a component actually requires it.

Theme examples cover light/dark/system, native focus, errors, disabled/read-only states, long text, and RTL. Token overrides are scoped; they must retain contrast. Scope portal containers appropriately when adding overlay components. Each MFE with an independent React root should configure matching server/client identifier prefixes to avoid cross-root ID collisions; component-level useId handles IDs within a root.

## Standards and validation

The examples target WCAG 2.2 AA practices: visible labels, associated hints/errors, native semantics, keyboard operation, visible focus, status feedback, and contrast. They use strict TypeScript and React 19 ref conventions. No claim is made that every international standard or accessibility requirement is automatically satisfied.

```sh
npm test
npm run lint
npm run typecheck
npm run test:stories
npm run build:storybook
npm run test:visual
npm run test:integration
```

The packed Next.js consumer directly imports root/subpath APIs, renders initial HTML without JavaScript, and exercises every atomic level plus a public hook after hydration. Visual references are platform-specific. Review new references and intentional changes; never blindly update baselines to make CI pass. The initial Windows host's native-resolver workaround remains documented in [ADR 0010](adr/0010-scaffold-tooling-and-initial-compatibility.md).

## References

- [WAI form labels](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WAI form instructions](https://www.w3.org/WAI/tutorials/forms/instructions/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [React useId and independent roots](https://react.dev/reference/react/useId)
- [Storybook testing](https://storybook.js.org/docs/writing-tests)
