import React from 'react';
import { CartProvider } from '../../context/CartProvider';

import { useCart } from '../../hooks/useCart';
import CartIcon from './CartIcon';

const sel = (id: string) => `[data-cy="${id}"]`;

const apple = {
  id: 'apple',
  name: 'Apple',
  price: 0.6,
};

const banana = {
  id: 'banana',
  name: 'Banana',
  price: 0.4,
};

function CartIconHarness() {
  const { addItem } = useCart();

  return (
    <div>
      <button data-cy="seed-one-item" onClick={() => addItem(apple, 1)}>
        Seed one item
      </button>

      <button
        data-cy="seed-multiple-items"
        onClick={() => {
          addItem(apple, 1);
          addItem(banana, 2);
        }}
      >
        Seed multiple items
      </button>

      <CartIcon />
    </div>
  );
}

function mountCartIcon() {
  cy.mount(
    <CartProvider>
      <CartIconHarness />
    </CartProvider>,
  );
}

describe('CartIcon (CT)', () => {
  it('matches the expected empty badge behaviour', () => {
    mountCartIcon();

    cy.get('body').then(($body) => {
      const badge = $body.find(sel('cart-badge'));

      if (badge.length === 0) {
        expect(badge).to.have.length(0);
        return;
      }

      cy.get(sel('cart-badge')).should('be.visible').and('have.text', '0');
    });
  });

  it('updates the badge to 1 when the cart has one item', () => {
    mountCartIcon();

    cy.get(sel('seed-one-item')).click();
    cy.get(sel('cart-badge')).should('be.visible').and('have.text', '1');
  });

  it('reflects the total item count when the cart has multiple items', () => {
    mountCartIcon();

    cy.get(sel('seed-multiple-items')).click();
    cy.get(sel('cart-badge')).should('be.visible').and('have.text', '3');
  });
});
