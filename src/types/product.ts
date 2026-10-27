export type Category = "keyboard" | "mouse" | "headset" | "mousepad";

export type SpecValue = string | number | boolean;

export interface ProductVariant {
  id: string;
  sku: string;
  label: string; // e.g. "Red switches"
  priceCents: number; // whole cents, never decimals
  compareAtPriceCents?: number; // optional original price
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  wireless: boolean;
  specs: Record<string, SpecValue>; // layout, DPI, weight...
  imageUrl?: string;
  featured: boolean;
  variants: ProductVariant[];
}
