"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { News } from "@/types";

interface Props {
  initial?: Partial<News>;
}

export function NewsForm({ initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title || "",
    content: initial?.content || "",
    source_url: initial?.source_url || "",
    published_at: initial?.published_at || new Date().toISOString().slice(0, 10),
    product_id: initial?.product_id ?? null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value =
      e.target.name === "product_id"
        ? e.target.value
          ? Number(e.target.value)
          : null
        : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = initial?.id
      ? `/api/news/${initial.id}`
      : "/api/news";
    const method = initial?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/news");
      router.refresh();
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">标题</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </label>
        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">内容 (Markdown)</span>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={12}
            className="w-full rounded-xl border px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">来源链接</span>
          <input
            name="source_url"
            value={form.source_url}
            onChange={handleChange}
            type="url"
            className="w-full rounded-xl border px-3 py-2 text-sm"
            placeholder="https://example.com/article"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium">发布时间</span>
          <input
            name="published_at"
            value={form.published_at}
            onChange={handleChange}
            type="date"
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium">关联产品 ID</span>
          <input
            name="product_id"
            value={form.product_id ?? ""}
            onChange={handleChange}
            type="number"
            className="w-full rounded-xl border px-3 py-2 text-sm"
            placeholder="可选"
          />
        </label>
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "保存中..." : "保存"}
      </Button>
    </form>
  );
}
