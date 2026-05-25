import { SearchBox } from "@/components/ui/SearchBox";
import { ProductCard } from "./ProductCard";
import { getAllProducts } from "@/lib/db";

export function ProductCardGrid() {
  const products = getAllProducts();

  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">探索 AI 产品</h2>
          <p className="mt-2 text-neutral-500">发现最适合你的 AI 助手</p>
        </div>
        <SearchBox onSearch={() => {}} />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
