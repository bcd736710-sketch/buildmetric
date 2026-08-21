import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/categories/repository";
import { CategoryCmsForm } from "../../cms-form";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const category = await getCategoryById((await params).id);
  if (!category) notFound();
  return <CategoryCmsForm item={category} />;
}
