import { categories } from "@/lib/admin/products";import { ProductForm } from "../form";export default async function NewProduct(){return <ProductForm categories={await categories(true)}/>}
