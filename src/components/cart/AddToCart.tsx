"use client";

import Link from "next/link";
import { useState } from "react";
import StockBadge from "@/components/products/StockBadge";
import { maxQuantityFor } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types/product";

type AddToCartProps = {
  product: Pick<Product, "slug" | "name" | "imageUrl" | "variants">;
};

const optionBase =
  "flex items-center justify-between gap-4 rounded-lg border px-4 py-3";

export default function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [selectedId, setSelectedId] = useState<string | undefined>(
    () => product.variants.find((variant) => variant.stock > 0)?.id,
  );
  const [added, setAdded] = useState(false);

  const selected = product.variants.find((variant) => variant.id === selectedId);
  const canAdd = selected !== undefined && selected.stock > 0;

  function handleAdd() {
    if (!selected || selected.stock === 0) return;

    addItem({
      variantId: selected.id,
      productSlug: product.slug,
      productName: product.name,
      variantLabel: selected.label,
      priceCents: selected.priceCents,
      imageUrl: product.imageUrl,
      maxQuantity: maxQuantityFor(selected.stock),
    });
    setAdded(true);
  }

  return (
    <div>
      <fieldset>
        <legend className="text-lg font-semibold">Options</legend>
        <div className="mt-3 space-y-2">
          {product.variants.map((variant) => {
            const soldOut = variant.stock === 0;
            const isSelected = variant.id === selectedId;

            return (
              <label
                key={variant.id}
                className={`${optionBase} ${
                  isSelected ? "border-accent bg-surface" : "border-border"
                } ${soldOut ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="variant"
                    value={variant.id}
                    checked={isSelected}
                    disabled={soldOut}
                    onChange={() => {
                      setSelectedId(variant.id);
                      setAdded(false);
                    }}
                    className="accent-accent"
                  />
                  {variant.label}
                </span>
                <span className="flex items-center gap-3">
                  <StockBadge stock={variant.stock} />
                  <span className="font-medium">
                    {formatPrice(variant.priceCents)}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        {selected ? (
          <p className="text-2xl font-bold">{formatPrice(selected.priceCents)}</p>
        ) : (
          <p className="text-lg text-muted">Currently unavailable</p>
        )}
        {selected && selected.stock <= 5 && (
          <p className="mt-1 text-sm text-warning">Only {selected.stock} left</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!canAdd}
        className="mt-4 w-full rounded-lg bg-accent px-4 py-3 font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {canAdd ? "Add to cart" : "Out of stock"}
      </button>

      <p role="status" className="mt-3 min-h-5 text-sm text-success">
        {added && (
          <>
            Added to cart.{" "}
            <Link href="/cart" className="underline">
              View cart
            </Link>
          </>
        )}
      </p>
    </div>
  );
}