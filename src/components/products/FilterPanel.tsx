import Link from "next/link";
import { toSearchParams } from "@/lib/filters";
import {
  SORT_OPTIONS,
  type ProductFilters,
  type SortOption,
} from "@/types/filters";
import { CATEGORIES, type Category } from "@/types/product";

type FilterPanelProps = {
  filters: ProductFilters;
  brands: string[];
};

const CATEGORY_LABELS: Record<Category, string> = {
  keyboard: "Keyboards",
  mouse: "Mice",
  headset: "Headsets",
  mousepad: "Mousepads",
};

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name",
};

const fieldClass =
  "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";

export default function FilterPanel({ filters, brands }: FilterPanelProps) {
  const selectedBrands = filters.brands.map((brand) => brand.toLowerCase());

  return (
    <form
      key={toSearchParams(filters)}
      action="/products"
      method="get"
      className="space-y-6"
    >
      <div>
        <label htmlFor="q" className="text-sm font-medium">
          Search
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={filters.q}
          placeholder="Name or brand"
          className={fieldClass}
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Category</legend>
        <div className="mt-2 space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="category"
                value={category}
                defaultChecked={filters.categories.includes(category)}
                className="accent-accent"
              />
              {CATEGORY_LABELS[category]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium">Brand</legend>
        <div className="mt-2 space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                defaultChecked={selectedBrands.includes(brand.toLowerCase())}
                className="accent-accent"
              />
              {brand}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium">Price (USD)</legend>
        <div className="mt-2 flex items-center gap-2">
          <label htmlFor="min" className="sr-only">
            Minimum price
          </label>
          <input
            id="min"
            name="min"
            type="number"
            min="0"
            defaultValue={filters.minPrice}
            placeholder="Min"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <span aria-hidden="true" className="text-muted">
            to
          </span>
          <label htmlFor="max" className="sr-only">
            Maximum price
          </label>
          <input
            id="max"
            name="max"
            type="number"
            min="0"
            defaultValue={filters.maxPrice}
            placeholder="Max"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </fieldset>

      <div>
        <label htmlFor="wireless" className="text-sm font-medium">
          Connectivity
        </label>
        <select
          id="wireless"
          name="wireless"
          defaultValue={filters.wireless === undefined ? "" : String(filters.wireless)}
          className={fieldClass}
        >
          <option value="">Any</option>
          <option value="true">Wireless</option>
          <option value="false">Wired</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort" className="text-sm font-medium">
          Sort by
        </label>
        <select
          id="sort"
          name="sort"
          defaultValue={filters.sort}
          className={fieldClass}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {SORT_LABELS[option]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Apply filters
        </button>
        <Link href="/products" className="text-sm text-muted hover:text-foreground">
          Clear
        </Link>
      </div>
    </form>
  );
}