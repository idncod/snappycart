import { test, expect } from '@playwright/test';

    test.describe('CartDrawer subtotal', () => {

      test.beforeEach(async ({ page }) => {
            await page.goto('/');
      });

      test('After adding one item subtotal in the cart drawer is visible and correct', async ({ page }) => {
            
            const itemPriceLocator = page.locator('article:has-text("Apple")').getByText('£');
            const itemPriceText = await itemPriceLocator.innerText()
            const itemPrice = parseFloat(itemPriceText.replace('£', '').trim());

            const addButtonApple = page.locator(`article:has-text("Apple")`).getByRole('button', { name: /add to cart/i })
            await addButtonApple.first().click();

            await page.locator('[data-testid="cart-icon"]').click();

            const subtotalAmountLocator = page.locator('[data-testid="cart-subtotal"]');
            await expect(subtotalAmountLocator).toBeVisible();

            const subtotalAmountText = await subtotalAmountLocator.innerText()
            const subtotalAmount = parseFloat(subtotalAmountText.replace('£', '').trim());

            await expect(itemPrice).toEqual(subtotalAmount)

      })

})   