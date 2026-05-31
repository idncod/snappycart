import CartDrawer from './CartDrawer';
import { test, expect } from '@playwright/experimental-ct-react';
import { CartProvider } from '../context/CartProvider';

//type MountFn = (component: any) => Promise<any>; //ask about the type ?? the same red mount is in .cy tests

async function mountDrawer(
  mount: MountFn,
  params?: {
    open?: boolean;
    onClose?: () => void;
    title?: string;
  },
) {
  const open = params?.open ?? true;
  const onClose = params?.onClose ?? (() => {});
  const title = params?.title ?? 'Your Cart';

  return mount(
    <CartProvider>
      <CartDrawer open={open} onClose={onClose} title={title} />
    </CartProvider>,
  );
}

test.describe('CartDrawer', () => {
  test('clicking Close triggers onClose', async ({ mount }) => {
    let closed = false;
    const component = await mountDrawer(mount, {
      open: true,
      onClose: () => {
        closed = true;
      },
    });
    await expect(component.locator('[data-testid="cart-drawer"]')).toBeVisible();
    await component.locator('[data-testid="cart-close"]').click();
    expect(closed).toBe(true);
  });

  test('CartDrawer does not render when closed', async ({ mount }) => {
    const component = await mountDrawer(mount, {
      open: false,
    });
    await expect(component.locator('[data-testid="cart-drawer"]')).not.toBeVisible();
  });
});
