BEGIN;

CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NULL REFERENCES product_categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  image_pathname TEXT,
  image_alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES product_categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  moq TEXT,
  material TEXT,
  specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  customization JSONB NOT NULL DEFAULT '[]'::jsonb,
  packaging TEXT,
  lead_time TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT products_category_slug_key UNIQUE (category_id, slug)
);

CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  blob_url TEXT NOT NULL UNIQUE,
  blob_pathname TEXT NOT NULL UNIQUE,
  alt_text TEXT,
  role TEXT NOT NULL CHECK (role IN ('main', 'gallery')),
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  mime_type TEXT,
  byte_size INTEGER CHECK (byte_size IS NULL OR byte_size >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX product_images_one_main_image_per_product_idx
  ON product_images (product_id) WHERE role = 'main';
CREATE INDEX product_categories_parent_sort_idx
  ON product_categories (parent_id, sort_order, name);
CREATE INDEX products_public_listing_idx
  ON products (status, category_id, sort_order, created_at DESC);
CREATE INDEX products_featured_listing_idx
  ON products (featured, status, sort_order, created_at DESC) WHERE featured = true;
CREATE INDEX product_images_product_sort_idx
  ON product_images (product_id, role, sort_order, created_at);

COMMIT;
