import { useEffect, useRef } from 'react';
import { useCart } from '../hooks/useCart';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  formatMoney?: (amount: number) => string;
};

export default function CartDrawer({
  open,
  onClose,
  title = 'Your Cart',
  formatMoney = (n) => `£${n.toFixed(2)}`,
}: CartDrawerProps) {
  const { items, increment, decrement, removeItem, clear, subtotal, totalItems } = useCart();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div data-cy="cart-overlay" className="sc-overlay" onClick={onClose} />
      <aside
        data-cy="cart-drawer"
        className="sc-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header data-cy="cart-drawer-header" className="sc-drawer-header">
          <h3 data-cy="cart-drawer-title" className="sc-drawer-title">
            {title} ({totalItems})
          </h3>

          <button
            data-cy="cart-close"
            ref={closeRef}
            className="sc-close"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </header>

        <div data-cy="cart-drawer-body" className="sc-drawer-body">
          {items.length === 0 ? (
            <p data-cy="empty-cart-state">Your cart is empty.</p>
          ) : (
            items.map((li) => (
              <div
                data-cy={`cart-item-${String(li.product.id)}`}
                className="sc-item"
                key={String(li.product.id)}
              >
                {li.product.imageUrl ? (
                  <img
                    data-cy={`cart-item-image-${String(li.product.id)}`}
                    className="sc-item-img"
                    src={li.product.imageUrl}
                    alt={li.product.name}
                  />
                ) : (
                  <div
                    data-cy={`cart-item-image-placeholder-${String(li.product.id)}`}
                    className="sc-item-img"
                  />
                )}

                <div data-cy={`cart-item-image-details-${String(li.product.id)}`}>
                  <div data-cy={`cart-item-name-${String(li.product.id)}`} className="sc-item-name">
                    {li.product.name}
                  </div>

                  <div
                    data-cy={`cart-item-price-${String(li.product.id)}`}
                    className="sc-item-price"
                  >
                    {formatMoney(li.product.price)}
                  </div>
                </div>

                <div
                  data-cy={`cart-item-controls-${String(li.product.id)}`}
                  className="sc-item-controls"
                >
                  <div data-cy={`cart-qty-${String(li.product.id)}`} className="sc-qty">
                    <button
                      data-cy={`cart-decrement-${String(li.product.id)}`}
                      type="button"
                      onClick={() => decrement(li.product.id)}
                    >
                      -
                    </button>

                    <span data-cy={`cart-quantity-${String(li.product.id)}`}>{li.quantity}</span>

                    <button
                      data-cy={`cart-increment-${String(li.product.id)}`}
                      type="button"
                      onClick={() => increment(li.product.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    data-cy={`cart-remove-${String(li.product.id)}`}
                    type="button"
                    className="sc-remove"
                    data-cy={`cart-remove-${String(li.product.id)}`}
                    onClick={() => removeItem(li.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer data-cy="cart-footer" className="sc-footer">
          <div data-cy="cart-subtotal-row" className="sc-row">
            <span data-cy="cart-subtotal-label">Subtotal</span>
            <span data-cy="cart-subtotal-value">{formatMoney(subtotal)}</span>
          </div>

          {items.length > 0 && (
            <button data-cy="cart-clear" type="button" className="sc-clear" onClick={clear}>
              Clear cart
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
