# SnappyCart GitHub issue system

## 1. Title format

Use this every time:

`[{role}] [{area}] {clear action or expected outcome}`

Examples:
- `[QA] [Drawer] Escape closes CartDrawer`
- `[QA] [Packaging] Next.js App Router can import snappycart/styles.css`
- `[SWE] [Core] Implement localStorage persistence in CartProvider`

This is better than vague titles like "Fix cart" or "Improve tests".

## 2. Labels taxonomy

### Role
- `qa`
- `swe`
- `docs`

### Type
- `type:bug`
- `type:feature`
- `type:test`
- `type:enhancement`
- `type:chore`
- `type:docs`
- `type:process`

### Area
- `area:core`
- `area:provider`
- `area:reducer`
- `area:drawer`
- `area:icon`
- `area:types`
- `area:a11y`
- `area:playwright`
- `area:cypress`
- `area:visual`
- `area:packaging`
- `area:docs`
- `area:demo`
- `area:ci`
- `area:contributors`
- `area:architecture`
- `area:release`
- `area:testing`

### Priority
- `p0`
- `p1`
- `p2`
- `p3`

### Effort
- `effort:small`
- `effort:medium`
- `effort:large`

### Contributor fit
- `good first issue`
- `help wanted`
- `needs reproduction`
- `blocked`
- `ready`

### Test level
- `level:unit`
- `level:component`
- `level:e2e`
- `level:integration`
- `level:visual`
- `level:docs`
- `level:ci`
- `level:manual`

## 3. Issue body template

Use this exact shape:

### Summary
One sentence. What is wrong, missing, or being validated?

### Why this matters
Explain the product or contributor impact in 2 to 4 lines.

### Scope
State exactly what is in and out.

### Acceptance criteria
- [ ] Clear observable outcome 1
- [ ] Clear observable outcome 2
- [ ] Clear observable outcome 3

### Suggested implementation or test direction
Only include this if helpful. Keep it short.

### Evidence
- Current behavior:
- Expected behavior:
- Screenshots / videos / logs:
- Related files:
- Related issues / PRs:

### Definition of done
- [ ] Tests added or updated
- [ ] Docs updated if public behavior changed
- [ ] Changeset added if package behavior changed
- [ ] Manual verification completed

## 4. Quality rules

Do not open issues that:
- mix 3 unrelated problems
- say "improve" without a measurable target
- have no acceptance criteria
- require reading your mind
- duplicate a broader issue unless explicitly marked as a child issue

## 5. Backlog strategy

Do not dump all 130 issues into "open" on day one.

Use 4 lanes:
1. `backlog`
2. `ready`
3. `in progress`
4. `done`

And only move issues into `ready` when they have:
- a real owner area
- acceptance criteria
- labels
- no ambiguity

## 6. Recommended milestones

### Milestone A: Core confidence
Reducer, provider, icon, drawer basics

### Milestone B: Accessibility and keyboard safety
Dialog focus, labels, keyboard paths, contrast

### Milestone C: Consumer app confidence
Vite, Next.js, npm pack, exported CSS, TS types

### Milestone D: CI and release hardening
Playwright, Cypress, artifacts, matrix, release automation

## 7. Opening order

Open these first because they create the most leverage:
1. SWE-001
2. SWE-008
3. SWE-009
4. SWE-015
5. SWE-017
6. SWE-019
7. SWE-022
8. SWE-023
9. QA-024
10. QA-035
11. QA-053
12. QA-054
13. QA-077
14. QA-082
15. QA-093


# QA backlog, 100 issues

## QA-001. Reducer: addItem adds a brand-new product as a new line item
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify ADD_ITEM inserts a new cart line when the product id does not exist.

## QA-002. Reducer: addItem merges quantity when the same product is added twice
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify duplicate adds increase quantity instead of duplicating lines.

## QA-003. Reducer: addItem clamps quantity 0 to 1
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Ensure addItem with 0 quantity still results in quantity 1.

## QA-004. Reducer: addItem clamps negative quantity to 1
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Ensure negative quantities cannot enter state through addItem.

