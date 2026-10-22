import {expect,test} from '@playwright/test';

test('dataset filtering resets pagination and preserves sorting',async({page})=>{
  await page.goto('/datasets');
  const pagination=page.getByRole('navigation',{name:'Run pages'});
  await pagination.getByRole('button',{name:'Next page'}).click();
  await expect(pagination).toContainText('Page 2 of');
  await page.getByRole('searchbox',{name:'Search records'}).fill('not-a-real-run');
  await expect(page.getByRole('heading',{name:'No matching runs'})).toBeVisible();
  await expect(pagination.getByRole('button',{name:'Previous page'})).toBeDisabled();
  await expect(pagination.getByRole('button',{name:'Next page'})).toBeDisabled();
  await page.getByRole('button',{name:'Clear filters'}).first().click();
  await expect(pagination).toContainText('Page 1 of');
  await page.getByLabel('Sort by').selectOption('cost');
  const costs=await page.locator('tbody tr td:nth-child(5)').allTextContents();
  const values=costs.map(cost=>Number(cost.replace('$','')));
  expect(values).toEqual([...values].sort((a,b)=>b-a));
});

test('contributors retain fetching, retry and application search',async({page})=>{
  let requests=0;
  await page.route('**/api/contributors',route=>{
    requests++;
    return requests===1?route.fulfill({status:503,body:'unavailable'}):route.fulfill({json:{
      status:'complete',updatedAt:'2026-10-22T00:00:00Z',
      repositories:[{name:'studio',url:'https://example.com/studio',available:true}],
      contributors:[{id:'builder',name:'Example Builder',login:'builder',profileUrl:null,avatarUrl:null,type:'User',contributions:4,repositories:[{name:'studio',url:'https://example.com/studio',contributions:4}]}],
    }});
  });
  await page.goto('/authors');
  await expect(page.getByRole('heading',{name:'Contributions are unavailable right now.'})).toBeVisible();
  await page.getByRole('button',{name:/Try again/}).click();
  await expect(page.getByRole('heading',{name:'Example Builder'})).toBeVisible();
  await page.getByRole('searchbox',{name:'Find a contributor or repository'}).fill('unknown');
  await expect(page.getByText('No contributors match your search.')).toBeVisible();
  expect(requests).toBe(2);
});

const card={id:'item-1',title:'Visible issue',body:'Public description',kind:'Issue',status:'Todo',repository:'studio',number:1,url:null,canEditContent:true};
const snapshot=(canEdit:boolean)=>({status:'ready',title:'Project board',columns:['Todo','Done'],cards:[card],updatedAt:'2026-10-22T00:00:00Z',canEdit,statusOptions:['Todo','Done'],auth:{configured:true,login:canEdit?'builder':null}});

test('board keeps read-only permissions and card selection in the application',async({page})=>{
  let writes=0;
  await page.route('**/api/board',route=>{
    if(route.request().method()==='POST')writes++;
    return route.fulfill({json:snapshot(false)});
  });
  await page.goto('/board?auth=failed');
  await expect(page.getByRole('main').getByRole('alert')).toContainText('GitHub sign-in did not complete');
  await expect(page.getByRole('button',{name:'New draft'})).toHaveCount(0);
  await page.getByRole('button',{name:'Visible issue'}).click();
  await expect(page.getByText('Public description')).toBeVisible();
  await expect(page.getByRole('textbox',{name:'Title'})).toHaveCount(0);
  await page.getByRole('button',{name:'Close details'}).click();
  await page.getByRole('searchbox',{name:'Search items'}).fill('missing');
  await expect(page.getByRole('status').filter({hasText:'0 matching items'})).toBeVisible();
  expect(writes).toBe(0);
});

test('board draft validation, failed save and retry remain application-owned',async({page})=>{
  const writes:Record<string,unknown>[]=[];
  await page.route('**/api/board',route=>{
    if(route.request().method()==='POST'){
      writes.push(route.request().postDataJSON() as Record<string,unknown>);
      return writes.length===1?route.fulfill({status:403,json:{error:'Write permission denied'}}):route.fulfill({json:{saved:true}});
    }
    return route.fulfill({json:snapshot(true)});
  });
  await page.goto('/board');
  await page.getByRole('button',{name:'New draft'}).click();
  const submit=page.getByRole('button',{name:'Create draft'});
  await expect(submit).toBeDisabled();
  await page.getByRole('textbox',{name:'Title'}).fill('Example draft');
  await page.getByRole('textbox',{name:'Description'}).fill('Example description');
  await submit.click();
  await expect(page.getByRole('status').filter({hasText:'Write permission denied'})).toBeVisible();
  await expect(page.getByRole('textbox',{name:'Title'})).toHaveValue('Example draft');
  await submit.click();
  await expect(page.getByRole('textbox',{name:'Title'})).toHaveCount(0);
  expect(writes).toEqual([{action:'create',title:'Example draft',body:'Example description'},{action:'create',title:'Example draft',body:'Example description'}]);
});

test('presentation mode still discovers and advances landing sections',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:/Present/}).click();
  await expect(page.locator('html')).toHaveClass(/presentation-mode/);
  await expect(page.locator('[data-slide-active]')).toHaveAttribute('id','product');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-slide-active]')).not.toHaveAttribute('id','product');
  await page.keyboard.press('Escape');
  await expect(page.locator('html')).not.toHaveClass(/presentation-mode/);
});
