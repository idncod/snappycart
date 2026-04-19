import { useEffect, useId, useRef } from 'react';
import { useCart } from '../hooks/useCart';

function toTestKey(id: string | number): string {
  return String(id)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-');
}

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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="snappycart-overlay"
        onClick={onClose}
        aria-hidden="true"
        data-testid="cart-overlay"
        data-cy="cart-overlay"
      />

      <aside
        className="snappycart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="cart-drawer"
        data-cy="cart-drawer"
      >
        <header className="snappycart-drawer-header">
          <h3
            id={titleId}
            className="snappycart-drawer-title"
            data-testid="cart-drawer-title"
            data-cy="cart-drawer-title"
          >
            {title} ({totalItems})
          </h3>

          <button
            ref={closeRef}
            className="snappycart-close-button"
            onClick={onClose}
            type="button"
            aria-label="Close cart"
            data-testid="cart-close"
            data-cy="cart-close"
          >
            Close
          </button>
        </header>

        <div className="snappycart-drawer-body">
          {items.length === 0 ? (
            <p
              className="snappycart-empty"
              data-testid="empty-cart-state"
              data-cy="cart-empty"
              data-qa="empty-cart-state"
            >
              Your cart is empty.
            </p>
          ) : (
            items.map((lineItem) => {
              const testKey = toTestKey(lineItem.product.id);

              return (
                <div
                  className="snappycart-item"
                  key={String(lineItem.product.id)}
                  data-cy={`cart-item-${lineItem.product.id}`}
                  data-testid={`cart-item-${testKey}`}
                >
                  {lineItem.product.imageUrl ? (
                    <img
                      className="snappycart-item-image"
                      src={lineItem.product.imageUrl}
                      alt={lineItem.product.name}
                    />
                  ) : (
                    <div className="snappycart-item-image snappycart-item-image--placeholder" />
                  )}

                  <div className="snappycart-item-content">
                    <div
                      className="snappycart-item-name"
                      data-testid={`cart-item-name-${testKey}`}
                      data-cy={`cart-item-name-${testKey}`}
                    >
                      {lineItem.product.name}
                    </div>
                    <div className="snappycart-item-price">
                      {formatMoney(lineItem.product.price)}
                    </div>
                  </div>

                  <div className="snappycart-item-actions">
                    <div
                      className="snappycart-qty"
                      aria-label={`Quantity for ${lineItem.product.name}`}
                    >
                      <button
                        type="button"
                        className="snappycart-qty-button"
                        onClick={() => decrement(lineItem.product.id)}
                        aria-label={`Decrease quantity of ${lineItem.product.name}`}
                        data-cy={`cart-dec-${lineItem.product.id}`}
                        data-testid={`cart-decrement-${testKey}`}
                      >
                        −
                      </button>

                      <span
                        className="snappycart-qty-value"
                        data-cy={`cart-qty-${lineItem.product.id}`}
                        data-testid={`cart-quantity-${testKey}`}
                      >
                        {lineItem.quantity}
                      </span>

                      <button
                        type="button"
                        className="snappycart-qty-button"
                        onClick={() => increment(lineItem.product.id)}
                        aria-label={`Increase quantity of ${lineItem.product.name}`}
                        data-cy={`cart-inc-${lineItem.product.id}`}
                        data-testid={`cart-increment-${testKey}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="snappycart-remove-button"
                      onClick={() => removeItem(lineItem.product.id)}
                      data-cy={`cart-remove-${lineItem.product.id}`}
                      data-testid={`cart-remove-${testKey}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <footer className="snappycart-footer">
          <div className="snappycart-row" data-cy="cart-subtotal-row">
            <span>Subtotal</span>
            <span data-testid="cart-subtotal" data-cy="cart-subtotal">
              {formatMoney(subtotal)}
            </span>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              className="snappycart-button snappycart-button--ghost"
              onClick={clear}
              data-testid="cart-clear"
              data-cy="cart-clear"
            >
              Clear cart
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
