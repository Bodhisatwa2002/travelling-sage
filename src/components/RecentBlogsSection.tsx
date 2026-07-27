import Link from "next/link";
import { BlogPost } from "@/types";
import BlogCard from "./BlogCard";
import SectionSeparator from "./SectionSeparator";

interface RecentBlogsSectionProps {
  posts: BlogPost[];
}

export default function RecentBlogsSection({ posts }: RecentBlogsSectionProps) {
  return (
    <section className="max-w-360 mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="font-[family-name:var(--font-moret)] text-[28px] md:text-[48px]">
          Recent blog
        </h2>
        <Link
          href="/blogs"
          className="bg-[#1A1A1A] text-white px-6 py-3 text-xs font-bold tracking-wider hover:bg-[#333] transition-colors"
        >
          VIEW ALL BLOGS
        </Link>
      </div>

      <SectionSeparator />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
