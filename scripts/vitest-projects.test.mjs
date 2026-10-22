import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const vitest = fileURLToPath(new URL('../node_modules/vitest/vitest.mjs', import.meta.url));
const configDir = fileURLToPath(new URL('../.storybook', import.meta.url)).replaceAll('\\', '/');

function runNode(args, storybookUI) {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 60_000,
    env: {
      ...process.env,
      VITEST_STORYBOOK: String(storybookUI),
      STORYBOOK_CONFIG_DIR: configDir,
      STORYBOOK_DISABLE_TELEMETRY: '1'
    }
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  return result.stdout;
}

function listProject(project, storybookUI) {
  return runNode([vitest, 'list', '--project', project, '--filesOnly'], storybookUI);
}

test('Storybook UI can discover its browser project through the root Vitest config', () => {
  const files = listProject(`storybook:${configDir}`, true);
  assert.match(files, /Button\.stories\.tsx/);
  assert.doesNotMatch(files, /Button\.test\.tsx/);
});

test('the unit project still selects behavior tests without selecting stories', () => {
  const files = listProject('unit', false);
  assert.match(files, /Button\.test\.tsx/);
  assert.doesNotMatch(files, /\.stories\.tsx/);
});

test('Storybook UI can initialize Vitest with V8 coverage enabled', () => {
  runNode(['--input-type=module', '--eval', `
    import assert from 'node:assert/strict';
    import { createVitest } from 'vitest/node';
    const vitest = await createVitest('test', {
      root: process.cwd(),
      config: 'vitest.storybook.config.ts',
      watch: false,
      coverage: { enabled: true, provider: 'v8', clean: false, reporter: [] }
    });
    try {
      await vitest.initCoverageProvider();
      assert.equal(vitest.coverageProvider?.name, 'v8');
    } finally {
      await vitest.close();
    }
  `], true);
});
