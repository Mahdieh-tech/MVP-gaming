import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats whole cents as dollars", () => {
    expect(formatPrice(8900)).toBe("$89.00");
  });

  it("keeps the cents", () => {
    expect(formatPrice(1999)).toBe("$19.99");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });
});