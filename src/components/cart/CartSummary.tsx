import { formatPrice } from "@/lib/utils";

type CartSummaryProps = {
  itemCount: number;
  subtotalCents: number;
  onClear: () => void;
};

export default function CartSummary({
  itemCount,
  subtotalCents,
  onClear,
}: CartSummaryProps) {
  return (
    <aside
      aria-labelledby="summary-heading"
      className="h-fit rounded-xl border border-border bg-surface p-6"
    >
      <h2 id="summary-heading" className="text-lg font-semibold">
        Order summary
      </h2>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Items</dt>
          <dd>{itemCount}</dd>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotalCents)}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-muted">
        Shipping and taxes are not calculated in this demo.
      </p>

      <button
        type="button"
        disabled
        className="mt-6 w-full rounded-lg bg-accent px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Checkout (coming soon)
      </button>
      <button
        type="button"
        onClick={onClear}
        className="mt-3 w-full text-sm text-muted hover:text-danger"
      >
        Clear cart
      </button>
    </aside>
  );
}