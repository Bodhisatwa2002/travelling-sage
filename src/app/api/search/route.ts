import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/queries/posts";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const posts = await getAllPosts();
  const searchTerm = query.toLowerCase();

  const results = posts
    .filter((post) => {
      const searchable = [
        post.title,
        post.subtitle,
        post.category,
        post.author,
        post.destination,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(searchTerm);
    })
    .slice(0, 10)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      category: post.category,
      author: post.author,
      image: post.image,
      readTime: post.readTime,
    }));

  return NextResponse.json({ results });
}
