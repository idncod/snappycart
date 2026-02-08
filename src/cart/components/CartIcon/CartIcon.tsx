import { useCart } from '../../hooks/useCart';

type CartIconProps = {
  position?: 'top-right' | 'bottom-right' | 'inline';
  onClick: () => void;
};

export default function CartIcon({ position = 'bottom-right', onClick }: CartIconProps) {
  const { totalItems } = useCart();

  const posClass =
    position === 'top-right'
      ? 'sc-top-right'
      : position === 'inline'
        ? 'sc-inline'
        : 'sc-bottom-right';

  return (
    <button type="button" className={`sc-cart-button ${posClass}`} onClick={onClick}>
      Cart
      <span className="sc-cart-badge">{totalItems}</span>
    </button>
  );
}
