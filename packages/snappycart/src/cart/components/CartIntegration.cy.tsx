import React, { useState } from 'react';
import { CartProvider } from '../context/CartProvider';
import { useCart } from '../hooks/useCart';
import CartDrawer from './CartDrawer';
import CartIcon from './CartIcon/CartIcon';

const sel = (id: string) => `[data-cy="${id}"]`;

const apple = {
  id: 'apple',
  name: 'Apple',
  price: 0.6,
};

function CartIntegrationHarness() {
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();

  return (
    <>
      <button data-cy="seed-first-item" onClick={() => addItem(apple, 1)}>
        Seed first item
      </button>

      <CartIcon onClick={() => setOpen(true)} />

      <CartDrawer open={open} onClose={() => setOpen(false)} title="Your cart" />
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
  it('CT-09 opens the empty drawer when clicking the cart icon', () => {
    mountCartIntegration();

    cy.get(sel('cart-drawer')).should('not.exist');

    cy.get(sel('cart-icon')).click();

    cy.get(sel('cart-drawer')).should('be.visible');
    cy.get(sel('cart-empty')).should('be.visible');
  });

  it('CT-10 adds the first item and updates the badge and drawer title count', () => {
    mountCartIntegration();

    cy.get(sel('seed-first-item')).click();

    cy.get(sel('cart-badge')).should('be.visible').and('have.text', '1');

    cy.get(sel('cart-icon')).click();

    cy.get(sel('cart-drawer')).should('be.visible');
    cy.get(sel('cart-drawer-title')).should('contain', '(1)');
  });

  it('CT-22 closes the drawer without losing cart state', () => {
    mountCartIntegration();

    cy.get(sel('seed-first-item')).click();
    cy.get(sel('cart-badge')).should('be.visible').and('have.text', '1');

    cy.get(sel('cart-drawer')).should('not.exist');

    cy.get(sel('cart-icon')).click();
    cy.get(sel('cart-drawer')).should('be.visible');

    cy.get('body').type('{esc}');

    cy.get(sel('cart-drawer')).should('not.exist');
    cy.get(sel('cart-badge')).should('be.visible').and('have.text', '1');
  });
});
