export type CartItemId = string | number;

export type CartProduct = {
  id: CartItemId;
  name: string;
  price: number;
  imageUrl?: string;
  metadata?: Record<string, unknown>;
};

export type CartLineItem = {
  product: CartProduct;
  quantity: number;
};
