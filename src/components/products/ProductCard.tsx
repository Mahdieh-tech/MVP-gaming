import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPriceCents = Math.min(
    ...product.variants.map((v) => v.priceCents),
  );
  const inStock = product.variants.some((v) => v.stock > 0);

  return (
    <article className="rounded-xl border p-4">
      <p className="text-sm text-gray-500">{product.brand}</p>
      <h2 className="mt-1 font-semibold">{product.name}</h2>
      <p className="mt-3">From {formatPrice(lowestPriceCents)}</p>
      {!inStock && <p className="mt-1 text-sm text-red-600">Out of stock</p>}
    </article>
  );
}
