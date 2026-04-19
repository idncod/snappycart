import { useCart } from '../../hooks/useCart';

type CartIconProps = {
  position?: 'top-right' | 'bottom-right' | 'inline';
  onClick: () => void;
};

export default function CartIcon({ position = 'bottom-right', onClick }: CartIconProps) {
  const { totalItems } = useCart();

  const posClass =
    position === 'top-right'
      ? 'snappycart-cart-icon--top-right'
      : position === 'inline'
        ? 'snappycart-cart-icon--inline'
        : 'snappycart-cart-icon--bottom-right';

  return (
    <button
      type="button"
      className={`snappycart-cart-icon ${posClass}`}
      onClick={onClick}
      aria-label={`Open cart, ${totalItems} items`}
      data-testid="cart-icon"
      data-cy="cart-icon"
    >
      <span className="snappycart-cart-icon__label">Cart</span>
      <span className="snappycart-cart-icon__badge" data-testid="cart-badge" data-cy="cart-badge">
        {totalItems}
      </span>
    </button>
  );
}
