import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  addToCart,
  removeFromCart,
  setItemQuantity,
} from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => ({ items: addToCart(state.items, item, quantity) })),
      removeItem: (variantId) =>
        set((state) => ({ items: removeFromCart(state.items, variantId) })),
      setQuantity: (variantId, quantity) =>
        set((state) => ({
          items: setItemQuantity(state.items, variantId, quantity),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "mvp-gaming-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);