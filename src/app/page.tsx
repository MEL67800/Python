import { HeroSection } from "@/components/home/HeroSection";
import { ProductCardGrid } from "@/components/home/ProductCardGrid";
import { BentoGrid } from "@/components/home/BentoGrid";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCardGrid />
      <BentoGrid />
    </>
  );
}
