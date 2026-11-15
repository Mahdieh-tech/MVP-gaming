import { getItemCount } from "@/lib/cart";
import { useHydrated } from "@/lib/useHydrated";
import { useCartStore } from "@/store/cart";
import type { CartItem } from "@/types/cart";

const NO_ITEMS: CartItem[] = [];

// Before hydration the cart reads as empty, matching the server's HTML.
export function useCartItems(): CartItem[] {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  return hydrated ? items : NO_ITEMS;
}

export function useCartCount(): number {
  const items = useCartItems();
  return getItemCount(items);
}