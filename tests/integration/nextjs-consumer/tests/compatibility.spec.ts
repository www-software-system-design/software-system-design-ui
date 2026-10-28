import { expect, test } from '@playwright/test';

test('produces actual initial HTML without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto('http://127.0.0.1:3100');
    await expect(page.getByRole('link', { name: 'Packed studio home' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Packed feature' })).toContainText('Content prepared by the server');
    await expect(page.getByRole('list', { name: 'Packed principles' })).toContainText('Server-prepared principle');
    await expect(page.getByRole('link', { name: 'Packed standards' })).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('region', { name: 'Packed highlights' })).toContainText('First server slide');
    await expect(page.getByRole('checkbox',{name:'Reference consent'})).toBeChecked();
    await expect(page.getByRole('spinbutton',{name:'Reference quantity'})).toHaveValue('2');
    await expect(page.getByRole('combobox',{name:'Reference region'})).toHaveValue('in');
    await expect(page.getByRole('img', { name: 'Packed chart' })).toBeVisible();
    await expect(page.getByRole('table', { name: 'Packed chart' }).getByRole('cell', { name: '42' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Root chart' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Imported from package root' })).toBeVisible();
    await expect(page.getByRole('article',{name:'Content prepared by the server'})).toBeVisible();
    await expect(page.getByRole('textbox',{name:'Draft title'})).toHaveValue('Server draft');
    await expect(page.getByRole('table',{name:'Supplied runs'})).toBeVisible();
    await expect(page.getByRole('button', { name: 'Content prepared by the server' })).toBeVisible();
    await expect(page.getByLabel('Count')).toHaveText('0');
    await expect(page.getByRole('button', { name: 'Chargement' })).toBeDisabled();
    await expect(page.getByRole('textbox', { name: 'Published input' })).toHaveValue('Server-provided value');
    await expect(page.getByRole('searchbox', { name: 'Standalone field' })).toHaveAccessibleDescription('Stable label associations from an MFE Server Component.');
    await expect(page.getByRole('region', { name: 'Example component explorer' }).getByRole('status')).toHaveText('3 results');
  } finally { await context.close(); }
});

test('extracted controlled components hydrate with consumer state',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.goto('/');
  await page.getByRole('button', { name: 'Packed product' }).click();
  await expect(page.getByRole('link', { name: 'Packed overview' })).toBeVisible();
  await page.getByRole('link', { name: 'Packed overview' }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Packed product' })).toBeFocused();
  const carousel = page.getByRole('region', { name: 'Packed highlights' });
  await carousel.getByRole('button', { name: 'Packed next' }).click();
  await expect(carousel.getByText('Second server slide')).toBeVisible();
  await expect(carousel.getByText('First server slide')).not.toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Packed initiatives' }).getByRole('link')).toHaveCSS('border-top-style', 'solid');
  await expect(page.getByRole('img', { name: 'Packed chart' })).toHaveCSS('display', 'block');
  await expect(page.getByRole('table', { name: 'Root chart' })).toBeVisible();
  await page.getByRole('button',{name:'Use light theme'}).click();
  await expect(page.getByRole('button',{name:'Use dark theme'})).toBeVisible();
  const pagination=page.getByRole('navigation',{name:'Example pages'});
  await pagination.getByRole('button',{name:'Next page'}).click();
  await expect(pagination).toContainText('Page 2 of 2');
  await expect(pagination.getByRole('button',{name:'Next page'})).toBeDisabled();
  await page.getByText('More details',{exact:true}).click();
  await expect(page.locator('details')).toHaveAttribute('open','');
  expect(errors).toEqual([]);
});

test('new public controls hydrate and native dialog retains its provider scope',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.goto('/');
  await page.getByRole('switch',{name:'Reference notifications'}).click();
  await expect(page.getByLabel('Notification preference')).toHaveText('Enabled');
  const first=page.getByRole('tab',{name:'Reference one'});
  await first.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab',{name:'Reference two'})).toBeFocused();
  const opener=page.getByRole('button',{name:'Open reference dialog'});
  await opener.click();
  const dialog=page.getByRole('dialog',{name:'Reference dialog'});
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS('direction','rtl');
  await expect(dialog).toHaveCSS('background-color','rgb(17, 25, 39)');
  await expect(dialog.getByRole('button',{name:'Fermer'})).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(errors).toEqual([]);
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
  await expect(light).toHaveCSS('background-color', 'rgb(0, 85, 255)');
  await expect(dark).toHaveCSS('background-color', 'rgb(0, 85, 255)');
  await expect(light).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(dark).toHaveCSS('color', 'rgb(255, 255, 255)');
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

test('serves informational patterns from root and subpath exports without JavaScript', async ({browser}) => {
 const context = await browser.newContext({javaScriptEnabled:false});
 try {
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100');
  await expect(page.getByRole('list',{name:'Packed journey'})).toContainText('Planned');
  await expect(page.getByRole('heading',{name:'Packed milestone'})).toBeVisible();
  await expect(page.getByRole('list',{name:'Packed review'})).toContainText('Content prepared by the server');
  await expect(page.getByRole('complementary',{name:'Packed limits'})).toHaveCSS('border-inline-start-width','3px');
  await expect(page.getByRole('complementary',{name:'Direct limits'})).toBeVisible();
  await expect(page.getByRole('list',{name:'Direct journey'})).toBeAttached();
  await expect(page.getByRole('list',{name:'Direct steps'})).toBeAttached();
 } finally { await context.close(); }
});
