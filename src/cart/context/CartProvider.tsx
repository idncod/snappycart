import { createContext, useReducer, useContext, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'DECREASE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<
  | {
      cart: CartItem[];
      addItem: (item: CartItem) => void;
      removeItem: (id: number) => void;
      decreaseItem: (id: number) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case 'DECREASE_ITEM':
      return {
        items: state.items
          .map((i) => (i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const decreaseItem = (id: number) => dispatch({ type: 'DECREASE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{ cart: state.items, addItem, removeItem, decreaseItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartContext must be used inside a CartProvider');
  return context;
};
