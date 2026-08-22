"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ProductImage } from "@/lib/products/types";

type Placement = "main" | "gallery";

async function responseMessage(response: Response) {
  const body = await response.json().catch(() => null);
  return body?.message || "The image could not be updated. Please try again.";
}

function UploadForm({ productId, role, onComplete, label, showAltText = true }: { productId: string; role: Placement; onComplete: () => void; label: string; showAltText?: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const isGallery = role === "gallery";

  function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    const files = data.getAll("files");
    if (!files.length || !files.every((file) => file instanceof File && file.size)) {
      setError("Choose an image to upload.");
      return;
    }
    if (!isGallery && files.length !== 1) {
      setError("Choose one main image.");
      return;
    }
    const upload = new FormData();
    for (const file of files) upload.append("files", file);
    upload.append("role", role);
    upload.append("altText", String(data.get("altText") || ""));
    startTransition(async () => {
      setError(null);
      const response = await fetch(`/api/admin/products/${productId}/images`, { method: "POST", body: upload });
      if (!response.ok) {
        setError(await responseMessage(response));
        return;
      }
      form.reset();
      setSelectedCount(0);
      onComplete();
    });
  }

  return <form aria-busy={pending} className="admin-image-upload" onSubmit={(event) => { event.preventDefault(); submit(event.currentTarget); }}>
    <label>{label}<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" aria-describedby={`${role}-image-help`} disabled={pending} multiple={role === "gallery"} name="files" onChange={(event) => setSelectedCount(isGallery ? event.currentTarget.files?.length || 0 : Math.min(event.currentTarget.files?.length || 0, 1))} required type="file" /></label>
    {selectedCount ? <p className="admin-image-selection" role="status">{selectedCount} {selectedCount === 1 ? "image" : "images"} selected</p> : null}
    {showAltText ? <label>Alt text<input name="altText" placeholder="Describe the product image" /></label> : null}
    <p id={`${role}-image-help`}>JPG, JPEG, PNG or WebP. Maximum 5 MB per image.</p>
    {error ? <p className="admin-login-error" role="alert">{error}</p> : null}
    <button disabled={pending || !selectedCount} type="submit">{pending ? `Uploading${isGallery ? ` ${selectedCount}` : ""} image${isGallery && selectedCount !== 1 ? "s" : ""}…` : label}</button>
  </form>;
}

export function ProductImageManager({ productId, images, mainImageUrl }: { productId: string; images: ProductImage[]; mainImageUrl: string | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const gallery = images;

  function refresh() {
    setError(null);
    router.refresh();
  }

  function remove(image: ProductImage) {
    if (!window.confirm("Delete this image? This also removes the Blob file.")) return;
    startTransition(async () => {
      setError(null);
      const response = await fetch(`/api/admin/products/${productId}/images/${image.id}`, { method: "DELETE" });
      if (!response.ok) {
        setError(await responseMessage(response));
        return;
      }
      router.refresh();
    });
  }

  function move(image: ProductImage, direction: "up" | "down") {
    startTransition(async () => {
      setError(null);
      const response = await fetch(`/api/admin/products/${productId}/images/${image.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      if (!response.ok) {
        setError(await responseMessage(response));
        return;
      }
      router.refresh();
    });
  }

  return <section aria-labelledby="product-images-heading" className="admin-card admin-image-manager wide">
    <h2 id="product-images-heading">Product images</h2>
    <p className="admin-image-note">The main image is stored separately. Gallery order is used on the product detail page.</p>
    {error ? <p className="admin-login-error" role="alert">{error}</p> : null}
    <div className="admin-image-grid">
      <div><h3>Main image</h3>{mainImageUrl ? <article className="admin-image-card"><Image alt="Product main image" height={200} src={mainImageUrl} unoptimized width={240} /></article> : <p className="admin-image-empty">No main image yet.</p>}<UploadForm label={mainImageUrl ? "Replace Main Image" : "Upload Main Image"} onComplete={refresh} productId={productId} role="main" showAltText={false} /></div>
      <div><h3>Gallery</h3>{gallery.length ? <ol className="admin-gallery-list">{gallery.map((image, index) => <li className="admin-image-card" key={image.id}><Image alt={image.altText || "Product gallery image"} height={120} src={image.blobUrl} unoptimized width={150} /><div><p>{image.altText || "No alt text"}</p><div className="admin-image-actions"><button aria-label={`Move gallery image ${index + 1} up`} disabled={pending || index === 0} onClick={() => move(image, "up")} type="button">Move up</button><button aria-label={`Move gallery image ${index + 1} down`} disabled={pending || index === gallery.length - 1} onClick={() => move(image, "down")} type="button">Move down</button><button aria-label={`Delete gallery image ${index + 1}`} disabled={pending} onClick={() => remove(image)} type="button">Delete</button></div></div></li>)}</ol> : <p className="admin-image-empty">No gallery images yet.</p>}<UploadForm label="Add gallery images" onComplete={refresh} productId={productId} role="gallery" /></div>
    </div>
  </section>;
}
