import { useCartContext } from '../context/CartProvider';

export const useCart = () => {
  return useCartContext();
};
