import "server-only";

import { del, put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import type { ProductImage, ProductImageRole } from "./types";

const maximumImageBytes = 5 * 1024 * 1024;
const acceptedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/jpg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export class ProductBlobUploadError extends Error {
  constructor() {
    super("Product Blob upload failed.");
  }
}

export class ProductImagePersistenceError extends Error {
  constructor() {
    super("Product image persistence failed.");
  }
}

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

function redactBlobError(error: unknown, token: string | undefined) {
  const message = error instanceof Error ? error.message : "Unknown Blob error";
  return token ? message.replaceAll(token, "[redacted]") : message;
}

function productBlobConfig() {
  const storeId = process.env.PRODUCT_BLOB_STORE_ID;
  const token = process.env.PRODUCT_BLOB_READ_WRITE_TOKEN;
  return storeId && token ? { storeId, token } : null;
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
    FROM product_images WHERE product_id = $1 AND role = 'gallery'
    ORDER BY sort_order ASC, created_at ASC`, [productId]) as ImageRow[];
  return rows.map(mapImage);
}

async function assertProductExists(productId: string) {
  const rows = await database().query("SELECT id FROM products WHERE id = $1 LIMIT 1", [productId]) as Array<{ id: string }>;
  if (!rows[0]) throw new Error("Product not found.");
}

async function uploadBlob(productId: string, file: File) {
  validateProductImage(file);
  await assertProductExists(productId);
  const extension = acceptedTypes.get(file.type);
  if (!extension) throw new Error("Use a JPG, JPEG, PNG, or WebP image.");

  const productBlob = productBlobConfig();
  if (!productBlob) {
    console.info("[Product images] Blob put", {
      tokenPresent: Boolean(process.env.PRODUCT_BLOB_READ_WRITE_TOKEN),
      blobPutError: "Product Blob store configuration is unavailable.",
    });
    throw new ProductBlobUploadError();
  }

  let uploaded: Awaited<ReturnType<typeof put>>;
  try {
    uploaded = await put(`products/${productId}/${crypto.randomUUID()}.${extension}`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
      storeId: productBlob.storeId,
      token: productBlob.token,
    });
    console.info("[Product images] Blob put", { tokenPresent: Boolean(productBlob.token), blobPutError: null });
  } catch (error) {
    console.info("[Product images] Blob put", { tokenPresent: Boolean(productBlob.token), blobPutError: redactBlobError(error, productBlob.token) });
    throw new ProductBlobUploadError();
  }

  return { uploaded, productBlob };
}

export async function uploadProductMainImage({ productId, file }: { productId: string; file: File }) {
  const { uploaded, productBlob } = await uploadBlob(productId, file);
  const sql = database();
  let previousUrl: string | null = null;
  try {
    const previousRows = await sql.query("SELECT main_image_url AS \"url\" FROM products WHERE id = $1", [productId]) as Array<{ url: string | null }>;
    previousUrl = previousRows[0]?.url ?? null;
    await sql.query("UPDATE products SET main_image_url = $1, updated_at = now() WHERE id = $2", [uploaded.url, productId]);
  } catch {
    await del(uploaded.url, productBlob).catch(() => undefined);
    throw new ProductImagePersistenceError();
  }
  const legacyRows = await sql.query("DELETE FROM product_images WHERE product_id = $1 AND role = 'main' RETURNING blob_url AS \"url\"", [productId]).catch(() => [] as Array<{ url: string }>);
  const staleUrls = [previousUrl, ...legacyRows.map((row) => row.url)].filter((url): url is string => Boolean(url && url !== uploaded.url));
  await Promise.all(staleUrls.map((url) => del(url, productBlob).catch(() => undefined)));
  return uploaded.url;
}

export async function uploadProductImage({ productId, file, altText }: {
  productId: string;
  file: File;
  altText?: string | null;
}): Promise<ProductImage> {
  const { uploaded, productBlob } = await uploadBlob(productId, file);
  const sql = database();
  try {
    const nextSort = Number((await sql.query("SELECT COALESCE(MAX(sort_order), -1) + 1 AS value FROM product_images WHERE product_id = $1 AND role = 'gallery'", [productId]) as Array<{ value: number | string }>)[0]?.value ?? 0);
    const rows = await sql.query(`INSERT INTO product_images(product_id, blob_url, blob_pathname, alt_text, role, sort_order, mime_type, byte_size)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id, product_id AS "productId", blob_url AS "blobUrl", blob_pathname AS "blobPathname",
      alt_text AS "altText", role, sort_order AS "sortOrder", mime_type AS "mimeType", byte_size AS "byteSize", created_at AS "createdAt"`,
      [productId, uploaded.url, uploaded.pathname, trimAltText(altText), "gallery", nextSort, file.type, file.size]) as ImageRow[];
    return mapImage(rows[0]);
  } catch {
    await del(uploaded.url, productBlob).catch(() => undefined);
    throw new ProductImagePersistenceError();
  }
}

export async function deleteProductImage(productId: string, imageId: string) {
  const productBlob = productBlobConfig();
  if (!productBlob) throw new ProductBlobUploadError();

  const sql = database();
  const rows = await sql.query(`DELETE FROM product_images WHERE id = $1 AND product_id = $2 AND role = 'gallery'
    RETURNING id, product_id AS "productId", blob_url AS "blobUrl", blob_pathname AS "blobPathname",
    alt_text AS "altText", role, sort_order AS "sortOrder", mime_type AS "mimeType", byte_size AS "byteSize", created_at AS "createdAt"`, [imageId, productId]) as ImageRow[];
  const image = rows[0];
  if (!image) throw new Error("Image not found.");
  try {
    await del(image.blobUrl, productBlob);
  } catch (error) {
    await sql.query(`INSERT INTO product_images(id, product_id, blob_url, blob_pathname, alt_text, role, sort_order, mime_type, byte_size, created_at)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [image.id, image.productId, image.blobUrl, image.blobPathname, image.altText, image.role, image.sortOrder, image.mimeType, image.byteSize, image.createdAt]);
    throw error;
  }
}

export async function moveGalleryImage(productId: string, imageId: string, direction: "up" | "down") {
  const images = await getProductImages(productId);
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
