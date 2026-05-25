"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

interface Props {
  initial?: Partial<Product>;
}

export function ProductForm({ initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: initial?.slug || "",
    name: initial?.name || "",
    company: initial?.company || "",
    logo_url: initial?.logo_url || "",
    website_url: initial?.website_url || "",
    release_date: initial?.release_date || "",
    summary: initial?.summary || "",
    description: initial?.description || "",
    category: initial?.category || "",
    pricing_json: initial?.pricing_json || "[]",
    pros: initial?.pros || "",
    cons: initial?.cons || "",
    status: initial?.status || "active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = initial?.id
      ? `/api/products/${initial.slug}`
      : "/api/products";
    const method = initial?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-medium">Slug</span>
          <input name="slug" value={form.slug} onChange={handleChange} required className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="chatgpt" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium">产品名</span>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border px-3 py-2 text-sm" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium">公司</span>
          <input name="company" value={form.company} onChange={handleChange} required className="w-full rounded-xl border px-3 py-2 text-sm" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium">类型标签</span>
          <input name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="chat,code,image" />
        </label>
        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">一句话简介</span>
          <input name="summary" value={form.summary} onChange={handleChange} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </label>
        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">详细介绍 (Markdown)</span>
          <textarea name="description" value={form.description} onChange={handleChange} rows={8} className="w-full rounded-xl border px-3 py-2 text-sm font-mono" />
        </label>
        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">优点（每行一条）</span>
          <textarea name="pros" value={form.pros} onChange={handleChange} rows={3} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </label>
        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">缺点（每行一条）</span>
          <textarea name="cons" value={form.cons} onChange={handleChange} rows={3} className="w-full rounded-xl border px-3 py-2 text-sm" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium">状态</span>
          <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border px-3 py-2 text-sm">
            <option value="active">active</option>
            <option value="deprecated">deprecated</option>
            <option value="coming-soon">coming-soon</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium">发布时间</span>
          <input name="release_date" value={form.release_date} onChange={handleChange} type="date" className="w-full rounded-xl border px-3 py-2 text-sm" />
        </label>
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "保存中..." : "保存"}
      </Button>
    </form>
  );
}
