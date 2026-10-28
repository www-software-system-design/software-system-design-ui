import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`problem cards have visible spacing and inset content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.locator(".brand-journey")).toHaveCount(0, { timeout: 15000 });
    const grid = page.locator(".problem-grid");
    await grid.scrollIntoViewIfNeeded();
    const cards = grid.getByRole("article");
    await expect(cards).toHaveCount(3);
    const bounds = await cards.evaluateAll(elements => elements.map(element => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom, padding: parseFloat(style.paddingInlineStart) };
    }));
    for (let index = 1; index < bounds.length; index++) {
      const gap = width > 600 ? bounds[index].x - bounds[index - 1].right : bounds[index].y - bounds[index - 1].bottom;
      expect(gap).toBeGreaterThanOrEqual(16);
    }
    expect(bounds.every(card => card.padding >= 20)).toBe(true);
    await grid.screenshot({ path: `.artifacts/alignment/problem-cards-${width}.png` });
  });
}

test("compact header keeps its navigation control on screen at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto("/plans");
  const header = page.getByRole("banner");
  expect((await header.boundingBox())!.height).toBeLessThanOrEqual(90);
  const menu = header.getByRole("button", { name: "Open navigation menu" });
  await expect(menu).toBeInViewport();
  expect((await menu.boundingBox())!.width).toBeLessThanOrEqual(48);
  await menu.click();
  await expect(header.getByRole("navigation")).toBeVisible();
  await header.getByRole("button", { name: "Close navigation menu" }).press("Escape");
  await expect(header.getByRole("navigation")).toBeHidden();
});

test("desktop navigation stays on one row with readable link text", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/plans");
  const header = page.getByRole("banner");
  const navigation = header.getByRole("navigation");
  await expect(navigation).toBeVisible();
  const bounds = await header.boundingBox();
  expect(bounds!.height).toBeLessThanOrEqual(90);
  const link = navigation.getByRole("link", { name: "About Us", exact: true });
  expect(await link.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(14);
  const links = await navigation.getByRole("link").evaluateAll(elements => elements.filter(element => element.getClientRects().length > 0).map(element => element.getBoundingClientRect()));
  expect(Math.max(...links.map(rect => rect.bottom)) - Math.min(...links.map(rect => rect.top))).toBeLessThanOrEqual(48);
});

for (const width of [1440, 390, 320]) {
  test(`email field and action align without empty space at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.locator(".brand-journey")).toHaveCount(0, { timeout: 15000 });
    const form = page.locator(".early-access-form");
    await form.scrollIntoViewIfNeeded();
    const field = form.getByRole("textbox", { name: "Your email address" });
    const action = form.getByRole("button", { name: /Get Early Access/ });
    const inputBounds = (await field.boundingBox())!;
    const buttonBounds = (await action.boundingBox())!;
    const formBounds = (await form.boundingBox())!;
    if (width > 600) {
      expect(Math.abs(inputBounds.y + inputBounds.height - buttonBounds.y - buttonBounds.height)).toBeLessThanOrEqual(2);
      expect(buttonBounds.x).toBeGreaterThan(inputBounds.x + inputBounds.width);
    } else {
      expect(Math.abs(inputBounds.x - formBounds.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(inputBounds.width - formBounds.width)).toBeLessThanOrEqual(1);
      expect(buttonBounds.y - inputBounds.y - inputBounds.height).toBeLessThanOrEqual(20);
      expect(formBounds.height).toBeLessThan(180);
    }
    expect(await field.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
    await expect(form.getByRole("textbox")).toHaveAccessibleName("Your email address");
    await form.screenshot({ path: `.artifacts/alignment/form-${width}.png` });
  });
}

for (const route of ["/plans", "/open-source", "/authors", "/datasets", "/careers", "/board"]) {
  test(`${route} uses a consistent readable page-title scale`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.route("**/api/**", route => route.fulfill({ status: 503, body: "unavailable" }));
    await page.goto(route);
    const title = page.getByRole("heading", { level: 1 });
    const size = await title.evaluate(element => parseFloat(getComputedStyle(element).fontSize));
    expect(size).toBeGreaterThanOrEqual(48);
    expect(size).toBeLessThanOrEqual(64);
    const fonts = await page.evaluate(() => ({ body: getComputedStyle(document.body).fontFamily, content: getComputedStyle(document.querySelector("main")!).fontFamily }));
    expect(fonts.content).toBe(fonts.body);
  });
}
