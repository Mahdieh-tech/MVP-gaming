import type { SpecValue } from "@/types/product";

type SpecsTableProps = {
  specs: Record<string, SpecValue>;
};

function formatSpecName(key: string): string {
  const spaced = key.replace(/([A-Z])/g, " $1").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function formatSpecValue(value: SpecValue): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export default function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Specifications</caption>
      <tbody>
        {entries.map(([name, value]) => (
          <tr key={name} className="border-b border-border">
            <th scope="row" className="py-2 pr-4 text-left font-normal text-muted">
              {formatSpecName(name)}
            </th>
            <td className="py-2">{formatSpecValue(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}