## QA-005. Reducer: addItem floors decimal quantity values
- Area: `core`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p2,effort:small,ready`
- Brief: Check decimal quantities are normalized with Math.floor semantics.

## QA-006. Reducer: addItem sanitizes non-finite quantity values
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Ensure NaN and Infinity do not create corrupted cart state.

## QA-007. Reducer: increment increases quantity by exactly 1
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify increment only affects the targeted line item.

## QA-008. Reducer: decrement lowers quantity by exactly 1
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify decrement updates the targeted item correctly.

## QA-009. Reducer: decrement removes the line item when quantity reaches 0
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Ensure zero-quantity lines are removed from state.

## QA-010. Reducer: setQuantity updates quantity to an exact positive integer
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify explicit setQuantity writes the expected normalized value.

## QA-011. Reducer: setQuantity removes item when quantity is 0
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Ensure setQuantity(0) behaves as remove.

## QA-012. Reducer: setQuantity removes item when quantity is negative
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Ensure negative values do not remain in state.

## QA-013. Reducer: setQuantity floors decimal values
- Area: `core`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p2,effort:small,ready`
- Brief: Confirm decimal quantity updates normalize down.

## QA-014. Reducer: removeItem deletes only the targeted product id
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify unrelated lines remain untouched after removeItem.

## QA-015. Reducer: removeItem is a no-op for unknown ids
- Area: `core`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p2,effort:small,ready`
- Brief: Unknown ids should not crash or mutate the cart.

## QA-016. Reducer: clear empties the cart completely
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify CLEAR_CART resets items to an empty array.

## QA-017. Selectors: getTotalItems returns 0 for an empty cart
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Add coverage for the zero state.

## QA-018. Selectors: getSubtotal returns 0 for an empty cart
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Add coverage for empty subtotal.

## QA-019. Selectors: getTotalItems sums quantities across multiple lines
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify the total item counter is accurate.

## QA-020. Selectors: getSubtotal sums price × quantity across multiple lines
- Area: `core`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:core,type:test,level:unit,p1,effort:small,ready`
- Brief: Verify subtotal math on a mixed cart.

## QA-021. Types: numeric and string ids are treated as distinct values
- Area: `types`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:types,type:test,level:unit,p2,effort:small,ready`
- Brief: Lock in expected behavior for 1 vs '1'.

## QA-022. Types: product metadata survives add and update flows
- Area: `types`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:types,type:test,level:unit,p2,effort:small,ready`
- Brief: Ensure metadata is preserved on line items.

## QA-023. Types: imageUrl remains optional throughout cart operations
- Area: `types`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:types,type:test,level:unit,p2,effort:small,ready`
- Brief: Cover image-less products end to end.

## QA-024. Provider: useCart throws a clear error outside CartProvider
- Area: `provider`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:provider,type:test,level:component,p1,effort:small,ready`
- Brief: Add a component-level guard test for misuse.

## QA-025. Provider: context values update after addItem
- Area: `provider`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:provider,type:test,level:component,p1,effort:small,ready`
- Brief: Verify items, totalItems, and subtotal reactively update.

## QA-026. Provider: context values update after increment and decrement
- Area: `provider`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:provider,type:test,level:component,p1,effort:small,ready`
- Brief: Cover state mutation through the public hook API.

## QA-027. Provider: context values update after removeItem and clear
- Area: `provider`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:provider,type:test,level:component,p1,effort:small,ready`
- Brief: Ensure destructive operations propagate correctly.

## QA-028. Provider: memoized context does not break consumer rerenders
- Area: `provider`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:provider,type:test,level:component,p2,effort:medium,ready`
- Brief: Add regression coverage around useMemo and consumer updates.

## QA-029. CartIcon: badge reflects totalItems from context
- Area: `icon`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:icon,type:test,level:component,p1,effort:small,ready`
- Brief: Verify the icon count always mirrors cart state.

## QA-030. CartIcon: aria-label announces current item count
- Area: `icon`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:icon,type:test,level:component,a11y,p1,effort:small,ready`
- Brief: Assert the accessible name changes with cart state.

## QA-031. CartIcon: position='bottom-right' applies the correct class
- Area: `icon`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:icon,type:test,level:component,p2,effort:small,ready`
- Brief: Lock in default positioning.

## QA-032. CartIcon: position='top-right' applies the correct class
- Area: `icon`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:icon,type:test,level:component,p2,effort:small,ready`
- Brief: Cover the alternate floating position.

