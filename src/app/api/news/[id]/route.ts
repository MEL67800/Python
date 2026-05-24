import { NextRequest, NextResponse } from "next/server";
import { getAllNews, updateNews, deleteNews } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const newsId = Number(id);
  const allNews = getAllNews();
  const news = allNews.find((n) => n.id === newsId);
  if (!news) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(news);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const newsId = Number(id);

  const allNews = getAllNews();
  const exists = allNews.some((n) => n.id === newsId);
  if (!exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  updateNews(newsId, body);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const newsId = Number(id);

  const allNews = getAllNews();
  const exists = allNews.some((n) => n.id === newsId);
  if (!exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  deleteNews(newsId);
  return NextResponse.json({ success: true });
}
