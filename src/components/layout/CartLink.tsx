"use client";

import Link from "next/link";
import { useCartCount } from "@/store/useCart";

export default function CartLink() {
  const count = useCartCount();

  return (
    <Link href="/cart" className="hover:text-foreground">
      Cart
      {count > 0 && (
        <>
          <span
            aria-hidden="true"
            className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-white"
          >
            {count}
          </span>
          <span className="sr-only"> ({count} items)</span>
        </>
      )}
    </Link>
  );
}