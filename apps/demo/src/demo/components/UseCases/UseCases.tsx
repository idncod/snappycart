import type { CartProduct } from 'snappycart';
import { useCart } from 'snappycart';
import styles from './UseCases.module.scss';

export function UseCases({
  products,
  onOpenCart,
}: {
  products: CartProduct[];
  onOpenCart: () => void;
}) {
  const { addItem } = useCart();

  const apple = products.find((p) => p.id === 'apple') ?? products[0];
  const banana = products.find((p) => p.id === 'banana') ?? products[1];

  return (
    <div className={styles.grid}>
      <button className={styles.action} type="button" onClick={() => addItem(apple)}>
        Add 1 item
      </button>

      <button className={styles.action} type="button" onClick={() => addItem(banana, 5)}>
        Add quantity in one call
      </button>

      <button className={styles.action} type="button" onClick={onOpenCart}>
        Open drawer
      </button>

      <button className={styles.action} type="button" disabled>
        Remove item (coming soon)
      </button>

      <button className={styles.action} type="button" disabled>
        Clear cart (coming soon)
      </button>
    </div>
  );
}