## QA-033. CartIcon: position='inline' applies the correct class
- Area: `icon`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:icon,type:test,level:component,p2,effort:small,ready`
- Brief: Cover inline usage for host apps.

## QA-034. CartDrawer: closed state renders nothing
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p1,effort:small,ready`
- Brief: Verify the drawer returns null when open=false.

## QA-035. CartDrawer: open state renders dialog semantics correctly
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,a11y,p1,effort:small,ready`
- Brief: Check role=dialog, aria-modal, and labelledby behavior.

## QA-036. CartDrawer: close button receives focus on open
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,a11y,p1,effort:small,ready`
- Brief: Lock in the autofocus behavior for keyboard users.

## QA-037. CartDrawer: Escape closes the drawer
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,a11y,p1,effort:small,ready`
- Brief: Verify keyboard dismissal works consistently.

## QA-038. CartDrawer: overlay click closes the drawer
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p1,effort:small,ready`
- Brief: Cover pointer dismissal through the overlay.

## QA-039. CartDrawer: custom title prop is rendered
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p2,effort:small,ready`
- Brief: Ensure integrators can replace the heading text.

## QA-040. CartDrawer: custom formatMoney callback is respected
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p2,effort:small,ready`
- Brief: Verify host apps can control money formatting.

## QA-041. CartDrawer: empty state message appears when the cart has no items
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p1,effort:small,ready`
- Brief: Cover the empty-cart UX.

## QA-042. CartDrawer: line item image renders when imageUrl exists
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p2,effort:small,ready`
- Brief: Verify product imagery renders correctly.

## QA-043. CartDrawer: placeholder block renders when imageUrl is missing
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p2,effort:small,ready`
- Brief: Cover the fallback path for image-less products.

## QA-044. CartDrawer: increment button updates the displayed quantity
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p1,effort:small,ready`
- Brief: Assert UI and state stay in sync.

## QA-045. CartDrawer: decrement button updates the displayed quantity
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p1,effort:small,ready`
- Brief: Add coverage for the lower bound path.

## QA-046. CartDrawer: remove button deletes the targeted line item
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p1,effort:small,ready`
- Brief: Cover item deletion from the drawer UI.

## QA-047. CartDrawer: subtotal updates after quantity changes
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p1,effort:small,ready`
- Brief: Verify derived totals re-render correctly.

## QA-048. CartDrawer: clear cart button is hidden when the cart is empty
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p2,effort:small,ready`
- Brief: Empty-state controls should stay minimal.

## QA-049. CartDrawer: clear cart button is shown when items exist
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p2,effort:small,ready`
- Brief: Non-empty carts should expose the destructive action.

## QA-050. CartDrawer: clicking clear cart empties items and returns to empty state
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,p1,effort:small,ready`
- Brief: Verify the destructive action fully resets the drawer.

## QA-051. CartDrawer: quantity controls expose useful accessible labels per product
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,a11y,p1,effort:small,ready`
- Brief: Check labels include the product name.

## QA-052. CartDrawer: remove button has an explicit accessible name
- Area: `drawer`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:component,a11y,p1,effort:small,ready`
- Brief: Avoid ambiguous repeated 'Remove' controls for screen readers.

## QA-053. CartDrawer: focus returns to the trigger after close
- Area: `drawer`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:drawer,type:test,level:e2e,a11y,bug,p1,effort:medium,ready`
- Brief: This is missing today and should become a regression test once implemented.

## QA-054. CartDrawer: focus is trapped inside the dialog while open
- Area: `drawer`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:drawer,type:test,level:e2e,a11y,bug,p1,effort:medium,ready`
- Brief: Add a keyboard-only regression suite for modal focus management.

## QA-055. CartDrawer: body scroll is locked while the drawer is open
- Area: `drawer`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:drawer,type:test,level:e2e,ux,p2,effort:medium,ready`
- Brief: Cover mobile and long-page behavior.

## QA-056. CartDrawer: long product names do not break the layout
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:visual,p2,effort:small,ready`
- Brief: Add a regression case for overflow handling.

