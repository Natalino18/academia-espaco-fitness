import { test, expect } from '@playwright/test';

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`Planos temporários: preços, parcelamento e layout em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#planos');
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByRole('heading', { level: 2 })).toHaveText('ESCOLHA O PLANO IDEAL PARA VOCÊ.');
    const cards = section.locator('.plan-card');
    await expect(cards).toHaveCount(3);
    for (const [i, price, installments] of [[0, 'R$ 370,00', '3x de R$ 123,33'], [1, 'R$ 720,00', '6x de R$ 120,00'], [2, 'R$ 1.320,00', '12x de R$ 110,00']] as const) {
      await expect(cards.nth(i).locator('.plan-price')).toHaveText(price);
      await expect(cards.nth(i).locator('.temporary-installments')).toHaveText(installments);
    }
    const rects = await cards.evaluateAll(els => els.map(el => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; }));
    if (width > 700) expect(rects[0].top).toBe(rects[2].top);
    else expect(rects[1].top).toBeGreaterThan(rects[0].bottom);
    const monthly = section.locator('.temporary-monthly');
    await expect(monthly.locator('.plan-price')).toHaveText('R$ 130,00');
    await expect(monthly.getByRole('link')).toHaveAttribute('href', /wa\.me\/5575991874944.*mensal/);
    await expect(section.locator('.temporary-plan-benefits li')).toHaveCount(4);
    await expect(section.locator('.plans-benefits-note a')).toHaveAttribute('href', '#beneficios');
    expect(await section.evaluate(el => [...el.querySelectorAll<HTMLElement>('.plan-card, .temporary-monthly')].every(card => card.scrollWidth <= card.clientWidth))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await monthly.getByRole('link').focus();
    expect(await monthly.getByRole('link').evaluate(el => getComputedStyle(el).outlineStyle)).toBe('solid');
    await section.screenshot({ path: testInfo.outputPath(`plans-${width}.png`) });
  });
}
