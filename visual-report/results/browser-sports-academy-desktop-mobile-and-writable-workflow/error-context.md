# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browser.spec.mjs >> sports-academy desktop, mobile and writable workflow
- Location: tests/browser.spec.mjs:8:32

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('#editor')
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" locator('#editor') with timeout 5000ms
  - waiting for locator('#editor')
    14 × locator resolved to <dialog open="" id="editor">…</dialog>
       - unexpected value "visible"

```

```yaml
- dialog:
  - heading "예약 · 출석 등록" [level=2]
  - button "닫기": ×
  - text: 멤버
  - combobox "멤버"
  - text: 클래스
  - combobox "클래스"
  - alert: 정원이 찼거나 이미 예약한 클래스예요
  - button "취소"
  - button "저장하기"
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import {spawn} from 'node:child_process';
  3  | import {mkdtemp,rm,mkdir} from 'node:fs/promises';
  4  | import {tmpdir} from 'node:os';
  5  | import {join} from 'node:path';
  6  | import {readFileSync} from 'node:fs';
  7  | const profiles=[JSON.parse(readFileSync('src/config.json','utf8'))];
  8  | for(const profile of profiles) test(profile.id+' desktop, mobile and writable workflow',async({browser})=>{
  9  |  const dir=await mkdtemp(join(tmpdir(),'academy-ui-'));let child;
  10 |  try {
  11 |   const env={...process.env,PORT:'4319',APP_PASSWORD:'browser-verification-only',DATABASE_FILE:join(dir,'app.sqlite')};delete env.TURSO_DATABASE_URL;delete env.DATABASE_URL;delete env.READ_ONLY;delete env.PUBLIC_DEMO;
  12 |   child=spawn(process.execPath,['--experimental-strip-types','src/server.ts'],{cwd:process.cwd(),env,stdio:['ignore','pipe','pipe']});
  13 |   await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Server timeout')),10000);child.once('exit',code=>{clearTimeout(timer);reject(Error('Server exited '+code));});child.stdout.on('data',chunk=>{if(String(chunk).includes('Academy listening')){clearTimeout(timer);resolve();}});});
  14 |   const context=await browser.newContext({httpCredentials:{username:'admin',password:'browser-verification-only'},viewport:{width:1440,height:1000}}),page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  15 |   await page.goto('http://127.0.0.1:4319');await expect(page.locator('h1')).toHaveText(profile.tagline);await expect(page.locator('.metric')).toHaveCount(4);
  16 |   await mkdir(join(tmpdir(),'onhi-preview'),{recursive:true});await page.screenshot({path:join(tmpdir(),'onhi-preview',profile.slug+'-desktop.png'),fullPage:true});
  17 |   for(const [id,e]of Object.entries(profile.entities)){await page.locator(`nav button[data-feature="${id}"]`).click();await expect(page.locator('.section-heading h2')).toHaveText(e.label);await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');}
  18 |   await page.locator('nav button[data-feature="Student"]').click();await page.getByRole('button',{name:'+ 새로 등록'}).click();await page.getByLabel('이름',{exact:true}).fill('브라우저 확인');await page.getByRole('button',{name:'저장하기'}).click();await expect(page.getByRole('cell',{name:'브라우저 확인',exact:true})).toBeVisible();
  19 |   await page.getByRole('searchbox').fill('없는이름');await expect(page.locator('.empty')).toBeVisible();await page.getByRole('searchbox').fill('브라우저');await expect(page.getByRole('cell',{name:'브라우저 확인',exact:true})).toBeVisible();
  20 |   for(const [id,entity] of Object.entries(profile.entities).filter(([,e])=>e.fields.some(f=>f.relation))){
  21 |    await page.locator(`nav button[data-feature="${id}"]`).click();await expect(page.locator('.section-heading h2')).toHaveText(entity.label);await page.getByRole('button',{name:'+ 새로 등록'}).click();await expect(page.locator('#editor')).toBeVisible();
  22 |    for(const field of entity.fields.filter(f=>!f.readOnly)){
  23 |     const input=page.locator('#form-fields [name="'+field.name+'"]');
  24 |     if(field.relation==='Student')await input.selectOption({label:'김하늘'});
  25 |     else if(field.relation)await input.selectOption({index:1});
  26 |     else if(field.type==='number')await input.fill('1');
  27 |     else if(field.type==='date')await input.fill('2026-10-11');
  28 |     else if(field.type==='time')await input.fill('15:00');
  29 |     else if(field.type!=='url')await input.fill('브라우저 '+field.label);
  30 |    }
> 31 |    await page.getByRole('button',{name:'저장하기'}).click();await expect(page.locator('#editor')).not.toBeVisible();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');
     |                                                                                                   ^ Error: expect(locator).not.toBeVisible() failed
  32 |   }
  33 |   await page.locator('nav button[data-feature="overview"]').click();await page.setViewportSize({width:390,height:844});await expect(page.locator('h1')).toHaveText(profile.tagline);await page.screenshot({path:join(tmpdir(),'onhi-preview',profile.slug+'-mobile.png'),fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);await context.close();
  34 |  }finally{if(child&&child.exitCode===null){child.kill('SIGTERM');await new Promise(resolve=>child.once('exit',resolve));}await rm(dir,{recursive:true,force:true});}
  35 | });
  36 | 
```