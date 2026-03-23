import { useEffect, useState } from 'react';
import type { CartProduct } from 'snappycart';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import styles from './FruityDemoShop.module.scss';

type FruityViceFruit = {
  id: number;
  name: string;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
};

const fallbackProducts: CartProduct[] = [
  { id: 'fallback-apple', name: 'Apple', price: 0.99 },
  { id: 'fallback-banana', name: 'Banana', price: 0.89 },
  { id: 'fallback-orange', name: 'Orange', price: 1.09 },
  { id: 'fallback-strawberry', name: 'Strawberry', price: 1.49 },
];

function toDemoPrice(fruit: FruityViceFruit): number {
  return Number((0.79 + fruit.nutritions.sugar * 0.06).toFixed(2));
}

function mapFruitToProduct(fruit: FruityViceFruit): CartProduct {
  return {
    id: `fruit-${fruit.id}`,
    name: fruit.name,
    price: toDemoPrice(fruit),
  };
}

export function FruityDemoShop({ onAdd }: { onAdd: (product: CartProduct, qty?: number) => void }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadFruits = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://www.fruityvice.com/api/fruit/all');

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as FruityViceFruit[];
        const nextProducts = data.slice(0, 8).map(mapFruitToProduct);

        if (!cancelled) {
          setProducts(nextProducts);
          setUsingFallback(false);
        }
      } catch {
        if (!cancelled) {
          setProducts(fallbackProducts);
          setUsingFallback(true);
          setError('Live fruit data is unavailable right now.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadFruits();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={styles.wrap}>
      {loading && <div className={styles.status}>Loading live fruit products...</div>}

      {!loading && error && <div className={`${styles.status} ${styles.error}`}>{error}</div>}

      {!loading && products.length > 0 && <ProductGrid products={products} onAdd={onAdd} />}

      {!loading && usingFallback && (
        <div className={styles.note}>Showing fallback demo products so the cart still works.</div>
      )}
    </div>
  );
}
