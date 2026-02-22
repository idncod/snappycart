---
title: Cypress Component Testing
---

## What we are testing

SnappyCart is a UI library. The fastest, least flaky way to improve quality is Cypress Component Testing: we mount a component in a real browser DOM and assert behaviour.

For CartDrawer, we start with behaviour that does not require seeding items:

- It does not render when `open=false`
- It shows the empty state when the cart is empty
- The Close button receives focus when opened
- Escape closes the drawer
- Clicking the overlay closes the drawer

## Selector contract

We use `data-cy` as a stable contract for tests. Do not select by CSS classes.

Core selectors:

- `cart-drawer`, `cart-overlay`, `cart-title`, `cart-close`
- `cart-empty`, `cart-subtotal`, `cart-clear`

Per-item selectors (when we add item-seeding later):

- `cart-item-<id>`, `cart-inc-<id>`, `cart-dec-<id>`, `cart-qty-value-<id>`, `cart-remove-<id>`

## Starter spec

Create this file:

`cypress/component/CartDrawer.cy.tsx`

```tsx
import React from 'react';
import CartDrawer from '../../src/cart/components/CartDrawer';
import { CartProvider } from '../../src/cart/context/CartProvider';

const sel = (id: string) => `[data-cy="${id}"]`;

function mountDrawer(params?: { open?: boolean; onClose?: () => void }) {
  const open = params?.open ?? true;
  const onClose = params?.onClose ?? (() => {});

  cy.mount(
    <CartProvider>
      <CartDrawer open={open} onClose={onClose} />
    </CartProvider>
  );
}

describe('CartDrawer (CT)', () => {
  it('does not render when closed', () => {
    mountDrawer({ open: false });

    cy.get('body').then(($body) => {
      expect($body.find(sel('cart-drawer'))).to.have.length(0);
    });
  });

  it('renders empty state when there are no items', () => {
    mountDrawer({ open: true });

    cy.get(sel('cart-empty')).should('be.visible');
    cy.get(sel('cart-title')).should('contain', '(0)');
  });

  it('focuses the Close button on open', () => {
    mountDrawer({ open: true });

    cy.get(sel('cart-close')).should('be.focused');
  });

  it('calls onClose when pressing Escape', () => {
    const onClose = cy.stub().as('onClose');
    mountDrawer({ open: true, onClose });

    cy.get('body').type('{esc}');
    cy.get('@onClose').should('have.been.called');
  });

  it('calls onClose when clicking the overlay', () => {
    const onClose = cy.stub().as('onClose');
    mountDrawer({ open: true, onClose });

    cy.get(sel('cart-overlay')).click({ force: true });
    cy.get('@onClose').should('have.been.called');
  });
});
```

## Running the tests

If Cypress Component Testing is already scaffolded in the repo:

```bash
npx cypress open --component
```

Headless (CI style):

```bash
npx cypress run --component --spec cypress/component/CartDrawer.cy.tsx
```

If you do not have `cy.mount` yet, run the interactive setup once. Cypress will generate the support files (including the `cy.mount` command).

## Why this is also “component integration testing”

Even though we call it a component test, we mount `CartDrawer` with `CartProvider` and the real `useCart` hook. That means we are testing interaction between UI, hooks, and state, not just a single function.

## Contribution workflow

- One issue = one test
- One PR = one focused test (plus selector additions if needed)
- Keep tests stable with `data-cy`
