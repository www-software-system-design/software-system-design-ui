import { expect, test } from '@playwright/test';

test('produces actual initial HTML without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto('http://127.0.0.1:3100');
    await expect(page.getByRole('button', { name: 'Imported from package root' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Content prepared by the server' })).toBeVisible();
    await expect(page.getByLabel('Count')).toHaveText('0');
    await expect(page.getByRole('button', { name: 'Chargement' })).toBeDisabled();
    await expect(page.getByRole('textbox', { name: 'Published input' })).toHaveValue('Server-provided value');
    await expect(page.getByRole('searchbox', { name: 'Standalone field' })).toHaveAccessibleDescription('Stable label associations from an MFE Server Component.');
    await expect(page.getByRole('region', { name: 'Example component explorer' }).getByRole('status')).toHaveText('3 results');
  } finally { await context.close(); }
});

test('hydrates and updates client-owned state without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Increment', exact: true }).click();
  await expect(page.getByLabel('Count')).toHaveText('1');
  await expect(page.getByRole('button', { name: 'Content prepared by the server' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ലോഡ് ചെയ്യുന്നു' })).toHaveAttribute('aria-busy', 'true');
  expect(errors).toEqual([]);
});

test('loads documented styles and isolates theme and direction scopes', async ({ page }) => {
  await page.goto('/');
  const light = page.getByRole('button', { name: 'Imported from package root' });
  const dark = page.getByRole('button', { name: 'Chargement' });
  await expect(light).toHaveCSS('background-color', 'rgb(23, 69, 184)');
  await expect(dark).toHaveCSS('background-color', 'rgb(164, 188, 253)');
  await expect(page.getByRole('button', { name: 'ലോഡ് ചെയ്യുന്നു' })).toHaveCSS('direction', 'ltr');
});

test('composes every atomic layer and a public hook without hydration errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  const content = page.getByRole('region', { name: 'Example component explorer' });
  await expect(content).toBeVisible();
  const input = content.getByRole('searchbox', { name: 'Search' });
  await input.fill('Button');
  await expect(content.getByRole('status')).toHaveText('1 result');
  await expect(content.getByRole('listitem')).toHaveText('Button');
  await content.getByRole('button', { name: 'Clear search' }).click();
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
  await expect(content.getByRole('status')).toHaveText('3 results');
  expect(errors).toEqual([]);
});
