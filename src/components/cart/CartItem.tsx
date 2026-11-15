import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemData } from "@/types/cart";

type CartItemProps = {
  item: CartItemData;
  onQuantityChange: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
};

const stepperClass =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:border-accent disabled:cursor-not-allowed disabled:opacity-50";

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const label = `${item.productName}, ${item.variantLabel}`;

  return (
    <li className="flex flex-col gap-4 border-b border-border py-4 sm:flex-row sm:items-center">
      <div
        className="aspect-4/3 w-24 shrink-0 rounded-lg bg-border"
        aria-hidden="true"
      />

      <div className="flex-1">
        <Link
          href={`/products/${item.productSlug}`}
          className="font-medium hover:text-accent"
        >
          {item.productName}
        </Link>
        <p className="text-sm text-muted">{item.variantLabel}</p>
        <p className="mt-1 text-sm">{formatPrice(item.priceCents)} each</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease quantity of ${label}`}
          onClick={() => onQuantityChange(item.variantId, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className={stepperClass}
        >
          −
        </button>
        <span aria-live="polite" className="w-8 text-center">
          {item.quantity}
        </span>
        <button
          type="button"
          aria-label={`Increase quantity of ${label}`}
          onClick={() => onQuantityChange(item.variantId, item.quantity + 1)}
          disabled={item.quantity >= item.maxQuantity}
          className={stepperClass}
        >
          +
        </button>
      </div>

      <p className="w-24 text-right font-medium">
        {formatPrice(item.priceCents * item.quantity)}
      </p>

      <button
        type="button"
        aria-label={`Remove ${label} from cart`}
        onClick={() => onRemove(item.variantId)}
        className="text-sm text-muted hover:text-danger"
      >
        Remove
      </button>
    </li>
  );
}