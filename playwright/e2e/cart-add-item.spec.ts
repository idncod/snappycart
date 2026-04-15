import { test, expect } from '@playwright/test';

test.describe('add item to cart', () => {
      test.beforeEach(async ({ page }) => {
            await page.goto('/');
      });

      test('adds an item and shows it in the drawer', async ({ page }) => {
            
            const addButtonApple = page.locator(`article:has-text("Apple")`).getByRole('button', { name: /add to cart/i })
            await addButtonApple.first().click();

            const badge = page.locator('.snappycart-cart-icon__badge');
            await expect(badge).toHaveText('1');

            await page.getByLabel('Open cart').click();

            const drawer = page.getByRole('dialog');
            await expect(drawer).toBeVisible();

            await expect(page.locator('.snappycart-item-name')).toHaveText(/apple/i);

      })
})