import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-accent hover:text-accent-hover"
      >
        Back to home
      </Link>
    </main>
  );
}