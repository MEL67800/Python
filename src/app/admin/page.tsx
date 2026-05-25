import { getAllProducts, getAllNews } from "@/lib/db";

export default function AdminDashboard() {
  const products = getAllProducts();
  const news = getAllNews();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">仪表盘</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-2xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500">产品总数</p>
          <p className="mt-2 text-4xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500">资讯总数</p>
          <p className="mt-2 text-4xl font-bold">{news.length}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500">活跃产品</p>
          <p className="mt-2 text-4xl font-bold">
            {products.filter((p) => p.status === "active").length}
          </p>
        </div>
      </div>
    </div>
  );
}
