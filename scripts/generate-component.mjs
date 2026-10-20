import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function generateComponent(root, level, name) {
  if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) throw new Error('Use a PascalCase component name.');
  if (!['atoms', 'molecules', 'organisms', 'templates'].includes(level)) throw new Error('Choose a valid atomic level.');
  const slug = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  const directory = join(root, 'src', 'components', level, slug);
  if (existsSync(directory)) throw new Error(`Component already exists: ${directory}`);
  mkdirSync(directory, { recursive: true });
  const files = {
    [`${name}.tsx`]: `'use client';\n\nimport type { ComponentPropsWithRef } from 'react';\n\nexport type ${name}Props = ComponentPropsWithRef<'div'>;\n\nexport function ${name}(props: ${name}Props) {\n  return <div {...props} />;\n}\n`,
    [`${name}.test.tsx`]: `import { render, screen } from '@testing-library/react';\nimport { describe, expect, it } from 'vitest';\nimport { ${name} } from './${name}.js';\n\ndescribe('${name}', () => {\n  it('implements the specified behavior (replace this assertion first)', () => {\n    render(<${name} data-testid="subject" />);\n    expect(screen.getByTestId('subject')).toHaveTextContent('Replace with the required behavior');\n  });\n});\n`,
    [`${name}.stories.tsx`]: `import type { Meta, StoryObj } from '@storybook/react-vite';\nimport { ${name} } from './${name}.js';\n\nconst meta = { title: '${level[0].toUpperCase() + level.slice(1)}/${name}', component: ${name}, tags: ['autodocs'], args: { children: '${name}' } } satisfies Meta<typeof ${name}>;\nexport default meta;\nexport const Default: StoryObj<typeof meta> = {};\n`,
    'index.ts': `export { ${name}, type ${name}Props } from './${name}.js';\n`
  };
  for (const [file, contents] of Object.entries(files)) writeFileSync(join(directory, file), contents, { flag: 'wx' });
  return directory;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [level, name] = process.argv.slice(2);
  if (!level || !name) throw new Error('Usage: npm run generate:component -- atoms Example');
  console.log(`Created ${generateComponent(process.cwd(), level, name)}`);
  console.log('Replace the intentionally failing test with the required behavior before implementing. Add reviewed public exports when ready.');
}
