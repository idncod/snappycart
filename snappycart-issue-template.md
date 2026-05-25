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
