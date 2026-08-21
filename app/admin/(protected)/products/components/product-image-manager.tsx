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

function UploadForm({ productId, role, onComplete }: { productId: string; role: Placement; onComplete: () => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const label = role === "main" ? "Upload main image" : "Add gallery images";

  function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    data.set("role", role);
    startTransition(async () => {
      setError(null);
      const response = await fetch(`/api/admin/products/${productId}/images`, { method: "POST", body: data });
      if (!response.ok) {
        setError(await responseMessage(response));
        return;
      }
      form.reset();
      onComplete();
    });
  }

  return <form className="admin-image-upload" onSubmit={(event) => { event.preventDefault(); submit(event.currentTarget); }}>
    <label>{label}<input accept="image/jpeg,image/png,image/webp" aria-describedby={`${role}-image-help`} name="file" required type="file" /></label>
    <label>Alt text<input name="altText" placeholder="Describe the product image" /></label>
    <p id={`${role}-image-help`}>JPG, JPEG, PNG or WebP. Maximum 5 MB per image.</p>
    {error ? <p className="admin-login-error" role="alert">{error}</p> : null}
    <button disabled={pending} type="submit">{pending ? "Uploading…" : label}</button>
  </form>;
}

export function ProductImageManager({ productId, images }: { productId: string; images: ProductImage[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const main = images.find((image) => image.role === "main");
  const gallery = images.filter((image) => image.role === "gallery");

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
    <p className="admin-image-note">A new main image keeps the previous one in the gallery. Gallery order is used on the product detail page.</p>
    {error ? <p className="admin-login-error" role="alert">{error}</p> : null}
    <div className="admin-image-grid">
      <div><h3>Main image</h3>{main ? <article className="admin-image-card"><Image alt={main.altText || "Product main image"} height={200} src={main.blobUrl} unoptimized width={240} /><p>{main.altText || "No alt text"}</p><button aria-label="Delete main image" disabled={pending} onClick={() => remove(main)} type="button">Delete main image</button></article> : <p className="admin-image-empty">No main image yet.</p>}<UploadForm onComplete={refresh} productId={productId} role="main" /></div>
      <div><h3>Gallery</h3>{gallery.length ? <ol className="admin-gallery-list">{gallery.map((image, index) => <li className="admin-image-card" key={image.id}><Image alt={image.altText || "Product gallery image"} height={120} src={image.blobUrl} unoptimized width={150} /><div><p>{image.altText || "No alt text"}</p><div className="admin-image-actions"><button aria-label={`Move gallery image ${index + 1} up`} disabled={pending || index === 0} onClick={() => move(image, "up")} type="button">Move up</button><button aria-label={`Move gallery image ${index + 1} down`} disabled={pending || index === gallery.length - 1} onClick={() => move(image, "down")} type="button">Move down</button><button aria-label={`Delete gallery image ${index + 1}`} disabled={pending} onClick={() => remove(image)} type="button">Delete</button></div></div></li>)}</ol> : <p className="admin-image-empty">No gallery images yet.</p>}<UploadForm onComplete={refresh} productId={productId} role="gallery" /></div>
    </div>
  </section>;
}
