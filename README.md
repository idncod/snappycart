![CI](https://github.com/idncod/snappycart/actions/workflows/ci.yml/badge.svg)
![Conventional Commits](https://img.shields.io/badge/commits-conventional-brightgreen.svg)

 🛒 SnappyCart

**SnappyCart** is a modern, headless React cart system designed for plug-and-play use in any React app. With full support for local state and future SaaS syncing, it's the perfect cart foundation — open-source and Pro-ready.

---

## Features

- Headless cart logic (`add`, `remove`, `clear`, etc.)
- React context & hook (`useCart`)
- Customizable sliding cart drawer
- TypeScript support
- Built-in persistence (localStorage)
- Designed for extension (Pro syncing, analytics, checkout)

---

## 📦 Installation

```bash
npm install snappycart
```

---

## Styles

SnappyCart ships a default stylesheet. Import it at the root of your app:

```js
import "snappycart/styles.css";
```

For Next.js (App Router), add the import to your root layout (e.g. `app/layout.tsx`):

```tsx
import "snappycart/styles.css";
```
