import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { setTimeout } from 'node:timers/promises';
import { assertReleaseReady } from '../../scripts/check-release.mjs';

function stable(version) {
  assert.match(
    version,
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/,
    'Use a stable package version',
  );
  return version.split('.').map(BigInt);
}

function newerThan(version, latest) {
  const current = stable(version);
  const previous = stable(latest);
  for (let index = 0; index < 3; index++) {
    if (current[index] !== previous[index])
      return current[index] > previous[index];
  }
  return false;
}

export function decideRelease({
  version,
  sha,
  tagSha,
  published,
  hasRelease,
  latest,
}) {
  stable(version);
  if (published && hasRelease && tagSha)
    return { release: false, publish: false };
  assert(
    !tagSha || tagSha === sha,
    'Version tag points to a different commit; rerun the original workflow run or choose a new version',
  );
  assert(
    !published || tagSha,
    'The npm version exists without its GitHub tag; reconcile the release before retrying',
  );
  if (!published && latest)
    assert(
      newerThan(version, latest),
      'Choose a version newer than npm latest',
    );
  return { release: true, publish: !published };
}

function releaseFiles(readFile) {
  const pkg = JSON.parse(readFile('package.json', 'utf8'));
  const lock = JSON.parse(readFile('package-lock.json', 'utf8'));
  const changelog = readFile('CHANGELOG.md', 'utf8');
  const tag = `v${pkg.version}`;
  assertReleaseReady(pkg, readFile('LICENSE', 'utf8'), changelog, tag);
  stable(pkg.version);
  assert(
    lock.version === pkg.version &&
      lock.packages?.['']?.version === pkg.version &&
      lock.packages[''].name === pkg.name,
    'Package and lockfile identities/versions must match',
  );
  const lines = changelog.split(/\r?\n/);
  const start = lines.findIndex(
    (line) =>
      line === `## ${pkg.version}` || line.startsWith(`## ${pkg.version} - `),
  );
  const next = lines.findIndex(
    (line, index) => index > start && line.startsWith('## '),
  );
  const notes = lines
    .slice(start + 1, next === -1 ? undefined : next)
    .join('\n')
    .trim();
  assert(notes, 'Add release notes to the versioned changelog entry');
  return { pkg, tag, notes };
}

function mainOnly(context) {
  assert.equal(
    context.ref,
    'refs/heads/main',
    'Automatic releases only run from main',
  );
  assert.match(
    context.sha,
    /^[a-f\d]{40}$/,
    'Release target must be the immutable triggering commit SHA',
  );
}

async function optional(request) {
  try {
    return (await request()).data;
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

async function tagCommit(github, repo, tag) {
  const reference = await optional(() =>
    github.rest.git.getRef({ ...repo, ref: `tags/${tag}` }),
  );
  if (!reference) return null;
  let object = reference.object;
  for (let depth = 0; depth < 8; depth++) {
    if (object.type === 'commit') return object.sha;
    assert.equal(object.type, 'tag', 'Version tag must resolve to a commit');
    object = (await github.rest.git.getTag({ ...repo, tag_sha: object.sha }))
      .data.object;
  }
  throw new Error('Version tag chain is too deep');
}

export async function publishedVersion(name, version, fetchImpl = fetch) {
  const response = await fetchImpl(
    `https://registry.npmjs.org/${encodeURIComponent(name)}/${encodeURIComponent(version)}`,
    {
      signal: AbortSignal.timeout(30_000),
    },
  );
  if (response.status === 404) return null;
  assert(
    response.ok,
    `npm registry lookup failed (${response.status}); refusing to assume the version is unpublished`,
  );
  const metadata = await response.json();
  assert(
    metadata.name === name &&
      typeof metadata.version === 'string' &&
      (version === 'latest' || metadata.version === version) &&
      typeof metadata.dist?.integrity === 'string',
    'Invalid npm registry metadata',
  );
  return metadata;
}

export async function planRelease({
  github,
  context,
  core,
  readFile = readFileSync,
  fetchImpl = fetch,
}) {
  mainOnly(context);
  const { pkg, tag } = releaseFiles(readFile);
  const [published, latest, tagSha, release] = await Promise.all([
    publishedVersion(pkg.name, pkg.version, fetchImpl),
    publishedVersion(pkg.name, 'latest', fetchImpl),
    tagCommit(github, context.repo, tag),
    optional(() => github.rest.repos.getReleaseByTag({ ...context.repo, tag })),
  ]);
  assert(
    !release || (!release.draft && !release.prerelease),
    'Resolve the existing draft/prerelease before an automatic stable release',
  );
  const plan = decideRelease({
    version: pkg.version,
    sha: context.sha,
    tagSha,
    published: Boolean(published),
    hasRelease: Boolean(release),
    latest: latest?.version,
  });
  core.setOutput('tag', tag);
  core.setOutput('release_needed', String(plan.release));
  core.setOutput('publish_needed', String(plan.publish));
  core.info(
    plan.release
      ? `Prepare ${pkg.name}@${pkg.version} at ${context.sha}`
      : `${tag} is already published on npm and GitHub; no release needed`,
  );
  return plan;
}

export async function ensureTag({ github, context, readFile = readFileSync }) {
  mainOnly(context);
  const { tag } = releaseFiles(readFile);
  const existing = await tagCommit(github, context.repo, tag);
  assert(
    !existing || existing === context.sha,
    'Version tag points to a different commit; never move a published version tag',
  );
  if (!existing)
    await github.rest.git.createRef({
      ...context.repo,
      ref: `refs/tags/${tag}`,
      sha: context.sha,
    });
}

export async function completeRelease({
  github,
  context,
  readFile = readFileSync,
  fetchImpl = fetch,
}) {
  mainOnly(context);
  const { pkg, tag, notes } = releaseFiles(readFile);
  assert.equal(
    await tagCommit(github, context.repo, tag),
    context.sha,
    'Version tag must still identify the validated commit',
  );
  const { tarball } = JSON.parse(readFile('.artifacts/package.json', 'utf8'));
  const integrity = `sha512-${createHash('sha512').update(readFile(tarball)).digest('base64')}`;
  let published;
  // Allow the just-published version to propagate; transport/auth errors still fail closed.
  for (let attempt = 0; attempt < 5; attempt++) {
    published = await publishedVersion(pkg.name, pkg.version, fetchImpl);
    if (published) break;
    if (attempt < 4) await setTimeout(2000);
  }
  assert(
    published,
    'Published npm version is not visible yet; rerun this workflow',
  );
  assert(
    published.dist.integrity.split(/\s+/).includes(integrity),
    'Published npm integrity does not match the validated tarball',
  );
  const existing = await optional(() =>
    github.rest.repos.getReleaseByTag({ ...context.repo, tag }),
  );
  if (existing) {
    assert(
      !existing.draft && !existing.prerelease,
      'Resolve the existing draft/prerelease before completing the stable release',
    );
    return existing;
  }
  return (
    await github.rest.repos.createRelease({
      ...context.repo,
      tag_name: tag,
      target_commitish: context.sha,
      name: `${pkg.name} ${tag}`,
      draft: false,
      prerelease: false,
      make_latest: 'legacy',
      body: `${notes}\n\nPublished as [${pkg.name}@${pkg.version}](https://www.npmjs.com/package/${pkg.name}/v/${pkg.version}).`,
    })
  ).data;
}
