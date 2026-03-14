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
      <div className="sc-overlay" data-cy="cart-overlay" onClick={onClose} />
      <aside
        className="sc-drawer"
        data-cy="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="sc-drawer-header" data-cy="cart-header">
          <h3 className="sc-drawer-title" data-cy="cart-title">
            {title} ({totalItems})
          </h3>
          <button
            ref={closeRef}
            className="sc-close"
            data-cy="cart-close"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </header>

        <div className="sc-drawer-body" data-cy="cart-body">
          {items.length === 0 ? (
            <p data-cy="cart-empty">Your cart is empty.</p>
          ) : (
            items.map((li) => (
              <div
                className="sc-item"
                data-cy={`cart-item-${String(li.product.id)}`}
                key={String(li.product.id)}
              >
                {li.product.imageUrl ? (
                  <img
                    className="sc-item-img"
                    src={li.product.imageUrl}
                    alt={li.product.name}
                    data-cy={`cart-img-${String(li.product.id)}`}
                  />
                ) : (
                  <div className="sc-item-img" data-cy={`cart-img-${String(li.product.id)}`} />
                )}

                <div data-cy={`cart-meta-${String(li.product.id)}`}>
                  <div className="sc-item-name" data-cy={`cart-name-${String(li.product.id)}`}>
                    {li.product.name}
                  </div>
                  <div className="sc-item-price" data-cy={`cart-price-${String(li.product.id)}`}>
                    {formatMoney(li.product.price)}
                  </div>
                </div>

                <div
                  className="sc-item-controls"
                  data-cy={`cart-controls-${String(li.product.id)}`}
                >
                  <div className="sc-qty" data-cy={`cart-qty-${String(li.product.id)}`}>
                    <button
                      type="button"
                      data-cy={`cart-dec-${String(li.product.id)}`}
                      onClick={() => decrement(li.product.id)}
                    >
                      -
                    </button>
                    <span data-cy={`cart-qty-value-${String(li.product.id)}`}>{li.quantity}</span>
                    <button
                      type="button"
                      data-cy={`cart-inc-${String(li.product.id)}`}
                      onClick={() => increment(li.product.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
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

        <footer className="sc-footer" data-cy="cart-footer">
          <div className="sc-row" data-cy="cart-subtotal">
            <span data-cy="cart-subtotal-label">Subtotal</span>
            <span data-cy="cart-subtotal-value">{formatMoney(subtotal)}</span>
          </div>

          {items.length > 0 && (
            <button type="button" className="sc-clear" data-cy="cart-clear" onClick={clear}>
              Clear cart
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
