import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test, mock } from 'node:test';
import {
  decideRelease,
  publishedVersion,
  planRelease,
  ensureTag,
  completeRelease,
} from '../.github/scripts/automatic-release.mjs';

const sha = 'a'.repeat(40);
const previous = 'b'.repeat(40);
const context = {
  ref: 'refs/heads/main',
  sha,
  repo: { owner: 'example', repo: 'ui' },
};
const base = {
  version: '0.2.0',
  sha,
  tagSha: null,
  published: false,
  hasRelease: false,
  latest: '0.1.0',
};
const pkg = {
  name: '@software-system.design/ui',
  version: '0.2.0',
  private: false,
  license: 'Apache-2.0',
  publishConfig: { registry: 'https://registry.npmjs.org/', access: 'public' },
};
const bytes = Buffer.from('The verified tarball');
const metadata = {
  name: pkg.name,
  version: pkg.version,
  dist: {
    integrity: 'sha512-' + createHash('sha512').update(bytes).digest('base64'),
  },
};
const files = {
  'package.json': JSON.stringify(pkg),
  'package-lock.json': JSON.stringify({
    version: pkg.version,
    packages: { '': { name: pkg.name, version: pkg.version } },
  }),
  LICENSE: 'Apache License Version 2.0',
  'CHANGELOG.md':
    '# Changelog\n\n## 0.2.0\n\n- Add components.\n\n## 0.1.0\n\nOld notes.',
  '.artifacts/package.json': JSON.stringify({ tarball: 'tested.tgz' }),
  'tested.tgz': bytes,
};
const readFile = (name) => files[name];
const missing = () => {
  throw Object.assign(new Error('Not found'), { status: 404 });
};
const registry = async (url) => ({
  status: 200,
  ok: true,
  json: async () =>
    String(url).endsWith('/latest')
      ? { ...metadata, version: '0.1.0' }
      : metadata,
});
function client({ tagSha = null, release = null } = {}) {
  const writes = [];
  return {
    writes,
    rest: {
      git: {
        getRef: async () =>
          tagSha
            ? { data: { object: { type: 'commit', sha: tagSha } } }
            : missing(),
        getTag: async () => ({ data: { object: { type: 'commit', sha } } }),
        createRef: async (input) => {
          writes.push(['tag', input]);
          return { data: {} };
        },
      },
      repos: {
        getReleaseByTag: async () => (release ? { data: release } : missing()),
        createRelease: async (input) => {
          writes.push(['release', input]);
          return { data: { html_url: 'https://example.com/release' } };
        },
      },
    },
  };
}

