import { ProductForm } from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">新增产品</h1>
      <ProductForm />
    </div>
  );
}
