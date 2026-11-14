import { describe, expect, it } from "vitest";
import {
  MAX_PER_LINE,
  addToCart,
  getItemCount,
  getSubtotalCents,
  maxQuantityFor,
  removeFromCart,
  setItemQuantity,
} from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type NewItem = Omit<CartItem, "quantity">;

function makeItem(overrides: Partial<NewItem> = {}): NewItem {
  return {
    variantId: "v1",
    productSlug: "test-product",
    productName: "Test Product",
    variantLabel: "Default",
    priceCents: 5000,
    maxQuantity: 5,
    ...overrides,
  };
}

function makeLine(overrides: Partial<CartItem> = {}): CartItem {
  return { ...makeItem(), quantity: 1, ...overrides };
}

describe("addToCart", () => {
  it("adds a new line with the requested quantity", () => {
    const result = addToCart([], makeItem(), 2);
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it("adds one by default", () => {
    expect(addToCart([], makeItem())[0].quantity).toBe(1);
  });

  it("merges the same variant into one line", () => {
    const first = addToCart([], makeItem(), 1);
    const second = addToCart(first, makeItem(), 2);
    expect(second).toHaveLength(1);
    expect(second[0].quantity).toBe(3);
  });

  it("never goes above the maximum quantity when merging", () => {
    const first = addToCart([], makeItem({ maxQuantity: 3 }), 2);
    const second = addToCart(first, makeItem({ maxQuantity: 3 }), 5);
    expect(second[0].quantity).toBe(3);
  });

  it("caps the quantity of a new line at the maximum", () => {
    const result = addToCart([], makeItem({ maxQuantity: 3 }), 8);
    expect(result[0].quantity).toBe(3);
  });

  it("ignores items that are out of stock", () => {
    expect(addToCart([], makeItem({ maxQuantity: 0 }))).toEqual([]);
  });

  it("ignores zero and negative quantities", () => {
    expect(addToCart([], makeItem(), 0)).toEqual([]);
    expect(addToCart([], makeItem(), -1)).toEqual([]);
  });

  it("rounds fractional quantities down", () => {
    expect(addToCart([], makeItem(), 2.7)[0].quantity).toBe(2);
  });

  it("refreshes the display copy when the same variant is added again", () => {
    const first = addToCart([], makeItem({ priceCents: 5000 }), 1);
    const second = addToCart(first, makeItem({ priceCents: 4500 }), 1);
    expect(second).toHaveLength(1);
    expect(second[0].priceCents).toBe(4500);
    expect(second[0].quantity).toBe(2);
  });

  it("leaves other lines untouched when merging", () => {
    const items = [
      makeLine({ variantId: "v1", quantity: 1 }),
      makeLine({ variantId: "v2", quantity: 4 }),
    ];
    const result = addToCart(items, makeItem({ variantId: "v1" }), 1);
    expect(result.find((line) => line.variantId === "v2")?.quantity).toBe(4);
  });

  it("does not mutate the original cart", () => {
    const original = [makeLine({ variantId: "v1", quantity: 1 })];
    const snapshot = structuredClone(original);

    addToCart(original, makeItem({ variantId: "v1" }), 2);
    addToCart(original, makeItem({ variantId: "v2" }), 1);

    expect(original).toEqual(snapshot);
  });
});

describe("removeFromCart", () => {
  it("removes only the matching line", () => {
    const items = [makeLine({ variantId: "v1" }), makeLine({ variantId: "v2" })];
    const result = removeFromCart(items, "v1");
    expect(result.map((line) => line.variantId)).toEqual(["v2"]);
  });

  it("leaves the cart unchanged for an unknown id", () => {
    const items = [makeLine({ variantId: "v1" })];
    expect(removeFromCart(items, "nope")).toEqual(items);
  });

  it("does not mutate the original cart", () => {
    const items = [makeLine({ variantId: "v1" }), makeLine({ variantId: "v2" })];
    removeFromCart(items, "v1");
    expect(items).toHaveLength(2);
  });
});

describe("setItemQuantity", () => {
  it("updates the quantity of a line", () => {
    const items = [makeLine({ variantId: "v1", quantity: 1 })];
    expect(setItemQuantity(items, "v1", 3)[0].quantity).toBe(3);
  });

  it("removes the line when the quantity is zero", () => {
    const items = [makeLine({ variantId: "v1", quantity: 2 })];
    expect(setItemQuantity(items, "v1", 0)).toEqual([]);
  });

  it("removes the line when the quantity is negative", () => {
    const items = [makeLine({ variantId: "v1", quantity: 2 })];
    expect(setItemQuantity(items, "v1", -4)).toEqual([]);
  });

  it("clamps a too-high quantity to the line maximum", () => {
    const items = [makeLine({ variantId: "v1", quantity: 1, maxQuantity: 5 })];
    expect(setItemQuantity(items, "v1", 99)[0].quantity).toBe(5);
  });

  it("rounds fractional quantities down", () => {
    const items = [makeLine({ variantId: "v1", quantity: 1 })];
    expect(setItemQuantity(items, "v1", 2.9)[0].quantity).toBe(2);
  });

  it("leaves the cart unchanged for an unknown id", () => {
    const items = [makeLine({ variantId: "v1", quantity: 2 })];
    expect(setItemQuantity(items, "nope", 4)).toEqual(items);
  });

  it("leaves the cart unchanged when the quantity is not a number", () => {
    const items = [makeLine({ variantId: "v1", quantity: 2 })];
    expect(setItemQuantity(items, "v1", Number.NaN)).toEqual(items);
  });
});

describe("getItemCount", () => {
  it("returns 0 for an empty cart", () => {
    expect(getItemCount([])).toBe(0);
  });

  it("adds up quantities across lines", () => {
    const items = [
      makeLine({ variantId: "v1", quantity: 2 }),
      makeLine({ variantId: "v2", quantity: 3 }),
    ];
    expect(getItemCount(items)).toBe(5);
  });
});

describe("getSubtotalCents", () => {
  it("returns 0 for an empty cart", () => {
    expect(getSubtotalCents([])).toBe(0);
  });

  it("multiplies price by quantity and adds the lines", () => {
    const items = [
      makeLine({ variantId: "v1", priceCents: 5000, quantity: 2 }),
      makeLine({ variantId: "v2", priceCents: 3000, quantity: 1 }),
    ];
    expect(getSubtotalCents(items)).toBe(13000);
  });
});

describe("maxQuantityFor", () => {
  it("uses the stock when it is below the line limit", () => {
    expect(maxQuantityFor(3)).toBe(3);
  });

  it("caps the quantity at the line limit", () => {
    expect(maxQuantityFor(50)).toBe(MAX_PER_LINE);
  });

  it("returns 0 for no stock or negative stock", () => {
    expect(maxQuantityFor(0)).toBe(0);
    expect(maxQuantityFor(-2)).toBe(0);
  });
});