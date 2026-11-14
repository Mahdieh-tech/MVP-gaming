import type { Metadata } from "next";
import Link from "next/link";
import FilterPanel from "@/components/products/FilterPanel";
import Pagination from "@/components/products/Pagination";
import ProductGrid from "@/components/products/ProductGrid";
import { getBrands, queryCatalog } from "@/lib/catalog";
import { parseFilters, type RawSearchParams } from "@/lib/filters";
import { getProducts } from "@/lib/queries/products";

export const metadata: Metadata = { title: "Products" };

type ProductsPageProps = {
  searchParams: Promise<RawSearchParams>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = parseFilters(await searchParams);
  const products = await getProducts();
  const result = queryCatalog(products, filters);
  const brands = getBrands(products);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight">All products</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <FilterPanel filters={filters} brands={brands} />

        <section aria-labelledby="results-heading">
          <h2 id="results-heading" className="text-sm text-muted">
            {result.total} {result.total === 1 ? "product" : "products"}
          </h2>

          {result.total === 0 ? (
            <div className="mt-6">
              <p className="text-muted">No products match your filters.</p>
              <Link
                href="/products"
                className="mt-3 inline-block text-accent hover:text-accent-hover"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              <ProductGrid products={result.items} />
            </div>
          )}

          <Pagination
            filters={filters}
            page={result.page}
            totalPages={result.totalPages}
          />
        </section>
      </div>
    </main>
  );
}