import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) visit(path);
    else if (/^[A-Z].*\.tsx$/.test(entry.name) && !/\.(test|stories)\./.test(entry.name)) {
      const name = entry.name.slice(0, -4);
      assert.match(readFileSync(path, 'utf8'), /^['"]use client['"];/, `${path}: public components require client boundaries`);
      for (const suffix of ['.test.tsx', '.stories.tsx']) {
        assert(existsSync(join(directory, name + suffix)), `${path}: missing ${name + suffix}`);
      }
      assert(existsSync(join(directory, 'index.ts')), `${path}: missing local exports`);
    }
  }
}

visit('src/components');
visit('src/providers');
console.log('Component client boundaries, tests, stories, and local exports are present.');
