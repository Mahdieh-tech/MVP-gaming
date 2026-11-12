import type { Category } from "@/types/product";

export const SORT_OPTIONS = ["newest", "price-asc", "price-desc", "name"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export type ProductFilters = {
  q: string;
  categories: Category[];
  brands: string[];
  minPrice?: number; // whole dollars
  maxPrice?: number;
  wireless?: boolean; // undefined means either
  sort: SortOption;
  page: number;
};