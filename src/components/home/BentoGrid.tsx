"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".bento-item");
    if (items) {
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-10 text-3xl font-bold tracking-tight">热门速览</h2>
      <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/news" className="bento-item group row-span-2 rounded-3xl bg-neutral-50 p-8 transition-colors hover:bg-neutral-100 lg:col-span-2">
          <h3 className="text-xl font-semibold">最新动态</h3>
          <p className="mt-3 text-neutral-500">追踪 AI 行业最新发布与更新</p>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neutral-900 group-hover:gap-2 transition-all">
            查看资讯 <span>→</span>
          </span>
        </Link>

        <Link href="/compare" className="bento-item group rounded-3xl bg-neutral-50 p-8 transition-colors hover:bg-neutral-100 lg:col-span-2">
          <h3 className="text-xl font-semibold">热门对比</h3>
          <p className="mt-3 text-neutral-500">横向对比多个 AI 产品的差异</p>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neutral-900 group-hover:gap-2 transition-all">
            开始对比 <span>→</span>
          </span>
        </Link>

        <div className="bento-item rounded-3xl bg-neutral-50 p-8 lg:col-span-2">
          <h3 className="text-xl font-semibold">分类导航</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {["对话聊天", "代码编程", "图像生成", "语音交互", "视频生成"].map((cat) => (
              <span key={cat} className="rounded-full bg-white px-4 py-2 text-sm text-neutral-600 shadow-sm">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="bento-item rounded-3xl bg-neutral-50 p-8 lg:col-span-2">
          <h3 className="text-xl font-semibold">趋势观察</h3>
          <p className="mt-3 text-neutral-500">多模态、Agent、开源化 — AI 的下一个浪潮</p>
        </div>
      </div>
    </section>
  );
}
