import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

type ProductCardProps = {
  product: Product;
};

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <Badge tone="danger">Out of stock</Badge>;
  if (stock <= 5) return <Badge tone="warning">Low stock</Badge>;
  return <Badge tone="success">In stock</Badge>;
}

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPriceCents = Math.min(
    ...product.variants.map((variant) => variant.priceCents),
  );
  const totalStock = product.variants.reduce(
    (sum, variant) => sum + variant.stock,
    0,
  );

  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-4">
      <div className="aspect-4/3 rounded-lg bg-border" aria-hidden="true" />
      <p className="mt-4 text-sm text-muted">{product.brand}</p>
      <h2 className="mt-1 font-semibold">{product.name}</h2>
      <div className="mt-3 flex items-center justify-between">
        <p>From {formatPrice(lowestPriceCents)}</p>
        <StockBadge stock={totalStock} />
      </div>
    </article>
  );
}