import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { npm } from './run.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const artifactDir = fileURLToPath(new URL('../.artifacts/', import.meta.url));
mkdirSync(artifactDir, { recursive: true });
// Keep lifecycle output separate from npm's machine-readable JSON.
npm(['run', 'build'], { cwd: root });
const result = JSON.parse(npm(['pack', '--ignore-scripts', '--json', '--pack-destination', artifactDir], { cwd: root, stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8' }));
const packed = result[0];
assert(packed, 'npm pack must produce an artifact');
const files = new Set(packed.files.map(({ path }) => path));
for (const path of files) {
  assert(path === 'package.json' || /^((README|LICENSE)(\..*)?)$/i.test(path) || /^dist\/.*\.(js|d\.ts|css)$/.test(path), `Unexpected published file: ${path}`);
  assert(!/\.(test|stories)\./.test(path), `Development-only file published: ${path}`);
}
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
assert(!pkg.dependencies?.next, 'Next.js cannot be a runtime dependency');
assert(pkg.peerDependencies.react && pkg.peerDependencies['react-dom'], 'React must be supplied by consumers');
for (const target of Object.values(pkg.exports)) {
  for (const path of typeof target === 'string' ? [target] : Object.values(target)) {
    assert(files.has(path.replace(/^\.\//, '')), `Missing package export: ${path}`);
  }
}
for (const path of [...files].filter((path) => /^dist\/(components|providers)\//.test(path) && /\/[A-Z][^/]*\.js$/.test(path))) {
  assert.match(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'), /^['"]use client['"];/, `Missing client directive: ${path}`);
}
console.log(`Validated ${files.size} packed files: ${packed.filename}`);
writeFileSync(new URL('../.artifacts/package.json', import.meta.url), JSON.stringify({ tarball: `${artifactDir}/${packed.filename}` }));
