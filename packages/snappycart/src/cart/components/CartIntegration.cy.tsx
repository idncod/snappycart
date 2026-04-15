import React, { useState } from 'react';
import { CartProvider } from '../context/CartProvider';
import { useCart } from '../hooks/useCart';
import CartDrawer from './CartDrawer';
import CartIcon from './CartIcon/CartIcon';

const sel = (id: string) => `[data-cy="${id}"]`;

function CartIntegrationHarness() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <CartIcon onClick={() => setOpen(true)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} title={`Your cart (${totalItems})`} />
    </>
  );
}

function mountCartIntegration() {
  cy.mount(
    <CartProvider>
      <CartIntegrationHarness />
    </CartProvider>,
  );
}

describe('CartIcon + CartDrawer (CT)', () => {
  it('opens the empty drawer when clicking the cart icon', () => {
    mountCartIntegration();

    cy.get(sel('cart-drawer')).should('not.exist');

    cy.get(sel('cart-icon')).click();

    cy.get(sel('cart-drawer')).should('be.visible');
    cy.get(sel('cart-empty')).should('be.visible');
  });
});
