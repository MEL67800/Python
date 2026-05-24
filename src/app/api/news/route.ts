import { NextRequest, NextResponse } from "next/server";
import { getAllNews, createNews } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getAllNews());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = createNews(body);
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
