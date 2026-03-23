---
title: Cart testing plan
---

# Cart testing plan

This page defines the recommended automated testing plan for SnappyCart.

The goal is not to inflate the suite with random checks. The goal is to protect the cart contract, the main UI behaviour, and the published package surface with a practical number of tests that contributors can keep healthy over time.

## Why this plan exists

SnappyCart is not a full online store. It is a reusable cart library.

That changes the testing strategy.

The highest value tests are the ones that verify:

- cart state transitions
- the public provider and hook contract
- the optional UI building blocks
- the built package as consumed by another app

We do **not** need a huge end-to-end suite for checkout, shipping, payment, or catalogue logic because those are outside the scope of this package.

## Current scope

This plan is based on the current SnappyCart architecture:

- reducer-driven cart state
- `CartProvider`
- `useCart`
- `CartDrawer`
- `CartIcon`
- published package exports, including styles

## Recommended test layers

We split coverage into five layers.

### 1. Reducer unit tests

Purpose:

- verify business logic quickly
- catch regressions before UI tests even run
- keep the biggest confidence at the cheapest layer

Recommended tool:

- Vitest

### 2. Provider and hook integration tests

Purpose:

- verify the public React contract that consumers actually use
- validate derived values such as item count and subtotal
- ensure the guard error is thrown when the hook is used outside the provider

Recommended tool:

- Vitest with React Testing Library

### 3. Component tests

Purpose:

- verify visible behaviour of `CartDrawer` and `CartIcon`
- assert real interaction in a browser environment
- keep selectors stable and behaviour-focused

Recommended tools:

- Cypress Component Testing
- or Playwright Component Testing if the project standard moves there later

### 4. Package smoke tests

Purpose:

- verify the built package, not only raw source files
- ensure exports and styles can be imported by a consumer app
- catch packaging mistakes before publish

### 5. Optional demo end-to-end smoke

Purpose:

- validate the happy path in a demo or example app
- confirm that the top-level add, update, remove, and clear flow still works

This layer should stay intentionally small.

## Recommended number of tests

### Mandatory suite

| Area | Test type | Count | Priority |
| --- | --- | ---: | --- |
| Cart reducer | Unit | 15 | P0 |
| Cart provider and hook | Integration | 6 | P0 |
| CartDrawer | Component | 16 | P0 |
| CartIcon | Component | 5 | P1 |
| Package smoke | Smoke | 4 | P0 |
| **Total mandatory** |  | **46** |  |

### Optional extension

| Area | Test type | Count | Priority |
| --- | --- | ---: | --- |
| Demo cart flow | End-to-end smoke | 4 | P2 |
| **Total with optional smoke** |  | **50** |  |

## Detailed inventory

### Cart reducer

Target: **15 tests**

- add new item
- add existing item and merge quantity
- add item with invalid quantity and normalise it
- add item with decimal quantity and floor it
- remove item
- increment item
- decrement item above one
- decrement item from one and remove the line
- set positive quantity
- set decimal quantity and floor it
- set quantity to zero and remove the line
- set negative quantity and remove the line
- clear cart
- calculate total items
- calculate subtotal

### CartProvider and useCart

Target: **6 tests**

- throws outside provider
- exposes empty initial state
- add item updates `items`, `totalItems`, and `subtotal`
- remove item updates derived values
- increment and decrement update derived values
- clear resets state

### CartDrawer

Target: **16 tests**

- does not render when closed
- renders when open
- shows title and item count
- shows empty state when there are no items
- close button calls `onClose`
- overlay click calls `onClose`
- Escape calls `onClose`
- close button receives focus on open
- renders item name
- renders item price with default formatter
- renders item price with custom formatter
- renders image when available
- renders placeholder when image is missing
- increment button updates quantity
- decrement button updates quantity or removes the item
- clear cart is visible only when items exist and clears the cart

### CartIcon

Target: **5 tests**

- renders total items badge
- fires `onClick`
- uses default position class
- uses top-right position class
- uses inline position class

### Package smoke

Target: **4 tests**

- built package exports can be imported
- `styles.css` can be imported
- consumer fixture app can mount `CartProvider`
- basic add-to-cart flow works from the built package

### Optional demo smoke

Target: **4 tests**

- add item
- increase and decrease quantity
- remove item
- clear cart

## Entry criteria

The cart testing work is ready to start when:

- the current cart API is stable enough for the sprint
- the package builds locally
- the current drawer and icon props are not actively being redesigned
- the contributor knows which layer the change belongs to

## Exit criteria

The cart is ready for release when:

- all 46 mandatory tests pass
- no P0 or P1 cart defects remain open
- package smoke passes against the built artifact
- CI passes on the main branch
- optional demo smoke passes when the demo app is part of the release check

## Execution order

### Phase 1

- reducer unit tests
- provider and hook integration tests

### Phase 2

- `CartDrawer` component tests
- `CartIcon` component tests

### Phase 3

- package smoke tests against a built artifact

### Phase 4

- optional demo end-to-end smoke

## CI recommendation

### Pull requests

Run:

- install
- lint
- typecheck
- build
- reducer and integration tests
- component tests
- package smoke

### Main branch and release validation

Run:

- everything from pull requests
- cross-browser component run if supported
- optional demo smoke

## Practical rules for contributors

- one bug fix should ship with at least one test
- one behavioural change should update the relevant layer, not three different layers by default
- prefer stable selectors such as `data-cy`
- test behaviour, not implementation details
- keep the end-to-end layer tiny

## Summary

SnappyCart does not need a bloated QA suite.

For the current architecture, **46 mandatory automated tests** is the right baseline. If the demo app is also part of release confidence, add **4 optional smoke tests** and bring the total to **50**.

That gives the project broad coverage without turning maintenance into a tax.
