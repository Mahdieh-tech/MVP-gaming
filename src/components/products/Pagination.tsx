import Link from "next/link";
import { buildProductsUrl } from "@/lib/filters";
import type { ProductFilters } from "@/types/filters";

type PaginationProps = {
  filters: ProductFilters;
  page: number;
  totalPages: number;
};

const linkClass =
  "rounded-lg border border-border px-3 py-2 text-sm hover:border-accent";

export default function Pagination({
  filters,
  page,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center gap-2">
      {page > 1 && (
        <Link href={buildProductsUrl({ ...filters, page: page - 1 })} className={linkClass}>
          Previous
        </Link>
      )}

      {pages.map((number) =>
        number === page ? (
          <span
            key={number}
            aria-current="page"
            className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white"
          >
            {number}
          </span>
        ) : (
          <Link
            key={number}
            href={buildProductsUrl({ ...filters, page: number })}
            className={linkClass}
          >
            {number}
          </Link>
        ),
      )}

      {page < totalPages && (
        <Link href={buildProductsUrl({ ...filters, page: page + 1 })} className={linkClass}>
          Next
        </Link>
      )}
    </nav>
  );
}