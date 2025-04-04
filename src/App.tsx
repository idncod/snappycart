import CartDrawer from './cart/components/CartDrawer.tsx';
import { useCart } from './cart/hooks/useCart.ts';

export default function App() {
  const { addItem } = useCart();

  return (
    <>
      <h1>Demo eCommerce</h1>
      <button onClick={() => addItem({ id: 1, name: 'Apple', image: 'apple.png', quantity: 1 })}>
        Add Apple
      </button>
      <CartDrawer />
    </>
  );
}
