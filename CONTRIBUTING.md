# Contributing to snappycart

Thanks for contributing to snappycart.

This repository is an npm workspace monorepo. The package, demo app, and documentation site live side by side, so it is important to work in the correct workspace and run the correct commands from the correct level.

This guide is written to be explicit on purpose. If you are new to open source or monorepos, follow the steps in order.

## Contents

- [Before you start](#before-you-start)
- [Repository layout](#repository-layout)
- [Fork and sync workflow](#fork-and-sync-workflow)
- [Local setup](#local-setup)
- [Install dependencies by workspace](#install-dependencies-by-workspace)
- [Build and run the repository](#build-and-run-the-repository)
- [How to claim work](#how-to-claim-work)
- [Branch naming](#branch-naming)
- [Pull request title format](#pull-request-title-format)
- [Contribution flow](#contribution-flow)
- [Feature contribution expectations](#feature-contribution-expectations)
- [Testing expectations](#testing-expectations)
- [Changesets](#changesets)
- [Communication and support](#communication-and-support)
- [Ways to contribute](#ways-to-contribute)
- [Security issues](#security-issues)

## Before you start

Please use GitHub Issues to discuss bugs, features, refactors, documentation changes, and testing improvements before starting larger work.

For first-time contributors, starting with a small scoped issue is the fastest way to learn the repository flow.

If you are planning a new feature, please open or comment on an issue first so the work is visible and aligned before implementation begins.

## Repository layout

- `packages/snappycart`  
  The publishable npm package.

- `apps/demo`  
  The local demo app used to test and showcase snappycart behaviour.

- `apps/documentation`  
  The documentation site.

- `cypress`  
  Cypress support files and related end-to-end or component test setup.

- `playwright`  
  Playwright tests.

- `package.json` at the repository root  
  Shared workspace scripts.

## Fork and sync workflow

External contributors should work from a fork.

### 1. Fork the repository

Create your own fork of the repository on GitHub.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/snappycart.git
cd snappycart
```

### 3. Add the original repository as `upstream`

```bash
git remote add upstream https://github.com/idncod/snappycart.git
```

### 4. Sync your fork before starting new work

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

Please sync your fork before starting a new contribution or refreshing older work.

## Local setup

After cloning the repository, install dependencies from the root first:

```bash
npm install
```

This repository currently works best when you also install dependencies inside the workspace you are contributing to.

## Install dependencies by workspace

### Package

```bash
cd packages/snappycart
npm install
```

### Demo app

```bash
cd apps/demo
npm install
```

### Documentation site

```bash
cd apps/documentation
npm install
```

Return to the repository root when you want to run shared workspace commands.

## Build and run the repository

From the repository root, run the shared workspace build:

```bash
npm run build --workspaces
```

If your local root scripts also expose a wrapper command such as `npm run build`, you may use that instead.

### Useful root-level commands

Use these from the repository root when you want workspace-aware behaviour:

```bash
npm run build
npm run lint
npm run test
npm run build:package
npm run dev:demo
npm run dev:docs
npm run test:cypress
npm run test:cypress:component
npm run test:cypress:e2e
npm run test:playwright
```

### Working from a specific workspace

If you only need one part of the repo, move into that folder and use the local scripts there.

#### Package work

```bash
cd packages/snappycart
npm run build
npm run test
```

#### Demo work

```bash
cd apps/demo
npm run dev
```

#### Documentation work

```bash
cd apps/documentation
npm run dev
```

## How to claim work

Please do not start larger work without first checking or opening a GitHub Issue.

If you want to work on an existing issue:

1. Leave a comment on the issue saying you would like to work on it.
2. If you are not a collaborator, you may not be able to assign the issue to yourself.
3. A maintainer will assign it if needed.

If you open a new issue and want a maintainer to review or assign it, comment on the issue first. GitHub should remain the main source of truth for contribution tracking.

## Branch naming

Please create a focused branch for your work.

Recommended format:

```text
type/short-description
```

Examples:

- `feat/add-coupon-support`
- `fix/cart-quantity-update`
- `docs/improve-install-guide`
- `test/add-cypress-checkout-flow`

## Pull request title format

Please use clear pull request titles that make the type of change obvious.

Recommended format:

```text
type(scope): summary
```

Examples:

- `feat(package): add custom currency formatter`
- `fix(demo): correct item quantity update flow`
- `docs: improve contributor setup steps`
- `test(cypress): add coverage for drawer close behaviour`

If your pull request introduces a new feature, make sure the title clearly signals that.

This helps with review, release preparation, changelog work, and project updates.

## Contribution flow

1. Fork the repository.
2. Sync your fork with `upstream/main`.
3. Clone your fork locally.
4. Install dependencies from the root.
5. Install dependencies in the workspace you are changing.
6. Pick or open a GitHub Issue.
7. Create a focused branch.
8. Make your changes.
9. Run the relevant tests and checks.
10. Add a changeset if package behaviour or output changed.
11. Open a pull request with a clear summary.

## Feature contribution expectations

If your pull request adds a new feature or changes user-facing behaviour:

- make that explicit in the PR title and PR description
- add a changeset when required
- update documentation if usage changed
- consider updating the demo app to showcase the feature

Demo updates are strongly encouraged for new features, even when they are not strictly required.

If you add a new feature, please make that obvious in your pull request summary so it can be reviewed, released, and communicated clearly.

## Testing expectations

At minimum, run the checks that match the area you touched.

### If you changed the package

Run:

```bash
npm run build:package
npm run test
npm run lint
```

### If you changed the demo app

Run:

```bash
npm run dev:demo
```

### If you changed the documentation

Run:

```bash
npm run dev:docs
```

### If you changed user flows or UI behaviour

Run the relevant end-to-end or component tests:

```bash
npm run test:cypress
npm run test:cypress:component
npm run test:cypress:e2e
npm run test:playwright
```

## Changesets

If your pull request changes package behaviour, public API, shipped files, or package output, add a changeset.

Create one from the root:

```bash
npm run changeset
```

Version packages when preparing a release:

```bash
npm run version-packages
```

## Communication and support

Please use GitHub Issues and pull request comments first whenever possible.

If you need maintainer attention for issue assignment, clarification, or follow-up, you can also reach out directly by email:

`node@idncod.com`

If you are already part of the contributor community channels, you may also ask there, but GitHub remains the primary place for issue and PR tracking.

## Ways to contribute

You can contribute by improving:

- package behaviour and APIs
- bug fixes
- type safety
- documentation clarity
- demo polish
- test coverage
- CI and release workflows
- accessibility and usability

## Security issues

If you discover a vulnerability, do not open a public GitHub Issue.

Please follow the process in [SECURITY.md](./SECURITY.md).

![snappycart demo preview](https://snappycart.idncod.com/img/snappycart_peaking.png)
