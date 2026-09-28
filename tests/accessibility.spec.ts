import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [390, 768, 1440]) {
  test(`Acessibilidade WCAG em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
    if (width === 768) await page.screenshot({ path: testInfo.outputPath("tablet-hero-contrast.png") });
    if (width === 390) {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      const menuResult = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(menuResult.violations).toEqual([]);
    }
  });
}
