import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from './CartProvider';
import React from 'react';

describe('CartProvider', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('adds an item to the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', image: 'apple.png', quantity: 1 });
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('increases quantity if item exists', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', image: 'apple.png', quantity: 1 });
      result.current.addItem({ id: 1, name: 'Apple', image: 'apple.png', quantity: 2 });
    });

    expect(result.current.cart[0].quantity).toBe(3);
  });

  it('decreases quantity and removes if zero', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', image: 'apple.png', quantity: 2 });
      result.current.decreaseItem(1);
      result.current.decreaseItem(1);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('removes item directly', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 2, name: 'Banana', image: 'banana.png', quantity: 1 });
      result.current.removeItem(2);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', image: 'apple.png', quantity: 1 });
      result.current.addItem({ id: 2, name: 'Banana', image: 'banana.png', quantity: 1 });
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
