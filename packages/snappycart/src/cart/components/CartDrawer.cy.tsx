import React, { useState } from 'react';
import CartDrawer from './CartDrawer';
import { CartProvider } from '../context/CartProvider';
import { useCart } from '../hooks/useCart';

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

function readAmount(text: string) {
  const normalized = text.replace(',', '.');
  const matches = normalized.match(/\d+(?:\.\d{1,2})?/g);

  if (!matches || matches.length === 0) {
    throw new Error(`Could not parse amount from text: ${text}`);
  }

  return Number(matches[matches.length - 1]);
}

function getSubtotalAmount() {
  return cy.get(sel('cart-subtotal')).invoke('text').then(readAmount);
}

function mountDrawer(params?: { open?: boolean; onClose?: () => void; title?: string }) {
  const open = params?.open ?? true;
  const onClose = params?.onClose ?? (() => {});
  const title = params?.title ?? 'Your Cart';

  cy.mount(
    <CartProvider>
      <CartDrawer open={open} onClose={onClose} title={title} />
    </CartProvider>,
  );
}

function CartDrawerHarness() {
  const [open, setOpen] = useState(true);
  const { addItem } = useCart();

  return (
    <>
      <button data-cy="seed-apple" onClick={() => addItem(apple, 1)}>
        Seed apple
      </button>

      <button
        data-cy="seed-apple-twice"
        onClick={() => {
          addItem(apple, 1);
          addItem(apple, 1);
        }}
      >
        Seed apple twice
      </button>

      <button
        data-cy="seed-two-items"
        onClick={() => {
          addItem(apple, 1);
          addItem(banana, 1);
        }}
      >
        Seed two items
      </button>

      <button data-cy="open-drawer" onClick={() => setOpen(true)}>
        Open drawer
      </button>

      <button data-cy="close-drawer" onClick={() => setOpen(false)}>
        Close drawer
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} title="Your Cart" />
    </>
  );
}

function mountDrawerWithHarness() {
  cy.mount(
    <CartProvider>
      <CartDrawerHarness />
    </CartProvider>,
  );
}

