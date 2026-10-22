import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { assertReleaseReady } from './check-release.mjs';

const candidate = {
  name: '@software-system.design/ui', version: '0.1.0', private: false,
  license: 'MIT',
  publishConfig: { access: 'public', registry: 'https://registry.npmjs.org/' }
};
const license = 'Example license text for the release-validator test fixture.';
const changelog = '# Changelog\n\n## 0.1.0\n\nInitial release.';

test('publishes with the short ui name under the software-system.design organization', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
  assert.equal(pkg.name, candidate.name);
  assert.equal(lock.name, candidate.name);
  assert.equal(lock.packages[''].name, candidate.name);
});

test('rejects publication to the former personal package name', () => {
  assert.throws(() => assertReleaseReady({ ...candidate, name: 'software-system-design-ui' }, license, changelog), /package name/);
});

test('rejects publication under the former long organization package name', () => {
  assert.throws(() => assertReleaseReady({ ...candidate, name: '@software-system.design/software-system-design-ui' }, license, changelog), /package name/);
});

test('allows a licensed manual publication with versioned notes and no Git tag', () => {
  assert.doesNotThrow(() => assertReleaseReady(candidate, license, changelog));
});

test('rejects private packages and missing or unpublished license decisions', () => {
  assert.throws(() => assertReleaseReady({ ...candidate, private: true }, license, changelog), /private/);
  for (const value of [undefined, '', 'UNLICENSED']) {
    assert.throws(() => assertReleaseReady({ ...candidate, license: value }, license, changelog), /license/);
  }
  assert.throws(() => assertReleaseReady(candidate, '', changelog), /LICENSE/);
});

test('rejects unstable versions, missing release notes, and unintended registry targets', () => {
  assert.throws(() => assertReleaseReady({ ...candidate, version: '0.2.0-beta.1' }, license, changelog), /stable/);
  assert.throws(() => assertReleaseReady(candidate, license, '# Changelog\n## Unreleased'), /changelog/);
  assert.throws(() => assertReleaseReady({ ...candidate, publishConfig: {} }, license, changelog), /registry/);
});

test('the npm artifact identifies its source, issue tracker, and public registry', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.deepEqual(pkg.repository, {
    type: 'git',
    url: 'git+https://github.com/www-software-system-design/software-system-design-ui.git'
  });
  assert.equal(pkg.bugs.url, 'https://github.com/www-software-system-design/software-system-design-ui/issues');
  assert.equal(pkg.homepage, 'https://github.com/www-software-system-design/software-system-design-ui#readme');
  assert.deepEqual(pkg.publishConfig, { access: 'public', registry: 'https://registry.npmjs.org/' });
});

test('the first public release carries the agreed Apache-2.0 license while its consumer stays private', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.license, 'Apache-2.0');
  assert.equal(pkg.private, false);
  const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
  assert.equal(lock.packages[''].license, pkg.license);
  const license = readFileSync(new URL('../LICENSE', import.meta.url), 'utf8');
  assert.match(license, /Apache License/);
  assert.match(license, /Version 2\.0, January 2004/);
  assert.match(license, /END OF TERMS AND CONDITIONS/);
  assertReleaseReady(pkg, license, readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8'));
  const consumer = JSON.parse(readFileSync(new URL('../tests/integration/nextjs-consumer/package.json', import.meta.url), 'utf8'));
  assert.equal(consumer.private, true);
});
