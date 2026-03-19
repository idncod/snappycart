import { test, expect } from '@playwright/test';

test.describe('add item to cart', () => {
      test.beforeEach(async ({ page }) => {
            await page.goto('/');
      });

      test('adds an item and shows it in the drawer', async ({ page }) => {
            await page.locator('[data-cy="add-to-cart-apple"]').click();

            await expect(page.locator('[data-cy="cart-badge"]')).toContainText('1');

            await page.locator('[data-cy="cart-icon"]').click();

            await expect(page.locator('[data-cy="cart-drawer"]')).toBeVisible();

            await expect(page.locator('[data-cy="cart-item-name-apple"]')).toContainText('Apple');
      })
})