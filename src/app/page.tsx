import ProductGrid from "@/components/products/ProductGrid";
import { getFeaturedProducts } from "@/lib/queries/products";

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Gear for players who play to win
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Keyboards, mice, headsets and mousepads.
      </p>
      <h2 className="mt-12 text-2xl font-semibold">Featured</h2>
      <div className="mt-6">
        <ProductGrid products={featured} />
      </div>
    </main>
  );
}
