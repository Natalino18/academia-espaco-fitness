import { test, expect } from '@playwright/test';

test('Rótulos visíveis permanecem nos nomes acessíveis para comandos de voz', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  // WCAG 2.5.3: an aria-label must not replace the words a user sees.
  for (const selector of ['.header .brand', '.scroll-cue', '.modality-card', '#beneficios .button', '.footer .brand', '.location-card']) {
    for (const link of await page.locator(selector).all()) {
      const text = (await link.innerText()).trim().replace(/\s+/g, ' ');
      const words = text.split(' ').map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      await expect(link).toHaveAccessibleName(new RegExp(words.join('\\s+'), 'i'));
    }
  }
});


test('Hero mantém os CTAs disponíveis em telas baixas e preserva o foco', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  // Scrolling by touch/mouse must not hide the initial actions before they fit.
  await page.evaluate(() => scrollTo({ top: 220, behavior: 'instant' }));
  const intro = page.locator('.hero-content');
  await expect.poll(() => intro.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  expect(await intro.evaluate(el => (el as HTMLElement).inert)).toBe(false);
  await page.locator('.hero-content .button').first().focus();
  await page.keyboard.press('Tab');
  const whatsapp = page.locator('.hero-content .button').nth(1);
  await expect(whatsapp).toBeFocused();
  await page.waitForTimeout(400);
  await expect(whatsapp).toBeFocused();
  await expect.poll(() => intro.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  await expect(whatsapp).toBeInViewport();
  // At ordinary mobile heights, the approved scroll transition still works.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => scrollTo({ top: 180, behavior: 'instant' }));
  await expect.poll(() => intro.evaluate(el => getComputedStyle(el).opacity)).toBe('0');
});
