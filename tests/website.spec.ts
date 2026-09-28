import { test, expect } from '@playwright/test';

const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
for (const width of widths) {
  test(`Página íntegra e sem overflow em ${width}px`, async ({ page }) => {
    const issues: string[] = [];
    page.on('pageerror', error => issues.push(error.message));
    page.on('response', response => { if (response.status() >= 400) issues.push(`${response.status()} ${response.url()}`); });
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('SEU ESPAÇO.SUA EVOLUÇÃO.');
    for (const id of ['inicio', 'espaco', 'modalidades', 'galeria', 'horarios', 'planos', 'contato']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow na seção ${id}`).toBe(true);
    }
    await page.locator('.footer').scrollIntoViewIfNeeded();
    const internalLinks = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
    for (const href of new Set(internalLinks)) expect(await page.locator(href!).count(), `âncora ${href}`).toBe(1);
    const brokenImages = await page.locator('img').evaluateAll(imgs => imgs.filter(img => img.complete && !img.naturalWidth).map(img => img.src));
    expect(brokenImages).toEqual([]);
    expect(issues).toEqual([]);
  });
}

test('Dados comerciais e destinos oficiais', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.plan-card')).toHaveCount(3);
  for (const [name, price, duration, monthly] of [['TRIMESTRAL', '285', '3', '95'], ['SEMESTRAL', '540', '6', '90'], ['ANUAL', '960', '12', '80']]) {
    const card = page.locator('.plan-card').filter({ hasText: name });
    await expect(card.locator('.plan-price')).toContainText(price);
    await expect(card.locator('.plan-period')).toHaveText(`/ ${duration} meses`);
    await expect(card.locator('.plan-equivalence strong')).toHaveText(`R$ ${monthly},00/mês`);
  }
  await expect(page.locator('.installment')).toContainText('até 12x sem juros');
  await expect(page.locator('.schedule-times')).toHaveText(/Segunda a sexta05h ÀS 23hSábado09h ÀS 17hDomingo09h ÀS 13h/);
  await expect(page.locator('address')).toContainText('Rua Padre Lourenço, nº 1292');
  const links = await page.locator('a[href*="wa.me"]').evaluateAll(elements => elements.map(el => (el as HTMLAnchorElement).href));
  expect(links.length).toBeGreaterThan(10);
  for (const link of links) {
    const url = new URL(link);
    expect(url.origin + url.pathname).toBe('https://wa.me/5575991874944');
    expect(url.searchParams.get('text')).toContain('Academia Espaço Fitness');
  }
  await expect(page.locator('.contact-details a[href*="instagram"]')).toHaveAttribute('href', 'https://www.instagram.com/academiaespacofitn/');
  await expect(page.locator('.modality-card')).toHaveCount(6);
  expect(await page.locator('body').innerText()).not.toMatch(/mais vendido|mais escolhido|últimas vagas|plano mensal|99,90|89,90|79,90/i);
});

test('Menu mobile: foco, Escape, teclado, navegação e scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Abrir menu' });
  await trigger.click();
  const menu = page.getByRole('dialog');
  await expect(menu).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    expect(await menu.evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await trigger.click();
  await menu.getByRole('link', { name: /Planos/ }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#planos$/);
  await expect(page.locator('#planos')).toBeFocused();
  await trigger.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(menu).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('Scroll storytelling, header e navegação das modalidades', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const initialTransform = await page.locator('.hero-frame').evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo({ top: 760, behavior: 'instant' }));
  await page.waitForTimeout(250);
  expect(await page.locator('.hero-frame').evaluate(el => getComputedStyle(el).transform)).not.toBe(initialTransform);
  await expect(page.locator('.header')).toHaveClass(/header--scrolled/);
  expect(await page.locator('.story-copy').evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(.8);
  expect(await page.locator('.hero-content').evaluate(el => (el as HTMLElement).inert)).toBe(true);
  await page.locator('#modalidades').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Próximas modalidades' }).click();
  await expect.poll(() => page.locator('.modality-track').evaluate(el => el.scrollLeft)).toBeGreaterThan(100);
  await page.getByRole('button', { name: 'Modalidades anteriores' }).click();
  await expect.poll(() => page.locator('.modality-track').evaluate(el => el.scrollLeft)).toBeLessThan(5);
});

test('Reduced motion preserva conteúdo e remove parallax', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.hero-frame').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  for (const el of await page.locator('[data-reveal]').all()) expect(await el.evaluate(node => getComputedStyle(node).opacity)).toBe('1');
  await page.locator('#contato').scrollIntoViewIfNeeded();
  expect(await page.locator('.final-photo').evaluate(el => getComputedStyle(el).transform)).toBe('none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveClass(/motion-ready/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).not.toHaveClass(/motion-ready/);
});

test('Capturas de revisão desktop e mobile', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  for (const [label, width, height] of [['desktop', 1440, 1000], ['tablet', 768, 1024], ['mobile', 390, 844]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({ path: testInfo.outputPath(`${label}-hero.png`) });
    await page.evaluate(() => { const story = document.querySelector<HTMLElement>('.hero-story')!; const sticky = document.querySelector<HTMLElement>('.hero-sticky')!; window.scrollTo({ top: (story.offsetHeight - sticky.offsetHeight) * .95, behavior: 'instant' }); });
    await page.waitForTimeout(300);
    await page.screenshot({ path: testInfo.outputPath(`${label}-transition.png`) });
    for (const id of ['espaco', 'modalidades', 'galeria', 'horarios', 'planos', 'contato']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(950);
      for (const item of await page.locator(`#${id} [data-reveal]`).all()) {
        await item.scrollIntoViewIfNeeded();
        await page.waitForTimeout(100);
      }
      await page.waitForTimeout(950);
      await page.locator(`#${id}`).screenshot({ path: testInfo.outputPath(`${label}-${id}.png`), style: '.header, .skip-link { visibility: hidden; }' });
    }
    await page.locator('.final-cta').screenshot({ path: testInfo.outputPath(`${label}-cta.png`), style: '.header, .skip-link { visibility: hidden; }' });
    await page.locator('.footer').screenshot({ path: testInfo.outputPath(`${label}-footer.png`), style: '.header, .skip-link { visibility: hidden; }' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: testInfo.outputPath(`${label}-full.png`), fullPage: true });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  }
});
