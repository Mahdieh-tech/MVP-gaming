import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>
      <CartView />
    </main>
  );
}