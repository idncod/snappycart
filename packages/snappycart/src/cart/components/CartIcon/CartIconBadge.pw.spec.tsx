import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';

import { CartProvider } from '../../context/CartProvider';
import { CartIconHarness } from './CartIconHarness';
import CartIcon from './CartIcon';

test.describe('QA-029. CartIcon: badge reflects totalItems from context', () => {
  test('badge shows 0 when totalItems = 0', async ({ mount }) => {
    const component = await mount(
      <CartProvider>
        <CartIcon onClick={() => {}} />
      </CartProvider>,
    );

    const badge = component.locator('[data-testid="cart-badge"]');

    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('0');
  });

  test('badge shows correct count when totalItems > 0', async ({ mount }) => {
    const component = await mount(
      <CartProvider>
        <CartIconHarness />
      </CartProvider>,
    );

    await component.locator('[data-testid="seed-one"]').click();

    const badge = component.locator('[data-testid="cart-badge"]');

    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('badge shows correct count for multiple items', async ({ mount }) => {
    const component = await mount(
      <CartProvider>
        <CartIconHarness />
      </CartProvider>,
    );

    await component.locator('[data-testid="seed-multiple"]').click();

    const badge = component.locator('[data-testid="cart-badge"]');

    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('3'); // 1 apple + 2 bananas
  });
});
