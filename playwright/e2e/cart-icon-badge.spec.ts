import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});



test('CartIcon shows 0 when cart is empty', async ({ page }) => {
  const badge = page.locator('.snappycart-cart-icon__badge');
  await expect(badge).toHaveText('0');
});



test('CartIcon updates badge when items are added from outside the drawer', async ({ page }) => {
  await page.getByRole('button', { name: /add to cart/i }).first().click();

  const badge = page.locator('.snappycart-cart-icon__badge');
  await expect(badge).toHaveText('1');
});



test('CartIcon opens the cart drawer when clicked', async ({ page }) => {
  await page.locator('button.snappycart-cart-icon').click();

  const drawer = page.getByRole('dialog');
  await expect(drawer).toBeVisible();
});



test('CartIcon increments badge when multiple items are added from outside the drawer', async ({ page }) => {
  const addButton = page.getByRole('button', { name: /add to cart/i });

  await addButton.first().click();
  await addButton.first().click();
  await addButton.first().click();

  const badge = page.locator('.snappycart-cart-icon__badge');
  await expect(badge).toHaveText('3');
});



test('CartIcon badge counts items from different products', async ({ page }) => {
  const addButtons = page.getByRole('button', { name: /add to cart/i });

  await addButtons.nth(0).click();
  await addButtons.nth(1).click();
  await addButtons.nth(2).click();

  const badge = page.locator('.snappycart-cart-icon__badge');
  await expect(badge).toHaveText('3');
});



test('CartIcon badge decreases when item is removed from cart', async ({ page }) => {
  const addButtons = page.getByRole('button', { name: /add to cart/i });

  await addButtons.nth(0).click();
  await addButtons.nth(1).click();

  await page.locator('button.snappycart-cart-icon').click();

  const drawer = page.getByRole('dialog');
  await expect(drawer).toBeVisible();

  const removeButton = drawer.getByRole('button', { name: /remove/i }).first();
  await removeButton.click();

  const closeButton = drawer.getByRole('button', { name: /close cart/i });
  await closeButton.click();

  const badge = page.locator('.snappycart-cart-icon__badge');
  await expect(badge).toHaveText('1');
});



test.only('CartIcon badge decreases when quantity of the same item decreases', async ({ page }) => {
  const addButtons = page.getByRole('button', { name: /add to cart/i });
  await addButtons.nth(0).click();
  await addButtons.nth(0).click();

  await page.locator('button.snappycart-cart-icon').click();

  const drawer = page.getByRole('dialog');
  await expect(drawer).toBeVisible();

  const qtyValue = drawer.locator('.snappycart-qty-value').first();
  await expect(qtyValue).toHaveText('2');

  const decreaseBtn = drawer.getByRole('button', { name: /decrease quantity/i }).first();
  await decreaseBtn.click();

  await expect(qtyValue).toHaveText('1')

  const closeButton = drawer.getByRole('button', { name: /close cart/i });
  await closeButton.click();

  const badge = page.locator('.snappycart-cart-icon__badge');
  await expect(badge).toHaveText('1');
});

