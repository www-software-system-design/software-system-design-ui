# software-system.design UI

Shared React component-library scaffold for software-system.design microfrontends. Public components are Client Components; MFEs own Server Components and application services. SSR/hydration compatibility is checked using an unpublished Next.js consumer that installs the npm tarball.

The public npm package is `@software-system.design/ui`, licensed under [Apache-2.0](LICENSE). The first release is version `0.1.0`. The [release guide](docs/releases.md) covers npm publication and static Storybook hosting on Amplify at `storybook.software-system.design`.

The working tree prepares **0.2.0** with fourteen components extracted from the
informational container and its light/dark brand palette. See the
[component and migration guide](docs/container-extraction.md). This version has
not been published by the extraction workflow.

## Setup

Use Node.js 24 LTS (minimum 22.12) and npm. Run npm ci, then npx playwright install chromium. On PowerShell with script execution disabled, use npm.cmd and npx.cmd. Windows native dependencies require the standard Microsoft Visual C++ runtime; install it through your normal machine setup if a native resolver reports ERR_DLOPEN_FAILED. Linux browser runners may need npx playwright install --with-deps chromium.

## Commands

| Command | Purpose |
| --- | --- |
| npm run dev | Storybook at localhost:6006 |
| npm test | Fast component behavior tests |
| npm run test:watch | TDD watch loop |
| npm run generate:component -- atoms Example | Colocated component, failing test, stories, and local export |
| npm run check | Lint/architecture, types, unit/generator/configuration tests, build and packed-file checks |
| npm run test:config | Vitest project discovery and Storybook V8 coverage initialization |
| npm run test:release | Release metadata and publication guard tests |
| npm run check:release | Check license, publish settings, version, and release notes before publication |
| npm run test:stories | Storybook interactions and accessibility checks in Chromium |
| npm run build:storybook | Static component documentation |
| npm run test:visual | Browser theme/layout checks and reviewed screenshots; build Storybook first |
| npm run test:integration | Pack, install into isolated Next.js consumer, production build, browser checks |
| npm run build | ESM modules, TypeScript declarations, and CSS in dist |

## Consumer usage

Install the package with compatible React and React DOM peers:

```sh
npm install @software-system.design/ui
```

Import `@software-system.design/ui/styles.css` once in the application entry/layout. For an interactive consumer:

```tsx
'use client';

import { Button } from '@software-system.design/ui/button';
import { UIProvider } from '@software-system.design/ui/provider';

export function SaveControls() {
  return (
    <UIProvider theme="system" locale="en" direction="ltr">
      <Button onClick={() => console.log('Save requested')}>Save changes</Button>
    </UIProvider>
  );
}
```

Root `@software-system.design/ui` imports are also supported. The consuming application supplies compatible React and React DOM peers. No Next.js runtime or Tailwind setup is required by the package.

UIProvider is optional. It supplies scoped light/dark/system theme, locale, explicit text direction, and library messages. Button accepts native button props, ref, primary/secondary variant, consumer-controlled loading, and an optional loadingLabel override. Consumers supply translated children and own event handlers and business state. CSS variables use the --ssd- prefix.

## Structure and standards

- src/components: one atomic hierarchy with colocated implementation, tests, stories, and exports.
- src/providers, i18n, tokens, styles, hooks, utilities: focused foundations.
- tests/integration/nextjs-consumer: private packed-package consumer; never published.
- tests/visual: representative browser checks and platform-specific screenshot baselines.
- scripts: build, package validation, component generation, and consumer orchestration.

Read [AGENTS.md](AGENTS.md), [contributing guidance](docs/contributing.md), and [architecture decisions](docs/adr/README.md). TDD, component stories, atomic decomposition, localizable labels, and theme support are mandatory. Do not equate hook choice with atomic level.

See [reference examples](docs/examples.md) for TextInput → SearchField → SearchPanel → ExplorerLayout, the reusable state hook, English/French/Malayalam catalogs and plurals, and token documentation. Storybook includes every atomic level and Foundations examples for hooks, internationalization, and tokens.
