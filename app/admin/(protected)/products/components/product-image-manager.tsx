"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import type { ProductImage } from "@/lib/products/types";

type Placement = "main" | "gallery";
type Crop = { x: number; y: number; zoom: number };
type CropItem = { file: File; previewUrl: string; crop: Crop | null; confirmed: boolean };
type ImageSize = { width: number; height: number };

const cropPreviewSize = 280;
const croppedImageSize = 1200;

async function responseMessage(response: Response) {
  const body = await response.json().catch(() => null);
  return body?.message || "The image could not be updated. Please try again.";
}

function renderedSize(size: ImageSize, zoom: number) {
  const scale = Math.max(cropPreviewSize / size.width, cropPreviewSize / size.height) * zoom;
  return { width: size.width * scale, height: size.height * scale };
}

function clampCrop(crop: Crop, size: ImageSize) {
  const rendered = renderedSize(size, crop.zoom);
  return { ...crop, x: Math.min(0, Math.max(cropPreviewSize - rendered.width, crop.x)), y: Math.min(0, Math.max(cropPreviewSize - rendered.height, crop.y)) };
}

function centeredCrop(size: ImageSize, zoom = 1): Crop {
  const rendered = renderedSize(size, zoom);
  return { x: (cropPreviewSize - rendered.width) / 2, y: (cropPreviewSize - rendered.height) / 2, zoom };
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("The selected image could not be read.")); };
    image.src = url;
  });
}

async function createSquareFile(item: CropItem): Promise<File> {
  const image = await loadImage(item.file);
  const size = { width: image.naturalWidth, height: image.naturalHeight };
  const crop = clampCrop(item.crop || centeredCrop(size), size);
  const rendered = renderedSize(size, crop.zoom);
  const canvas = document.createElement("canvas");
  canvas.width = croppedImageSize;
  canvas.height = croppedImageSize;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Image cropping is unavailable in this browser.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, croppedImageSize, croppedImageSize);
  const scale = croppedImageSize / cropPreviewSize;
  context.drawImage(image, crop.x * scale, crop.y * scale, rendered.width * scale, rendered.height * scale);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  if (!blob) throw new Error("The cropped image could not be created.");
  const filename = item.file.name.replace(/\.[^.]+$/, "") || "product-image";
  return new File([blob], `${filename}.jpg`, { type: "image/jpeg" });
}

function SquareCropEditor({ item, index, onChange, onRemove }: { item: CropItem; index: number; onChange: (item: CropItem) => void; onRemove: () => void }) {
  const [size, setSize] = useState<ImageSize | null>(null);
  const drag = useRef<{ pointerId: number; startX: number; startY: number; crop: Crop } | null>(null);
  const crop = size ? clampCrop(item.crop || centeredCrop(size), size) : item.crop || { x: 0, y: 0, zoom: 1 };
  const rendered = size ? renderedSize(size, crop.zoom) : null;

  function update(next: Partial<Crop>) {
    if (!size) return;
    onChange({ ...item, crop: clampCrop({ ...crop, ...next }, size) });
  }

  return <article className="admin-crop-editor">
    <div className="admin-crop-heading"><strong>Image {index + 1}</strong><button aria-label={`Remove selected image ${index + 1}`} onClick={onRemove} type="button">Remove</button></div>
    <div aria-label="Drag the image to reposition the square crop" className="admin-crop-frame" onPointerDown={(event) => {
      if (!size) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      drag.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, crop };
    }} onPointerMove={(event) => {
      if (!size || !drag.current || drag.current.pointerId !== event.pointerId) return;
      const ratio = cropPreviewSize / event.currentTarget.getBoundingClientRect().width;
      update({ x: drag.current.crop.x + (event.clientX - drag.current.startX) * ratio, y: drag.current.crop.y + (event.clientY - drag.current.startY) * ratio });
    }} onPointerUp={(event) => { if (drag.current?.pointerId === event.pointerId) drag.current = null; }} role="application">
      <img alt="Crop preview" draggable={false} onLoad={(event) => {
        const nextSize = { width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight };
        setSize(nextSize);
        if (!item.crop) onChange({ ...item, crop: centeredCrop(nextSize) });
      }} src={item.previewUrl} style={rendered ? { height: `${rendered.height}px`, left: `${crop.x}px`, top: `${crop.y}px`, width: `${rendered.width}px` } : undefined} />
    </div>
    <div className="admin-crop-controls"><label>Zoom<input aria-label={`Zoom image ${index + 1}`} max="3" min="1" onChange={(event) => update({ zoom: Number(event.currentTarget.value) })} step="0.05" type="range" value={crop.zoom} /></label><div aria-label={`Move image ${index + 1}`} className="admin-crop-nudge" role="group"><button onClick={() => update({ x: crop.x + 14 })} type="button">←</button><button onClick={() => update({ y: crop.y + 14 })} type="button">↑</button><button onClick={() => update({ y: crop.y - 14 })} type="button">↓</button><button onClick={() => update({ x: crop.x - 14 })} type="button">→</button></div></div>
    <p>Drag to position the subject. The saved image will be cropped to 1:1.</p>
  </article>;
}

