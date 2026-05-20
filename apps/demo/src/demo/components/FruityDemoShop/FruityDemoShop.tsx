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

type WikimediaImageInfo = {
  url?: string;
  thumburl?: string;
};

type WikimediaPage = {
  imageinfo?: WikimediaImageInfo[];
};

type WikimediaImageResponse = {
  query?: {
    pages?: Record<string, WikimediaPage>;
  };
};

const imageCache = new Map<string, string>();

function toDemoPrice(fruit: FruityViceFruit): number {
  return Number((0.79 + fruit.nutritions.sugar * 0.06).toFixed(2));
}

function normaliseFruitName(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function getSearchableFruitName(name: string): string {
  const key = normaliseFruitName(name);

  const aliases: Record<string, string> = {
    greenapple: 'apple',
    'green apple': 'apple',
    kiwifruit: 'kiwi fruit',
    pitahaya: 'dragon fruit',
    dragonfruit: 'dragon fruit',
    passionfruit: 'passion fruit',
    hornedmelon: 'kiwano fruit',
    'horned melon': 'kiwano fruit',
    japanesepersimmon: 'persimmon fruit',
    'japanese persimmon': 'persimmon fruit',
    ceylongooseberry: 'gooseberry fruit',
    'ceylon gooseberry': 'gooseberry fruit',
    morus: 'blackberry fruit',
    annona: 'custard apple fruit',
  };

  return aliases[key] ?? `${key} fruit`;
}

function getFallbackImageUrl(name: string): string {
  const text = encodeURIComponent(name.slice(0, 2).toUpperCase());

  return `https://placehold.co/160x160/f4f4f5/18181b?text=${text}`;
}

async function getFruitImageUrl(name: string): Promise<string> {
  const searchableName = getSearchableFruitName(name);
  const cacheKey = normaliseFruitName(searchableName);
  const cachedImage = imageCache.get(cacheKey);

  if (cachedImage) {
    return cachedImage;
  }

  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrlimit=1&gsrsearch=${encodeURIComponent(
    searchableName,
  )}&prop=imageinfo&iiprop=url&iiurlwidth=300`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Image request failed with status ${response.status}`);
    }

    const data = (await response.json()) as WikimediaImageResponse;
    const pages = Object.values(data.query?.pages ?? {});
    const imageUrl = pages
      .flatMap((page) => page.imageinfo ?? [])
      .map((imageInfo) => imageInfo.thumburl ?? imageInfo.url)
      .find((value): value is string => Boolean(value));

    if (!imageUrl) {
      throw new Error('No matching image found.');
    }

    imageCache.set(cacheKey, imageUrl);

    return imageUrl;
  } catch {
    const fallbackUrl = getFallbackImageUrl(name);
    imageCache.set(cacheKey, fallbackUrl);

    return fallbackUrl;
  }
}

async function mapFruitToProduct(fruit: FruityViceFruit): Promise<CartProduct> {
  const sharedImageUrl = getSharedDemoImageUrl(fruit.name);

  return {
    id: getStableProductId(fruit.name, fruit.id),
    name: fruit.name,
    price: toDemoPrice(fruit),
    imageUrl: sharedImageUrl ?? (await getFruitImageUrl(fruit.name)),
  };
}

function getStableProductId(name: string, fallbackId: number): string {
  const key = name.toLowerCase().replace(/\s+/g, '-');

  const sharedDemoIds: Record<string, string> = {
    apple: 'apple',
    banana: 'banana',
    orange: 'orange',
    strawberry: 'strawberry',
    strawberries: 'strawberry',
  };

  return sharedDemoIds[key] ?? `fruit-${fallbackId}`;
}

function getSharedDemoImageUrl(name: string): string | undefined {
  const key = name.toLowerCase();

  const map: Record<string, string> = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    strawberry: '🍓',
    strawberries: '🍓',
  };

  const emoji = map[key];

  if (!emoji) {
    return undefined;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="40" fill="#f4f4f5"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="88">${emoji}</text></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const fallbackProducts: CartProduct[] = [
  {
    id: 'apple',
    name: 'Apple',
    price: 0.6,
    imageUrl: getSharedDemoImageUrl('Apple') ?? getFallbackImageUrl('Apple'),
  },
  {
    id: 'banana',
    name: 'Banana',
    price: 0.4,
    imageUrl: getSharedDemoImageUrl('Banana') ?? getFallbackImageUrl('Banana'),
  },
  {
    id: 'orange',
    name: 'Orange',
    price: 1.09,
    imageUrl: getSharedDemoImageUrl('Orange') ?? getFallbackImageUrl('Orange'),
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    price: 1.25,
    imageUrl: getSharedDemoImageUrl('Strawberry') ?? getFallbackImageUrl('Strawberry'),
  },
];

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
        const nextProducts = await Promise.all(data.slice(0, 8).map(mapFruitToProduct));

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
    <div className={styles.wrap} data-cy="fruity-demo-shop">
      {loading && (
        <div className={styles.status} data-cy="fruity-demo-loading">
          Loading live fruit products...
        </div>
      )}

      {!loading && error && (
        <div className={`${styles.status} ${styles.error}`} data-cy="fruity-demo-arror">
          {error}
        </div>
      )}

      {!loading && products.length > 0 && (
        <div data-cy="fruity-dem0-grid">
          <ProductGrid products={products} onAdd={onAdd} />
        </div>
      )}

      {!loading && usingFallback && (
        <div className={styles.note} data-cy="fruity-demo-fallback-note">
          Showing fallback demo products so the cart still works.
        </div>
      )}
    </div>
  );
}
