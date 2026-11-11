import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/queries/products";
import { formatPrice } from "@/lib/utils";
import StockBadge from "@/components/products/StockBadge";
import SpecsTable from "@/components/products/SpecsTable";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? product.name : "Product not found" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-4/3 rounded-xl bg-border" aria-hidden="true" />

        <div>
          <p className="text-sm text-muted">{product.brand}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-muted">{product.description}</p>

          <h2 className="mt-8 text-lg font-semibold">Options</h2>
          <ul className="mt-3 space-y-2">
            {product.variants.map((variant) => (
              <li
                key={variant.id}
                className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
              >
                <span>{variant.label}</span>
                <span className="flex items-center gap-3">
                  <StockBadge stock={variant.stock} />
                  <span className="font-medium">
                    {formatPrice(variant.priceCents)}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-lg font-semibold">Specifications</h2>
          <div className="mt-3">
            <SpecsTable specs={product.specs} />
          </div>
        </div>
      </div>
    </main>
  );
}