## QA-057. CartDrawer: large quantities do not break badge or controls layout
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:drawer,type:test,level:visual,p2,effort:small,ready`
- Brief: Stress-test visual integrity under realistic abuse.

## QA-058. CartDrawer: broken image URLs degrade gracefully
- Area: `drawer`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:drawer,type:test,level:e2e,bug,p2,effort:medium,ready`
- Brief: Add a browser-level case for failed image loads.

## QA-059. Accessibility: default theme passes basic color-contrast checks
- Area: `a11y`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:a11y,type:test,level:manual,p1,effort:medium,ready`
- Brief: Run an audit against key text, buttons, and counts.

## QA-060. Accessibility: default controls meet minimum touch target size on mobile
- Area: `a11y`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:a11y,type:test,level:manual,mobile,p2,effort:small,ready`
- Brief: Measure buttons and icon interactions on narrow viewports.

## QA-061. Accessibility: drawer respects reduced motion preference
- Area: `a11y`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:a11y,type:test,level:e2e,p2,effort:medium,ready`
- Brief: Add coverage once motion styles are introduced or confirmed.

## QA-062. Accessibility: cart count changes are announced through aria-live
- Area: `a11y`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:a11y,type:test,level:component,bug,p1,effort:medium,ready`
- Brief: This needs engineering support and then regression coverage.

## QA-063. Accessibility: keyboard-only user can add, open, update, remove, and clear items
- Area: `a11y`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:a11y,type:test,level:e2e,p1,effort:medium,ready`
- Brief: Create a full happy-path keyboard journey.

## QA-064. Visual regression: CartIcon default state snapshot
- Area: `visual`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:visual,type:test,level:visual,p2,effort:small,ready`
- Brief: Start a baseline for icon appearance.

## QA-065. Visual regression: CartIcon with double-digit badge snapshot
- Area: `visual`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:visual,type:test,level:visual,p2,effort:small,ready`
- Brief: Catch count badge overflow early.

## QA-066. Visual regression: CartDrawer empty state snapshot
- Area: `visual`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:visual,type:test,level:visual,p2,effort:small,ready`
- Brief: Baseline the empty drawer.

## QA-067. Visual regression: CartDrawer with one line item snapshot
- Area: `visual`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:visual,type:test,level:visual,p2,effort:small,ready`
- Brief: Capture the standard single-item layout.

## QA-068. Visual regression: CartDrawer with multiple items snapshot
- Area: `visual`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:visual,type:test,level:visual,p2,effort:small,ready`
- Brief: Catch spacing and divider regressions.

## QA-069. Visual regression: CartDrawer with long text and missing images snapshot
- Area: `visual`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:visual,type:test,level:visual,p2,effort:small,ready`
- Brief: Cover the ugliest realistic state.

## QA-070. Cross-browser: Playwright CT suite passes in Chromium
- Area: `playwright`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:playwright,type:test,level:component,p1,effort:small,ready`
- Brief: Stabilize component tests in the default browser.

## QA-071. Cross-browser: Playwright CT suite passes in Firefox
- Area: `playwright`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:playwright,type:test,level:component,browser:firefox,p1,effort:medium,ready`
- Brief: Catch CSS and focus behavior differences.

## QA-072. Cross-browser: Playwright CT suite passes in WebKit
- Area: `playwright`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:playwright,type:test,level:component,browser:webkit,p1,effort:medium,ready`
- Brief: Catch Safari-specific rendering and focus issues.

## QA-073. Cypress component testing: create a reusable mountWithCartProvider helper
- Area: `cypress`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:cypress,type:test,level:component,p1,effort:small,ready`
- Brief: Reduce duplication across component specs.

## QA-074. Cypress component testing: add smoke coverage for CartIcon
- Area: `cypress`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:cypress,type:test,level:component,p2,effort:small,ready`
- Brief: Create a quick-feedback lane alongside Playwright.

## QA-075. Cypress component testing: add smoke coverage for CartDrawer
- Area: `cypress`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:cypress,type:test,level:component,p2,effort:small,ready`
- Brief: Exercise the default UI in Cypress CT.

## QA-076. Cypress E2E: baseUrl override via CYPRESS_BASE_URL works locally and in CI
- Area: `cypress`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:cypress,type:test,level:e2e,p1,effort:small,ready`
- Brief: Validate the intended environment-driven startup flow.

