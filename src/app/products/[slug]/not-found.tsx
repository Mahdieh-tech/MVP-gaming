import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <p className="mt-2 text-muted">
        This product does not exist or is no longer available.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block text-accent hover:text-accent-hover"
      >
        Back to all products
      </Link>
    </main>
  );
}