test('a new stable version publishes once; completed versions skip later commits', () => {
  assert.deepEqual(decideRelease(base), { release: true, publish: true });
  assert.deepEqual(
    decideRelease({
      ...base,
      published: true,
      hasRelease: true,
      tagSha: previous,
    }),
    { release: false, publish: false },
  );
});
test('partial releases resume only on the original immutable commit', () => {
  assert.deepEqual(decideRelease({ ...base, tagSha: sha }), {
    release: true,
    publish: true,
  });
  assert.deepEqual(decideRelease({ ...base, tagSha: sha, published: true }), {
    release: true,
    publish: false,
  });
  assert.throws(
    () => decideRelease({ ...base, tagSha: previous }),
    /different commit/,
  );
  assert.throws(
    () => decideRelease({ ...base, tagSha: previous, published: true }),
    /original.*run|different commit/,
  );
  assert.throws(() => decideRelease({ ...base, published: true }), /tag/);
});
test('new releases cannot roll latest back or accept prerelease versions', () => {
  for (const latest of ['0.2.0', '0.3.0', '1.0.0'])
    assert.throws(() => decideRelease({ ...base, latest }), /newer/);
  assert.throws(
    () => decideRelease({ ...base, version: '0.3.0-beta.1' }),
    /stable/,
  );
});
test('registry lookups distinguish missing versions from service and permission errors', async () => {
  assert.equal(
    await publishedVersion(pkg.name, pkg.version, async () => ({
      status: 404,
    })),
    null,
  );
  for (const status of [401, 403, 429, 500])
    await assert.rejects(
      publishedVersion(pkg.name, pkg.version, async () => ({
        status,
        ok: false,
      })),
      /registry/i,
    );
  await assert.rejects(
    publishedVersion(pkg.name, pkg.version, async () => ({
      status: 200,
      ok: true,
      json: async () => ({ version: 'wrong' }),
    })),
    /metadata/i,
  );
  let requested;
  assert.deepEqual(
    await publishedVersion(pkg.name, pkg.version, async (url) => {
      requested = url;
      return { status: 200, ok: true, json: async () => metadata };
    }),
    metadata,
  );
  assert.equal(
    requested,
    'https://registry.npmjs.org/%40software-system.design%2Fui/0.2.0',
  );
});
test('planning uses the manifest, requires main and checks lockfile consistency before network access', async () => {
  const outputs = {};
  const core = {
    setOutput: (name, value) => {
      outputs[name] = value;
    },
    info: () => {},
  };
  await planRelease({
    github: client(),
    context,
    core,
    readFile,
    fetchImpl: async () => ({ status: 404 }),
  });
  assert.equal(outputs.tag, 'v0.2.0');
  assert.equal(outputs.release_needed, 'true');
  assert.equal(outputs.publish_needed, 'true');
  await assert.rejects(
    planRelease({
      github: client(),
      context: { ...context, ref: 'refs/heads/feature' },
      core,
      readFile,
      fetchImpl: registry,
    }),
    /main/,
  );
  await assert.rejects(
    planRelease({
      github: client(),
      context,
      core,
      readFile: (name) =>
        name === 'package-lock.json' ? '{}' : readFile(name),
      fetchImpl: registry,
    }),
    /lockfile/,
  );
});
test('permission failures are never interpreted as missing tags or releases', async () => {
  const github = client();
  github.rest.git.getRef = async () => {
    throw Object.assign(new Error('Forbidden'), { status: 403 });
  };
  await assert.rejects(
    planRelease({
      github,
      context,
      core: { setOutput: () => {}, info: () => {} },
      readFile,
      fetchImpl: registry,
    }),
    /Forbidden/,
  );
});
test('tag creation pins the triggering SHA and never moves an existing tag', async () => {
  const github = client();
  await ensureTag({ github, context, readFile });
  assert.deepEqual(github.writes, [
    ['tag', { ...context.repo, ref: 'refs/tags/v0.2.0', sha }],
  ]);
  const existing = client({ tagSha: sha });
  await ensureTag({ github: existing, context, readFile });
  assert.deepEqual(existing.writes, []);
  await assert.rejects(
    ensureTag({ github: client({ tagSha: previous }), context, readFile }),
    /different commit/,
  );
});
test('annotated version tags resolve to their original commit', async () => {
  const github = client();
  github.rest.git.getRef = async () => ({
    data: { object: { type: 'tag', sha: previous } },
  });
  await ensureTag({ github, context, readFile });
  assert.deepEqual(github.writes, []);
});
test('GitHub release follows registry integrity verification and uses only this version changelog', async () => {
  const github = client({ tagSha: sha });
  await completeRelease({ github, context, readFile, fetchImpl: registry });
  const [kind, input] = github.writes[0];
  assert.equal(kind, 'release');
  assert.equal(input.tag_name, 'v0.2.0');
  assert.equal(input.target_commitish, sha);
  assert.match(input.body, /Add components/);
  assert.doesNotMatch(input.body, /Old notes/);
  assert.equal(input.draft, false);
  assert.equal(input.prerelease, false);
});
test('mismatched npm bytes prevent GitHub release creation', async () => {
  const github = client({ tagSha: sha });
  await assert.rejects(
    completeRelease({
      github,
      context,
      readFile,
      fetchImpl: async () => ({
        status: 200,
        ok: true,
        json: async () => ({
          ...metadata,
          dist: { integrity: 'sha512-wrong' },
        }),
      }),
    }),
    /integrity/i,
  );
  assert.deepEqual(github.writes, []);
});
test('a completed GitHub release is retained during retries', async () => {
  const github = client({
    tagSha: sha,
    release: {
      draft: false,
      prerelease: false,
      html_url: 'https://example.com/release',
    },
  });
  await completeRelease({ github, context, readFile, fetchImpl: registry });
  assert.deepEqual(github.writes, []);
});
test('workflow releases main directly and keeps all validation ahead of external writes', () => {
  const workflow = readFileSync('.github/workflows/release.yml', 'utf8');
  assert.match(workflow, /push:\s+branches: \[main\]/);
  assert.match(workflow, /contents: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /queue: max/);
  assert.match(workflow, /cancel-in-progress: false/);
  const validation = workflow.indexOf('npm run test:integration');
  const tag = workflow.indexOf('await ensureTag(');
  const publish = workflow.indexOf('npm publish $artifact.tarball');
  const release = workflow.indexOf('await completeRelease(');
  assert(
    validation > 0 && validation < tag && tag < publish && publish < release,
  );
  assert.match(workflow, /if: steps.plan.outputs.publish_needed == 'true'/);
});

test('the actual workflow planning script loads its helper on this runner', async () => {
  const workflow = readFileSync('.github/workflows/release.yml', 'utf8');
  const body = workflow
    .match(/^ {10}script: \|\r?\n((?: {12}[^\r\n]*(?:\r?\n|$))+)/m)?.[1]
    ?.replace(/^ {12}/gm, '');
  assert(body, 'Workflow planning script must be present');
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const outputs = {};
  const request = mock.method(globalThis, 'fetch', async () => ({
    status: 404,
  }));
  try {
    await new AsyncFunction(
      'require',
      'github',
      'context',
      'core',
      'process',
      body,
    )(
      createRequire(import.meta.url),
      client(),
      context,
      {
        setOutput: (name, value) => {
          outputs[name] = value;
        },
        info: () => {},
      },
      { env: { GITHUB_WORKSPACE: process.cwd() } },
    );
    const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
    assert.equal(outputs.tag, `v${manifest.version}`);
    assert.equal(outputs.release_needed, 'true');
  } finally {
    request.mock.restore();
  }
});