describe('CartDrawer (CT)', () => {
  it('CT-01 does not render when closed', () => {
    mountDrawer({ open: false });

    cy.get('body').find(sel('cart-drawer')).should('not.exist');
  });

  it('CT-02 renders empty state when there are no items', () => {
    mountDrawer({ open: true });

    cy.get(sel('cart-drawer-title')).should('be.visible');
    cy.get(sel('cart-drawer-title')).should('contain', '(0)');
    cy.get(sel('cart-empty')).should('be.visible');
  });

  it('CT-03 focuses the Close button on open', () => {
    mountDrawer({ open: true });

    cy.get(sel('cart-close')).should('be.focused');
  });

  it('CT-04 calls onClose when pressing Escape', () => {
    const onClose = cy.stub().as('onClose');
    mountDrawer({ open: true, onClose });

    cy.get(sel('cart-close')).should('be.focused');
    cy.window().trigger('keydown', { key: 'Escape' });

    cy.get('@onClose').should('have.been.calledOnce');
  });

  it('CT-05 calls onClose when clicking the overlay', () => {
    const onClose = cy.stub().as('onClose');
    mountDrawer({ open: true, onClose });

    cy.get(sel('cart-overlay')).click({ force: true });

    cy.get('@onClose').should('have.been.calledOnce');
  });

  it('CT-11 shows a populated row after seeding the first item', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-apple')).click();

    cy.get(sel('cart-item-apple')).should('be.visible');
    cy.get(sel('cart-qty-apple')).should('have.text', '1');
  });

  it('CT-12 increments quantity from 1 to 2 and updates subtotal', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-apple')).click();

    getSubtotalAmount().then((before) => {
      cy.get(sel('cart-inc-apple')).click();

      cy.get(sel('cart-qty-apple')).should('have.text', '2');

      getSubtotalAmount().then((after) => {
        expect(after).to.be.closeTo(before + apple.price, 0.01);
      });
    });
  });

  it('CT-13 decrements quantity from 2 to 1 and updates subtotal', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-apple-twice')).click();

    getSubtotalAmount().then((before) => {
      cy.get(sel('cart-dec-apple')).click();

      cy.get(sel('cart-qty-apple')).should('have.text', '1');

      getSubtotalAmount().then((after) => {
        expect(after).to.be.closeTo(before - apple.price, 0.01);
      });
    });
  });

  it('CT-14 removes the item when decrementing at quantity 1', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-apple')).click();
    cy.get(sel('cart-dec-apple')).click();

    cy.get(sel('cart-item-apple')).should('not.exist');
    cy.get(sel('cart-empty')).should('be.visible');
  });

  it('CT-15 removes the item when clicking remove', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-apple')).click();
    cy.get(sel('cart-remove-apple')).click();

    cy.get(sel('cart-item-apple')).should('not.exist');
    cy.get(sel('cart-empty')).should('be.visible');
  });

  it('CT-16 renders multiple rows for distinct items and shows the correct subtotal', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-two-items')).click();

    cy.get(sel('cart-item-apple')).should('be.visible');
    cy.get(sel('cart-item-banana')).should('be.visible');

    getSubtotalAmount().then((subtotal) => {
      expect(subtotal).to.be.closeTo(apple.price + banana.price, 0.01);
    });
  });

  it('CT-17 removes one item and keeps the remaining item visible', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-two-items')).click();
    cy.get(sel('cart-remove-banana')).click();

    cy.get(sel('cart-item-banana')).should('not.exist');
    cy.get(sel('cart-item-apple')).should('be.visible');

    getSubtotalAmount().then((subtotal) => {
      expect(subtotal).to.be.closeTo(apple.price, 0.01);
    });
  });

  it('CT-18 returns to the empty state after removing the last remaining item', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-apple')).click();
    cy.get(sel('cart-remove-apple')).click();

    cy.get(sel('cart-empty')).should('be.visible');

    cy.get('body').then(($body) => {
      const subtotal = $body.find(sel('cart-subtotal'));

      if (subtotal.length > 0) {
        expect(readAmount(subtotal.text())).to.eq(0);
      }
    });
  });

  it('CT-19 clears the cart when clicking the clear action', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-two-items')).click();
    cy.get(sel('cart-clear')).click();

    cy.get(sel('cart-empty')).should('be.visible');
    cy.get(sel('cart-item-apple')).should('not.exist');
    cy.get(sel('cart-item-banana')).should('not.exist');
  });

  it('CT-20 recalculates subtotal immediately on increment and decrement', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-apple')).click();

    getSubtotalAmount().then((initial) => {
      cy.get(sel('cart-inc-apple')).click();

      getSubtotalAmount().then((afterIncrement) => {
        expect(afterIncrement).to.be.closeTo(initial + apple.price, 0.01);

        cy.get(sel('cart-dec-apple')).click();

        getSubtotalAmount().then((afterDecrement) => {
          expect(afterDecrement).to.be.closeTo(initial, 0.01);
        });
      });
    });
  });

  it('CT-21 keeps the same items, quantities, and subtotal after closing and reopening', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-two-items')).click();

    getSubtotalAmount().then((before) => {
      cy.get(sel('cart-qty-apple')).should('have.text', '1');
      cy.get(sel('cart-qty-banana')).should('have.text', '1');

      cy.get(sel('close-drawer')).click();
      cy.get('body').find(sel('cart-drawer')).should('not.exist');

      cy.get(sel('open-drawer')).click();

      cy.get(sel('cart-drawer')).should('be.visible');
      cy.get(sel('cart-item-apple')).should('be.visible');
      cy.get(sel('cart-item-banana')).should('be.visible');
      cy.get(sel('cart-qty-apple')).should('have.text', '1');
      cy.get(sel('cart-qty-banana')).should('have.text', '1');

      getSubtotalAmount().then((after) => {
        expect(after).to.be.closeTo(before, 0.01);
      });
    });
  });

  it('CT-23 renders visible product metadata for a representative product', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-apple')).click();

    cy.get(sel('cart-item-apple')).should('be.visible');
    cy.get(sel('cart-item-apple')).should('contain', 'Apple');
  });

  it('CT-24 keeps the UI in sync across increment, decrement, and remove actions', () => {
    mountDrawerWithHarness();

    cy.get(sel('seed-two-items')).click();

    cy.get(sel('cart-item-apple')).should('be.visible');
    cy.get(sel('cart-item-banana')).should('be.visible');
    cy.get(sel('cart-qty-apple')).should('have.text', '1');
    cy.get(sel('cart-qty-banana')).should('have.text', '1');

    getSubtotalAmount().then((initial) => {
      expect(initial).to.be.closeTo(apple.price + banana.price, 0.01);
    });

    cy.get(sel('cart-inc-apple')).click();
    cy.get(sel('cart-qty-apple')).should('have.text', '2');

    getSubtotalAmount().then((afterIncrement) => {
      expect(afterIncrement).to.be.closeTo(apple.price * 2 + banana.price, 0.01);
    });

    cy.get(sel('cart-dec-apple')).click();
    cy.get(sel('cart-qty-apple')).should('have.text', '1');

    getSubtotalAmount().then((afterDecrement) => {
      expect(afterDecrement).to.be.closeTo(apple.price + banana.price, 0.01);
    });

    cy.get(sel('cart-remove-banana')).click();

    cy.get(sel('cart-item-banana')).should('not.exist');
    cy.get(sel('cart-item-apple')).should('be.visible');
    cy.get(sel('cart-qty-apple')).should('have.text', '1');

    getSubtotalAmount().then((afterRemove) => {
      expect(afterRemove).to.be.closeTo(apple.price, 0.01);
    });
  });
});
