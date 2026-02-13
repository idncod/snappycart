[![SnappyCart](https://img.shields.io/badge/SnappyCart-snappycart.idncod.com-F97316.svg?labelColor=111827)](https://snappycart.idncod.com/) &middot; [![License](https://img.shields.io/badge/license-MIT-F97316.svg?labelColor=111827)](./LICENSE) [![npm](https://img.shields.io/npm/v/snappycart.svg?label=npm&color=F97316&labelColor=111827)](https://www.npmjs.com/package/snappycart) [![Build and Test](https://github.com/idncod/snappycart/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/idncod/snappycart/actions/workflows/ci.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-22C55E.svg?labelColor=111827)](./CONTRIBUTING.md) [![Conventional Commits](https://img.shields.io/badge/commits-conventional-22C55E.svg?labelColor=111827)](https://www.conventionalcommits.org/)



 # 🛒 Snappycart

**SnappyCart** is a modern, headless React cart system designed for plug-and-play use in any React app. With full support for local state and future SaaS syncing, it's the perfect cart foundation — open-source and Pro-ready.

---

## Why SnappyCart?

Most cart solutions are either too basic or too opinionated.
SnappyCart gives you the core cart engine and UI building blocks, so you can ship your own cart UX without fighting a framework.

- **Headless by default:** bring your own UI, or use the included drawer and components.
- **Type-safe:** first-class TypeScript types, predictable APIs, fewer runtime surprises.
- **Composable:** works with any React app architecture, from tiny SPAs to serious storefronts.
- **Built for growth:** structured to support future sync, analytics, and checkout flows without rewrites.

## Features

- Cart primitives: `add`, `remove`, `updateQuantity`, `clear`
- React context + hook: `CartProvider`, `useCart`
- Optional UI: sliding cart drawer you can theme
- Persistence: localStorage support out of the box
- Works with any product model (you own the schema)

---

## 📦 Installation

```bash
npm install snappycart
```

## Quick Start
**1. Wrap your app once:**
```javascript
import { CartProvider } from "snappycart";

export function App() {
  return (
    <CartProvider>
      {/* your app */}
    </CartProvider>
  );
}
```

**2. Use the hook anywhere:**
```tsx
import { useCart } from "snappycart";

export function AddToCartButton() {
  const { addItem } = useCart();

  return (
    <button
      onClick={() =>
        addItem({
          id: "sku_123",
          name: "Coffee Beans",
          price: 1299,
          quantity: 1,
        })
      }
    >
      Add to cart
    </button>
  );
}
```
**3. Open the cart UI (if you use the provided drawer):**
```tsx
import { useCart } from "snappycart";

export function CartButton() {
  const { openCart, itemsCount } = useCart();
  return <button onClick={openCart}>Cart ({itemsCount})</button>;
}
```

## Documentation
Docs live here:

Getting Started: https://snappycart.idncod.com/docs

Theming: https://snappycart.idncod.com/docs/theming

## Contributing

---

SnappyCart is built to keep improving the core cart engine so it stays simple to adopt, reliable in production, and easy to extend. Development happens in the open on GitHub, and community contributions make a real difference, from bug fixes to new features and docs improvements. Use the sections below to learn how to contribute and help shape the project.

### Start here: [Your first pull request](https://snappycart.idncod.com/docs/contributing/your-first-pr)

### Issues: [Bug reports and feature requests are welcome](https://github.com/idncod/snappycart/issues)

### [Good First Issues](https://github.com/idncod/snappycart/labels/good%20first%20issue)

If you are new here and want an easy first win, start with our list of [good first issues](https://github.com/idncod/snappycart/labels/good%20first%20issue). These are small, well-scoped bugs and improvements that are a solid way to learn the contribution flow and get your first PR merged.
### License
Snappycart is [MIT licensed](./LICENSE).
