---
title: Create a pull request from a fork
slug: /how-to-contribute/fork-and-pull-request
---

You can commit to master on your own fork. That is fine.
I can only review and merge your changes once you open a pull request into the main repo.

Step by step using GitHub

1. Fork the repo
2. Create a branch on your fork
3. Commit your changes
4. Open a pull request into idncod/snappycart targeting master
5. Enable allow edits by maintainers
6. Fix review feedback by pushing more commits to the same branch

Step by step using terminal

```bash
git clone https://github.com/YOUR_USERNAME/snappycart.git
cd snappycart
git remote add upstream https://github.com/idncod/snappycart.git
git fetch upstream
git switch -c fix/some-change
git add .
git commit -m "fix: your change"
git push -u origin fix/some-change
```

