import { describe, it, expect } from 'vitest';
import {
  cartReducer,
  getSubtotal,
  getTotalItems,
  initialCartState,
  type CartState,
} from './cartReducer';
import type { CartProduct } from '../types/types';

const apple: CartProduct = {
  id: 'apple',
  name: 'Apple',
  price: 1.5,
  imageUrl: '/apple.png',
};

const banana: CartProduct = {
  id: 'banana',
  name: 'Banana',
  price: 2,
  imageUrl: '/banana.png',
};

const withItems = (...items: CartState['items']): CartState => ({ items });

describe('cartReducer (VT)', () => {
  it('VT-01 adds a new item', () => {
    const next = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: { product: apple, quantity: 1 },
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toEqual({
      product: apple,
      quantity: 1,
    });
  });

  it('VT-02 merges quantity when adding an existing item', () => {
    const state = withItems({ product: apple, quantity: 2 });

    const next = cartReducer(state, {
      type: 'ADD_ITEM',
      payload: { product: apple, quantity: 3 },
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toEqual({
      product: apple,
      quantity: 5,
    });
  });

  it('VT-03 normalises invalid quantity on add', () => {
    const next = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: { product: apple, quantity: Number.NaN },
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toEqual({
      product: apple,
      quantity: 1,
    });
  });

  it('VT-04 floors decimal quantity on add', () => {
    const next = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: { product: apple, quantity: 2.9 },
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toEqual({
      product: apple,
      quantity: 2,
    });
  });

  it('VT-05 removes an item', () => {
    const state = withItems({ product: apple, quantity: 1 }, { product: banana, quantity: 2 });

    const next = cartReducer(state, {
      type: 'REMOVE_ITEM',
      payload: { id: 'apple' },
    });

    expect(next.items).toEqual([{ product: banana, quantity: 2 }]);
  });

  it('VT-06 increments an item', () => {
    const state = withItems({ product: apple, quantity: 1 });

    const next = cartReducer(state, {
      type: 'INCREMENT_ITEM',
      payload: { id: 'apple' },
    });

    expect(next.items).toEqual([{ product: apple, quantity: 2 }]);
  });

  it('VT-07 decrements an item above one', () => {
    const state = withItems({ product: apple, quantity: 3 });

    const next = cartReducer(state, {
      type: 'DECREMENT_ITEM',
      payload: { id: 'apple' },
    });

    expect(next.items).toEqual([{ product: apple, quantity: 2 }]);
  });

  it('VT-08 removes an item when decrementing from one', () => {
    const state = withItems({ product: apple, quantity: 1 });

    const next = cartReducer(state, {
      type: 'DECREMENT_ITEM',
      payload: { id: 'apple' },
    });

    expect(next.items).toEqual([]);
  });

  it('VT-09 sets a positive quantity', () => {
    const state = withItems({ product: apple, quantity: 1 });

    const next = cartReducer(state, {
      type: 'SET_QUANTITY',
      payload: { id: 'apple', quantity: 5 },
    });

    expect(next.items).toEqual([{ product: apple, quantity: 5 }]);
  });

  it('VT-10 floors decimal quantity on set', () => {
    const state = withItems({ product: apple, quantity: 1 });

    const next = cartReducer(state, {
      type: 'SET_QUANTITY',
      payload: { id: 'apple', quantity: 3.8 },
    });

    expect(next.items).toEqual([{ product: apple, quantity: 3 }]);
  });

  it('VT-11 removes an item when quantity is set to zero', () => {
    const state = withItems({ product: apple, quantity: 2 });

    const next = cartReducer(state, {
      type: 'SET_QUANTITY',
      payload: { id: 'apple', quantity: 0 },
    });

    expect(next.items).toEqual([]);
  });

  it('VT-12 removes an item when quantity is negative', () => {
    const state = withItems({ product: apple, quantity: 2 });

    const next = cartReducer(state, {
      type: 'SET_QUANTITY',
      payload: { id: 'apple', quantity: -4 },
    });

    expect(next.items).toEqual([]);
  });

  it('VT-13 clears the cart', () => {
    const state = withItems({ product: apple, quantity: 2 }, { product: banana, quantity: 1 });

    const next = cartReducer(state, { type: 'CLEAR_CART' });

    expect(next).toEqual({ items: [] });
  });

  it('VT-14 calculates total items', () => {
    const totalItems = getTotalItems([
      { product: apple, quantity: 2 },
      { product: banana, quantity: 3 },
    ]);

    expect(totalItems).toBe(5);
  });

  it('VT-15 calculates subtotal', () => {
    const subtotal = getSubtotal([
      { product: apple, quantity: 2 },
      { product: banana, quantity: 3 },
    ]);

    expect(subtotal).toBe(9);
  });
});
