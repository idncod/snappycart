[![SnappyCart](https://img.shields.io/badge/SnappyCart-snappycart.idncod.com-F97316.svg?labelColor=111827)](https://snappycart.idncod.com/) [![License](https://img.shields.io/badge/license-MIT-F97316.svg?labelColor=111827)](./LICENSE) [![npm](https://img.shields.io/npm/v/snappycart.svg?label=npm&color=F97316&labelColor=111827)](https://www.npmjs.com/package/snappycart) [![Build and Test](https://github.com/idncod/snappycart/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/idncod/snappycart/actions/workflows/ci.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-22C55E.svg?labelColor=111827)](./CONTRIBUTING.md) [![Conventional Commits](https://img.shields.io/badge/commits-conventional-22C55E.svg?labelColor=111827)](https://www.conventionalcommits.org/)


[//]: # (![snappycart demo preview]&#40;img.png&#41;)
![snappycart demo preview](snappycart_by_viola_lykova_realease_2026.png)

 # Snappycart <img src="https://raw.githubusercontent.com/idncod/snappycart/841c7d80ecdf3f21b2f4a5ba2300ee26dc919101/documentation/docs-site/static/img/snappycart_logo.svg" alt="Snappycart logo" height="40" >

**snappycart** is a modern, headless React cart system designed for plug-and-play use in any React app.

It gives you the core cart engine plus optional UI components, so you can build your own cart experience without getting boxed into somebody else’s storefront assumptions.

---

## Contents

- [Why snappycart](#why-snappycart)
- [Features](#features)
- [Who it is for](#who-it-is-for)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Documentation](#documentation)
- [Repository structure](#repository-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Why SnappyCart?

Most cart solutions are either too basic or too opinionated.

snappycart gives you the core cart engine and UI building blocks, so you can ship your own cart UX without fighting a framework.

- **Headless by default**: bring your own UI, or use the included drawer and cart icon
- **Type-safe**: first-class TypeScript types and predictable APIs
- **Composable**: works with different React app architectures, from small SPAs to larger storefronts
- **Focused**: solves cart state cleanly without dragging in a full commerce platform
- **Built to grow**: structured for future extensions without forcing a rewrite

---

## Features

- cart primitives: `addItem`, `removeItem`, `increment`, `decrement`, `setQuantity`, `clear`
- React context and hook: `CartProvider`, `useCart`
- optional UI components: `CartDrawer`, `CartIcon`
- flexible product model with support for custom metadata
- workspace monorepo with package, demo app, and documentation site

---

## Who it is for

snappycart is mainly for:

- **React developers** who want cart functionality without adopting a full commerce platform
- **frontend engineers** who want to own the UI while reusing solid cart state logic
- **teams building storefronts or product flows** that need a lightweight cart foundation
- **contributors** who want to improve the package, tests, demo app, or docs

---

## 📦 Installation
For package consumers:

```bash
npm install snappycart
```

To use the provided styles:

```typescript
import "snappycart/styles.css";
```

## Quick Start
**1. Wrap your app with CartProvider**
```tsx
import { CartProvider } from "snappycart";

export function App() {
    return (
        <CartProvider>
            <Storefront />
        </CartProvider>
    );
}
```

**2. Add products to the cart with useCart**
```tsx
import { useCart } from "snappycart";

export function AddToCartButton() {
    const { addItem } = useCart();

    return (
        <button
            onClick={() =>
                addItem(
                    {
                        id: "sku_123",
                        name: "Coffee Beans",
                        price: 12.99,
                        imageUrl: "/images/coffee-beans.jpg",
                    },
                    1
                )
            }
        >
            Add to cart
        </button>
    );
}
```
**3. Use the optional cart UI**
```tsx
import { useState } from "react";
import { CartDrawer, CartIcon, useCart } from "snappycart";
import "snappycart/styles.css";

export function Storefront() {
    const [open, setOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <>
            <CartIcon onClick={() => setOpen(true)} />
            <CartDrawer
                open={open}
                onClose={() => setOpen(false)}
                title={`Your cart (${totalItems})`}
            />
        </>
    );
}
```

**4. Access cart state anywhere**
```tsx
import { useCart } from "snappycart";

export function CartSummary() {
    const { items, subtotal, totalItems, clear } = useCart();

    return (
        <section>
            <p>Total items: {totalItems}</p>
            <p>Subtotal: £{subtotal.toFixed(2)}</p>
            <button onClick={clear}>Clear cart</button>

            <ul>
                {items.map((item) => (
                    <li key={item.product.id}>
                        {item.product.name} × {item.quantity}
                    </li>
                ))}
            </ul>
        </section>
    );
}
```
 ---

## Documentation
Docs live here:

[📂 Getting Started ⤴](https://snappycart.idncod.com/docs/intro)

[📂 Theming ⤴](https://snappycart.idncod.com/docs/ui/theming)

For deeper contribution guidance, testing expectations, and workflow details, see [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Repository structure
This repository is a workspace monorepo. Not every folder matters to every contributor.
![SnappyCart repository structure](repo-structure.png)

## Folder guide
- 📂```packages/snappycart```
The publishable npm package. This is the main folder for developers working on snappycart itself.
- 📂```apps/demo```
Demo app for testing and showcasing the package in a real UI.
- 📂```apps/documentation```
Documentation site source. Most package users do not need this folder.
- 📂```cypress```
Cypress testing setup and support files.
- 📂```playwright```
Playwright testing setup.
- 📂```.github/workflows```
CI and automation workflows.

```text
snappycart/
├── apps/
│   ├── demo/
│   └── documentation/
├── packages/
│   └── snappycart/
├── cypress/
├── playwright/
├── .github/
│   └── workflows/
├── CONTRIBUTING.md
├── README.md
├── SECURITY.md
└── package.json
```

### Quick orientation

If you are using snappycart in your own app, the main thing you care about is:

```📂packages/snappycart```

If you are contributing to docs, go to:

```📂apps/documentation```

If you are contributing tests, you will mostly care about:

```cypress
📂playwright
📂packages/snappycart
📂apps/demo
```

### Contributing
snappycart is developed in the open, and contributions are welcome.

You can contribute through:

- bug fixes
- test coverage
- docs improvements
- package enhancements
- demo improvements
- CI and workflow polish

Start here:

[Your first pull request ↗](https://snappycart.idncod.com/docs/how-to-contribute/your-first-pull-request)

[GitHub Issues ↗](https://github.com/idncod/snappycart/issues)

[Good first issues ↗](https://github.com/idncod/snappycart/labels/good%20first%20issue)

[Contributing guide ↗](./CONTRIBUTING.md)

[Security policy ↗](./SECURITY.md)

If you cloned the repository locally for development, install dependencies from the root and build the workspaces before working across the repo:

```bash
npm install
npm run build
```

You can then either work from the repo root with workspace commands, or move into a specific workspace and run that folder’s local scripts.

### License
snappycart is [MIT licensed ↗](./LICENSE)

![snappycart demo preview](snappycart_peaking.png)
