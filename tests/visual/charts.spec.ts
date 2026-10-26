import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark']) {
  test(`complete chart catalogue in ${theme}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=data-visualization-overview--catalogue&viewMode=story&globals=theme:${theme}`);
    const catalogue = page.locator('.chart-catalogue');
    await expect(catalogue.getByRole('img')).toHaveCount(15);
    await expect(catalogue).toHaveScreenshot(`chart-catalogue-${theme}.png`, { animations: 'disabled' });
  });
  for (const [category, variant] of [['comparison', 'bar'], ['composition', 'donut'], ['intensity', 'heatmap']]) {
    test(`${category} chart in ${theme}`, async ({ page }) => {
      await page.goto(`/iframe.html?id=data-visualization-${category}--${variant}&viewMode=story&globals=theme:${theme}`);
      const chart = page.locator('.ssd-data-chart');
      await expect(chart.getByRole('img')).toBeVisible();
      await expect(chart.getByRole('table')).toBeVisible();
      await expect(chart).toHaveScreenshot(`chart-${category}-${theme}.png`, { animations: 'disabled' });
    });
  }
}

test('chart long labels wrap in a compact RTL scope', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/iframe.html?id=data-visualization-overview--compact-rtl&viewMode=story');
  const chart = page.locator('.ssd-data-chart');
  await expect(chart).toHaveCSS('direction', 'rtl');
  expect(await chart.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  await expect(chart).toHaveScreenshot('chart-compact-rtl.png', { animations: 'disabled' });
});
