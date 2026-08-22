"use client";

import { useActionState } from "react";
import { saveNewProductWithImages, saveProduct, type ProductSaveState } from "../manage-actions";
import type { AdminCategory, AdminProduct } from "@/lib/admin/products";

const initial: ProductSaveState = { error: null };

export function ProductForm({ item, categories }: { item?: AdminProduct; categories: AdminCategory[] }) {
  const [state, action] = useActionState(item ? saveProduct : saveNewProductWithImages, initial);
  const list = (entry: string[]) => entry.join("\n");
  return <main className="admin-shell"><form action={action} className="admin-card admin-form wide">
    <input name="id" type="hidden" value={item?.id} />
    <h1>{item ? "Edit product" : "New product"}</h1>
    {state.error ? <p className="admin-login-error" role="alert">{state.error}</p> : null}
    <label>Product Name<input defaultValue={item?.name} name="name" required /></label>
    <label>Slug<input defaultValue={item?.slug} name="slug" /></label>
    <label>Category<select defaultValue={item?.categoryId} name="categoryId" required>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
    <fieldset className="admin-image-fieldset"><legend>Product Detail Content</legend>
      <label>Short Description<textarea defaultValue={item?.shortDescription ?? ""} name="shortDescription" required /><span>Shown beside the product image.</span></label>
      <label>Overview<textarea defaultValue={item?.fullDescription ?? ""} name="fullDescription" /><span>Use separate paragraphs for longer product information.</span></label>
    </fieldset>
    <fieldset className="admin-image-fieldset"><legend>Specifications</legend>
      <label>Material<input defaultValue={item?.material ?? ""} name="material" /></label>
      <label>Size / Dimensions<textarea defaultValue={item?.sizeSpecs ?? ""} name="sizeSpecs" /><span>Enter one size or dimension per line.</span></label>
      <label>Colors / Finish<textarea defaultValue={list(item?.colors ?? [])} name="colors" /><span>Enter one color or finish per line.</span></label>
      <label>MOQ<input defaultValue={item?.moq ?? ""} name="moq" /></label>
      <label>Usage / Applications<textarea defaultValue={item?.applications ?? ""} name="applications" /><span>Enter one application per line.</span></label>
      <label>Customization<textarea defaultValue={list(item?.customization ?? [])} name="customization" /><span>Enter one option per line.</span></label>
      <label>Lead Time<input defaultValue={item?.leadTime ?? ""} name="leadTime" /></label>
      <label>Packaging<textarea defaultValue={item?.packaging ?? ""} name="packaging" /></label>
      <label>Certifications<textarea defaultValue={item?.certifications ?? ""} name="certifications" /><span>Enter one certification per line.</span></label>
    </fieldset>
    <label>Status<select defaultValue={item?.status ?? "draft"} name="status"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
    <label>Sort Order<input defaultValue={item?.sortOrder ?? 0} min="0" name="sortOrder" type="number" /></label>
    <label className="admin-checkbox"><input defaultChecked={item?.featured} name="featured" type="checkbox" /><span>Featured</span></label>
    {!item ? <fieldset className="admin-image-fieldset"><legend>Product images</legend><label>Main Image<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" name="mainImage" type="file" /></label><label>Gallery Images<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" multiple name="galleryImages" type="file" /></label><label>Gallery Alt Text<input name="galleryImageAlt" placeholder="Applied to initial gallery images" /></label><p>JPG, JPEG, PNG or WebP. Maximum 5 MB per image.</p></fieldset> : null}
    <button>Save product</button>
  </form></main>;
}
