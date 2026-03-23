import { useEffect, useId, useRef } from 'react';
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
  const titleId = useId();

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
      <div className="snappycart-overlay" onClick={onClose} aria-hidden="true" />

      <aside
        className="snappycart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="snappycart-drawer-header">
          <h3 id={titleId} className="snappycart-drawer-title">
            {title} ({totalItems})
          </h3>

          <button
            ref={closeRef}
            className="snappycart-close-button"
            onClick={onClose}
            type="button"
            aria-label="Close cart"
          >
            Close
          </button>
        </header>

        <div className="snappycart-drawer-body">
          {items.length === 0 ? (
            <p className="snappycart-empty">Your cart is empty.</p>
          ) : (
            items.map((li) => (
              <div className="snappycart-item" key={String(li.product.id)}>
                {li.product.imageUrl ? (
                  <img
                    className="snappycart-item-image"
                    src={li.product.imageUrl}
                    alt={li.product.name}
                  />
                ) : (
                  <div className="snappycart-item-image snappycart-item-image--placeholder" />
                )}

                <div className="snappycart-item-content">
                  <div className="snappycart-item-name">{li.product.name}</div>
                  <div className="snappycart-item-price">{formatMoney(li.product.price)}</div>
                </div>

                <div className="snappycart-item-actions">
                  <div className="snappycart-qty" aria-label={`Quantity for ${li.product.name}`}>
                    <button
                      type="button"
                      className="snappycart-qty-button"
                      onClick={() => decrement(li.product.id)}
                      aria-label={`Decrease quantity of ${li.product.name}`}
                    >
                      -
                    </button>

                    <span className="snappycart-qty-value">{li.quantity}</span>

                    <button
                      type="button"
                      className="snappycart-qty-button"
                      onClick={() => increment(li.product.id)}
                      aria-label={`Increase quantity of ${li.product.name}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="snappycart-remove-button"
                    onClick={() => removeItem(li.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="snappycart-footer">
          <div className="snappycart-row">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              className="snappycart-button snappycart-button--danger"
              onClick={clear}
            >
              Clear cart
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
