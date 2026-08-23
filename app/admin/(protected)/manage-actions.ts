"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import { requireAdmin } from "@/lib/auth/require-admin";
import { slugify } from "@/lib/admin/products";
import { deleteProductImage, getProductImages, uploadProductImage, uploadProductMainImage } from "@/lib/products/image-management";

const db = () => neon(process.env.DATABASE_URL!);
const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const number = (form: FormData, key: string) => Math.max(0, Number(text(form, key) || 0));
const list = (form: FormData, key: string) => text(form, key).split(/\r?\n|,/).map((value) => value.trim()).filter(Boolean);

export async function saveCategory(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  const name = text(form, "name");
  const slug = slugify(text(form, "slug") || name);
  if (!name || !slug) throw new Error("Name and slug are required.");
  try {
    if (id) await db().query("UPDATE product_categories SET name=$1,slug=$2,description=$3,sort_order=$4,is_active=$5,updated_at=now() WHERE id=$6", [name, slug, text(form, "description") || null, number(form, "sortOrder"), form.get("isActive") === "on", id]);
    else await db().query("INSERT INTO product_categories(name,slug,description,sort_order,is_active)VALUES($1,$2,$3,$4,$5)", [name, slug, text(form, "description") || null, number(form, "sortOrder"), form.get("isActive") === "on"]);
  } catch (error) {
    if (String(error).includes("unique")) throw new Error("That category slug already exists.");
    throw error;
  }
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export type ProductSaveState = { error: string | null };

function productValues(form: FormData) {
  const name = text(form, "name");
  const categoryId = text(form, "categoryId");
  const slug = slugify(text(form, "slug") || name);
  const status = text(form, "status");
  if (!name || !categoryId || !slug || !["draft", "published", "archived"].includes(status)) return null;
  return [
    categoryId, name, slug, text(form, "shortDescription") || null, text(form, "fullDescription") || null, text(form, "availableOptions") || null,
    text(form, "material") || null, text(form, "sizeSpecs") || null, text(form, "finish") || null,
    list(form, "customization"), text(form, "packaging") || null, text(form, "leadTime") || null,
    form.get("featured") === "on", number(form, "sortOrder"), status,
  ];
}

function productSaveError(error: unknown): ProductSaveState {
  const code = typeof error === "object" && error && "code" in error ? (error as { code?: string }).code : "";
  if (code === "23505" || String(error).includes("products_category_slug_key")) return { error: "A product with this slug already exists in this category." };
  return { error: "The product could not be saved. Please try again." };
}

export async function saveProduct(_: ProductSaveState, form: FormData): Promise<ProductSaveState> {
  await requireAdmin();
  try {
    const id = text(form, "id");
    const values = productValues(form);
    if (!id || !values) return { error: "Complete the required product fields." };
    await db().query("UPDATE products SET category_id=$1,name=$2,slug=$3,short_description=$4,full_description=$5,available_options=$6,material=$7,size_specs=$8,finish=$9,customization=$10,packaging=$11,lead_time=$12,featured=$13,sort_order=$14,status=$15,updated_at=now() WHERE id=$16", [...values, id]);
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/products");
    redirect("/admin/products");
  } catch (error) {
    return productSaveError(error);
  }
}

export async function saveNewProductWithImages(_: ProductSaveState, form: FormData): Promise<ProductSaveState> {
  await requireAdmin();
  try {
    const values = productValues(form);
    if (!values) return { error: "Complete the required product fields." };
    const rows = await db().query("INSERT INTO products(category_id,name,slug,short_description,full_description,available_options,material,size_specs,finish,customization,packaging,lead_time,featured,sort_order,status)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING id", values) as Array<{ id: string }>;
    const id = rows[0]?.id;
    if (!id) throw new Error("Product could not be created.");
    try {
      const main = form.get("mainImage");
      if (main instanceof File && main.size) await uploadProductMainImage({ productId: id, file: main });
      for (const image of form.getAll("galleryImages")) {
        if (image instanceof File && image.size) await uploadProductImage({ productId: id, file: image, altText: text(form, "galleryImageAlt") || null });
      }
    } catch (error) {
      for (const image of await getProductImages(id)) await deleteProductImage(id, image.id).catch(() => undefined);
      await db().query("DELETE FROM products WHERE id=$1", [id]);
      throw error;
    }
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/products");
    redirect(`/admin/products/${id}/edit`);
  } catch (error) {
    return productSaveError(error);
  }
}
