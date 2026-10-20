# software-system.design UI

Shared React component-library scaffold for software-system.design microfrontends. Public components are Client Components; MFEs own Server Components and application services. SSR/hydration compatibility is checked using an unpublished Next.js consumer that installs the npm tarball.

The existing npm name is component-lib and publication remains disabled until the public identity and license are confirmed. No deployment or publication workflow is included.

## Setup

Use Node.js 24 LTS (minimum 22.12) and npm. Run npm ci, then npx playwright install chromium. On PowerShell with script execution disabled, use npm.cmd and npx.cmd. Windows native dependencies require the standard Microsoft Visual C++ runtime; install it through your normal machine setup if a native resolver reports ERR_DLOPEN_FAILED. Linux browser runners may need npx playwright install --with-deps chromium.

## Commands

| Command | Purpose |
| --- | --- |
| npm run dev | Storybook at localhost:6006 |
| npm test | Fast component behavior tests |
| npm run test:watch | TDD watch loop |
| npm run generate:component -- atoms Example | Colocated component, failing test, stories, and local export |
| npm run check | Lint/architecture, types, unit/generator tests, build and packed-file checks |
| npm run test:stories | Storybook interactions and accessibility checks in Chromium |
| npm run build:storybook | Static component documentation |
| npm run test:visual | Browser theme/layout checks and reviewed screenshots; build Storybook first |
| npm run test:integration | Pack, install into isolated Next.js consumer, production build, browser checks |
| npm run build | ESM modules, TypeScript declarations, and CSS in dist |

## Consumer usage

Import `component-lib/styles.css` once in the application entry/layout. For an interactive consumer:

```tsx
'use client';

import { Button } from 'component-lib/button';
import { UIProvider } from 'component-lib/provider';

export function SaveControls() {
  return (
    <UIProvider theme="system" locale="en" direction="ltr">
      <Button onClick={() => console.log('Save requested')}>Save changes</Button>
    </UIProvider>
  );
}
```

Root `component-lib` imports are also supported. The consuming application supplies compatible React and React DOM peers. No Next.js runtime or Tailwind setup is required by the package.

UIProvider is optional. It supplies scoped light/dark/system theme, locale, explicit text direction, and library messages. Button accepts native button props, ref, primary/secondary variant, consumer-controlled loading, and an optional loadingLabel override. Consumers supply translated children and own event handlers and business state. CSS variables use the --ssd- prefix.

## Structure and standards

- src/components: one atomic hierarchy with colocated implementation, tests, stories, and exports.
- src/providers, i18n, tokens, styles, hooks, utilities: focused foundations.
- tests/integration/nextjs-consumer: private packed-package consumer; never published.
- tests/visual: representative browser checks and platform-specific screenshot baselines.
- scripts: build, package validation, component generation, and consumer orchestration.

Read [AGENTS.md](AGENTS.md), [contributing guidance](docs/contributing.md), and [architecture decisions](docs/adr/README.md). TDD, component stories, atomic decomposition, localizable labels, and theme support are mandatory. Do not equate hook choice with atomic level.
