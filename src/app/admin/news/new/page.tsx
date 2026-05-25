import { NewsForm } from "../NewsForm";

export default function NewNewsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">新增资讯</h1>
      <NewsForm />
    </div>
  );
}
