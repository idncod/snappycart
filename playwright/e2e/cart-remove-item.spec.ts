import{test, expect} from '@playwright/test';

test('remove item from cart', async ({page}) => {
    await page.goto('/');
    const add2Bananas = page.locator('[data-cy="add-2-bananas"]');
    const openCart = page.getByTestId('open-cart-button'); 
    const removeButton = page.getByTestId('cart-remove-banana');
    const cartEmptyText = page.getByTestId('empty-cart-state');
    const subtotalAmount = page.getByTestId('cart-subtotal');

    await add2Bananas.click();
    await openCart.click();

    await expect(removeButton).toBeVisible();
    await removeButton.click();

    await expect(cartEmptyText).toBeVisible();
    await expect(subtotalAmount).toHaveText('£0.00');



})