function UploadForm({ productId, role, onComplete, label, showAltText = true }: { productId: string; role: Placement; onComplete: () => void; label: string; showAltText?: boolean }) {
  const [pending, startTransition] = useTransition();
  const [preparing, setPreparing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CropItem[]>([]);
  const [activeCropIndex, setActiveCropIndex] = useState<number | null>(null);
  const isGallery = role === "gallery";

  function updateItem(index: number, next: CropItem) { setItems((current) => current.map((item, itemIndex) => itemIndex === index ? next : item)); }
  const activeItem = activeCropIndex === null ? null : items[activeCropIndex] || null;

  function confirmActiveCrop() {
    if (activeCropIndex === null || !activeItem?.crop) return;
    const nextItems = items.map((item, index) => index === activeCropIndex ? { ...item, confirmed: true } : item);
    setItems(nextItems);
    const nextIndex = nextItems.findIndex((item) => !item.confirmed);
    setActiveCropIndex(nextIndex === -1 ? null : nextIndex);
  }

  function discardSelection() {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
    setActiveCropIndex(null);
  }

  function removeItem(index: number) {
    const item = items[index];
    if (item) URL.revokeObjectURL(item.previewUrl);
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setActiveCropIndex(null);
  }

  async function submit(form: HTMLFormElement) {
    if (!items.length) { setError("Choose an image to upload."); return; }
    setPreparing(true);
    setError(null);
    try {
      const upload = new FormData();
      for (const item of items) upload.append("files", await createSquareFile(item));
      upload.append("role", role);
      upload.append("altText", String(new FormData(form).get("altText") || ""));
      startTransition(async () => {
        const response = await fetch(`/api/admin/products/${productId}/images`, { method: "POST", body: upload });
        setPreparing(false);
        if (!response.ok) { setError(await responseMessage(response)); return; }
        items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        form.reset();
      setItems([]);
      setActiveCropIndex(null);
        onComplete();
      });
    } catch (cropError) {
      setPreparing(false);
      setError(cropError instanceof Error ? cropError.message : "The image could not be cropped.");
    }
  }

  return <form aria-busy={pending || preparing} className="admin-image-upload" onSubmit={(event) => { event.preventDefault(); void submit(event.currentTarget); }}>
    <label>{label}<input accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp" aria-describedby={`${role}-image-help`} disabled={pending || preparing} multiple={isGallery} onChange={(event) => {
      items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      const nextItems = Array.from(event.currentTarget.files || []).slice(0, isGallery ? undefined : 1).map((file) => ({ file, previewUrl: URL.createObjectURL(file), crop: null, confirmed: false }));
      setItems(nextItems);
      setActiveCropIndex(nextItems.length ? 0 : null);
    }} required type="file" /></label>
    {items.length ? <div className="admin-image-selection" role="status">{items.length} {items.length === 1 ? "image" : "images"} selected. {items.every((item) => item.confirmed) ? "Crop confirmed." : "Confirm each 1:1 crop before uploading."}<div className="admin-crop-summary">{items.map((item, index) => <button key={item.previewUrl} onClick={() => setActiveCropIndex(index)} type="button">{item.confirmed ? "Edit crop" : `Crop image ${index + 1}`}</button>)}</div></div> : null}
    {showAltText ? <label>Alt text<input name="altText" placeholder="Describe the product image" /></label> : null}
    <p id={`${role}-image-help`}>JPG, JPEG, PNG or WebP. Maximum 5 MB per source image. Every uploaded image is saved as a cropped 1:1 square.</p>
    {error ? <p className="admin-login-error" role="alert">{error}</p> : null}
    <button disabled={pending || preparing || !items.length || items.some((item) => !item.confirmed)} type="submit">{preparing ? "Preparing square crop…" : pending ? `Uploading${isGallery ? ` ${items.length}` : ""} image${isGallery && items.length !== 1 ? "s" : ""}…` : label}</button>
    {activeItem && activeCropIndex !== null ? <div aria-labelledby={`${role}-crop-title`} aria-modal="true" className="admin-crop-modal" role="dialog"><div className="admin-crop-modal-panel"><div className="admin-crop-heading"><h3 id={`${role}-crop-title`}>Crop image {activeCropIndex + 1} of {items.length}</h3><button aria-label="Cancel image selection" onClick={discardSelection} type="button">Cancel</button></div><SquareCropEditor index={activeCropIndex} item={activeItem} onChange={(next) => updateItem(activeCropIndex, next)} onRemove={() => removeItem(activeCropIndex)} /><div className="admin-crop-modal-actions"><button onClick={discardSelection} type="button">Cancel</button><button disabled={!activeItem.crop} onClick={confirmActiveCrop} type="button">{items.some((item, index) => index !== activeCropIndex && !item.confirmed) ? "Confirm & Next Image" : "Confirm Crop"}</button></div></div></div> : null}
  </form>;
}

