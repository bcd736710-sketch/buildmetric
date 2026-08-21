"use client";

import { useActionState } from "react";
import { saveNewProductWithImages, saveProduct, type ProductSaveState } from "../manage-actions";
import type { AdminCategory, AdminProduct } from "@/lib/admin/products";

const initial: ProductSaveState = { error: null };

export function ProductForm({ item, categories }: { item?: AdminProduct; categories: AdminCategory[] }) {
  const [state, action] = useActionState(item ? saveProduct : saveNewProductWithImages, initial);
  const value = (entry: unknown) => JSON.stringify(entry, null, 2);
  return <main className="admin-shell"><form action={action} className="admin-card admin-form wide">
    <input name="id" type="hidden" value={item?.id} />
    <h1>{item ? "Edit product" : "New product"}</h1>
    {state.error ? <p className="admin-login-error" role="alert">{state.error}</p> : null}
    <label>Product Name<input defaultValue={item?.name} name="name" required /></label>
    <label>Slug<input defaultValue={item?.slug} name="slug" /></label>
    <label>Category<select defaultValue={item?.categoryId} name="categoryId" required>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
    <label>Short Description<textarea defaultValue={item?.shortDescription ?? ""} name="shortDescription" /></label>
    <label>Full Description<textarea defaultValue={item?.fullDescription ?? ""} name="fullDescription" /></label>
    <label>Key Features<textarea defaultValue={item?.keyFeatures ?? ""} name="keyFeatures" /><span>One feature per line.</span></label>
    <label>Applications<textarea defaultValue={item?.applications ?? ""} name="applications" /><span>One application per line.</span></label>
    <label>Certifications<textarea defaultValue={item?.certifications ?? ""} name="certifications" /><span>One certification per line.</span></label>
    <fieldset className="admin-image-fieldset"><legend>Product Specifications</legend><label>Size Specifications<textarea defaultValue={item?.sizeSpecs ?? ""} name="sizeSpecs" /><span>Enter one size specification per line, for example: 45 × 30 × 28 cm.</span></label></fieldset>
    <label>MOQ<input defaultValue={item?.moq ?? ""} name="moq" /></label>
    <label>Material<input defaultValue={item?.material ?? ""} name="material" /></label>
    <label>Specifications (JSON)<textarea defaultValue={value(item?.specifications ?? {})} name="specifications" /></label>
    <label>Colors (JSON array)<textarea defaultValue={value(item?.colors ?? [])} name="colors" /></label>
    <label>Customization (JSON array)<textarea defaultValue={value(item?.customization ?? [])} name="customization" /></label>
    <label>Packaging<input defaultValue={item?.packaging ?? ""} name="packaging" /></label>
    <label>Lead Time<input defaultValue={item?.leadTime ?? ""} name="leadTime" /></label>
    <label>Status<select defaultValue={item?.status ?? "draft"} name="status"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
    <label>Sort Order<input defaultValue={item?.sortOrder ?? 0} min="0" name="sortOrder" type="number" /></label>
    <label className="admin-checkbox"><input defaultChecked={item?.featured} name="featured" type="checkbox" /><span>Featured</span></label>
    <label>SEO Title<input defaultValue={item?.seoTitle ?? ""} name="seoTitle" /></label>
    <label>SEO Description<textarea defaultValue={item?.seoDescription ?? ""} name="seoDescription" /></label>
    {!item ? <fieldset className="admin-image-fieldset"><legend>Product images</legend><label>Main Image<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" name="mainImage" type="file" /></label><label>Main Image Alt Text<input name="mainImageAlt" placeholder="Describe the main product image" /></label><label>Gallery Images<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" multiple name="galleryImages" type="file" /></label><label>Gallery Alt Text<input name="galleryImageAlt" placeholder="Applied to initial gallery images" /></label><p>JPG, JPEG, PNG or WebP. Maximum 5 MB per image.</p></fieldset> : null}
    <button>Save product</button>
  </form></main>;
}
