import type { CartProduct } from '../../../cart/types/types';
import styles from './ProductCard.module.scss';

function formatMoneyGBP(value: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
}

export function ProductCard({
  product,
  onAdd,
}: {
  product: CartProduct;
  onAdd: (product: CartProduct, qty?: number) => void;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.emoji} aria-hidden="true">
          {product.name === 'Apple' ? '🍎' : product.name === 'Banana' ? '🍌' : '🛒'}
        </div>
        <div className={styles.tag}>Demo</div>
      </div>

      <div className={styles.name}>{product.name}</div>

      <div className={styles.bottom}>
        <div className={styles.price}>{formatMoneyGBP(product.price)}</div>
        <button className={styles.button} type="button" onClick={() => onAdd(product, 1)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
