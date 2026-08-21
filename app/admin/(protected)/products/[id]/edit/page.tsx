import { notFound } from "next/navigation";
import { categories, product } from "@/lib/admin/products";
import { getProductImages } from "@/lib/products/image-management";
import { ProductImageManager } from "../../components/product-image-manager";
import { ProductForm } from "../../form";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const item = await product(id);
  if (!item) notFound();
  const [productCategories, images] = await Promise.all([categories(true), getProductImages(id)]);
  return <><ProductForm item={item} categories={productCategories} /><ProductImageManager images={images} productId={id} /></>;
}
