import { useMemo, useState } from 'react';
import CartDrawer from './cart/components/CartDrawer';
import CartIcon from './cart/components/CartIcon/CartIcon';
import { useCart } from './cart/hooks/useCart';
import type { CartProduct } from './cart/types/types';

export default function App() {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);

  const products = useMemo<CartProduct[]>(
    () => [
      { id: 'apple', name: 'Apple', price: 0.6, imageUrl: 'apple.png' },
      { id: 'banana', name: 'Banana', price: 0.4, imageUrl: 'banana.png' },
    ],
    [],
  );

  return (
    <>
      <h1>Demo eCommerce</h1>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => addItem(products[0])} type="button">
          Add Apple
        </button>
        <button onClick={() => addItem(products[1], 2)} type="button">
          Add 2 Bananas
        </button>
      </div>

      <CartIcon onClick={() => setOpen(true)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
