import React from 'react';
import { useCart } from '../../hooks/useCart';
import CartIcon from './CartIcon';

export function CartIconHarness() {
  const { addItem } = useCart();

  return (
    <div>
      <button
        data-testid="seed-one"
        onClick={() => addItem({ id: 'apple', name: 'Apple', price: 1 }, 1)}
      >
        Seed one
      </button>

      <button
        data-testid="seed-multiple"
        onClick={() => {
          addItem({ id: 'apple', name: 'Apple', price: 1 }, 1);
          addItem({ id: 'banana', name: 'Banana', price: 1 }, 2);
        }}
      >
        Seed multiple
      </button>

      <CartIcon onClick={() => {}} />
    </div>
  );
}
