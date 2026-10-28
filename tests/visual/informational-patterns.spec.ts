import { expect, test } from '@playwright/test';
for (const name of ['timeline','step-list','callout','splitlayout']) {
 const story = name === 'splitlayout' ? 'templates-splitlayout' : name === 'timeline' ? 'organisms-timeline' : 'molecules-'+name.replaceAll('-','');
 test(name+' adapts to narrow RTL containers and retains readable order', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/iframe.html?id='+story+'--default&viewMode=story&globals=direction:rtl');
  const component=page.locator(name === 'splitlayout' ? '.ssd-split-layout' : '.ssd-'+name);
  await expect(component).toBeVisible();
  await expect(component).toHaveCSS('direction','rtl');
  expect(await component.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  if(name==='splitlayout') {
   const primary=await page.locator('.ssd-split-layout__primary').boundingBox();
   const secondary=await page.locator('.ssd-split-layout__secondary').boundingBox();
   expect(secondary!.y).toBeGreaterThanOrEqual(primary!.y+primary!.height);
   await page.setViewportSize({width:1100,height:800});
   const widePrimary=await page.locator('.ssd-split-layout__primary').boundingBox();
   const wideSecondary=await page.locator('.ssd-split-layout__secondary').boundingBox();
   expect(Math.abs(widePrimary!.y-wideSecondary!.y)).toBeLessThan(2);
   expect(widePrimary!.x).toBeGreaterThan(wideSecondary!.x);
  }
 });
}
