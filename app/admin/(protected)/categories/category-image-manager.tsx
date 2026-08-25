"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createSquareFile, SquareCropEditor, type CropItem } from "../products/components/product-image-manager";

async function responseMessage(response: Response) {
  const body = await response.json().catch(() => null);
  return body?.message || "The category image could not be updated. Please try again.";
}

export function CategoryImageManager({ categoryId, categoryName, imageUrl, imageAlt }: { categoryId: string; categoryName: string; imageUrl: string | null; imageAlt: string | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [preparing, setPreparing] = useState(false);
  const [item, setItem] = useState<CropItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  function discard() {
    if (item) URL.revokeObjectURL(item.previewUrl);
    setItem(null);
  }

  async function upload() {
    if (!item?.confirmed) return;
    setPreparing(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", await createSquareFile(item));
      form.append("altText", `${categoryName} product category cover`);
      startTransition(async () => {
        const response = await fetch(`/api/admin/categories/${categoryId}/image`, { method: "POST", body: form });
        setPreparing(false);
        if (!response.ok) { setError(await responseMessage(response)); return; }
        discard();
        router.refresh();
      });
    } catch (uploadError) {
      setPreparing(false);
      setError(uploadError instanceof Error ? uploadError.message : "The image could not be cropped.");
    }
  }

  function remove() {
    if (!window.confirm("Delete this category image? This also removes the stored file.")) return;
    startTransition(async () => {
      setError(null);
      const response = await fetch(`/api/admin/categories/${categoryId}/image`, { method: "DELETE" });
      if (!response.ok) { setError(await responseMessage(response)); return; }
      router.refresh();
    });
  }

  return <section aria-labelledby="category-image-heading" className="admin-card admin-image-manager wide">
    <h2 id="category-image-heading">Category Image</h2>
    <p className="admin-image-note">Upload, crop and save one 1200 × 1200 JPEG category cover. The same 1:1 crop controls used for product images are used here.</p>
    {imageUrl ? <article className="admin-image-card admin-category-image-preview"><Image alt={imageAlt || `${categoryName} product category cover`} height={260} src={imageUrl} unoptimized width={260} /><div><p>Current category image</p><button disabled={pending || preparing} onClick={remove} type="button">Delete image</button></div></article> : <p className="admin-image-empty">No category image yet.</p>}
    <div className="admin-image-upload">
      <label>{imageUrl ? "Replace Category Image" : "Upload Category Image"}<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" disabled={pending || preparing} onChange={(event) => {
        const file = event.currentTarget.files?.[0];
        discard();
        if (file) setItem({ file, previewUrl: URL.createObjectURL(file), crop: null, confirmed: false });
        event.currentTarget.value = "";
      }} type="file" /></label>
      <p>JPG, JPEG, PNG or WebP. Maximum 5 MB. Crop is required before upload; the saved image is a 1:1 JPEG.</p>
      {error ? <p className="admin-login-error" role="alert">{error}</p> : null}
      <button disabled={pending || preparing || !item?.confirmed} onClick={() => void upload()} type="button">{preparing ? "Preparing square crop…" : pending ? "Uploading image…" : "Upload Category Image"}</button>
    </div>
    {item && !item.confirmed ? <div aria-labelledby="category-crop-title" aria-modal="true" className="admin-crop-modal" role="dialog"><div className="admin-crop-modal-panel"><div className="admin-crop-heading"><h3 id="category-crop-title">Crop category image</h3><button aria-label="Cancel category image selection" onClick={discard} type="button">Cancel</button></div><SquareCropEditor index={0} item={item} onChange={setItem} onRemove={discard} /><div className="admin-crop-modal-actions"><button onClick={discard} type="button">Cancel</button><button disabled={!item.crop} onClick={() => setItem({ ...item, confirmed: true })} type="button">Confirm Crop</button></div></div></div> : null}
  </section>;
}
