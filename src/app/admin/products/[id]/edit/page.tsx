import { getProductBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductForm } from "../../ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) notFound();
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">编辑 {product.name}</h1>
      <ProductForm initial={product} />
    </div>
  );
}
