"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { slugify } from "@/lib/admin/products";

export type CategorySaveState = { error: string | null };

const database = () => neon(process.env.DATABASE_URL!);
const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const sortOrder = (form: FormData) => Math.max(0, Number(text(form, "sortOrder") || 0));

export async function saveCategoryCms(_: CategorySaveState, form: FormData): Promise<CategorySaveState> {
  await requireAdmin();
  try {
    const id = text(form, "id");
    const name = text(form, "name");
    const slug = slugify(text(form, "slug") || name);
    const status = text(form, "status");
    if (!name || !slug || !["draft", "published", "archived"].includes(status)) return { error: "Complete the required category fields." };
    const values = [name, slug, text(form, "description") || null, text(form, "imageUrl") || null,
      sortOrder(form), status, text(form, "seoTitle") || null, text(form, "seoDescription") || null, status === "published"];
    if (id) await database().query(`UPDATE product_categories SET name=$1, slug=$2, description=$3,
      image_url=$4, sort_order=$5, status=$6, seo_title=$7, seo_description=$8, is_active=$9,
      updated_at=now() WHERE id=$10`, [...values, id]);
    else await database().query(`INSERT INTO product_categories(name, slug, description, image_url,
      sort_order, status, seo_title, seo_description, is_active) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`, values);
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? (error as { code?: string }).code : "";
    if (code === "23505" || String(error).includes("product_categories_slug_key")) return { error: "A category with this slug already exists." };
    return { error: "The category could not be saved. Please try again." };
  }
  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/sitemap.xml");
  redirect("/admin/categories");
}
