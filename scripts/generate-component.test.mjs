import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { generateComponent } from './generate-component.mjs';

test('generates a colocated client component, failing behavioral test, story, and export', () => {
  const root = mkdtempSync(join(tmpdir(), 'ssd-generator-'));
  const directory = generateComponent(root, 'molecules', 'SearchField');
  assert.deepEqual(readdirSync(directory).sort(), ['SearchField.stories.tsx', 'SearchField.test.tsx', 'SearchField.tsx', 'index.ts']);
  assert.match(readFileSync(join(directory, 'SearchField.tsx'), 'utf8'), /^'use client';/);
  assert.match(readFileSync(join(directory, 'SearchField.test.tsx'), 'utf8'), /describe\('SearchField'/);
  assert.match(readFileSync(join(directory, 'SearchField.test.tsx'), 'utf8'), /toHaveTextContent\('Replace with the required behavior'\)/);
  assert.throws(() => generateComponent(root, 'molecules', 'SearchField'), /already exists/);
});

test('rejects traversal and unsupported atomic levels', () => {
  const root = mkdtempSync(join(tmpdir(), 'ssd-generator-'));
  for (const name of ['../Escape', 'foo/bar', 'lowercase', '']) {
    assert.throws(() => generateComponent(root, 'atoms', name), /PascalCase/);
  }
  assert.throws(() => generateComponent(root, '../outside', 'Example'), /atomic level/);
});
