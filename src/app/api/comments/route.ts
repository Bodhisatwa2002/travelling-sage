import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .limit(1)
    .single();

  if (!post) {
    return NextResponse.json([]);
  }

  const { data: comments } = await supabase
    .from("comments")
    .select("name, message, created_at")
    .eq("post_id", post.id)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  return NextResponse.json(
    (comments ?? []).map((c) => ({
      name: c.name,
      message: c.message,
      createdAt: c.created_at,
    })),
  );
}

export async function POST(request: NextRequest) {
  try {
    const { name, message, slug } = await request.json();

    if (!name?.trim() || !message?.trim() || !slug) {
      return NextResponse.json({ error: "Name, message, and slug are required" }, { status: 400 });
    }

    const { data: post } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .limit(1)
      .single();

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await supabase.from("comments").insert({
      name: name.trim(),
      message: message.trim(),
      post_id: post.id,
      approved: false,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Comment submitted for review" });
  } catch {
    return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 });
  }
}
