import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import StockBadge from "@/components/products/StockBadge";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPriceCents = Math.min(
    ...product.variants.map((variant) => variant.priceCents),
  );
  const totalStock = product.variants.reduce(
    (sum, variant) => sum + variant.stock,
    0,
  );

  return (
    <article className="relative flex flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent">
      <div className="aspect-4/3 rounded-lg bg-border" aria-hidden="true" />
      <p className="mt-4 text-sm text-muted">{product.brand}</p>
      <h2 className="mt-1 font-semibold">
        <Link
          href={`/products/${product.slug}`}
          className="after:absolute after:inset-0"
        >
          {product.name}
        </Link>
      </h2>
      <div className="mt-3 flex items-center justify-between">
        <p>From {formatPrice(lowestPriceCents)}</p>
        <StockBadge stock={totalStock} />
      </div>
    </article>
  );
}