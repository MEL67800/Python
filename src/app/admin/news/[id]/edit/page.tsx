import { getAllNews } from "@/lib/db";
import { notFound } from "next/navigation";
import { NewsForm } from "../../NewsForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const news = getAllNews().find((n) => n.id === Number(id));
  if (!news) notFound();
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">编辑 {news.title}</h1>
      <NewsForm initial={news} />
    </div>
  );
}
