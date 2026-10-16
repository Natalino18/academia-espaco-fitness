import { test, expect } from '@playwright/test';

test('Fundos decorativos aguardam a imagem crítica sem bloquear o Hero', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let releaseImage!: () => void;
  const imageGate = new Promise<void>(resolve => { releaseImage = resolve; });
  await page.route('**/images/hero/hero-athlete-mobile-*.webp', async route => {
    await imageGate;
    await route.continue();
  });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.hero-photo')).toBeAttached();
    await expect(page.locator('.hero-content h1')).toBeVisible();
    await expect(page.locator('.hero-photo')).toHaveAttribute('loading', 'eager');
    await expect(page.locator('.hero-photo')).toHaveAttribute('fetchpriority', 'high');
    await expect(page.locator('html')).not.toHaveClass(/hero-painted/);
    expect(await page.locator('.story-surface').evaluate(el => getComputedStyle(el, '::before').backgroundImage)).toBe('none');
    releaseImage();
    await expect(page.locator('html')).toHaveClass(/hero-painted/);
    expect(await page.locator('.story-surface').evaluate(el => getComputedStyle(el, '::before').backgroundImage)).toContain('/images/academia/academia-04.webp');
    await expect(page.locator('.hero-academy')).toHaveAttribute('fetchpriority', 'low');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('.hero-content h1')).toBeVisible();
    await expect(page.locator('html')).toHaveClass(/hero-painted/);
  } finally {
    releaseImage();
  }
});
