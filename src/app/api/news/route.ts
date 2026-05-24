import { NextRequest, NextResponse } from "next/server";
import { getAllNews, createNews } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getAllNews());
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const result = createNews(body);
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
