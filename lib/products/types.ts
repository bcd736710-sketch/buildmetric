export type ProductStatus = "draft" | "published" | "archived";
export type ProductImageRole = "main" | "gallery";

export type ProductImage = {
  id: string; productId: string; blobUrl: string; blobPathname: string;
  altText: string | null; role: ProductImageRole; sortOrder: number;
  mimeType: string | null; byteSize: number | null; createdAt: string;
};

export type ProductCategory = {
  id: string; parentId: string | null; name: string; slug: string;
  description: string | null; imageUrl: string | null; imagePathname: string | null;
  imageAlt: string | null; sortOrder: number; isActive: boolean;
  createdAt: string; updatedAt: string;
};

export type Product = {
  id: string; category: ProductCategory; name: string; slug: string;
  shortDescription: string | null; fullDescription: string | null; moq: string | null;
  material: string | null; specifications: Record<string, unknown>; colors: string[];
  customization: string[]; packaging: string | null; leadTime: string | null;
  featured: boolean; sortOrder: number; status: ProductStatus;
  seoTitle: string | null; seoDescription: string | null; images: ProductImage[];
  createdAt: string; updatedAt: string;
};
