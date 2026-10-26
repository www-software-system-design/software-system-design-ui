import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark']) {
  test('extracted container patterns in ' + theme, async ({ page }) => {
    await page.goto('/iframe.html?id=organisms-featuresection--container-patterns&viewMode=story&globals=theme:' + theme);
    const section = page.getByRole('region', { name: 'Build through shared standards' });
    await expect(section).toBeVisible();
    const scope = page.locator('.ssd-scope').last();
    await expect(scope).toHaveScreenshot('container-patterns-' + theme + '.png', { animations: 'disabled' });
    const trigger = page.getByRole('button', { name: 'Product', exact: true });
    await trigger.click();
    await expect(page.getByRole('link', { name: 'Plans' })).toBeVisible();
    await expect(scope).toHaveScreenshot('container-navigation-' + theme + '.png', { animations: 'disabled' });
    await page.getByRole('link', { name: 'Plans' }).focus();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expect(page.getByRole('link', { name: 'Explore the initiative' })).toBeVisible();
    await expect(page.getByRole('list', { name: 'Community principles' })).not.toBeVisible();
  });
}

test('extracted patterns fit compact RTL containers and stack cards', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 1100 });
  await page.goto('/iframe.html?id=organisms-featuresection--container-patterns&viewMode=story&globals=direction:rtl');
  const scope = page.locator('.ssd-scope').last();
  await expect(page.getByRole('heading', { name: 'Build through shared standards' })).toBeVisible();
  await expect(scope).toHaveCSS('direction', 'rtl');
  expect(await scope.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  const cards = page.locator('.ssd-feature-section__grid > article');
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  expect(second!.y).toBeGreaterThanOrEqual(first!.y + first!.height);
  await expect(scope).toHaveScreenshot('container-patterns-compact-rtl.png', { animations: 'disabled' });
});
