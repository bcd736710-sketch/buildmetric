"use client";

import { useActionState } from "react";
import { saveCategoryCms, type CategorySaveState } from "../category-actions";
import type { ProductCategory } from "@/lib/products/types";

const initial: CategorySaveState = { error: null };

export function CategoryCmsForm({ item }: { item?: ProductCategory }) {
  const [state, action] = useActionState(saveCategoryCms, initial);
  return <main className="admin-shell"><form action={action} className="admin-card admin-form wide">
    <input name="id" type="hidden" value={item?.id} />
    <h1>{item ? "Edit category" : "New category"}</h1>
    {state.error ? <p className="admin-login-error" role="alert">{state.error}</p> : null}
    <label>Name<input defaultValue={item?.name} name="name" required /></label>
    <label>Slug<input defaultValue={item?.slug} name="slug" /></label>
    <label>Description<textarea defaultValue={item?.description ?? ""} name="description" /></label>
    <label>Image URL<input defaultValue={item?.imageUrl ?? ""} name="imageUrl" type="url" /></label>
    <label>Sort Order<input defaultValue={item?.sortOrder ?? 0} min="0" name="sortOrder" type="number" /></label>
    <label>Status<select defaultValue={item?.status ?? "draft"} name="status"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
    <label>SEO Title<input defaultValue={item?.seoTitle ?? ""} name="seoTitle" /></label>
    <label>SEO Description<textarea defaultValue={item?.seoDescription ?? ""} name="seoDescription" /></label>
    <button>Save category</button>
  </form></main>;
}
