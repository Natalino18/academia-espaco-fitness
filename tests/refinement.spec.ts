import { test, expect } from '@playwright/test';

test('Fotografias locais, crossfade contínuo e teclado no carrossel', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.header .brand-symbol')).toHaveAttribute('src', '/images/brand/logo-oficial-192.png');
  await page.evaluate(() => {
    const story = document.querySelector<HTMLElement>('.hero-story')!;
    const sticky = document.querySelector<HTMLElement>('.hero-sticky')!;
    window.scrollTo({ top: (story.offsetHeight - sticky.offsetHeight) * .32, behavior: 'instant' });
  });
  await expect.poll(() => page.locator('.hero-academy').evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(.2);
  expect(await page.locator('.hero-academy').evaluate(el => Number(getComputedStyle(el).opacity))).toBeLessThan(.9);
  await page.evaluate(() => window.scrollTo({ top: 760, behavior: 'instant' }));
  await expect.poll(() => page.locator('.hero-academy').evaluate(el => Number(getComputedStyle(el).opacity))).toBe(1);
  await page.locator('#modalidades').scrollIntoViewIfNeeded();
  const track = page.locator('.modality-track');
  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(100);
  await page.keyboard.press('End');
  await expect(page.getByRole('button', { name: 'Próximas modalidades' })).toBeDisabled();
  await page.waitForTimeout(500);
  await page.locator('#modalidades').screenshot({ path: testInfo.outputPath('modalidades-04-06.png'), style: '.header { visibility: hidden; }' });
  await page.keyboard.press('Home');
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeLessThan(5);
  for (const card of await page.locator('.modality-card').all()) {
    await card.scrollIntoViewIfNeeded();
    const img = card.locator('img');
    await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    expect(await img.evaluate(el => new URL((el as HTMLImageElement).currentSrc).pathname)).toMatch(/^\/images\/modalidades\//);
  }
});

test('Swipe real no mobile e imagem antes do texto institucional', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  const photo = await page.locator('.about-photo').boundingBox();
  const copy = await page.locator('.about-copy').boundingBox();
  expect(photo!.y + photo!.height).toBeLessThan(copy!.y);
  const track = page.locator('.modality-track');
  await track.scrollIntoViewIfNeeded();
  const rect = await track.boundingBox();
  const cdp = await context.newCDPSession(page);
  const y = Math.max(130, Math.min(650, rect!.y + rect!.height / 2));
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 330, y }] });
  for (let x = 305; x >= 70; x -= 25) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
    await page.waitForTimeout(20);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(150);
  await page.waitForTimeout(400);
  await page.screenshot({ path: testInfo.outputPath('mobile-swipe.png') });
  await context.close();
});

test('Carregamento inicial: layout estável, sem hotlink e prioridade responsiva', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    Object.assign(window, { visualMetrics: { cls: 0, lcp: 0 } });
    const metrics = (window as unknown as { visualMetrics: { cls: number; lcp: number } }).visualMetrics;
    new PerformanceObserver(list => list.getEntries().forEach(entry => {
      const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
      if (!shift.hadRecentInput) metrics.cls += shift.value;
    })).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => list.getEntries().forEach(entry => { metrics.lcp = entry.startTime; })).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const report = await page.evaluate(() => ({
    ...(window as unknown as { visualMetrics: { cls: number; lcp: number } }).visualMetrics,
    resources: performance.getEntriesByType('resource').map(entry => ({ url: entry.name, bytes: (entry as PerformanceResourceTiming).transferSize })),
    hero: (document.querySelector('.hero-photo') as HTMLImageElement).currentSrc,
  }));
  expect(report.cls).toBeLessThan(.1);
  expect(report.hero).toContain('hero-athlete-mobile-');
  expect(report.resources.every(resource => new URL(resource.url).origin === 'http://127.0.0.1:4173')).toBe(true);
  const heroResources = report.resources.filter(resource => resource.url.includes('/hero/'));
  expect(heroResources).toHaveLength(1);
  await testInfo.attach('performance-local.json', { body: JSON.stringify(report, null, 2), contentType: 'application/json' });
});

