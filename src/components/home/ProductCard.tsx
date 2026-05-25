"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { ProductWithRating } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const categoryLabels: Record<string, string> = {
  chat: "对话",
  code: "代码",
  image: "图像",
  voice: "语音",
  video: "视频",
};

export function ProductCard({ product, index }: { product: ProductWithRating; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, [index]);

  const categories = product.category.split(",").filter(Boolean);

  return (
    <Link href={`/ai/${product.slug}`}>
      <Card className="h-full" hover>
        <div ref={cardRef} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {product.logo_url && (
              <Image
                src={product.logo_url}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
            )}
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-neutral-500">{product.company}</p>
            </div>
          </div>
          <p className="text-sm text-neutral-600 line-clamp-2">{product.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 4).map((cat) => (
              <Badge key={cat} variant="outline">
                {categoryLabels[cat] || cat}
              </Badge>
            ))}
          </div>
          {product.rating_count > 0 && (
            <div className="mt-auto flex items-center gap-1 text-sm text-amber-500">
              <span>{"★".repeat(Math.round(product.avg_rating))}</span>
              <span className="text-neutral-400">
                {product.avg_rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
