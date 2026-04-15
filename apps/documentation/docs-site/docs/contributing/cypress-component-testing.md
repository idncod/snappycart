---
title: Cypress Component Testing
sidebar_position: 10
---

# Cypress Component Testing

## What we are testing

Snappycart is a UI package. Cypress Component Testing gives us the fastest feedback loop for browser-rendered behaviour without needing to run full end-to-end flows.

This page covers component-level behaviour for Snappycart UI pieces and their mounted integration shape. It does **not** replace unit tests for reducers or hooks, and it does **not** replace end-to-end coverage in the demo app.

For the full test inventory and the recommended number of tests across all layers, read the [Cart testing plan](/docs/contributing/cart-testing-plan).

## Scope of Cypress Component Testing

Cypress CT is the right place for:

- rendered UI behaviour
- component interaction in a real browser DOM
- focus management
- keyboard and pointer interaction
- state transitions visible through mounted components
- provider-backed component integration when a component depends on cart context

Cypress CT is **not** the main place for:

- reducer-only logic
- hook guard behaviour in isolation
- full app routing or full storefront journeys

Those belong in unit tests or end-to-end tests.

## Where component tests live

Component tests should live **next to the component they cover**, not in a central `cypress/component` folder.

Use co-located spec files such as:

```txt
packages/snappycart/src/cart/components/CartDrawer.cy.tsx
packages/snappycart/src/cart/components/CartIcon/CartIcon.cy.tsx
packages/snappycart/src/cart/components/CartIntegration.cy.tsx
```

## Selector contract

We use `data-cy` as a stable test contract. Do not rely on CSS classes for component tests.

Core selectors:

- `cart-icon`
- `cart-badge`
- `cart-drawer`
- `cart-overlay`
- `cart-drawer-title`
- `cart-close`
- `cart-empty`
- `cart-subtotal`
- `cart-clear`

Per-item selectors:

- `cart-item-<id>`
- `cart-inc-<id>`
- `cart-dec-<id>`
- `cart-qty-value-<id>`
- `cart-remove-<id>`

If a new visible cart interaction is introduced, add a stable `data-cy` selector as part of the same change.

## Starter spec

Start with a co-located file:

```txt
packages/snappycart/src/cart/components/CartDrawer.cy.tsx
```

```tsx
import CartDrawer from './CartDrawer';
import { CartProvider } from '../context/CartProvider';

const sel = (id: string) => `[data-cy="${id}"]`;

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

describe('CartDrawer (CT)', () => {
  it('does not render when closed', () => {
    mountDrawer({ open: false });
    cy.get('body').find(sel('cart-drawer')).should('not.exist');
  });

  it('renders empty state when there are no items', () => {
    mountDrawer({ open: true });

    cy.get(sel('cart-drawer-title')).should('be.visible');
    cy.get(sel('cart-drawer-title')).should('contain', '(0)');
    cy.get(sel('cart-empty')).should('be.visible');
  });

  it('focuses the Close button on open', () => {
    mountDrawer({ open: true });

    cy.get(sel('cart-close')).should('be.focused');
  });

  it('calls onClose when pressing Escape', () => {
    const onClose = cy.stub().as('onClose');
    mountDrawer({ open: true, onClose });

    cy.get(sel('cart-close')).should('be.focused');
    cy.window().trigger('keydown', { key: 'Escape' });

    cy.get('@onClose').should('have.been.calledOnce');
  });

  it('calls onClose when clicking the overlay', () => {
    const onClose = cy.stub().as('onClose');
    mountDrawer({ open: true, onClose });

    cy.get(sel('cart-overlay')).click({ force: true });

    cy.get('@onClose').should('have.been.calledOnce');
  });
});
```

## Recommended harness pattern

Some component transitions require cart state. In those cases, mount the UI inside a small harness that wraps CartProvider and exposes a controlled way to seed or mutate the cart through public actions.

### Typical harness responsibilities:

- wrap in `CartProvider`
- render `CartIcon`
- render `CartDrawer`
- `expose one or two deterministic add-item buttons`
- `optionally manage local open state for the drawer`

This allows contributors to test real browser-visible transitions without reaching into internal implementation details.

## Component state and transition matrix

Use this table to decide what to cover in Cypress Component Testing. Each row describes a browser-visible state transition that should be validated through mounted components.

