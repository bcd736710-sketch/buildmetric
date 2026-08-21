import { NextResponse } from "next/server";
import { AdminUnauthorizedError, requireAdmin } from "@/lib/auth/require-admin";
import { deleteProductImage, moveGalleryImage } from "@/lib/products/image-management";

export const runtime = "nodejs";

function message(error: unknown) {
  if (error instanceof Error && ["Image not found.", "Image cannot be moved further."].includes(error.message)) return error.message;
  return "The image could not be updated. Please try again.";
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string; imageId: string }> }) {
  try {
    await requireAdmin();
    const { id, imageId } = await params;
    await deleteProductImage(id, imageId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    return NextResponse.json({ message: message(error) }, { status: 400 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string; imageId: string }> }) {
  try {
    await requireAdmin();
    const body = await request.json();
    if (body?.direction !== "up" && body?.direction !== "down") return NextResponse.json({ message: "Choose a valid direction." }, { status: 400 });
    const { id, imageId } = await params;
    await moveGalleryImage(id, imageId, body.direction);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    return NextResponse.json({ message: message(error) }, { status: 400 });
  }
}
