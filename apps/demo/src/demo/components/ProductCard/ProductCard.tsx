import type { CartProduct } from 'snappycart';
import styles from './ProductCard.module.scss';

function formatMoneyGBP(value: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
}

function getFruitEmoji(name: string): string {
  const key = name.toLowerCase();

  const map: Record<string, string> = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    strawberry: '🍓',
    grapes: '🍇',
    grape: '🍇',
    kiwi: '🥝',
    pineapple: '🍍',
    mango: '🥭',
    watermelon: '🍉',
    lemon: '🍋',
    lime: '🍋',
    pear: '🍐',
    peach: '🍑',
    cherry: '🍒',
    raspberry: '🍓',
    blueberry: '🫐',
  };

  return map[key] ?? '🍏';
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
          {getFruitEmoji(product.name)}
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
