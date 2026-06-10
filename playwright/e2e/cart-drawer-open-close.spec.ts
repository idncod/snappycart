import { test, expect } from '@playwright/test';

test('should open and close cart drawer', async ({ page }) => {
  await page.goto('/');

  const drawer = page.getByTestId('cart-drawer');
  const drawerTitle = page.getByTestId('cart-drawer-title');
  const openDrawerButton =  page.locator('[data-cy="open-drawer"]');
  const closeButton = page.getByTestId('cart-close');

  await expect(drawer).toBeHidden();
  await openDrawerButton.click();
  
  await expect(drawer).toBeVisible();
  await expect(drawerTitle).toBeVisible();
  await closeButton.click();
  await expect(drawer).toBeHidden();
});