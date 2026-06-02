import{test, expect} from '@playwright/test';

test('remove item from cart', async ({page}) => {
    await page.goto('/');
    const add2Bananas = page.locator('[data-cy = "add-2-bananas"]');
    const openCart = page.getByTestId('open-cart-button');
    const removeButton = page.locator('.snappycart-remove-button');;
    const cartEmptyText = page.locator('.snappycart-empty');
    const subtotalAmount = page.locator('.snappycart-row span:nth-child(2)');

    await add2Bananas.click();
    await openCart.click();
    await removeButton.click();
    await expect(cartEmptyText).toBeVisible();
    await expect(subtotalAmount).toHaveText('£0.00');



})