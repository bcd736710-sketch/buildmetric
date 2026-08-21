import "server-only";

import { neon } from "@neondatabase/serverless";
import type { ProductCategory } from "@/lib/products/types";

type CategoryRow = ProductCategory;

function database() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Category database is not configured.");
  return neon(connectionString);
}

const categoryColumns = `id, parent_id AS "parentId", name, slug, description,
  image_url AS "imageUrl", image_pathname AS "imagePathname", image_alt AS "imageAlt",
  sort_order AS "sortOrder", is_active AS "isActive", status, seo_title AS "seoTitle",
  seo_description AS "seoDescription", created_at AS "createdAt", updated_at AS "updatedAt"`;

export async function getAllCategories(): Promise<CategoryRow[]> {
  return (await database().query(`SELECT ${categoryColumns} FROM product_categories ORDER BY sort_order ASC, name ASC`)) as CategoryRow[];
}

export async function getPublishedCategories(): Promise<CategoryRow[]> {
  return (await database().query(`SELECT ${categoryColumns} FROM product_categories
    WHERE status = 'published' AND is_active = true ORDER BY sort_order ASC, name ASC`)) as CategoryRow[];
}

export async function getCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const rows = await database().query(`SELECT ${categoryColumns} FROM product_categories
    WHERE slug = $1 LIMIT 1`, [slug]) as CategoryRow[];
  return rows[0] ?? null;
}

export async function getPublishedCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const rows = await database().query(`SELECT ${categoryColumns} FROM product_categories
    WHERE slug = $1 AND status = 'published' AND is_active = true LIMIT 1`, [slug]) as CategoryRow[];
  return rows[0] ?? null;
}

export async function getCategoryById(id: string): Promise<CategoryRow | null> {
  const rows = await database().query(`SELECT ${categoryColumns} FROM product_categories
    WHERE id = $1 LIMIT 1`, [id]) as CategoryRow[];
  return rows[0] ?? null;
}
