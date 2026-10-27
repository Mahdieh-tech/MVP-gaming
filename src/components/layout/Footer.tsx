export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-muted sm:px-8">
        <p>© {new Date().getFullYear()} MVP Gaming. A portfolio project.</p>
        <p className="mt-1">Product image credits are listed in the README.</p>
      </div>
    </footer>
  );
}