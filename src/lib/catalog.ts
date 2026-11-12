import type { Product } from "@/types/product";
import type { ProductFilters, SortOption } from "@/types/filters";

export const PAGE_SIZE = 12;

export type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
};

export function lowestPriceCents(product: Product): number {
  return Math.min(...product.variants.map((variant) => variant.priceCents));
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  const query = filters.q.toLowerCase();

  return products.filter((product) => {
    if (
      query &&
      !product.name.toLowerCase().includes(query) &&
      !product.brand.toLowerCase().includes(query)
    ) {
      return false;
    }
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }
    if (
      filters.brands.length > 0 &&
      !filters.brands.some(
        (brand) => brand.toLowerCase() === product.brand.toLowerCase(),
      )
    ) {
      return false;
    }
    if (filters.wireless !== undefined && product.wireless !== filters.wireless) {
      return false;
    }

    const price = lowestPriceCents(product);
    if (filters.minPrice !== undefined && price < filters.minPrice * 100) {
      return false;
    }
    if (filters.maxPrice !== undefined && price > filters.maxPrice * 100) {
      return false;
    }

    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products]; // never mutate the input

  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => lowestPriceCents(a) - lowestPriceCents(b));
    case "price-desc":
      return copy.sort((a, b) => lowestPriceCents(b) - lowestPriceCents(a));
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return copy; // the query already returns newest first
  }
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number = PAGE_SIZE,
): Paginated<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    total: items.length,
  };
}

export function queryCatalog(
  products: Product[],
  filters: ProductFilters,
): Paginated<Product> {
  const filtered = filterProducts(products, filters);
  return paginate(sortProducts(filtered, filters.sort), filters.page);
}

export function getBrands(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b),
  );
}