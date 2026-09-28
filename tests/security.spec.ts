import { test, expect } from '@playwright/test';
import headers from '../config/security-headers.json' with { type: 'json' };

for (const width of [390, 1440]) {
  test(`Headers, recursos locais e navegação protegida em ${width}px`, async ({ page, context }) => {
    await page.setViewportSize({ width, height: 1000 });
    const origins = new Set<string>();
    page.on('request', request => origins.add(new URL(request.url()).origin));
    await page.addInitScript(() => {
      const violations: string[] = [];
      Object.assign(window, { securityViolations: violations });
      document.addEventListener('securitypolicyviolation', e => violations.push(e.violatedDirective));
    });
    const response = await page.goto('/?message=%3Cscript%3Ealert(1)%3C%2Fscript%3E');
    for (const [key, value] of Object.entries(headers)) expect(response?.headers()[key.toLowerCase()]).toBe(value);
    for (const selector of ['#espaco', '#modalidades', '#galeria', '#horarios', '#planos', '.final-cta', '#contato', '.footer']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
    }
    await page.locator('.about-copy .button').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const url = page.url();
    await page.locator('.about-copy .button').click();
    await expect.poll(() => page.locator('#modalidades').evaluate(el => Math.abs(el.getBoundingClientRect().top - parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)))).toBeLessThan(2);
    expect(page.url()).toBe(url);
    expect(await page.evaluate(() => (window as unknown as { securityViolations: string[] }).securityViolations)).toEqual([]);
    expect([...origins]).toEqual([new URL(page.url()).origin]);
    expect(await context.cookies()).toEqual([]);
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
    expect(await page.locator('form, iframe, script:not([src])').count()).toBe(0);
    const links = await page.locator('a[target="_blank"]').evaluateAll(els => els.map(el => ({ url: (el as HTMLAnchorElement).href, rel: el.getAttribute('rel') || '' })));
    for (const link of links) {
      expect(link.url.startsWith('https://')).toBe(true);
      expect(link.rel.split(' ')).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
    }
  });
}

test('CSP bloqueia script inline injetado', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const script = document.createElement('script');
    script.textContent = 'window.auditInjected = true';
    document.body.appendChild(script);
  });
  expect(await page.evaluate(() => 'auditInjected' in window)).toBe(false);
});

test('Arquivos internos não são publicados pela raiz estática', async ({ request }) => {
  for (const path of ['/.env', '/.env.local', '/package.json', '/package-lock.json', '/vite.config.ts', '/src/main.tsx', '/.git/config']) {
    const response = await request.get(path);
    // Hosts de SPA podem retornar index.html; nunca devem entregar o arquivo interno.
    expect(response.status() === 404 || (response.headers()['content-type']?.includes('text/html') && (await response.text()).includes('<div id="root"></div>'))).toBeTruthy();
  }
});