export function ProductImageManager({ productId, images, mainImageUrl }: { productId: string; images: ProductImage[]; mainImageUrl: string | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function refresh() { setError(null); router.refresh(); }
  function remove(image: ProductImage) {
    if (!window.confirm("Delete this image? This also removes the Blob file.")) return;
    startTransition(async () => {
      setError(null);
      const response = await fetch(`/api/admin/products/${productId}/images/${image.id}`, { method: "DELETE" });
      if (!response.ok) { setError(await responseMessage(response)); return; }
      router.refresh();
    });
  }
  function move(image: ProductImage, direction: "up" | "down") {
    startTransition(async () => {
      setError(null);
      const response = await fetch(`/api/admin/products/${productId}/images/${image.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ direction }) });
      if (!response.ok) { setError(await responseMessage(response)); return; }
      router.refresh();
    });
  }

  return <section aria-labelledby="product-images-heading" className="admin-card admin-image-manager wide">
    <h2 id="product-images-heading">Product images</h2>
    <p className="admin-image-note">Crop every main or gallery image to a 1:1 square before uploading. Gallery order is used on the product detail page.</p>
    {error ? <p className="admin-login-error" role="alert">{error}</p> : null}
    <div className="admin-image-grid">
      <div><h3>Main image</h3>{mainImageUrl ? <article className="admin-image-card"><Image alt="Product main image" height={200} src={mainImageUrl} unoptimized width={240} /></article> : <p className="admin-image-empty">No main image yet.</p>}<UploadForm label={mainImageUrl ? "Replace Main Image" : "Upload Main Image"} onComplete={refresh} productId={productId} role="main" showAltText={false} /></div>
      <div><h3>Gallery</h3>{images.length ? <ol className="admin-gallery-list">{images.map((image, index) => <li className="admin-image-card" key={image.id}><Image alt={image.altText || "Product gallery image"} height={120} src={image.blobUrl} unoptimized width={150} /><div><p>{image.altText || "No alt text"}</p><div className="admin-image-actions"><button aria-label={`Move gallery image ${index + 1} up`} disabled={pending || index === 0} onClick={() => move(image, "up")} type="button">Move up</button><button aria-label={`Move gallery image ${index + 1} down`} disabled={pending || index === images.length - 1} onClick={() => move(image, "down")} type="button">Move down</button><button aria-label={`Delete gallery image ${index + 1}`} disabled={pending} onClick={() => remove(image)} type="button">Delete</button></div></div></li>)}</ol> : <p className="admin-image-empty">No gallery images yet.</p>}<UploadForm label="Add gallery images" onComplete={refresh} productId={productId} role="gallery" /></div>
    </div>
  </section>;
}
