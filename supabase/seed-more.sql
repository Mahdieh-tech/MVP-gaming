with new_products as (
  insert into products (slug, name, brand, category, description, wireless, specs, featured)
  values
    ('nova-tkl-keyboard', 'Nova TKL Mechanical Keyboard', 'Nova', 'keyboard', 'Tenkeyless layout with per-key RGB lighting.', false, '{"layout": "TKL", "backlight": "RGB"}', false),
    ('vertex-60-keyboard', 'Vertex 60 Compact Keyboard', 'Vertex', 'keyboard', 'Compact 60% board with Bluetooth and 2.4 GHz.', true, '{"layout": "60%", "hotSwappable": true}', true),
    ('pulse-full-size-keyboard', 'Pulse Full-Size Keyboard', 'Pulse', 'keyboard', 'Full-size keyboard with a number pad and media keys.', false, '{"layout": "Full size", "backlight": "White"}', false),
    ('zenith-pro-keyboard', 'Zenith Pro Wireless Keyboard', 'Zenith', 'keyboard', 'Premium 75% keyboard with a gasket mount and long battery life.', true, '{"layout": "75%", "hotSwappable": true, "batteryHours": 200}', false),
    ('apex-100-keyboard', 'Apex 100 Full-Size Keyboard', 'Apex', 'keyboard', 'Full-size keyboard with an aluminum frame.', false, '{"layout": "Full size", "hotSwappable": false}', false),
    ('nova-x1-mouse', 'Nova X1 Gaming Mouse', 'Nova', 'mouse', 'Lightweight wired mouse with a 16000 DPI sensor.', false, '{"dpi": 16000, "weightGrams": 72}', true),
    ('vertex-air-mouse', 'Vertex Air Wireless Mouse', 'Vertex', 'mouse', 'Fast wireless mouse with a 26000 DPI sensor.', true, '{"dpi": 26000, "weightGrams": 58}', false),
    ('pulse-ergo-mouse', 'Pulse Ergo Mouse', 'Pulse', 'mouse', 'Comfort-shaped wireless mouse for long sessions.', true, '{"dpi": 12000, "weightGrams": 95}', false),
    ('zenith-ultra-mouse', 'Zenith Ultra Light Mouse', 'Zenith', 'mouse', 'Ultralight wireless mouse under 50 grams.', true, '{"dpi": 30000, "weightGrams": 49}', true),
    ('apex-core-mouse', 'Apex Core Mouse', 'Apex', 'mouse', 'Reliable wired mouse at a friendly price.', false, '{"dpi": 8000, "weightGrams": 80}', false),
    ('nova-wave-headset', 'Nova Wave Headset', 'Nova', 'headset', 'Wired headset with a detachable microphone.', false, '{"driverMm": 50, "microphone": true}', false),
    ('vertex-echo-headset', 'Vertex Echo Wireless Headset', 'Vertex', 'headset', 'Wireless headset with all-day battery life.', true, '{"driverMm": 40, "microphone": true}', false),
    ('zenith-studio-headset', 'Zenith Studio Headset', 'Zenith', 'headset', 'Wireless headset with a wide soundstage.', true, '{"driverMm": 53, "microphone": true}', false),
    ('nova-glide-mousepad', 'Nova Glide Mousepad', 'Nova', 'mousepad', 'Smooth cloth surface with stitched edges.', false, '{"material": "Cloth"}', false),
    ('pulse-desk-mat', 'Pulse Desk Mat', 'Pulse', 'mousepad', 'Extra-large desk mat that fits a keyboard and mouse.', false, '{"material": "Cloth", "sizeCm": "90x40"}', false),
    ('apex-hard-mousepad', 'Apex Hard Surface Mousepad', 'Apex', 'mousepad', 'Hard surface for fast, low-friction tracking.', false, '{"material": "Hard"}', false)
  returning id, slug
)
insert into product_variants (product_id, sku, label, price_cents, stock)
select np.id, v.sku, v.label, v.price_cents, v.stock
from new_products np
join (
  values
    ('nova-tkl-keyboard', 'NOVATKL-RED', 'Red switches', 7900, 20),
    ('nova-tkl-keyboard', 'NOVATKL-BLU', 'Blue switches', 7900, 8),
    ('vertex-60-keyboard', 'VTX60-BRN', 'Brown switches', 9900, 15),
    ('vertex-60-keyboard', 'VTX60-SIL', 'Silent switches', 10900, 3),
    ('pulse-full-size-keyboard', 'PLSFS-BLK', 'Black', 5900, 30),
    ('pulse-full-size-keyboard', 'PLSFS-WHT', 'White', 5900, 0),
    ('zenith-pro-keyboard', 'ZNTHPRO-RED', 'Red switches', 14900, 6),
    ('zenith-pro-keyboard', 'ZNTHPRO-BRN', 'Brown switches', 14900, 10),
    ('apex-100-keyboard', 'APX100-RED', 'Red switches', 10400, 4),
    ('nova-x1-mouse', 'NOVAX1-BLK', 'Black', 3900, 40),
    ('nova-x1-mouse', 'NOVAX1-WHT', 'White', 3900, 12),
    ('vertex-air-mouse', 'VTXAIR-BLK', 'Black', 8900, 9),
    ('vertex-air-mouse', 'VTXAIR-WHT', 'White', 8900, 2),
    ('pulse-ergo-mouse', 'PLSERGO-R', 'Right-handed', 5900, 14),
    ('zenith-ultra-mouse', 'ZNTHULT-BLK', 'Black', 12900, 5),
    ('zenith-ultra-mouse', 'ZNTHULT-WHT', 'White', 12900, 0),
    ('apex-core-mouse', 'APXCORE-BLK', 'Black', 2900, 25),
    ('nova-wave-headset', 'NOVAWAVE-BLK', 'Black', 5900, 18),
    ('nova-wave-headset', 'NOVAWAVE-BLU', 'Blue', 5900, 7),
    ('vertex-echo-headset', 'VTXECHO-BLK', 'Black', 11900, 4),
    ('zenith-studio-headset', 'ZNTHSTD-BLK', 'Black', 15900, 10),
    ('zenith-studio-headset', 'ZNTHSTD-SLV', 'Silver', 16900, 3),
    ('nova-glide-mousepad', 'NOVAGLD-M', 'Medium', 1900, 50),
    ('nova-glide-mousepad', 'NOVAGLD-L', 'Large', 2900, 35),
    ('nova-glide-mousepad', 'NOVAGLD-XL', 'XL', 3900, 0),
    ('pulse-desk-mat', 'PLSMAT-BLK', 'Black', 3500, 22),
    ('apex-hard-mousepad', 'APXHARD-STD', 'Standard', 2400, 11)
) as v (slug, sku, label, price_cents, stock) on v.slug = np.slug;