| ID | Component | Current state | Trigger / event | Expected next state | What to assert in CT |
| --- | --- | --- | --- | --- | --- |
| <span id="ct-01">CT-01</span> | CartDrawer | Drawer closed, cart empty | Mount with `open={false}` | Drawer remains absent from DOM | `cart-drawer` does not exist |
| <span id="ct-02">CT-02</span> | CartDrawer | Drawer open, cart empty | Mount with `open={true}` | Empty state is shown | `cart-empty` visible, title shows `(0)` |
| <span id="ct-03">CT-03</span> | CartDrawer | Drawer open, cart empty | Initial render | Close button receives focus | `cart-close` is focused |
| <span id="ct-04">CT-04</span> | CartDrawer | Drawer open | Press `Escape` | Drawer requests close | `onClose` called |
| <span id="ct-05">CT-05</span> | CartDrawer | Drawer open | Click overlay | Drawer requests close | `onClose` called |
| <span id="ct-06">CT-06</span> | CartIcon | Empty cart | Mount inside provider | Badge shows empty or zero state according to spec | `cart-badge` matches expected empty behaviour |
| <span id="ct-07">CT-07</span> | CartIcon | Cart has 1 item | Seed one item through harness | Badge updates to `1` | `cart-badge` contains `1` |
| <span id="ct-08">CT-08</span> | CartIcon | Cart has multiple items | Seed multiple quantities or items | Badge reflects total item count | `cart-badge` contains expected total |
| <span id="ct-09">CT-09</span> | CartIcon + CartDrawer | Drawer closed, cart empty | Click cart icon | Drawer opens in empty state | `cart-drawer` visible and `cart-empty` visible |
| <span id="ct-10">CT-10</span> | CartIcon + CartDrawer + CartProvider | Empty cart, drawer closed | Add first item through harness | Cart becomes non-empty | Badge updates and title count updates when opened |
| <span id="ct-11">CT-11</span> | CartDrawer + CartProvider | Drawer open, cart has 1 item with qty 1 | Open drawer after seeding first item | Populated item row is shown | `cart-item-<id>` visible and quantity is `1` |
| <span id="ct-12">CT-12</span> | CartDrawer + CartProvider | Drawer open, cart has 1 item with qty 1 | Click increment | Quantity becomes `2` | `cart-qty-value-<id>` shows `2`, subtotal updates |
| <span id="ct-13">CT-13</span> | CartDrawer + CartProvider | Drawer open, cart has 1 item with qty 2 | Click decrement | Quantity becomes `1` | `cart-qty-value-<id>` shows `1`, subtotal updates |
| <span id="ct-14">CT-14</span> | CartDrawer + CartProvider | Drawer open, cart has 1 item with qty 1 | Click decrement if decrement removes at `1` | Cart returns to empty state | Item row disappears and empty state is shown |
| <span id="ct-15">CT-15</span> | CartDrawer + CartProvider | Drawer open, cart has 1 item with qty 1 | Click remove | Item is removed | Item row disappears and empty state is shown |
| <span id="ct-16">CT-16</span> | CartDrawer + CartProvider | Drawer open, cart has multiple distinct items | Seed two different items | Multiple rows are rendered | Both rows visible and subtotal matches sum |
| <span id="ct-17">CT-17</span> | CartDrawer + CartProvider | Drawer open, cart has multiple items | Remove one item | Remaining item stays visible | Removed row absent, remaining row visible, subtotal recalculated |
| <span id="ct-18">CT-18</span> | CartDrawer + CartProvider | Drawer open, cart has one remaining item | Remove last item | Cart returns to empty state | Empty state shown and subtotal cleared or hidden according to spec |
| <span id="ct-19">CT-19</span> | CartDrawer + CartProvider | Drawer open, cart has items | Click clear button | Cart becomes empty | `cart-clear` empties cart and empty state is shown |
| <span id="ct-20">CT-20</span> | CartDrawer + CartProvider | Drawer open, subtotal visible | Increment or decrement quantity | Subtotal recalculates immediately | `cart-subtotal` updates to expected value |
| <span id="ct-21">CT-21</span> | CartDrawer + CartProvider | Drawer open after state changes | Close and reopen drawer | State remains consistent | Same items, same quantities, same subtotal |
| <span id="ct-22">CT-22</span> | CartIcon + CartDrawer + CartProvider | Cart has items, drawer closed | Click icon, then close via overlay or Escape | Drawer closes without losing cart state | Drawer hides and badge still shows current count |
| <span id="ct-23">CT-23</span> | CartDrawer + CartProvider | Cart contains visible product metadata | Seed representative product | Product content renders correctly | Expected product name or visible fields are shown |
| <span id="ct-24">CT-24</span> | CartDrawer + CartProvider | Cart has enough items for repeated interactions | Increment, decrement, remove in sequence | UI stays in sync after each transition | Count, rows, and subtotal remain correct after each step |

## How to use this matrix

When adding or reviewing a Cypress component test:

 - identify the component under test
 - identify the current state
 - identify the visible transition
 - assert the next visible browser state
 - prefer one meaningful transition per test

Every new Cypress CT contribution should map to at least one row in the matrix above.

## Coverage guidance for contributors

### Prioritise these rows first:

 - empty `CartDrawer` behaviour
 - `CartIcon` badge behaviour
 - first item added
 - quantity increase and decrease
 - remove item
 - remove last item
 - subtotal recalculation
 - icon and drawer interaction through provider-backed mounting

Avoid duplicating the same transition in multiple slightly different tests. Prefer meaningful behavioural coverage over repetitive assertions.