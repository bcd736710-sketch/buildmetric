"use client";

import { useActionState } from "react";
import { saveNewProductWithImages, saveProduct, type ProductSaveState } from "../manage-actions";
import type { AdminCategory, AdminProduct } from "@/lib/admin/products";

const initial: ProductSaveState = { error: null };

export function ProductForm({ item, categories }: { item?: AdminProduct; categories: AdminCategory[] }) {
  const [state, action] = useActionState(item ? saveProduct : saveNewProductWithImages, initial);
  // Products created before the current form can contain JSON values returned as
  // strings by the database driver. Keep the edit form renderable for those rows.
  const textValue = (value: unknown) => typeof value === "string" ? value : "";
  return <main className="admin-shell"><form action={action} className="admin-card admin-form wide">
    <input name="id" type="hidden" value={item?.id} />
    <h1>{item ? "Edit product" : "New product"}</h1>
    {state.error ? <p className="admin-login-error" role="alert">{state.error}</p> : null}
    <fieldset className="admin-image-fieldset"><legend>Product Basic Information</legend>
      <label>Product Name<input defaultValue={item?.name} name="name" required /></label>
      <label>Slug<input defaultValue={item?.slug} name="slug" /></label>
      <label>Category<select defaultValue={item?.categoryId} name="categoryId" required>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
      {!item ? <><label>Main Image<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" name="mainImage" type="file" /></label><label>Gallery Images<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" multiple name="galleryImages" type="file" /></label><label>Gallery Alt Text<input name="galleryImageAlt" placeholder="Applied to initial gallery images" /></label></> : <p>Main Image and Gallery can be managed in the Product Images section below.</p>}
    </fieldset>
    <fieldset className="admin-image-fieldset"><legend>Product Content</legend>
      <label>Short Description<textarea defaultValue={item?.shortDescription ?? ""} name="shortDescription" required /><span>Shown beside the product image.</span></label>
      <label>Overview<textarea defaultValue={item?.fullDescription ?? ""} name="fullDescription" /><span>Use separate paragraphs for longer product information.</span></label>
    </fieldset>
    <fieldset className="admin-image-fieldset">
      <legend>Available Options</legend>
      <label htmlFor="availableOptions">Available Options<textarea defaultValue={textValue(item?.availableOptions)} id="availableOptions" name="availableOptions" /><span>Enter one option per line.</span></label>
    </fieldset>
    <fieldset className="admin-image-fieldset"><legend>Specifications</legend>
      <label>Material<input defaultValue={textValue(item?.material)} name="material" /></label>
      <label>Size / Dimensions<textarea defaultValue={textValue(item?.sizeSpecs)} name="sizeSpecs" /><span>Enter one size or dimension per line.</span></label>
      <label>Finish<input defaultValue={textValue(item?.finish)} name="finish" /><span>For example: Matte black, Pink, or Custom finish.</span></label>
    </fieldset>
    <fieldset className="admin-image-fieldset"><legend>Wholesale / OEM / Project Supply</legend>
      <label htmlFor="wholesaleSupplyDescription">Wholesale / OEM / Project Supply Description<textarea defaultValue={textValue(item?.wholesaleSupplyDescription)} id="wholesaleSupplyDescription" name="wholesaleSupplyDescription" /><span>Describe wholesale programs, OEM customization, or project supply support for this product.</span></label>
    </fieldset>
    <label>Status<select defaultValue={item?.status ?? "draft"} name="status"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
    <label>Sort Order<input defaultValue={item?.sortOrder ?? 0} min="0" name="sortOrder" type="number" /></label>
    <label className="admin-checkbox"><input defaultChecked={item?.featured} name="featured" type="checkbox" /><span>Featured</span></label>
    <button>Save product</button>
  </form></main>;
}
