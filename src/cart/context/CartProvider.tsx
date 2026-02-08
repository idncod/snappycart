import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import type { CartItemId, CartLineItem, CartProduct } from '../types/types';
import { cartReducer, getSubtotal, getTotalItems, initialCartState } from '../reducer/cartReducer';

type CartContextValue = {
  items: CartLineItem[];
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (id: CartItemId) => void;
  increment: (id: CartItemId) => void;
  decrement: (id: CartItemId) => void;
  setQuantity: (id: CartItemId, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const value = useMemo<CartContextValue>(() => {
    const items = state.items;

    return {
      items,
      addItem: (product, quantity = 1) =>
        dispatch({ type: 'ADD_ITEM', payload: { product, quantity } }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
      increment: (id) => dispatch({ type: 'INCREMENT_ITEM', payload: { id } }),
      decrement: (id) => dispatch({ type: 'DECREMENT_ITEM', payload: { id } }),
      setQuantity: (id, quantity) => dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } }),
      clear: () => dispatch({ type: 'CLEAR_CART' }),
      totalItems: getTotalItems(items),
      subtotal: getSubtotal(items),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
};