test('Transição responde cedo, termina em pouco scroll e footer tem autoria', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const panel = page.locator('.story-copy');
  expect(await panel.evaluate(el => (el as HTMLElement).inert)).toBe(true);
  const travel = await page.locator('.hero-story').evaluate(el => (el as HTMLElement).offsetHeight - (el.querySelector('.hero-sticky') as HTMLElement).offsetHeight);
  expect(travel).toBeLessThanOrEqual(420);
  for (const top of [12, 24, 48]) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top);
    await page.waitForTimeout(60);
  }
  expect(await page.locator('.hero-frame').evaluate(el => el.getBoundingClientRect().width)).toBeLessThan(1440 * .9);
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), travel);
  await expect.poll(() => panel.evaluate(el => (el as HTMLElement).inert)).toBe(false);
  await expect(panel.getByRole('link', { name: 'Conheça nosso espaço' })).toBeVisible();
  expect(await panel.evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(8, 10, 9)');
  await panel.getByRole('link').click();
  await expect(page).toHaveURL(/#galeria$/);
  await page.locator('.footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.footer-word')).toHaveCount(0);
  const credit = page.getByRole('link', { name: 'Desenvolvido por Natalino Varela Correia' });
  await expect(credit).toHaveAttribute('href', 'https://github.com/Natalino18');
  await expect(credit).toHaveAttribute('target', '_blank');
  await expect(credit).toHaveAttribute('rel', 'noopener noreferrer');
  // Verify activation without leaving the local test for an external network dependency.
  await page.context().route('https://github.com/Natalino18', route => route.fulfill({ status: 200, body: 'GitHub destination verified' }));
  const popupPromise = page.waitForEvent('popup');
  await credit.click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  expect(popup.url()).toBe('https://github.com/Natalino18');
  await popup.close();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#espaco').scrollIntoViewIfNeeded();
  expect(await page.locator('.about-copy').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(8, 10, 9)');
  await expect(page.locator('.about-copy .button')).toBeVisible();
});

test('Grid da transição mantém alinhamento, proporção e continuidade ao reverter', async ({ page }) => {
  for (const [width, height] of [[1440, 1000], [1366, 768], [390, 844], [320, 740]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const travel = await page.locator('.hero-story').evaluate(el => (el as HTMLElement).offsetHeight - (el.querySelector('.hero-sticky') as HTMLElement).offsetHeight);
    expect(travel).toBeLessThanOrEqual(height * .28 + 1);
    for (const progress of [.1, .3, .6, 1, .6, .1, 0, 1]) {
      await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), travel * progress);
      await page.waitForTimeout(60);
      const frame = page.locator('.hero-frame');
      const picture = page.locator('.hero-academy');
      const scale = await frame.evaluate(el => { const m = new DOMMatrix(getComputedStyle(el).transform); return [m.a, m.d]; });
      const compensation = await picture.evaluate(el => { const m = new DOMMatrix(getComputedStyle(el).transform); return [m.a, m.d]; });
      expect(Math.abs(scale[0] * compensation[0] - scale[1] * compensation[1])).toBeLessThan(.0001);
      expect(await frame.evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const rects = await page.evaluate(() => ['.hero-frame', '.story-copy', '.about-photo', '.about-copy'].map(selector => {
      const rect = document.querySelector(selector)!.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, height: rect.height, width: rect.width };
    }));
    if (width > 700) {
      for (const i of [0, 2]) {
        expect(Math.abs(rects[i].top - rects[i + 1].top)).toBeLessThan(1);
        expect(Math.abs(rects[i].height - rects[i + 1].height)).toBeLessThan(1);
        expect(rects[i].width / rects[i + 1].width).toBeCloseTo(1.2, 2);
      }
    } else {
      expect(rects[0].bottom).toBeLessThan(rects[1].top);
    }
    const gap = await page.evaluate(() => document.querySelector('#espaco')!.getBoundingClientRect().top - document.querySelector('#inicio')!.getBoundingClientRect().bottom);
    expect(Math.abs(gap)).toBeLessThan(1);
  }
});
