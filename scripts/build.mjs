import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { run } from './run.mjs';

// Only delete this script's fixed, workspace-local build directory.
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
rmSync(dist, { recursive: true, force: true });
run(process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.build.json'], { cwd: root });
mkdirSync(`${dist}/styles`, { recursive: true });
mkdirSync(`${dist}/tokens`, { recursive: true });
cpSync(`${root}/src/styles/index.css`, `${dist}/styles/index.css`);
cpSync(`${root}/src/tokens/tokens.css`, `${dist}/tokens/tokens.css`);
console.log('Built ESM modules, declarations, and CSS. Client directives are preserved by tsc.');