## QA-077. Playwright E2E: headless mode works in CI
- Area: `playwright`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:playwright,type:test,level:e2e,ci,p1,effort:medium,ready`
- Brief: Current config is dev-friendly and needs a CI-safe regression path.

## QA-078. Playwright E2E: webServer command boots the correct demo app in the workspace
- Area: `playwright`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:playwright,type:test,level:e2e,ci,p1,effort:medium,ready`
- Brief: Guard against monorepo script drift.

## QA-079. Playwright E2E: full add-to-cart journey from demo page
- Area: `playwright`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:playwright,type:test,level:e2e,p1,effort:medium,ready`
- Brief: Cover the main public journey users will actually try.

## QA-080. Playwright E2E: remove-from-cart journey from demo page
- Area: `playwright`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:playwright,type:test,level:e2e,p1,effort:medium,ready`
- Brief: Cover destructive flows in the demo.

## QA-081. Playwright E2E: cart survives page refresh after persistence lands
- Area: `playwright`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:playwright,type:test,level:e2e,persistence,p1,effort:medium,ready`
- Brief: Prepare a regression test for the documented persistence promise.

## QA-082. Consumer smoke: Vite app can install and render snappycart from npm pack
- Area: `packaging`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:packaging,type:test,level:integration,p1,effort:medium,ready`
- Brief: Test the package the way users consume it.

## QA-083. Consumer smoke: Next.js App Router app can import snappycart/styles.css
- Area: `packaging`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:packaging,type:test,level:integration,nextjs,p1,effort:medium,ready`
- Brief: Protect the style-export integration path.

## QA-084. Consumer smoke: Next.js Pages Router app can render CartProvider and CartDrawer
- Area: `packaging`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:packaging,type:test,level:integration,nextjs,p2,effort:medium,ready`
- Brief: Catch legacy Next consumer issues too.

## QA-085. Consumer smoke: React 19 app can install and render the package
- Area: `packaging`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:packaging,type:test,level:integration,react19,p2,effort:medium,ready`
- Brief: Verify peer dependency reality against modern consumers.

## QA-086. Consumer smoke: package works under React StrictMode
- Area: `packaging`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:packaging,type:test,level:integration,react,p1,effort:medium,ready`
- Brief: Catch double-invocation surprises early.

## QA-087. Consumer smoke: CJS import path works as advertised
- Area: `packaging`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:packaging,type:test,level:integration,p2,effort:small,ready`
- Brief: Validate require() support.

## QA-088. Consumer smoke: ESM import path works as advertised
- Area: `packaging`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:packaging,type:test,level:integration,p1,effort:small,ready`
- Brief: Validate import support.

## QA-089. Consumer smoke: type exports are usable in a TypeScript consumer app
- Area: `packaging`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:packaging,type:test,level:integration,typescript,p1,effort:small,ready`
- Brief: Ensure CartItemId, CartLineItem, and CartProduct compile downstream.

## QA-090. Packaging: npm pack tarball contains dist, README, and LICENSE only
- Area: `packaging`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:packaging,type:test,level:integration,npm,p2,effort:small,ready`
- Brief: Guard against bloated or broken publishes.

## QA-091. Packaging: published CSS file loads correctly from the exported subpath
- Area: `packaging`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:packaging,type:test,level:integration,npm,p1,effort:small,ready`
- Brief: Verify the CSS export in a real consumer fixture.

## QA-092. Documentation QA: README quick-start snippet compiles in TypeScript
- Area: `docs`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `qa,area:docs,type:test,level:docs,p1,effort:small,ready`
- Brief: Treat examples like production code, not marketing text.

## QA-093. Documentation QA: README feature list matches real implementation
- Area: `docs`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:docs,type:test,level:docs,bug,p1,effort:medium,ready`
- Brief: Right now the persistence claim needs verification against shipped code.

## QA-094. Documentation QA: docs-site getting-started steps produce a working demo
- Area: `docs`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:docs,type:test,level:docs,p2,effort:medium,ready`
- Brief: Create a smoke validation for the public docs flow.

## QA-095. Documentation QA: theming docs selectors match the shipped CSS classes
- Area: `docs`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:docs,type:test,level:docs,p2,effort:small,ready`
- Brief: Catch stale theming guidance early.

