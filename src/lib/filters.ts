import { CATEGORIES, type Category } from "@/types/product";
import {
  SORT_OPTIONS,
  type ProductFilters,
  type SortOption,
} from "@/types/filters";

export type RawSearchParams = Record<string, string | string[] | undefined>;

export const DEFAULT_SORT: SortOption = "newest";

function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

function isSortOption(value: string | undefined): value is SortOption {
  return SORT_OPTIONS.some((option) => option === value);
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

// Accepts "a,b" and repeated keys (a, b) so plain HTML forms also work.
function list(value: string | string[] | undefined): string[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

function parsePrice(value: string | string[] | undefined): number | undefined {
  const raw = first(value)?.trim();
  if (!raw) return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseWireless(value: string | string[] | undefined): boolean | undefined {
  const raw = first(value);
  if (raw === "true") return true;
  if (raw === "false") return false;
  return undefined;
}

function parsePage(value: string | string[] | undefined): number {
  const parsed = Number(first(value));
  return Number.isInteger(parsed) && parsed >= 1 ? parsed : 1;
}

export function parseFilters(params: RawSearchParams): ProductFilters {
  const sort = first(params.sort);

  return {
    q: first(params.q)?.trim() ?? "",
    categories: list(params.category).filter(isCategory),
    brands: list(params.brand),
    minPrice: parsePrice(params.min),
    maxPrice: parsePrice(params.max),
    wireless: parseWireless(params.wireless),
    sort: isSortOption(sort) ? sort : DEFAULT_SORT,
    page: parsePage(params.page),
  };
}

// Builds the query string for a filters object. Defaults are left out,
// so the URL stays short and clean.
export function toSearchParams(filters: ProductFilters): string {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.categories.length > 0) {
    params.set("category", filters.categories.join(","));
  }
  if (filters.brands.length > 0) params.set("brand", filters.brands.join(","));
  if (filters.minPrice !== undefined) params.set("min", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set("max", String(filters.maxPrice));
  if (filters.wireless !== undefined) {
    params.set("wireless", String(filters.wireless));
  }
  if (filters.sort !== DEFAULT_SORT) params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));

  return params.toString();
}