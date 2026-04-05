import { test, expect } from '@playwright/test';

test('should open and close cart drawer', async ({ page }) => {
  await page.goto('/');

  const drawer = page.getByRole('dialog');
  const openButton =  page.locator('button:has-text("Open drawer")').first();
  const closeButton = page.getByRole('button', { name: 'Close cart' });
  await expect(drawer).toBeHidden();
  await openButton.click();
  await expect(drawer).toBeVisible();

  await closeButton.click();
  await expect(drawer).toBeHidden();
});