## QA-096. CI QA: test artifacts are uploaded on Playwright failure
- Area: `ci`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:ci,type:test,level:ci,p2,effort:medium,ready`
- Brief: Improve triage by preserving traces, screenshots, and videos.

## QA-097. CI QA: Cypress videos and screenshots are uploaded on failure
- Area: `ci`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `qa,area:ci,type:test,level:ci,p2,effort:medium,ready`
- Brief: Make flaky failures debuggable.

## QA-098. CI QA: flaky test quarantine process is documented
- Area: `ci`
- Priority: `p3`
- Effort: `small`
- Suggested labels: `qa,area:ci,type:process,level:docs,p3,effort:small,ready`
- Brief: Create a sane policy before the test suite grows.

## QA-099. Contributor QA: add a tester-friendly runbook for Vitest, Cypress, and Playwright
- Area: `contributors`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `qa,area:contributors,type:docs,level:docs,p2,effort:small,ready`
- Brief: Make it stupid-easy for QA contributors to get started.

## QA-100. Contributor QA: standardize test ids or accessible selectors for stable automation
- Area: `contributors`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `qa,area:contributors,type:test,level:component,p1,effort:medium,ready`
- Brief: Define a selector strategy so tests stop fighting markup churn.


# SWE backlog, 30 issues

## SWE-001. Implement localStorage persistence in CartProvider
- Area: `core`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `swe,area:core,type:feature,persistence,p1,effort:medium,ready`
- Brief: README promises local persistence, but the current provider is reducer-only. Persist items on write and hydrate on load.

## SWE-002. Add configurable storageKey prop to CartProvider
- Area: `core`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `swe,area:core,type:feature,persistence,p2,effort:small,ready`
- Brief: Allow host apps to isolate multiple carts or avoid key collisions.

## SWE-003. Add initialItems prop for server-driven or fixture-driven cart bootstrapping
- Area: `core`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `swe,area:core,type:feature,api,p2,effort:small,ready`
- Brief: Let integrators pre-seed the cart without imperative calls.

## SWE-004. Add onCartChange callback for analytics and side-effect integrations
- Area: `core`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `swe,area:core,type:feature,api,p2,effort:medium,ready`
- Brief: Expose a clean subscription point for analytics and sync logic.

## SWE-005. Add optional maxQuantity guard per item
- Area: `core`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `swe,area:core,type:feature,api,p2,effort:medium,ready`
- Brief: Prevent invalid or runaway quantities in serious storefronts.

## SWE-006. Make CartProduct metadata generic for stronger downstream typing
- Area: `types`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `swe,area:types,type:enhancement,typescript,p2,effort:medium,ready`
- Brief: Upgrade metadata from Record<string, unknown> to a generic-friendly API.

## SWE-007. Export reducer utilities for advanced consumers
- Area: `core`
- Priority: `p3`
- Effort: `small`
- Suggested labels: `swe,area:core,type:enhancement,api,p3,effort:small,ready`
- Brief: Expose cartReducer and helpers for custom wrappers and testing.

## SWE-008. Restore focus to the trigger when CartDrawer closes
- Area: `drawer`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `swe,area:drawer,type:bug,a11y,p1,effort:medium,ready`
- Brief: Modal UX is not done until focus return is implemented.

## SWE-009. Implement a real focus trap for CartDrawer
- Area: `drawer`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `swe,area:drawer,type:feature,a11y,p1,effort:medium,ready`
- Brief: Keep keyboard users inside the dialog while it is open.

## SWE-010. Lock body scroll when CartDrawer is open
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `swe,area:drawer,type:enhancement,ux,p2,effort:small,ready`
- Brief: Prevent background page scroll on long pages and mobile.

## SWE-011. Add aria-live announcements for cart mutations
- Area: `a11y`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `swe,area:a11y,type:feature,p1,effort:medium,ready`
- Brief: Announce add, remove, and quantity updates to assistive tech.

## SWE-012. Add image fallback behavior for failed product image loads
- Area: `drawer`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `swe,area:drawer,type:enhancement,ux,p2,effort:small,ready`
- Brief: Swap broken images to the existing placeholder state.

## SWE-013. Create a shared test utility for rendering components with CartProvider
- Area: `testing`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:testing,type:chore,p1,effort:small,ready`
- Brief: Stop repeating wrapper boilerplate across Vitest, Cypress, and Playwright CT.

