import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase();
  const category = searchParams.get("category");

  let products = getAllProducts();

  if (q) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
    );
  }

  if (category) {
    products = products.filter((p) => p.category.includes(category));
  }

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const result = createProduct(body);
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
