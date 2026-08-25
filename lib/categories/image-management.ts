import "server-only";

import { del, put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import { validateProductImage } from "@/lib/products/image-management";

export class CategoryBlobUploadError extends Error {
  constructor() { super("Category Blob upload failed."); }
}

export class CategoryImagePersistenceError extends Error {
  constructor() { super("Category image persistence failed."); }
}

type StoredCategoryImage = {
  url: string | null;
  pathname: string | null;
  alt: string | null;
};

function database() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Category database is not configured.");
  return neon(connectionString);
}

function blobConfig() {
  const storeId = process.env.PRODUCT_BLOB_STORE_ID;
  const token = process.env.PRODUCT_BLOB_READ_WRITE_TOKEN;
  return storeId && token ? { storeId, token } : null;
}

function trimAltText(value: string | null | undefined) {
  return value?.trim().slice(0, 240) || null;
}

async function assertCategoryExists(categoryId: string) {
  const rows = await database().query("SELECT id FROM product_categories WHERE id = $1 LIMIT 1", [categoryId]) as Array<{ id: string }>;
  if (!rows[0]) throw new Error("Category not found.");
}

export async function uploadCategoryImage({ categoryId, file, altText }: { categoryId: string; file: File; altText?: string | null }) {
  validateProductImage(file);
  await assertCategoryExists(categoryId);
  const config = blobConfig();
  if (!config) throw new CategoryBlobUploadError();

  let uploaded: Awaited<ReturnType<typeof put>>;
  try {
    uploaded = await put(`categories/${categoryId}/${crypto.randomUUID()}.jpg`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: "image/jpeg",
      storeId: config.storeId,
      token: config.token,
    });
  } catch {
    throw new CategoryBlobUploadError();
  }

  const sql = database();
  let previous: StoredCategoryImage | undefined;
  try {
    previous = (await sql.query(`SELECT image_url AS "url", image_pathname AS "pathname", image_alt AS "alt"
      FROM product_categories WHERE id = $1`, [categoryId]) as StoredCategoryImage[])[0];
    await sql.query(`UPDATE product_categories SET image_url = $1, image_pathname = $2, image_alt = $3,
      updated_at = now() WHERE id = $4`, [uploaded.url, uploaded.pathname, trimAltText(altText), categoryId]);
  } catch {
    await del(uploaded.url, config).catch(() => undefined);
    throw new CategoryImagePersistenceError();
  }

  if (previous?.url && previous.url !== uploaded.url) await del(previous.url, config).catch(() => undefined);
  return uploaded.url;
}

export async function deleteCategoryImage(categoryId: string) {
  const config = blobConfig();
  if (!config) throw new CategoryBlobUploadError();
  const sql = database();
  const image = (await sql.query(`SELECT image_url AS "url", image_pathname AS "pathname", image_alt AS "alt"
    FROM product_categories WHERE id = $1`, [categoryId]) as StoredCategoryImage[])[0];
  if (!image) throw new Error("Category not found.");
  await sql.query(`UPDATE product_categories SET image_url = NULL, image_pathname = NULL,
    image_alt = NULL, updated_at = now() WHERE id = $1`, [categoryId]);
  if (!image?.url) return;
  try {
    await del(image.url, config);
  } catch {
    await sql.query(`UPDATE product_categories SET image_url = $1, image_pathname = $2, image_alt = $3,
      updated_at = now() WHERE id = $4`, [image.url, image.pathname, image.alt, categoryId]);
    throw new CategoryImagePersistenceError();
  }
}
