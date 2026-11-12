
import { describe, expect, it } from "vitest";
import { filterProducts, paginate, sortProducts } from "@/lib/catalog";
import { parseFilters } from "@/lib/filters";
import type { Product } from "@/types/product";

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "1",
    slug: "test-product",
    name: "Test Product",
    brand: "Apex",
    category: "keyboard",
    description: "",
    wireless: false,
    specs: {},
    featured: false,
    variants: [
      { id: "v1", sku: "T-1", label: "Default", priceCents: 5000, stock: 5 },
    ],
    ...overrides,
  };
}

describe("filterProducts", () => {
  it("filters by category", () => {
    const products = [
      makeProduct({ id: "1", category: "keyboard" }),
      makeProduct({ id: "2", category: "mouse" }),
    ];

    const result = filterProducts(
      products,
      parseFilters({ category: "mouse" })
    );

    expect(result.map((p) => p.id)).toEqual(["2"]);
  });

  it("filters by brand case-insensitively", () => {
    const products = [
      makeProduct({ id: "1", brand: "Apex" }),
      makeProduct({ id: "2", brand: "Logitech" }),
    ];

    const result = filterProducts(
      products,
      parseFilters({ brand: "apex" })
    );

    expect(result.map((p) => p.id)).toEqual(["1"]);
  });

  it("searches in product name and brand", () => {
    const products = [
      makeProduct({ id: "1", name: "Gaming Keyboard" }),
      makeProduct({ id: "2", brand: "Logitech" }),
      makeProduct({ id: "3", name: "Gaming Mouse", brand: "Apex" }),
    ];

    const result = filterProducts(
      products,
      parseFilters({ q: "logitech" })
    );

    expect(result.map((p) => p.id)).toEqual(["2"]);
  });

  it("filters by price range using the lowest variant price", () => {
    const products = [
      makeProduct({
        id: "1",
        variants: [
          { id: "v1", sku: "T-1", label: "Cheap", priceCents: 3000, stock: 5 },
          { id: "v2", sku: "T-2", label: "Expensive", priceCents: 8000, stock: 5 },
        ],
      }),
      makeProduct({
        id: "2",
        variants: [
          { id: "v3", sku: "T-3", label: "Default", priceCents: 9000, stock: 5 },
        ],
      }),
    ];

    const result = filterProducts(
      products,
      parseFilters({ max: "50" })
    );

    expect(result.map((p) => p.id)).toEqual(["1"]);
  });
});

describe("sortProducts", () => {
  it("sorts products by price ascending", () => {
    const products = [
      makeProduct({
        id: "1",
        variants: [
          { id: "v1", sku: "T-1", label: "Default", priceCents: 9000, stock: 5 },
        ],
      }),
      makeProduct({
        id: "2",
        variants: [
          { id: "v2", sku: "T-2", label: "Default", priceCents: 3000, stock: 5 },
        ],
      }),
    ];

    const result = sortProducts(products, "price-asc");

    expect(result.map((p) => p.id)).toEqual(["2", "1"]);
  });

  it("does not mutate the original array", () => {
    const products = [
      makeProduct({ id: "1" }),
      makeProduct({ id: "2" }),
    ];

    const originalOrder = products.map((p) => p.id);

    sortProducts(products, "price-asc");

    expect(products.map((p) => p.id)).toEqual(originalOrder);
  });
});

describe("paginate", () => {
  const products = Array.from({ length: 30 }, (_, index) =>
    makeProduct({ id: String(index + 1) })
  );

  it("returns 12 products on the first page", () => {
    const result = paginate(products, 1);

    expect(result.items).toHaveLength(12);
    expect(result.page).toBe(1);
  });

  it("returns 6 products on the third page", () => {
    const result = paginate(products, 3);

    expect(result.items).toHaveLength(6);
    expect(result.page).toBe(3);
  });

  it("clamps an invalid page to the last page", () => {
    const result = paginate(products, 99);

    expect(result.page).toBe(3);
    expect(result.items).toHaveLength(6);
  });
});
