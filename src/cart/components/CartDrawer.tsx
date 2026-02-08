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
      <div className="sc-overlay" onClick={onClose} />
      <aside className="sc-drawer" role="dialog" aria-modal="true" aria-label={title}>
        <header className="sc-drawer-header">
          <h3 className="sc-drawer-title">
            {title} ({totalItems})
          </h3>
          <button ref={closeRef} className="sc-close" onClick={onClose} type="button">
            Close
          </button>
        </header>

        <div className="sc-drawer-body">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((li) => (
              <div className="sc-item" key={String(li.product.id)}>
                {li.product.imageUrl ? (
                  <img className="sc-item-img" src={li.product.imageUrl} alt={li.product.name} />
                ) : (
                  <div className="sc-item-img" />
                )}

                <div>
                  <div className="sc-item-name">{li.product.name}</div>
                  <div className="sc-item-price">{formatMoney(li.product.price)}</div>
                </div>

                <div className="sc-item-controls">
                  <div className="sc-qty">
                    <button type="button" onClick={() => decrement(li.product.id)}>
                      -
                    </button>
                    <span>{li.quantity}</span>
                    <button type="button" onClick={() => increment(li.product.id)}>
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="sc-remove"
                    onClick={() => removeItem(li.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="sc-footer">
          <div className="sc-row">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>

          {items.length > 0 && (
            <button type="button" className="sc-clear" onClick={clear}>
              Clear cart
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
