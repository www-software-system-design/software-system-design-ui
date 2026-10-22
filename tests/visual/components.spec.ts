import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark']) {
  test(`button appearance in ${theme} theme`, async ({ page }) => {
    await page.goto(`/iframe.html?id=atoms-button--secondary&viewMode=story&globals=theme:${theme}`);
    const button = page.getByRole('button', { name: 'Save changes' });
    await expect(button).toBeVisible();
    await expect(button).toHaveCSS('color', theme === 'light' ? 'rgb(24, 34, 48)' : 'rgb(242, 244, 247)');
    await expect(button).toHaveScreenshot(`button-${theme}.png`, { animations: 'disabled' });
  });
}

test('system theme follows browser preference without changing HTML attributes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/iframe.html?id=atoms-button--secondary&viewMode=story&globals=theme:system');
  const button = page.getByRole('button', { name: 'Save changes' });
  await expect(button).toHaveCSS('background-color', 'rgb(16, 24, 40)');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(button).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});

test('long labels fit the compact preview and RTL inherits direction', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/iframe.html?id=atoms-button--long-label&viewMode=story');
  const button = page.getByRole('button');
  await expect(button).toBeVisible();
  const box = await button.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x + box!.width).toBeLessThanOrEqual(375);
  await page.goto('/iframe.html?id=atoms-button--rtl&viewMode=story');
  await expect(page.getByRole('button', { name: 'Save changes' })).toHaveCSS('direction', 'rtl');
});

for (const theme of ['light', 'dark']) {
  test(`composed atomic layers render in ${theme} theme`, async ({ page }) => {
    await page.goto(`/iframe.html?id=templates-explorer-layout--overview&viewMode=story&globals=theme:${theme}`);
    await expect(page.getByRole('heading', { name: 'Component explorer' })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText('3 results');
    await expect(page.locator('.ssd-explorer-layout')).toHaveScreenshot(`explorer-${theme}.png`, { animations: 'disabled' });
  });
}

test('template stacks its sidebar at narrow MFE widths without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 1100 });
  await page.goto('/iframe.html?id=templates-explorer-layout--overview&viewMode=story');
  const sidebar = page.getByRole('complementary', { name: 'Library information' });
  const content = page.getByRole('region', { name: 'Browse the library' });
  await expect(sidebar).toBeVisible();
  const sidebarBox = await sidebar.boundingBox();
  const contentBox = await content.boundingBox();
  expect(sidebarBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(contentBox!.y).toBeGreaterThanOrEqual(sidebarBox!.y + sidebarBox!.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('template uses logical placement in wide RTL scopes', async ({ page }) => {
  await page.goto('/iframe.html?id=templates-explorer-layout--rtl&viewMode=story');
  const sidebar = page.getByRole('complementary', { name: 'Library information' });
  const content = page.getByRole('region', { name: 'Browse the library' });
  await expect(sidebar).toBeVisible();
  const sidebarBox = await sidebar.boundingBox();
  const contentBox = await content.boundingBox();
  expect(sidebarBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(sidebarBox!.x).toBeGreaterThan(contentBox!.x);
});

test('Malayalam examples use LTR and display localized controls without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 1100 });
  await page.goto('/iframe.html?id=molecules-search-field--malayalam&viewMode=story');
  await expect(page.getByRole('searchbox', { name: 'ഘടകങ്ങൾ തിരയുക' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'തിരയൽ മായ്ക്കുക' })).toHaveCSS('direction', 'ltr');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.goto('/iframe.html?id=templates-explorer-layout--malayalam&viewMode=story');
  await expect(page.getByRole('region', { name: 'ശേഖരം കാണുക' })).toHaveCSS('direction', 'ltr');
  await expect(page.getByRole('status')).toHaveText('3 ഫലങ്ങൾ');
});

test('search clear is keyboard operable with visible focus in the browser', async ({ page }) => {
  await page.goto('/iframe.html?id=molecules-search-field--invalid&viewMode=story');
  const input = page.getByRole('searchbox');
  await input.focus();
  await input.press('Tab');
  const clear = page.getByRole('button', { name: 'Clear search' });
  await expect(clear).toBeFocused();
  await expect(clear).toHaveCSS('outline-style', 'solid');
  await clear.press('Enter');
  await expect(input).toHaveValue('');
  await expect(input).toBeFocused();
});

test('consumer token overrides apply without changing private component styles', async ({ page }) => {
  await page.goto('/iframe.html?id=foundations-tokens--scoped-override&viewMode=story');
  await expect(page.getByRole('button', { name: 'Custom action token' })).toHaveCSS('background-color', 'rgb(105, 65, 198)');
});
