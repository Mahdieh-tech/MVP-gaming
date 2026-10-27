import Link from "next/link";

const links = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/login", label: "Log in" },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MVP <span className="text-accent">Gaming</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
