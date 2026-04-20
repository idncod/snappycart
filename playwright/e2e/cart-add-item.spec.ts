import { test, expect } from '@playwright/test';

test.describe('add item to cart', () => {
      
      test.beforeEach(async ({ page }) => {
            await page.goto('/');
      });

      test('adds an item and shows it in the drawer', async ({ page }) => {
            
            const addButtonApple = page.locator(`article:has-text("Apple")`).getByRole('button', { name: /add to cart/i })
            await addButtonApple.first().click();

            const badge = page.locator('[data-testid="cart-badge"]');;
            await expect(badge).toHaveText('1');

            await page.locator('[data-testid="cart-icon"]').click();

            const drawer = page.locator('[data-testid="cart-drawer"]');
            await expect(drawer).toBeVisible();

            await expect(page.locator('.snappycart-item-name')).toHaveText(/apple/i);

      })
})