import { expect, test } from '@playwright/test';

for (const theme of ['dark', 'light']) {
  for (const route of ['/about', '/governance', '/human-ai-legislation']) {
    test(`${route} uses published patterns in ${theme} at wide and compact widths`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      await page.addInitScript(value => localStorage.setItem('ssd-theme', value), theme);
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
      const main = page.getByRole('main');

      if (route === '/about') {
        const journey = page.getByRole('list', { name: 'Our development journey' });
        await expect(journey.getByRole('listitem')).toHaveCount(5);
        await expect(journey.getByText('Planned direction', { exact: true })).toHaveCount(5);
        await expect(journey.getByRole('heading', { level: 3 }).first()).toHaveText('Start with a connected system.');
        await expect(page.getByRole('list', { name: 'Software production capabilities' }).getByRole('listitem')).toHaveCount(5);
        const anchor = page.getByRole('navigation', { name: 'On this page' }).getByRole('link', { name: 'Our timeline' });
        await anchor.click();
        await expect(page).toHaveURL(/#our-journey$/);
        await expect(page.getByRole('heading', { name: /A clear direction/ })).toBeInViewport();
      } else {
        const labels = route === '/governance'
          ? [{ name: 'Governance controls', count: 3 }]
          : [{ name: 'Rule lifecycle', count: 5 }, { name: 'Dispute review process', count: 6 }];
        for (const { name, count } of labels) {
          await expect(page.getByRole('list', { name }).getByRole('listitem')).toHaveCount(count);
        }
        await expect(main.getByRole('complementary')).toHaveCount(route === '/governance' ? 1 : 2);
        await expect(main.getByRole('alert')).toHaveCount(0);
        await expect(main.getByRole('status')).toHaveCount(0);
        const callout = page.getByRole('complementary', { name: route === '/governance' ? 'When work cannot safely continue' : 'Authority and limits' });
        await expect(callout).toHaveCSS('border-inline-start-width', '3px');
        const evidence = page.locator('.policy-evidence');
        const primary = await evidence.boundingBox();
        const secondary = await callout.boundingBox();
        expect(secondary!.x).toBeGreaterThan(primary!.x);
      }

      // Tailwind's host reset must not remove the shared list's native numbers.
      for (const list of await page.locator('.ssd-step-list').all()) {
        await expect(list).toHaveCSS('list-style-type', 'decimal');
      }
      await page.screenshot({ path: `.artifacts/adoption-${route.slice(1)}-${theme}-wide.png`, fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();
      if (route !== '/about') {
        const evidence = await page.locator('.policy-evidence').boundingBox();
        const callout = await page.getByRole('complementary', { name: route === '/governance' ? 'When work cannot safely continue' : 'Authority and limits' }).boundingBox();
        expect(callout!.y).toBeGreaterThanOrEqual(evidence!.y + evidence!.height);
      }
      await page.screenshot({ path: `.artifacts/adoption-${route.slice(1)}-${theme}-compact.png`, fullPage: true });
      expect(errors).toEqual([]);
    });
  }
}

test('new informational patterns render without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/about`);
    await expect(page.getByRole('list', { name: 'Our development journey' }).getByRole('listitem')).toHaveCount(5);
    await page.goto(`${baseURL}/governance`);
    await expect(page.getByRole('list', { name: 'Governance controls' }).getByRole('listitem')).toHaveCount(3);
    await expect(page.getByRole('complementary', { name: 'When work cannot safely continue' })).toBeVisible();
    await page.goto(`${baseURL}/human-ai-legislation`);
    await expect(page.getByRole('list', { name: 'Dispute review process' }).getByRole('listitem')).toHaveCount(6);
    await expect(page.getByRole('complementary', { name: 'Authority and limits' })).toBeVisible();
  } finally { await context.close(); }
});
