import { NextResponse } from "next/server";
import { AdminUnauthorizedError, requireAdmin } from "@/lib/auth/require-admin";
import { uploadProductImage } from "@/lib/products/image-management";

export const runtime = "nodejs";

function message(error: unknown) {
  if (error instanceof Error && [
    "Choose an image to upload.",
    "Each image must be 5 MB or smaller.",
    "Use a JPG, JPEG, PNG, or WebP image.",
    "Product not found.",
  ].includes(error.message)) return error.message;
  return "The image could not be uploaded. Please try again.";
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const form = await request.formData();
    const file = form.get("file");
    const role = form.get("role") === "main" ? "main" : form.get("role") === "gallery" ? "gallery" : null;
    if (!(file instanceof File) || !role) return NextResponse.json({ message: "Choose an image and its placement." }, { status: 400 });
    const image = await uploadProductImage({ productId: id, file, role, altText: typeof form.get("altText") === "string" ? String(form.get("altText")) : null });
    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    return NextResponse.json({ message: message(error) }, { status: 400 });
  }
}
