import type { CartItem } from "@/types/cart";

export const MAX_PER_LINE = 10;

export function maxQuantityFor(stock: number): number {
  return Math.max(0, Math.min(stock, MAX_PER_LINE));
}

export function addToCart(
  items: CartItem[],
  item: Omit<CartItem, "quantity">,
  quantity: number = 1,
): CartItem[] {
  const amount = Math.floor(quantity);
  if (item.maxQuantity < 1 || amount < 1) return items;

  const existing = items.find((line) => line.variantId === item.variantId);

  if (!existing) {
    return [...items, { ...item, quantity: Math.min(amount, item.maxQuantity) }];
  }

  // Same variant again: merge, and refresh the display copy and limit
  return items.map((line) =>
    line.variantId === item.variantId
      ? {
          ...line,
          ...item,
          quantity: Math.min(line.quantity + amount, item.maxQuantity),
        }
      : line,
  );
}

export function removeFromCart(
  items: CartItem[],
  variantId: string,
): CartItem[] {
  return items.filter((line) => line.variantId !== variantId);
}

export function setItemQuantity(
  items: CartItem[],
  variantId: string,
  quantity: number,
): CartItem[] {
  if (!Number.isFinite(quantity)) return items;

  const amount = Math.floor(quantity);
  if (amount < 1) return removeFromCart(items, variantId);

  return items.map((line) =>
    line.variantId === variantId
      ? { ...line, quantity: Math.min(amount, line.maxQuantity) }
      : line,
  );
}

export function getItemCount(items: CartItem[]): number {
  return items.reduce((sum, line) => sum + line.quantity, 0);
}

export function getSubtotalCents(items: CartItem[]): number {
  return items.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
}