import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/queries/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-4xl font-bold">MVP Gaming</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
