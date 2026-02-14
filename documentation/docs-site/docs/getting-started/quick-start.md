---
title: Quick start
---

Wrap your app once.

```tsx
import {CartProvider} from 'snappycart';

export function App() {
  return (
    <CartProvider>
      {/* your app */}
    </CartProvider>
  );
}
```

Use the cart hook anywhere.
```
import {useCart} from 'snappycart';

export function AddToCartButton() {
const cart = useCart();

return (
<button
onClick={() =>
cart.add({
id: 'sku_123',
name: 'Coffee Beans',
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
