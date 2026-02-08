import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from './CartProvider';

describe('CartProvider', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('adds an item to the cart with default quantity 1', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 1, imageUrl: 'apple.png' });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('adds with explicit quantity', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 1 }, 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it('increments and decrements, removing at zero', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 1 }, 1);
      result.current.increment(1);
      result.current.decrement(1);
      result.current.decrement(1);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('removes item directly', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 2, name: 'Banana', price: 1 }, 1);
      result.current.removeItem(2);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('computes totals', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 2 }, 2);
      result.current.addItem({ id: 2, name: 'Banana', price: 1 }, 1);
    });

    expect(result.current.totalItems).toBe(3);
    expect(result.current.subtotal).toBe(5);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 1 }, 1);
      result.current.addItem({ id: 2, name: 'Banana', price: 1 }, 1);
      result.current.clear();
    });

    expect(result.current.items).toHaveLength(0);
  });
});
