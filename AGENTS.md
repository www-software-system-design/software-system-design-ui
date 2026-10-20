# Engineering contract

This repository builds the shared React npm library for software-system.design MFEs. Read [the ADR index](docs/adr/README.md) and relevant decisions before work. The root is a library; Next.js exists only as an unpublished integration consumer.

## Mandatory workflow

1. Inspect existing contracts and relevant tests/stories before editing. Preserve unrelated changes.
2. For behavior changes, write a failing test, run it and confirm the intended failure, implement, then refactor. Bug fixes start with regression tests. Report actual red/green evidence; never invent results. Documentation-only changes need no artificial tests.
3. Every public visual component needs colocated typed Storybook stories, behavior tests, local exports, and a preserved leading `'use client'` directive. Update all affected contracts together.
4. Run `npm run check`, `npm run test:stories`, and `npm run build:storybook`. Run packed-package consumer tests for package, export, provider, style, dependency, or rendering changes. Run visual tests for appearance changes. Review screenshot changes before accepting baselines.
5. Report changes, commands/results, compatibility implications, and incomplete checks. Do not claim a missing or blocked check passed. Do not publish npm packages or deploy as part of ordinary implementation.

## Architecture and component scaffold

- Use one hierarchy: `src/components/{atoms,molecules,organisms,templates}/<kebab-case-name>/`. Use PascalCase implementation/test/story filenames and `index.ts`. Add helpers/styles only when necessary.
- Start with `npm run generate:component -- atoms Example`. Replace its intentionally failing placeholder assertion with the required observable behavior before implementation. Do not ship placeholder components or tests.
- Lower atomic levels cannot import higher ones; no cycles. Foundations cannot import component layers. Atomic level describes UI responsibility, not hook permissions.
- Use composition, children, slots, and explicit variants. Avoid duplicate server/client trees, unnecessary abstractions, and collections of boolean switches.
- Publish Client Components only. MFEs own Server Components, routing, data fetching, authentication, persistence, business state, and server operations. No Next.js imports in `src/`.
- Require SSR-safe imports/rendering and deterministic initial HTML. Browser globals belong in appropriate effects/handlers. MFEs supply client wrappers for callbacks; ordinary functions cannot cross an RSC boundary.
- Local UI state stays with the closest common owner. Prefer controlled consumer-facing values; provide documented uncontrolled defaults where useful. Use reducers for complex transitions and context for justified scoped coordination. Never require an MFE store or a global singleton.
- Every visible and assistive label must be localizable. Caller labels override provider messages, then English fallbacks. Keep application translation frameworks optional; explicitly support RTL and long text.
- Use semantic `--ssd-*` CSS tokens and scoped light/dark/system themes. No unscoped resets, private-selector customization contracts, or document-global mutations. Direction and locale must agree during SSR/hydration. Portal content must remain inside its intended theme/locale scope.
- Keep exports independent of atomic categories. Add deliberate package subpaths and root exports after review; private source paths are not consumer APIs. React/React DOM remain peers. Preserve client directives, declarations, and CSS side effects in build output.
- Use ESM and explicit `.js` relative imports in TypeScript source. `tsc` preserves modules and boundaries. Tests/stories never enter `dist/`.

## Validation and change control

- Fast tests: Vitest + Testing Library. Stories: Storybook + browser interaction/accessibility checks. Browser/visual and packed-consumer checks: Playwright. Do not duplicate every assertion across layers or rely on snapshots alone.
- `npm run lint` enforces component artifacts, atomic dependency direction, cycles, and accessibility/hook lint rules. Passing checks do not prove TDD history or full accessibility compliance.
- The Next.js consumer installs the actual npm tarball. Never replace it with source aliases, workspace links, or a linked build directory. Its Server Components are tests, excluded from publication.
- Material architecture changes require an ADR with alternatives and migration impact. Public API changes need appropriate versioning, changelog entries, and migration guidance. The package name/publication policy must be finalized before the first release; keep the publication guard until then.
- Do not add a runtime dependency or restructure the package merely to implement one component. Explain justified architectural changes with their consumer impact.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
