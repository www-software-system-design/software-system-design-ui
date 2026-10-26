import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

it('uses the canonical blue SD logo selected by the container', () => {
  const logo = readFileSync('.storybook/public/software-system-design-logo.png');
  expect(createHash('sha256').update(logo).digest('hex')).toBe('35fa27d383fefe68aca7b4dbcdb72df30935a52f99e480a9d149f0d865beb37c');
});
