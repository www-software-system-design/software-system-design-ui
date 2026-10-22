import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { npm, run } from './run.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixture = fileURLToPath(new URL('../tests/integration/nextjs-consumer/', import.meta.url));
const cache = resolve(root, '.npm-cache');

// check:package builds, packs, verifies contents, and records the exact tarball path.
npm(['run', 'check:package'], { cwd: root });
const { tarball } = JSON.parse(readFileSync(resolve(root, '.artifacts/package.json'), 'utf8'));
npm([existsSync(resolve(fixture, 'package-lock.json')) ? 'ci' : 'install', '--offline=false', '--cache', cache, '--no-audit', '--no-fund'], { cwd: fixture });
npm(['install', tarball, '--no-save', '--package-lock=false', '--offline=false', '--cache', cache, '--no-audit', '--no-fund'], { cwd: fixture });
run(process.execPath, ['--input-type=module', '-e', `import assert from 'node:assert/strict'; assert(import.meta.resolve('@software-system.design/ui').replaceAll('\\\\', '/').includes('/nextjs-consumer/node_modules/@software-system.design/ui/dist/'));`], { cwd: fixture });
run(process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tests/integration/nextjs-consumer/tsconfig.tests.json'], { cwd: root });
npm(['run', 'build'], { cwd: fixture, env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' } });
run(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', '--config', 'tests/integration/nextjs-consumer/playwright.config.ts'], { cwd: root });
