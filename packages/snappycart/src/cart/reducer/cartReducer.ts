import type { CartItemId, CartLineItem, CartProduct } from '../types/types';

export type CartState = {
  items: CartLineItem[];
};

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: CartProduct; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: CartItemId } }
  | { type: 'INCREMENT_ITEM'; payload: { id: CartItemId } }
  | { type: 'DECREMENT_ITEM'; payload: { id: CartItemId } }
  | { type: 'SET_QUANTITY'; payload: { id: CartItemId; quantity: number } }
  | { type: 'CLEAR_CART' };

export const initialCartState: CartState = { items: [] };

const clampQty = (qty: number) => (Number.isFinite(qty) ? Math.floor(qty) : 0);

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const quantity = Math.max(1, clampQty(action.payload.quantity));
      const { product } = action.payload;

      const existing = state.items.find((li) => li.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((li) =>
            li.product.id === product.id ? { ...li, quantity: li.quantity + quantity } : li,
          ),
        };
      }

      return { items: [...state.items, { product, quantity }] };
    }

    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      return { items: state.items.filter((li) => li.product.id !== id) };
    }

    case 'INCREMENT_ITEM': {
      const { id } = action.payload;
      return {
        items: state.items.map((li) =>
          li.product.id === id ? { ...li, quantity: li.quantity + 1 } : li,
        ),
      };
    }

    case 'DECREMENT_ITEM': {
      const { id } = action.payload;
      return {
        items: state.items
          .map((li) => (li.product.id === id ? { ...li, quantity: li.quantity - 1 } : li))
          .filter((li) => li.quantity > 0),
      };
    }

    case 'SET_QUANTITY': {
      const { id, quantity } = action.payload;
      const q = clampQty(quantity);

      if (q <= 0) return { items: state.items.filter((li) => li.product.id !== id) };

      return {
        items: state.items.map((li) => (li.product.id === id ? { ...li, quantity: q } : li)),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

export function getTotalItems(items: CartLineItem[]) {
  return items.reduce((sum, li) => sum + li.quantity, 0);
}

export function getSubtotal(items: CartLineItem[]) {
  return items.reduce((sum, li) => sum + li.product.price * li.quantity, 0);
}
