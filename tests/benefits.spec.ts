import { test, expect } from '@playwright/test';
import { TOTALPASS_URL, WELLHUB_URL } from '../src/data/benefits';

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`Benefícios: layout, assets e destinos em ${width}px`, async ({ page, context }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#beneficios');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    expect(await page.locator('#planos').evaluate(el => el.nextElementSibling?.id)).toBe('beneficios');
    expect(await section.evaluate(el => el.nextElementSibling?.id)).toBe('horarios');
    const cards = await section.locator('.benefit-card').all();
    const [first, second] = await Promise.all(cards.map(card => card.boundingBox()));
    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(Math.abs(first!.height - second!.height)).toBeLessThan(1);
    expect(first!.width).toBe(second!.width);
    if (width <= 700) expect(second!.y).toBeGreaterThan(first!.y + first!.height);
    else expect(first!.y).toBe(second!.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const img of await section.locator('img').all()) {
      await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    for (const [name, url] of [['TotalPass', TOTALPASS_URL], ['Wellhub', WELLHUB_URL]]) {
      const link = section.getByRole('link', { name: new RegExp(name) });
      await expect(link).toHaveAttribute('href', url);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      // Intercept the destination so CTA behavior is deterministic and does not load third-party trackers.
      await context.route(url, route => route.fulfill({ contentType: 'text/html', body: '<title>Destino externo</title>' }));
      const popupPromise = page.waitForEvent('popup');
      await link.click();
      const popup = await popupPromise;
      await popup.waitForLoadState();
      expect(popup.url()).toBe(url);
      expect(await popup.evaluate(() => window.opener === null)).toBe(true);
      await popup.close();
    }
    expect(errors).toEqual([]);
  });
}

test('Benefícios: movimento reduzido e acesso por teclado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.plans-benefits-note a').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#beneficios$/);
  await page.keyboard.press('Tab');
  const first = page.locator('#beneficios .button').first();
  await expect(first).toBeFocused();
  expect(await first.evaluate(el => getComputedStyle(el).outlineStyle)).toBe('solid');
  for (const item of await page.locator('#beneficios [data-reveal]').all()) {
    expect(await item.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  }
  await page.locator('.benefit-card').first().hover();
  expect(await page.locator('.benefit-card').first().evaluate(el => getComputedStyle(el).transform)).toBe('none');
});
