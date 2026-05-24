import { NextRequest, NextResponse } from "next/server";
import { createRating, getRatingsByProductId } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id");
  if (!productId) {
    return NextResponse.json({ error: "product_id required" }, { status: 400 });
  }
  return NextResponse.json(getRatingsByProductId(Number(productId)));
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const result = createRating(body);
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
