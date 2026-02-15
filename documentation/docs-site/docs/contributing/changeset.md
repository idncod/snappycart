---
title: Changesets
---

### Changeset required (most PRs)
This repo uses Changesets for versioning and changelog.

Add a changeset when your change affects the published package.

Before opening a PR, run:
```bash
npx changeset 
```

or

```bash
npx changeset add
```

There is no difference between these commands.

It creates a small file in .changeset/ that describes what changed and whether it’s a patch/minor/major bump.
This keeps releases consistent and avoids “forgot to bump version” chaos.

No changeset needed for: docs-only, internal refactors with zero user impact (unless you want it in the changelog).

For more info on changeset, [look here](https://www.npmjs.com/package/@changesets/cli)