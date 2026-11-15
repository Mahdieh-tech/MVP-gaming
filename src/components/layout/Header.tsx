import Link from "next/link";
import CartLink from "@/components/layout/CartLink";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MVP <span className="text-accent">Gaming</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm text-muted">
            <li>
              <Link href="/products" className="hover:text-foreground">
                Products
              </Link>
            </li>
            <li>
              <CartLink />
            </li>
            <li>
              <Link href="/login" className="hover:text-foreground">
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}