import {expect,test} from '@playwright/test';
import dictionary from '../../docs/ui-dictionary.json' with {type:'json'};

for(const theme of ['light','dark']){
  test(`control gallery in ${theme}`,async({page})=>{
    await page.goto(`/iframe.html?id=reference-control-gallery--overview&viewMode=story&globals=theme:${theme}`);
    await expect(page.getByRole('checkbox',{name:'Receive a summary'})).toBeChecked();
    await expect(page.locator('.ssd-reference__gallery')).toHaveScreenshot(`controls-${theme}.png`,{animations:'disabled'});
  });
  test(`native modal in ${theme}`,async({page})=>{
    await page.goto(`/iframe.html?id=controls-overlays-dialog--open&viewMode=story&globals=theme:${theme}`);
    const dialog=page.getByRole('dialog',{name:'Confirm changes'});
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveScreenshot(`dialog-${theme}.png`,{animations:'disabled'});
  });
}

test('compact RTL controls fit their container',async({page})=>{
  await page.setViewportSize({width:375,height:900});
  await page.goto('/iframe.html?id=reference-control-gallery--compact-rtl&viewMode=story');
  const gallery=page.locator('.ssd-reference__gallery');
  await expect(gallery).toHaveCSS('direction','rtl');
  expect(await gallery.evaluate(element=>element.scrollWidth<=element.clientWidth)).toBe(true);
  await expect(gallery).toHaveScreenshot('controls-compact-rtl.png',{animations:'disabled'});
});

test('dictionary example destinations exist in the built catalogue',async({request})=>{
  const response=await request.get('/index.json');
  const index=await response.json();
  for(const entry of dictionary.entries.filter(entry=>entry.story)){
    expect(index.entries[entry.story],entry.id).toBeDefined();
  }
});

test('dictionary combines search, category and availability filters',async({page})=>{
  await page.goto('/iframe.html?id=reference-ui-dictionary--browse&viewMode=story');
  await page.getByRole('searchbox',{name:'Find a control'}).fill('spinbutton');
  await expect(page.getByRole('status')).toHaveText('2 entries');
  await page.getByRole('combobox',{name:'Availability'}).selectOption('component');
  await expect(page.getByRole('status')).toHaveText('1 entries');
  await page.getByRole('combobox',{name:'Category'}).selectOption('Overlays');
  await expect(page.getByRole('status')).toHaveText('0 entries');
});

test('native form state, slider keyboard and modal focus are browser-owned',async({page})=>{
  await page.goto('/iframe.html?id=reference-control-gallery--overview&viewMode=story');
  const slider=page.getByRole('slider',{name:'Volume'});
  await slider.focus();
  await slider.press('ArrowRight');
  await expect(slider).toHaveValue('5');
  await page.goto('/iframe.html?id=controls-overlays-dialog--default&viewMode=story');
  const opener=page.getByRole('button',{name:'Open dialog'});
  await opener.click();
  const close=page.getByRole('button',{name:'Close',exact:true});
  await expect(close).toBeFocused();
  await close.press('Tab');
  await expect(opener).not.toBeFocused();
  await opener.evaluate(element=>element.focus());
  await expect(opener).not.toBeFocused();
  await close.focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(opener).toBeFocused();
});
