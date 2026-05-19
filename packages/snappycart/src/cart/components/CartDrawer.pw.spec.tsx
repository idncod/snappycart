import CartDrawer from './CartDrawer';
import { test, expect } from '@playwright/experimental-ct-react';
import { CartProvider } from '../context/CartProvider';

test.describe('CartDrawer', () => {
  test('clicking Close triggers onClose', async ({ mount }) => {
    let closed = false;
    const component = await mount(
      <CartProvider>
        <CartDrawer
          open={true}
          onClose={() => {
            closed = true;
          }}
          title="Your Cart"
        />
      </CartProvider>,
    );
    await expect(component.locator('[data-cy="cart-drawer"]')).toBeVisible();
    await component.locator('[data-cy="cart-close"]').click();
    expect(closed).toBe(true);
  });

  test('CartDrawer does not render when closed', async ({ mount }) => {
    const component = await mount(
      <CartProvider>
        <CartDrawer open={false} onClose={() => {}} title="Your Cart" />
      </CartProvider>,
    );

    await expect(component.locator('[data-testid="cart-drawer"]')).not.toBeVisible();
  });
});
