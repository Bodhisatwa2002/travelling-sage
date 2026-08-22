import type { Metadata } from "next";
import { getAllPosts } from "@/lib/queries/posts";
import BlogListingFilter from "@/components/BlogListingFilter";

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

      <BlogListingFilter posts={posts} />
    </div>
  );
}
