import { describe, expect, it } from "vitest";
import { parseFilters, toSearchParams } from "@/lib/filters";

describe("parseFilters", () => {
  it("returns defaults for empty params", () => {
    expect(parseFilters({})).toEqual({
      q: "",
      categories: [],
      brands: [],
      sort: "newest",
      page: 1,
    });
  });

  it("reads comma-separated and repeated lists the same way", () => {
    const commas = parseFilters({ category: "keyboard,mouse" });
    const repeated = parseFilters({ category: ["keyboard", "mouse"] });
    expect(commas.categories).toEqual(["keyboard", "mouse"]);
    expect(repeated.categories).toEqual(["keyboard", "mouse"]);
  });

  it("ignores unknown categories", () => {
    expect(parseFilters({ category: "laptop,mouse" }).categories).toEqual([
      "mouse",
    ]);
  });

  it("falls back to page 1 for invalid pages", () => {
    expect(parseFilters({ page: "abc" }).page).toBe(1);
    expect(parseFilters({ page: "0" }).page).toBe(1);
    expect(parseFilters({ page: "-3" }).page).toBe(1);
    expect(parseFilters({ page: "2.5" }).page).toBe(1);
    expect(parseFilters({ page: "3" }).page).toBe(3);
  });

  it("falls back to the default sort for unknown values", () => {
    expect(parseFilters({ sort: "cheapest" }).sort).toBe("newest");
    expect(parseFilters({ sort: "price-asc" }).sort).toBe("price-asc");
  });

  it("parses prices and ignores invalid ones", () => {
    const filters = parseFilters({ min: "50", max: "abc" });
    expect(filters.minPrice).toBe(50);
    expect(filters.maxPrice).toBeUndefined();
  });

  it("parses wireless as true, false or undefined", () => {
    expect(parseFilters({ wireless: "true" }).wireless).toBe(true);
    expect(parseFilters({ wireless: "false" }).wireless).toBe(false);
    expect(parseFilters({ wireless: "maybe" }).wireless).toBeUndefined();
  });
});

describe("toSearchParams", () => {
  it("leaves out default values", () => {
    expect(toSearchParams(parseFilters({}))).toBe("");
  });

  it("round-trips through parseFilters", () => {
    const filters = parseFilters({
      q: "apex",
      category: "keyboard",
      brand: "Apex,Nova",
      min: "50",
      max: "150",
      wireless: "true",
      sort: "price-asc",
      page: "2",
    });
    const params = Object.fromEntries(
      new URLSearchParams(toSearchParams(filters)),
    );
    expect(parseFilters(params)).toEqual(filters);
  });
});

describe("buildProductsUrl", () => {
  it("returns the bare path for default filters", () => {
    expect(buildProductsUrl(parseFilters({}))).toBe("/products");
  });

  it("includes only non-default values", () => {
    expect(buildProductsUrl(parseFilters({ q: "apex", page: "2" }))).toBe(
      "/products?q=apex&page=2",
    );
  });
});