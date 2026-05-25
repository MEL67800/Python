import Link from "next/link";
import { getAllNews, getAllProducts } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Markdown } from "@/components/ui/Markdown";
import { formatDate } from "@/lib/utils";

export default async function NewsPage() {
  const newsList = getAllNews();
  const products = getAllProducts();
  const productMap = new Map(products.map((p) => [p.id, p]));

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">最新资讯</h1>
      <p className="mt-2 text-neutral-500">AI 行业动态汇总</p>

      <div className="mt-10 space-y-6">
        {newsList.map((item) => {
          const product = item.product_id ? productMap.get(item.product_id) : null;
          return (
            <Card key={item.id} hover>
              <div className="flex items-start justify-between gap-4">
                <div>
                  {product && (
                    <Link href={`/ai/${product.slug}`} className="text-sm font-medium text-blue-600 hover:underline">
                      {product.name}
                    </Link>
                  )}
                  <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
                  {item.content && (
                    <div className="mt-2 text-sm text-neutral-600 line-clamp-2">
                      <Markdown content={item.content} />
                    </div>
                  )}
                </div>
                <time className="text-sm text-neutral-400 whitespace-nowrap">
                  {formatDate(item.published_at)}
                </time>
              </div>
              {item.source_url && (
                <a
                  href={item.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600"
                >
                  查看原文 →
                </a>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
