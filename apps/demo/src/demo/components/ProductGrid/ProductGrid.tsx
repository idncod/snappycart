import type { CartProduct } from 'snappycart';
import styles from './ProductGrid.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';

export function ProductGrid({
  products,
  onAdd,
}: {
  products: CartProduct[];
  onAdd: (product: CartProduct, qty?: number) => void;
}) {
  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
