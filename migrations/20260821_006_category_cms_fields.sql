BEGIN;

ALTER TABLE product_categories
  ADD COLUMN IF NOT EXISTS status TEXT,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT;

UPDATE product_categories
SET status = CASE WHEN is_active THEN 'published' ELSE 'archived' END
WHERE status IS NULL;

ALTER TABLE product_categories
  ALTER COLUMN status SET DEFAULT 'draft',
  ALTER COLUMN status SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'product_categories_status_check'
  ) THEN
    ALTER TABLE product_categories
      ADD CONSTRAINT product_categories_status_check
      CHECK (status IN ('draft', 'published', 'archived'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS product_categories_public_listing_idx
  ON product_categories (status, sort_order, name)
  WHERE status = 'published';

COMMIT;
