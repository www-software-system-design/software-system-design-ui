import { expect, test } from "@playwright/test";

for (const route of [
  "/",
  "/plans",
  "/open-source",
  "/authors",
  "/datasets",
  "/careers",
  "/board",
]) {
  test(`${route} has page landmarks and branded controls`, async ({ page }) => {
    const errors:string[]=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error'&&!message.text().includes('503'))errors.push(message.text());});
    await page.route("**/api/contributors", (route) =>
      route.fulfill({ status: 503, body: "unavailable" }),
    );
    await page.route("**/api/board", (route) =>
      route.fulfill({ status: 503, body: "unavailable" }),
    );
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("main")).not.toContainText(
      "Built in the open.",
    );
    await expect(
      page.getByRole("button", { name: "Switch to light theme" }),
    ).toBeVisible();
    await expect(page.getByRole('button',{name:'Open navigation menu'})).toBeHidden();
    if(route==='/') await expect(page.locator('.brand-journey')).toHaveCount(0,{timeout:15000});
    expect(errors).toEqual([]);
    const footerLogo=page.getByRole('contentinfo').locator('img');
    await footerLogo.scrollIntoViewIfNeeded();
    await expect.poll(()=>footerLogo.evaluate(image=>(image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:`.artifacts/container-${route==='/'?'home':route.slice(1)}.png`,fullPage:true});
    await page.setViewportSize({width:390,height:844});
    await expect(page.getByRole('button',{name:'Open navigation menu'})).toBeVisible();
    await expect(page.getByRole('button',{name:'Open navigation menu'})).toBeInViewport();
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
    await page.screenshot({path:`.artifacts/container-${route==='/'?'home':route.slice(1)}-compact.png`});
  });
}

test("mobile navigation, theme persistence and demo interest form", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Plans", exact: true })
    .click();
  await expect(page).toHaveURL(/\/plans$/);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await page.goto("/");
  const form = page.locator("form.early-access-form");
  await form.getByRole("button", { name: /Get Early Access/ }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Enter an email address to register your interest.",
  );
  await form
    .getByRole("textbox", { name: "Your email address" })
    .fill("builder@example.com");
  await form.getByRole("button", { name: /Get Early Access/ }).click();
  await expect(form.getByRole("status")).toContainText(
    "does not save or send your email yet.",
  );
});
