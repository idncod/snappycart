# Contributing to snappycart

Thanks for contributing to **snappycart**.

This repository is an npm workspace monorepo. The package, demo app, and documentation site live side by side, so it is important to work in the correct workspace and run the correct commands from the correct level.

This guide is written to be explicit on purpose. If you are new to open source or monorepos, follow the steps in order.

> [!IMPORTANT]
> External contributors should work from a fork.
>
> Start at the repository root, install dependencies there first, then install inside the workspace you want to work on if your local setup needs it.
>
> Before opening a pull request, make sure you have run the relevant checks for the part of the repo you changed.

---

## Start here

### New to snappycart?
- [Choose your workspace](#choose-your-workspace)
- [Fork and sync workflow](#fork-and-sync-workflow)
- [Local setup](#local-setup)
- [Build and run the repository](#build-and-run-the-repository)

### Ready to contribute?
- [How to claim work](#how-to-claim-work)
- [Branch naming](#branch-naming)
- [Issue and pull request naming](#issue-and-pull-request-naming)
- [Contribution flow](#contribution-flow)
- [Feature contribution expectations](#feature-contribution-expectations)

### Keep releases clean
- [Testing expectations](#testing-expectations)
- [Changesets](#changesets)
- [Communication and support](#communication-and-support)
- [Ways to contribute](#ways-to-contribute)
- [Security issues](#security-issues)

---

## Choose your workspace

Not every contributor needs every folder.

| Workspace | Path | Use this when you want to... |
| --- | --- | --- |
| Package | `packages/snappycart` | work on package logic, types, exports, styling, or package behaviour |
| Demo app | `apps/demo` | showcase a new feature, validate UX, or improve the public demo |
| Documentation site | `apps/documentation` | improve docs, examples, guides, or contributor-facing content |
| Cypress | `cypress` | add or improve Cypress coverage |
| Playwright | `playwright` | add or improve Playwright coverage |

> [!TIP]
> If you add a new user-facing feature to the package, please consider adding or updating a demo for it in `apps/demo`.
>
> It is not mandatory for every PR, but it is strongly encouraged because it keeps snappycart easier to understand, easier to test, and easier to present publicly.

---

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
git switch master
git merge upstream/master
git push origin master
```

Please sync your fork before starting a new contribution or refreshing older work.

---

## Local setup

After cloning the repository, install dependencies from the root first:

```bash
npm install
```

For this repository, some local setups may also need dependencies installed inside the specific workspace you are contributing to.

### Install dependencies by workspace

#### Package

```bash
cd packages/snappycart
npm install
```

#### Demo app

```bash
cd apps/demo
npm install
```

#### Documentation site

```bash
cd apps/documentation
npm install
```

Return to the repository root when you want to run shared workspace commands.

---

## Build and run the repository

From the repository root, run the shared workspace build before starting work:

```bash
npm run build --workspaces
```

> [!IMPORTANT]
> Run `npm run build --workspaces` from the repository root after installation.
>
> This step is required for this repo. If you skip it, parts of the local environment may fail or behave inconsistently.

If your local root scripts also expose a wrapper command such as `npm run build`, you may use that too, but the required root workspace build command for contributor setup is:

```bash
npm run build --workspaces
```

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

---

## How to claim work

Please do not start larger work without first checking or opening a GitHub Issue.

If you want to work on an existing issue:

1. Leave a comment on the issue saying you would like to work on it.
2. If you are not a collaborator, you may not be able to assign the issue to yourself.
3. A maintainer will assign it if needed.

If you open a new issue and want maintainer attention quickly, comment on the issue first and then reach out through one of the support channels listed below.

GitHub should remain the main source of truth for contribution tracking.

---

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
- `test/add-cypress-drawer-flow`

---

## Issue and pull request naming

Please use clear titles that make the type of change obvious.

### Recommended issue title format

```text
[type] [area] short summary
```

Examples:

- `[docs] README npm presentation`
- `[test] cart drawer close behaviour`
- `[feat] package custom currency formatter`

### Recommended pull request title format

```text
type(scope): summary
```

Examples:

- `feat(package): add custom currency formatter`
- `fix(demo): correct item quantity update flow`
- `docs: improve contributor setup steps`
- `test(cypress): add coverage for drawer close behaviour`

> [!IMPORTANT]
> If your pull request introduces a **new feature**, make sure that is explicit in the PR title and PR description.
>
> That helps with review, release planning, changelog work, demo updates, and product communication.

---

## Contribution flow

1. Fork the repository.
2. Sync your fork with `upstream/master`.
3. Clone your fork locally.
4. Install dependencies from the root.
5. Install dependencies in the workspace you are changing if needed.
6. Run `npm run build --workspaces` from the repository root.
7. Pick or open a GitHub Issue.
8. Create a focused branch.
9. Make your changes.
10. Run the relevant tests and checks.
11. If your PR changes package behaviour, package-facing documentation, public API, shipped files, or package output, run `npm changeset` from the repository root **before you commit your PR work** so the generated `.changeset/*.md` file is included in the pull request.
12. Open a pull request with a clear summary.

---

## Feature contribution expectations

If your pull request adds a new feature or changes user-facing behaviour:

- make that explicit in the PR title and PR description
- run `npm changeset` before committing the PR when required
- update documentation if usage changed
- consider updating the demo app to showcase the feature

Demo updates are strongly encouraged for new features, even when they are not strictly required.

If you add a new feature, please make that obvious in your pull request summary so it can be reviewed, released, and communicated clearly.

> [!TIP]
> A good feature PR does not just add code.
>
> It makes the feature visible.
>
> That usually means some combination of:
> - updated docs
> - a demo update
> - a clear PR title
> - a changeset
> - release-ready wording in the PR summary

---

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

---

## Changesets

If your pull request changes package behaviour, public API, shipped files, package-facing documentation that should appear in the next npm release, or package output, add a changeset.

Create one from the repository root **before you commit the PR** so the changeset file is part of the pull request:

```bash
npm changeset
```

or 

```bash
npm add changeset
```

Maintainers prepare the release version bump later with:

```bash
npm run version-packages
```

> [!NOTE]
> Contributors usually add the changeset in the PR.
>
> Maintainers usually run the version bump and publish the release.

---

## Communication and support

Please use GitHub Issues and pull request comments first whenever possible.

If you need maintainer attention for issue assignment, clarification, or follow-up, you can also reach out directly by email:

`node@idncod.com`

If you are already part of the contributor community channels, you may also ask there, but GitHub remains the primary place for issue and PR tracking.

---

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

---

## Security issues

If you discover a vulnerability, do not open a public GitHub Issue.

Please follow the process in [SECURITY.md](./SECURITY.md).

![snappycart demo preview](https://snappycart.idncod.com/img/snappycart_peaking.png)
