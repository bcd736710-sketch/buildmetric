BEGIN;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS main_image_url TEXT;

UPDATE products p
SET main_image_url = (
  SELECT blob_url
  FROM product_images
  WHERE product_id = p.id AND role = 'main'
  ORDER BY sort_order ASC, created_at ASC
  LIMIT 1
)
WHERE p.main_image_url IS NULL
  AND EXISTS (
    SELECT 1 FROM product_images
    WHERE product_id = p.id AND role = 'main'
  );

COMMIT;
