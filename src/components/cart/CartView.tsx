"use client";

import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Skeleton from "@/components/ui/Skeleton";
import { getItemCount, getSubtotalCents } from "@/lib/cart";
import { useHydrated } from "@/lib/useHydrated";
import { useCartStore } from "@/store/cart";

export default function CartView() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  if (!hydrated) {
    return (
      <div className="mt-8 space-y-4" aria-busy="true">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-muted">Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-3 inline-block text-accent hover:text-accent-hover"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
      <ul aria-label="Cart items">
        {items.map((item) => (
          <CartItem
            key={item.variantId}
            item={item}
            onQuantityChange={setQuantity}
            onRemove={removeItem}
          />
        ))}
      </ul>
      <CartSummary
        itemCount={getItemCount(items)}
        subtotalCents={getSubtotalCents(items)}
        onClear={clear}
      />
    </div>
  );
}