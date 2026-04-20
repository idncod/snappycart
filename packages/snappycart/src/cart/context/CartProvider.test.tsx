import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { CartProvider, useCartContext } from './CartProvider';

describe('CartProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('VT-16 throws outside provider', () => {
    expect(() => renderHook(() => useCartContext())).toThrow(
      'useCart must be used inside a CartProvider',
    );
  });

  it('VT-17 exposes empty initial state', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it('VT-18 adds an item and updates items, totalItems, and subtotal', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 2, imageUrl: 'apple.png' });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.subtotal).toBe(2);
  });

  it('VT-19 removes an item and updates derived values', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 2 }, 2);
      result.current.addItem({ id: 2, name: 'Banana', price: 1 }, 1);
    });

    expect(result.current.totalItems).toBe(3);
    expect(result.current.subtotal).toBe(5);

    act(() => {
      result.current.removeItem(1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(2);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.subtotal).toBe(1);
  });

  it('VT-20 increments and decrements and keeps derived values in sync', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 2 }, 1);
    });

    expect(result.current.totalItems).toBe(1);
    expect(result.current.subtotal).toBe(2);

    act(() => {
      result.current.increment(1);
    });

    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.subtotal).toBe(4);

    act(() => {
      result.current.decrement(1);
    });

    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.subtotal).toBe(2);

    act(() => {
      result.current.decrement(1);
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it('VT-21 clears the cart and resets state', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 2 }, 2);
      result.current.addItem({ id: 2, name: 'Banana', price: 1 }, 1);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.subtotal).toBe(5);

    act(() => {
      result.current.clear();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it('VT-22 adds with explicit quantity as an extra integration scenario', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, name: 'Apple', price: 1 }, 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.subtotal).toBe(3);
  });
});
