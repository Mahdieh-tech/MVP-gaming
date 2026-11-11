import { cacheLife } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type {
  Category,
  Product,
  ProductVariant,
  SpecValue,
} from "@/types/product";

// Shapes as they come from the database (snake_case, nullable columns)
type VariantRow = {
  id: string;
  sku: string;
  label: string;
  price_cents: number;
  compare_at_price_cents: number | null;
  stock: number;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  wireless: boolean;
  specs: Record<string, SpecValue>;
  image_url: string | null;
  featured: boolean;
  product_variants: VariantRow[];
};

const PRODUCT_COLUMNS =
  "id, slug, name, brand, category, description, wireless, specs, image_url, featured, product_variants (id, sku, label, price_cents, compare_at_price_cents, stock)";

function toVariant(row: VariantRow): ProductVariant {
  return {
    id: row.id,
    sku: row.sku,
    label: row.label,
    priceCents: row.price_cents,
    compareAtPriceCents: row.compare_at_price_cents ?? undefined,
    stock: row.stock,
  };
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    description: row.description,
    wireless: row.wireless,
    specs: row.specs,
    imageUrl: row.image_url ?? undefined,
    featured: row.featured,
    variants: row.product_variants.map(toVariant),
  };
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("default");

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to load products: ${error.message}`);
  return ((data ?? []) as ProductRow[]).map(toProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("default");

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to load featured products: ${error.message}`);
  return ((data ?? []) as ProductRow[]).map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("default");

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data ? toProduct(data as ProductRow) : null;
}