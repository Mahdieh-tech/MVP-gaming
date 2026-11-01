import type { Metadata } from "next";
import ProductGrid from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/queries/products";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight">All products</h1>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
