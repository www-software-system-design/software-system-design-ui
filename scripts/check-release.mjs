import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function assertReleaseReady(pkg, license, changelog) {
  assert.equal(pkg.name, '@software-system.design/ui', 'The package name must use the software-system.design organization scope');
  assert.equal(pkg.private, false, 'Set private: false after finalizing the package license and ownership');
  assert(typeof pkg.license === 'string' && pkg.license.trim() && pkg.license !== 'UNLICENSED', 'Choose the public package license');
  assert(license.trim(), 'Add the agreed LICENSE file before publication');
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/, 'Manual publication supports stable versions');
  assert(changelog.split(/\r?\n/).some((line) => line === `## ${pkg.version}` || line.startsWith(`## ${pkg.version} - `)), 'Add a versioned changelog entry before publication');
  assert.equal(pkg.publishConfig?.registry, 'https://registry.npmjs.org/', 'Use the intended public npm registry');
  assert.equal(pkg.publishConfig?.access, 'public', 'The package must be published with public access');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  const licensePath = new URL('../LICENSE', import.meta.url);
  try {
    assertReleaseReady(
      pkg,
      existsSync(licensePath) ? readFileSync(licensePath, 'utf8') : '',
      readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8')
    );
    console.log(`Release metadata is ready for ${pkg.name}@${pkg.version}.`);
  } catch (error) {
    console.error(`Release is not ready: ${error.message}`);
    process.exitCode = 1;
  }
}
