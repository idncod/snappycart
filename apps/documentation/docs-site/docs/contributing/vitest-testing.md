---
title: Vitest Testing
sidebar_position: 11
---

# Vitest Testing

## What we are testing

Snappycart is a reusable cart library. Vitest gives us the cheapest and fastest confidence for internal cart logic and the public React contract before browser-level tests run.

This page covers two Vitest layers:

- reducer unit tests
- provider and hook integration tests

It does **not** replace browser-level component coverage, and it does **not** replace demo-level end-to-end coverage.

For the full inventory and recommended test counts across all layers, read the [Cart testing plan](/docs/contributing/cart-testing-plan).

## Scope of Vitest Testing

Vitest is the right place for:

- reducer-only cart logic
- quantity normalisation rules
- derived values such as total item count and subtotal
- `CartProvider` state updates
- `useCart` contract behaviour
- guard behaviour when hooks are used outside the provider

Vitest is **not** the main place for:

- browser rendering behaviour
- focus management
- overlay clicks
- keyboard interaction in the DOM
- visual component transitions

Those belong in Cypress/Playwright Component Testing or browser-level end-to-end testing.

## Where Vitest tests live

Vitest tests should live close to the source they validate.

Use files such as:

```txt
packages/snappycart/src/cart/context/cartReducer.test.ts
packages/snappycart/src/cart/context/CartProvider.test.tsx
```

## Test ID contract

We use `VT-*` as the stable test ID contract for Vitest coverage.

Examples:

* `VT-01`
* `VT-02`
* `VT-16`

This keeps Vitest coverage separate from Cypress Component Testing IDs such as `CT-01`.

## Unit test harness guidance

Reducer tests should stay focused on pure business logic.

Recommended fixture style:

```ts
const apple = {
  id: 'apple',
  name: 'Apple',
  price: 1.5,
  image: '/apple.png',
};
```

Use stable, explicit fixtures and assert one main behaviour per test.

## Vitest unit coverage matrix

Use this table to decide what belongs in reducer unit tests.

| ID                            | Area         | Level | Framework | What is covered                                 | What to assert in Vitest                                           |
| ----------------------------- | ------------ | ----- | --------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| <span id="vt-01">VT-01</span> | Cart reducer | Unit  | Vitest    | add new item                                    | New line is inserted with the expected quantity and values         |
| <span id="vt-02">VT-02</span> | Cart reducer | Unit  | Vitest    | add existing item and merge quantity            | Duplicate add increases quantity instead of creating a second line |
| <span id="vt-03">VT-03</span> | Cart reducer | Unit  | Vitest    | add item with invalid quantity and normalise it | Invalid quantity is converted to a safe stored value               |
| <span id="vt-04">VT-04</span> | Cart reducer | Unit  | Vitest    | add item with decimal quantity and floor it     | Decimal quantity is normalised before storage                      |
| <span id="vt-05">VT-05</span> | Cart reducer | Unit  | Vitest    | remove item                                     | Matching line is removed from the reducer state                    |
| <span id="vt-06">VT-06</span> | Cart reducer | Unit  | Vitest    | increment item                                  | Quantity increases by one                                          |
| <span id="vt-07">VT-07</span> | Cart reducer | Unit  | Vitest    | decrement item above one                        | Quantity decreases without removing the line                       |
| <span id="vt-08">VT-08</span> | Cart reducer | Unit  | Vitest    | decrement item from one and remove the line     | Item disappears when quantity reaches the removal boundary         |
| <span id="vt-09">VT-09</span> | Cart reducer | Unit  | Vitest    | set positive quantity                           | Quantity updates directly to the requested value                   |
| <span id="vt-10">VT-10</span> | Cart reducer | Unit  | Vitest    | set decimal quantity and floor it               | Decimal quantity is normalised before storage                      |
| <span id="vt-11">VT-11</span> | Cart reducer | Unit  | Vitest    | set quantity to zero and remove the line        | Zero quantity removes the line from state                          |
| <span id="vt-12">VT-12</span> | Cart reducer | Unit  | Vitest    | set negative quantity and remove the line       | Invalid negative quantity does not remain in state                 |
| <span id="vt-13">VT-13</span> | Cart reducer | Unit  | Vitest    | clear cart                                      | State resets to an empty cart                                      |
| <span id="vt-14">VT-14</span> | Cart reducer | Unit  | Vitest    | calculate total items                           | Derived total item count is correct                                |
| <span id="vt-15">VT-15</span> | Cart reducer | Unit  | Vitest    | calculate subtotal                              | Derived subtotal is correct                                        |

## Vitest integration coverage matrix

Use this table to decide what belongs in provider and hook integration tests.

| ID                            | Area                            | Level       | Framework | What is covered                                        | What to assert in Vitest                               |
| ----------------------------- | ------------------------------- | ----------- | --------- | ------------------------------------------------------ | ------------------------------------------------------ |
| <span id="vt-16">VT-16</span> | Cart provider and hook contract | Integration | Vitest    | throws outside provider                                | `useCart` fails when used without `CartProvider`       |
| <span id="vt-17">VT-17</span> | Cart provider and hook contract | Integration | Vitest    | exposes empty initial state                            | Empty cart contract is available on first render       |
| <span id="vt-18">VT-18</span> | Cart provider and hook contract | Integration | Vitest    | add item updates `items`, `totalItems`, and `subtotal` | Public cart state updates correctly through hook usage |
| <span id="vt-19">VT-19</span> | Cart provider and hook contract | Integration | Vitest    | remove item updates derived values                     | Removing a line updates totals correctly               |
| <span id="vt-20">VT-20</span> | Cart provider and hook contract | Integration | Vitest    | increment and decrement update derived values          | Quantity changes keep derived state in sync            |
| <span id="vt-21">VT-21</span> | Cart provider and hook contract | Integration | Vitest    | clear resets state                                     | Public cart state returns to empty after clear         |
| <span id="vt-22">VT-22</span> | Cart provider and hook contract | Integration | Vitest | add item with explicit quantity | Extra scenario: Additional integration coverage kept outside the canonical `VT-*` baseline |

The canonical Vitest baseline currently maps to `VT-01` through `VT-21`.

The current suite contain additional Vitest scenarios beyond that baseline when they provide useful extra confidence. Those rows should be marked as extra coverage with a new canonical `VT-*` ID.

## How to use these matrices

When adding or reviewing a Vitest test:

* identify whether the behaviour belongs to reducer logic or the provider and hook contract
* map the test to one `VT-*` entry
* keep one meaningful behaviour per test
* prefer public behaviour over implementation details

Every new Vitest contribution should map to at least one row in the matrices above.

## Coverage guidance for contributors

### Prioritise these rows first:

* add new item
* merge quantity for existing item
* decrement to removal
* clear cart
* total item calculation
* subtotal calculation
* hook guard outside provider
* empty initial provider state
* add item through provider
* remove item through provider

Avoid spreading the same behaviour across reducer tests and provider tests unless the duplication is intentional and valuable.

## Related pages

* [Cart testing plan](/docs/contributing/cart-testing-plan)
* [Cypress Component Testing](/docs/contributing/cypress-component-testing)
* [Test coverage and evidence](/docs/contributing/test-coverage-and-evidence)

```
