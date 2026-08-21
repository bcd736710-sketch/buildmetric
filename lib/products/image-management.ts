import "server-only";

import { del, put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import type { ProductImage, ProductImageRole } from "./types";

const maximumImageBytes = 5 * 1024 * 1024;
const acceptedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

type ImageRow = {
  id: string;
  productId: string;
  blobUrl: string;
  blobPathname: string;
  altText: string | null;
  role: ProductImageRole;
  sortOrder: number;
  mimeType: string | null;
  byteSize: number | null;
  createdAt: string;
};

function database() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Product database is not configured.");
  return neon(connectionString);
}

function mapImage(row: ImageRow): ProductImage {
  return row;
}

function trimAltText(value: string | null | undefined) {
  return value?.trim().slice(0, 240) || null;
}

export function validateProductImage(file: File | null | undefined) {
  if (!file || !file.size) throw new Error("Choose an image to upload.");
  if (file.size > maximumImageBytes) throw new Error("Each image must be 5 MB or smaller.");
  if (!acceptedTypes.has(file.type)) {
    throw new Error("Use a JPG, JPEG, PNG, or WebP image.");
  }
}

export async function getProductImages(productId: string): Promise<ProductImage[]> {
  const rows = await database().query(`SELECT id, product_id AS "productId", blob_url AS "blobUrl",
    blob_pathname AS "blobPathname", alt_text AS "altText", role, sort_order AS "sortOrder",
    mime_type AS "mimeType", byte_size AS "byteSize", created_at AS "createdAt"
    FROM product_images WHERE product_id = $1
    ORDER BY CASE role WHEN 'main' THEN 0 ELSE 1 END, sort_order ASC, created_at ASC`, [productId]) as ImageRow[];
  return rows.map(mapImage);
}

async function assertProductExists(productId: string) {
  const rows = await database().query("SELECT id FROM products WHERE id = $1 LIMIT 1", [productId]) as Array<{ id: string }>;
  if (!rows[0]) throw new Error("Product not found.");
}

export async function uploadProductImage({ productId, file, role, altText }: {
  productId: string;
  file: File;
  role: ProductImageRole;
  altText?: string | null;
}): Promise<ProductImage> {
  validateProductImage(file);
  await assertProductExists(productId);
  const extension = acceptedTypes.get(file.type);
  if (!extension) throw new Error("Use a JPG, JPEG, PNG, or WebP image.");

  const uploaded = await put(`products/${productId}/${crypto.randomUUID()}.${extension}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  });

  const sql = database();
  try {
    if (role === "main") {
      const previousGallerySort = Number((await sql.query("SELECT COALESCE(MAX(sort_order), -1) + 1 AS value FROM product_images WHERE product_id = $1 AND role = 'gallery'", [productId]) as Array<{ value: number | string }>)[0]?.value ?? 0);
      await sql.query("UPDATE product_images SET role = 'gallery', sort_order = $1 WHERE product_id = $2 AND role = 'main'", [previousGallerySort, productId]);
    }
    const nextSort = role === "main"
      ? 0
      : Number((await sql.query("SELECT COALESCE(MAX(sort_order), -1) + 1 AS value FROM product_images WHERE product_id = $1 AND role = 'gallery'", [productId]) as Array<{ value: number | string }>)[0]?.value ?? 0);
    const rows = await sql.query(`INSERT INTO product_images(product_id, blob_url, blob_pathname, alt_text, role, sort_order, mime_type, byte_size)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id, product_id AS "productId", blob_url AS "blobUrl", blob_pathname AS "blobPathname",
      alt_text AS "altText", role, sort_order AS "sortOrder", mime_type AS "mimeType", byte_size AS "byteSize", created_at AS "createdAt"`,
      [productId, uploaded.url, uploaded.pathname, trimAltText(altText), role, nextSort, file.type, file.size]) as ImageRow[];
    if (role === "main") {
      await sql.query("UPDATE products SET main_image_url = $1, updated_at = now() WHERE id = $2", [uploaded.url, productId]);
    }
    return mapImage(rows[0]);
  } catch (error) {
    await del(uploaded.url).catch(() => undefined);
    throw error;
  }
}

export async function deleteProductImage(productId: string, imageId: string) {
  const sql = database();
  const rows = await sql.query(`DELETE FROM product_images WHERE id = $1 AND product_id = $2
    RETURNING id, product_id AS "productId", blob_url AS "blobUrl", blob_pathname AS "blobPathname",
    alt_text AS "altText", role, sort_order AS "sortOrder", mime_type AS "mimeType", byte_size AS "byteSize", created_at AS "createdAt"`, [imageId, productId]) as ImageRow[];
  const image = rows[0];
  if (!image) throw new Error("Image not found.");
  try {
    await del(image.blobUrl);
  } catch (error) {
    await sql.query(`INSERT INTO product_images(id, product_id, blob_url, blob_pathname, alt_text, role, sort_order, mime_type, byte_size, created_at)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [image.id, image.productId, image.blobUrl, image.blobPathname, image.altText, image.role, image.sortOrder, image.mimeType, image.byteSize, image.createdAt]);
    throw error;
  }
  if (image.role === "main") {
    await sql.query("UPDATE products SET main_image_url = NULL, updated_at = now() WHERE id = $1", [productId]);
  }
}

export async function moveGalleryImage(productId: string, imageId: string, direction: "up" | "down") {
  const images = (await getProductImages(productId)).filter((image) => image.role === "gallery");
  const index = images.findIndex((image) => image.id === imageId);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || targetIndex < 0 || targetIndex >= images.length) throw new Error("Image cannot be moved further.");
  const current = images[index];
  const target = images[targetIndex];
  const sql = database();
  await sql.query("UPDATE product_images SET sort_order = $1 WHERE id = $2 AND product_id = $3", [target.sortOrder, current.id, productId]);
  await sql.query("UPDATE product_images SET sort_order = $1 WHERE id = $2 AND product_id = $3", [current.sortOrder, target.id, productId]);
}

export { maximumImageBytes };
