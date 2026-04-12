import { test, expect } from '@playwright/test';

test('should open and close cart drawer', async ({ page }) => {
  await page.goto('/');

  const drawer = page.getByRole('dialog');
  const drawerTitle = page.getByRole('dialog').getByRole('heading', {name: 'Your Cart'});
  const openDrawerButton =  page.locator('._miniGrid_1jydu_133').getByRole('button', { name: 'Open drawer' })
  const closeButton = page.getByRole('button', { name: 'Close cart' });
  await expect(drawer).toBeHidden();
  await openDrawerButton.click();
  await expect(drawer).toBeVisible();
  await expect(drawerTitle).toBeVisible();
  await closeButton.click();
  await expect(drawer).toBeHidden();
});