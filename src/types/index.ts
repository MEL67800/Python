export interface Product {
  id: number;
  slug: string;
  name: string;
  company: string;
  logo_url: string;
  website_url: string;
  release_date: string;
  summary: string;
  description: string;
  category: string;
  pricing_json: string;
  pros: string;
  cons: string;
  status: "active" | "deprecated" | "coming-soon";
  created_at: string;
  updated_at: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface News {
  id: number;
  product_id: number | null;
  title: string;
  content: string;
  source_url: string;
  published_at: string;
  created_at: string;
}

export interface Rating {
  id: number;
  product_id: number;
  score: number;
  comment: string;
  created_at: string;
}

export interface ProductWithRating extends Product {
  avg_rating: number;
  rating_count: number;
}
