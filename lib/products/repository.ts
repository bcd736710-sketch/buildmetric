import "server-only";

import { neon } from "@neondatabase/serverless";
import type { Product, ProductCategory, ProductImage, ProductStatus } from "./types";

type ProductRow = {
  id: string; name: string; slug: string; short_description: string | null;
  full_description: string | null; key_features: string | null; applications: string | null;
  certifications: string | null; moq: string | null; material: string | null; size_specs: string | null; finish: string | null;
  specifications: Record<string, unknown>; colors: string[]; customization: string[];
  packaging: string | null; lead_time: string | null; featured: boolean;
  sort_order: number; status: ProductStatus; seo_title: string | null;
  seo_description: string | null; main_image_url: string | null; created_at: string; updated_at: string;
  category: ProductCategory; images: ProductImage[];
};

export class ProductDatabaseConfigurationError extends Error {
  constructor() { super("Product database is not configured."); }
}

function database() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new ProductDatabaseConfigurationError();
  return neon(connectionString);
}

const productColumns = `
  p.id, p.name, p.slug, p.short_description, p.full_description, p.key_features, p.applications,
  p.certifications, p.moq, p.material, p.size_specs, p.finish,
  p.specifications, p.colors, p.customization, p.packaging, p.lead_time, p.featured,
  p.sort_order, p.status, p.seo_title, p.seo_description, p.main_image_url, p.created_at, p.updated_at,
  jsonb_build_object('id', c.id, 'parentId', c.parent_id, 'name', c.name, 'slug', c.slug,
    'description', c.description, 'imageUrl', c.image_url, 'imagePathname', c.image_pathname,
    'imageAlt', c.image_alt, 'sortOrder', c.sort_order, 'isActive', c.is_active, 'status', c.status,
    'seoTitle', c.seo_title, 'seoDescription', c.seo_description,
    'createdAt', c.created_at, 'updatedAt', c.updated_at) AS category,
  COALESCE(jsonb_agg(jsonb_build_object('id', pi.id, 'productId', pi.product_id,
    'blobUrl', pi.blob_url, 'blobPathname', pi.blob_pathname, 'altText', pi.alt_text,
    'role', pi.role, 'sortOrder', pi.sort_order, 'mimeType', pi.mime_type,
    'byteSize', pi.byte_size, 'createdAt', pi.created_at)
    ORDER BY CASE pi.role WHEN 'main' THEN 0 ELSE 1 END, pi.sort_order, pi.created_at)
    FILTER (WHERE pi.id IS NOT NULL), '[]'::jsonb) AS images
`;

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id, category: row.category, name: row.name, slug: row.slug,
    shortDescription: row.short_description, fullDescription: row.full_description,
    keyFeatures: row.key_features, applications: row.applications, certifications: row.certifications,
    moq: row.moq, material: row.material, sizeSpecs: row.size_specs, finish: row.finish, specifications: row.specifications ?? {},
    colors: row.colors ?? [], customization: row.customization ?? [], packaging: row.packaging,
    leadTime: row.lead_time, featured: row.featured, sortOrder: row.sort_order,
    status: row.status, seoTitle: row.seo_title, seoDescription: row.seo_description, mainImageUrl: row.main_image_url,
    images: row.images ?? [], createdAt: row.created_at, updatedAt: row.updated_at,
  };
}

async function queryPublished(where: string, values: string[] = []) {
  const sql = database();
  const query = `SELECT ${productColumns} FROM products p
    INNER JOIN product_categories c ON c.id = p.category_id
    LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.role = 'gallery'
    WHERE p.status = 'published' AND c.is_active = true AND c.status = 'published' ${where}
    GROUP BY p.id, c.id ORDER BY p.sort_order ASC, p.created_at DESC`;
  const rows = await sql.query(query, values) as ProductRow[];
  return rows.map(mapProduct);
}

export function getPublishedProducts() { return queryPublished(""); }
export function getPublishedFeaturedProducts() { return queryPublished("AND p.featured = true"); }
export async function getPublishedHomepageContent() {
  const [categories, products] = await Promise.all([
    getPublishedCategories(),
    getPublishedFeaturedProducts(),
  ]);
  return { categories, products };
}
export function getPublishedProductsByCategory(categorySlug: string) {
  return queryPublished("AND c.slug = $1", [categorySlug]);
}
export async function getPublishedProductBySlugs(categorySlug: string, productSlug: string) {
  const sql = database();
  const rows = await sql.query(`SELECT ${productColumns} FROM products p
    INNER JOIN product_categories c ON c.id = p.category_id
    LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.role = 'gallery'
    WHERE p.status = 'published' AND c.is_active = true AND c.status = 'published' AND c.slug = $1 AND p.slug = $2
    GROUP BY p.id, c.id LIMIT 1`, [categorySlug, productSlug]) as ProductRow[];
  return rows[0] ? mapProduct(rows[0]) : null;
}

// Public storefront aliases. These deliberately return only products that are
// published and belong to an active category; draft and archived records never
// cross the repository boundary into a public route.
export function getProductBySlug(categorySlug: string, productSlug: string) {
  return getPublishedProductBySlugs(categorySlug, productSlug);
}

export async function getActiveCategories(): Promise<ProductCategory[]> {
  const sql = database();
  return (await sql`SELECT id, parent_id AS "parentId", name, slug, description,
    image_url AS "imageUrl", image_pathname AS "imagePathname", image_alt AS "imageAlt",
    sort_order AS "sortOrder", is_active AS "isActive", status, seo_title AS "seoTitle",
    seo_description AS "seoDescription", created_at AS "createdAt",
    updated_at AS "updatedAt" FROM product_categories WHERE is_active = true
    ORDER BY sort_order ASC, name ASC`) as ProductCategory[];
}

export async function getPublishedCategories(): Promise<ProductCategory[]> {
  const sql = database();
  return (await sql`SELECT c.id, c.parent_id AS "parentId", c.name, c.slug, c.description,
    c.image_url AS "imageUrl", c.image_pathname AS "imagePathname", c.image_alt AS "imageAlt",
    c.sort_order AS "sortOrder", c.is_active AS "isActive", c.status, c.seo_title AS "seoTitle",
    c.seo_description AS "seoDescription", c.created_at AS "createdAt",
    c.updated_at AS "updatedAt"
    FROM product_categories c
    WHERE c.is_active = true AND c.status = 'published'
      AND EXISTS (
        SELECT 1 FROM products p
        WHERE p.category_id = c.id AND p.status = 'published'
      )
    ORDER BY c.sort_order ASC, c.name ASC`) as ProductCategory[];
}

export async function getProductByIdForAdmin(id: string): Promise<Product | null> {
  const sql = database();
  const rows = await sql.query(`SELECT ${productColumns} FROM products p
    INNER JOIN product_categories c ON c.id = p.category_id
    LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.role = 'gallery' WHERE p.id = $1
    GROUP BY p.id, c.id LIMIT 1`, [id]) as ProductRow[];
  return rows[0] ? mapProduct(rows[0]) : null;
}

export async function getCategoriesForAdmin(): Promise<ProductCategory[]> {
  const sql = database();
  return (await sql`SELECT id, parent_id AS "parentId", name, slug, description,
    image_url AS "imageUrl", image_pathname AS "imagePathname", image_alt AS "imageAlt",
    sort_order AS "sortOrder", is_active AS "isActive", status, seo_title AS "seoTitle",
    seo_description AS "seoDescription", created_at AS "createdAt",
    updated_at AS "updatedAt" FROM product_categories ORDER BY sort_order ASC, name ASC`) as ProductCategory[];
}
