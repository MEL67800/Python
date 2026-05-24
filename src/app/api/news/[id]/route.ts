import { NextRequest, NextResponse } from "next/server";
import { updateNews, deleteNews } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  updateNews(Number(id), body);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  deleteNews(Number(id));
  return NextResponse.json({ success: true });
}
