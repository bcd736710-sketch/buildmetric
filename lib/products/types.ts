export type ProductStatus = "draft" | "published" | "archived";
export type ProductCategoryStatus = "draft" | "published" | "archived";
export type ProductImageRole = "main" | "gallery";

export type ProductImage = {
  id: string; productId: string; blobUrl: string; blobPathname: string;
  altText: string | null; role: ProductImageRole; sortOrder: number;
  mimeType: string | null; byteSize: number | null; createdAt: string;
};

export type ProductCategory = {
  id: string; parentId: string | null; name: string; slug: string;
  description: string | null; imageUrl: string | null; imagePathname: string | null;
  imageAlt: string | null; sortOrder: number; isActive: boolean; status: ProductCategoryStatus;
  seoTitle: string | null; seoDescription: string | null;
  createdAt: string; updatedAt: string;
};

export type Product = {
  id: string; category: ProductCategory; name: string; slug: string;
  shortDescription: string | null; fullDescription: string | null;
  keyFeatures: string | null; applications: string | null; certifications: string | null; moq: string | null;
  material: string | null; sizeSpecs: string | null; finish: string | null; availableOptions: string | null; wholesaleSupplyDescription: string | null; specifications: Record<string, unknown>; colors: string[];
  customization: string[]; packaging: string | null; leadTime: string | null;
  featured: boolean; sortOrder: number; status: ProductStatus;
  seoTitle: string | null; seoDescription: string | null; mainImageUrl: string | null; images: ProductImage[];
  createdAt: string; updatedAt: string;
};
