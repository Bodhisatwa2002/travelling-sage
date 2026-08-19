import type { Metadata } from "next";
import { getAllPosts } from "@/sanity/queries/posts";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Travel Stories & Guides from Across India",
  description:
    "Browse all travel stories, destination guides, and itineraries from Traveling Sage. Discover hidden gems and offbeat trails across India.",
  openGraph: {
    title: "Blog — Travel Stories & Guides from Across India",
    description:
      "Browse all travel stories, destination guides, and itineraries from Traveling Sage.",
    url: "/blogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Travel Stories & Guides from Across India",
    description:
      "Browse all travel stories, destination guides, and itineraries from Traveling Sage.",
  },
};

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 py-8 md:py-12">
      <h1 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[64px] font-bold text-center mb-8 md:mb-12">
        Our blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 mt-12">
        <span className="text-sm text-[#555555]">
          1 / {Math.ceil(posts.length / 9)}
        </span>
        <button className="bg-[#1A1A1A] text-white px-6 py-2.5 text-[13px] font-semibold tracking-wide hover:bg-[#333] transition-colors">
          NEXT
        </button>
      </div>
    </div>
  );
}
