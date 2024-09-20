import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://galleryeet.net/');
  // await page.getByRole('combobox').selectOption('cs');
});

test('homepage', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'GallerYeet' })).toBeVisible();
});
