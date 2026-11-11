import { cacheLife } from "next/cache";

async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-muted sm:px-8">
        <p>© {year} MVP Gaming. A portfolio project.</p>
        <p className="mt-1">Product image credits are listed in the README.</p>
      </div>
    </footer>
  );
}