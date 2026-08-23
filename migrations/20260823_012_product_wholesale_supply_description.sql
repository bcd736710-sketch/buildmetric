BEGIN;

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS wholesale_supply_description TEXT;

COMMIT;
