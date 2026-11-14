export type CartItem = {
  variantId: string;
  productSlug: string;
  productName: string;
  variantLabel: string;
  priceCents: number;
  imageUrl?: string;
  quantity: number;
  maxQuantity: number; // lowest of the stock and the per-line limit when added
};