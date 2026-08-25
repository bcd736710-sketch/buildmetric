import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { AdminUnauthorizedError, requireAdmin } from "@/lib/auth/require-admin";
import { CategoryBlobUploadError, CategoryImagePersistenceError, deleteCategoryImage, uploadCategoryImage } from "@/lib/categories/image-management";

export const runtime = "nodejs";

function isFileLike(value: FormDataEntryValue | null): value is File {
  return Boolean(value && typeof value !== "string" && typeof value.arrayBuffer === "function" && typeof value.size === "number" && typeof value.type === "string");
}

function message(error: unknown) {
  if (error instanceof Error && ["Choose an image to upload.", "Each image must be 5 MB or smaller.", "Use a JPG, JPEG, PNG, or WebP image.", "Category not found."].includes(error.message)) return error.message;
  return "The category image could not be updated. Please try again.";
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const form = await request.formData();
    const file = form.get("file");
    if (!isFileLike(file)) return NextResponse.json({ message: "Choose an image to upload." }, { status: 400 });
    const imageUrl = await uploadCategoryImage({ categoryId: id, file, altText: typeof form.get("altText") === "string" ? String(form.get("altText")) : null });
    revalidatePath("/products");
    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    if (error instanceof CategoryBlobUploadError) return NextResponse.json({ message: "Image storage is unavailable. Please try again." }, { status: 502 });
    if (error instanceof CategoryImagePersistenceError) return NextResponse.json({ message: "The image was uploaded but could not be saved. Please try again." }, { status: 500 });
    return NextResponse.json({ message: message(error) }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await deleteCategoryImage((await params).id);
    revalidatePath("/products");
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    if (error instanceof CategoryBlobUploadError) return NextResponse.json({ message: "Image storage is unavailable. Please try again." }, { status: 502 });
    return NextResponse.json({ message: message(error) }, { status: 400 });
  }
}
