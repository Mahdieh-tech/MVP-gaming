with p as (
  insert into products (slug, name, brand, category, description, wireless, specs, featured)
  values (
    'apex-75-keyboard',
    'Apex 75 Mechanical Keyboard',
    'Apex',
    'keyboard',
    '75% layout with hot-swappable switches.',
    true,
    '{"layout": "75%", "hotSwappable": true}',
    true
  )
  returning id
)
insert into product_variants (product_id, sku, label, price_cents, stock)
select p.id, v.sku, v.label, v.price_cents, v.stock
from p,
  (values
    ('APX75-RED', 'Red switches', 8900, 12),
    ('APX75-BRN', 'Brown switches', 8900, 0)
  ) as v (sku, label, price_cents, stock);


  
WITH p AS (
  INSERT INTO products (
    slug,
    name,
    brand,
    category,
    description,
    wireless,
    specs,
    featured
  )
  VALUES (
    'phantom-x1-mouse',
    'Phantom X1 Gaming Mouse',
    'Phantom',
    'mouse',
    'Lightweight gaming mouse with high precision sensor.',
    true,
    '{"dpi": 26000, "weightGrams": 58}',
    true
  )
  RETURNING id
)
INSERT INTO product_variants (
  product_id,
  sku,
  label,
  price_cents,
  stock
)
SELECT p.id, v.sku, v.label, v.price_cents, v.stock
FROM p,
  (VALUES
    ('PHX1-BLK', 'Black Edition', 6990, 15),
    ('PHX1-WHT', 'White Edition', 6990, 10)
  ) AS v (sku, label, price_cents, stock);




WITH p AS (
  INSERT INTO products (
    slug,
    name,
    brand,
    category,
    description,
    wireless,
    specs,
    featured
  )
  VALUES (
    'nova-h7-headset',
    'Nova H7 Gaming Headset',
    'Nova',
    'headset',
    'Gaming headset with 50mm drivers and built-in microphone.',
    true,
    '{"driverMm": 50, "microphone": true}',
    true
  )
  RETURNING id
)
INSERT INTO product_variants (
  product_id,
  sku,
  label,
  price_cents,
  stock
)
SELECT p.id, v.sku, v.label, v.price_cents, v.stock
FROM p,
  (VALUES
    ('NVH7-BLK', 'Black Edition', 9990, 8),
    ('NVH7-WHT', 'White Edition', 9990, 5)
  ) AS v (sku, label, price_cents, stock);
