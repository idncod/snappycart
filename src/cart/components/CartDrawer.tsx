import { useCart } from '../hooks/useCart';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cart, removeItem, decreaseItem, addItem, clearCart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="cart-drawer">
      <h3>Your Cart ({totalItems})</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} width={40} height={40} />
            <span>{item.name}</span>
            <div className="qty-controls">
              <button onClick={() => decreaseItem(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addItem({ ...item, quantity: 1 })}>+</button>
            </div>
            <button onClick={() => removeItem(item.id)}>×</button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <button onClick={clearCart} className="clear-btn">
          Clear Cart
        </button>
      )}
    </aside>
  );
};

export default CartDrawer;