## SWE-014. Add a consumer-fixtures folder with Vite and Next.js smoke apps
- Area: `packaging`
- Priority: `p1`
- Effort: `large`
- Suggested labels: `swe,area:packaging,type:feature,dx,p1,effort:large,ready`
- Brief: Use real fixture apps to validate installation, CSS import, and runtime behavior.

## SWE-015. Fix Playwright webServer startup for the workspace demo app
- Area: `playwright`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:playwright,type:bug,ci,p1,effort:small,ready`
- Brief: The e2e config should boot the correct demo app command in the monorepo.

## SWE-016. Run Playwright headless in CI while keeping local debugging friendly
- Area: `playwright`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:playwright,type:chore,ci,p1,effort:small,ready`
- Brief: Split local and CI behavior cleanly instead of one-size-fits-none.

## SWE-017. Split CI into separate lint, unit, component, and e2e jobs
- Area: `ci`
- Priority: `p1`
- Effort: `medium`
- Suggested labels: `swe,area:ci,type:enhancement,p1,effort:medium,ready`
- Brief: Make failures easier to isolate and parallelize.

## SWE-018. Add Node version matrix coverage in CI
- Area: `ci`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `swe,area:ci,type:enhancement,p2,effort:small,ready`
- Brief: Validate the package under multiple supported Node versions.

## SWE-019. Add npm pack validation job to CI
- Area: `packaging`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:packaging,type:chore,ci,p1,effort:small,ready`
- Brief: Catch publish-time breakage before release day.

## SWE-020. Add release workflow for Changesets + GitHub Releases
- Area: `release`
- Priority: `p2`
- Effort: `medium`
- Suggested labels: `swe,area:release,type:feature,automation,p2,effort:medium,ready`
- Brief: Make versioning and release notes feel legit, not manual.

## SWE-021. Add commitlint check to pull requests
- Area: `contributors`
- Priority: `p3`
- Effort: `small`
- Suggested labels: `swe,area:contributors,type:chore,ci,p3,effort:small,ready`
- Brief: Enforce conventional commits consistently.

## SWE-022. Create a real CONTRIBUTING.md at repo root
- Area: `contributors`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:contributors,type:docs,p1,effort:small,ready`
- Brief: README links contributor flow but the root guide should exist and be explicit.

## SWE-023. Create issue templates for bug, feature, QA, and docs reports
- Area: `contributors`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:contributors,type:docs,github,p1,effort:small,ready`
- Brief: Standardize incoming issues before the backlog explodes.

## SWE-024. Create a pull request template with test evidence and changeset checklist
- Area: `contributors`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:contributors,type:docs,github,p1,effort:small,ready`
- Brief: Force quality signals into every PR.

## SWE-025. Create a label taxonomy and triage guide
- Area: `contributors`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:contributors,type:docs,github,p1,effort:small,ready`
- Brief: Issues become chaos fast without consistent labeling.

## SWE-026. Sync README feature claims with shipped implementation
- Area: `docs`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:docs,type:bug,p1,effort:small,ready`
- Brief: Either ship persistence now or stop claiming it publicly.

## SWE-027. Add a changelog-driven docs page for release notes
- Area: `docs`
- Priority: `p3`
- Effort: `small`
- Suggested labels: `swe,area:docs,type:enhancement,p3,effort:small,ready`
- Brief: Surface release history on the docs site, not only in GitHub.

## SWE-028. Add demo fixtures for edge-case products
- Area: `demo`
- Priority: `p2`
- Effort: `small`
- Suggested labels: `swe,area:demo,type:enhancement,p2,effort:small,ready`
- Brief: Seed long names, missing images, large prices, and large counts for QA coverage.

## SWE-029. Introduce a selector strategy guideline for automation stability
- Area: `testing`
- Priority: `p1`
- Effort: `small`
- Suggested labels: `swe,area:testing,type:docs,p1,effort:small,ready`
- Brief: Define when to use roles, labels, and data-* selectors.

## SWE-030. Design a plugin point for future sync and analytics adapters
- Area: `architecture`
- Priority: `p3`
- Effort: `large`
- Suggested labels: `swe,area:architecture,type:feature,p3,effort:large,ready`
- Brief: Create a forward-compatible extension story before Pro features pile onto the core.
