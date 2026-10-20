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
  await page.goto('/iframe.html?id=atoms-button--arabic&viewMode=story');
  await expect(page.getByRole('button', { name: 'حفظ التغييرات' })).toHaveCSS('direction', 'rtl');
});
