create type product_category as enum ('keyboard', 'mouse', 'headset', 'mousepad');

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text not null,
  category product_category not null,
  description text not null default '',
  wireless boolean not null default false,
  specs jsonb not null default '{}'::jsonb,
  image_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  sku text not null unique,
  label text not null,
  price_cents integer not null check (price_cents >= 0),
  compare_at_price_cents integer check (compare_at_price_cents >= 0),
  stock integer not null default 0 check (stock >= 0)
);

create index products_category_idx on products (category);
create index products_brand_idx on products (brand);
create index product_variants_product_id_idx on product_variants (product_id);

alter table products enable row level security;
alter table product_variants enable row level security;

create policy "Anyone can read products"
  on products for select to anon, authenticated using (true);

create policy "Anyone can read variants"
  on product_variants for select to anon, authenticated using (true);