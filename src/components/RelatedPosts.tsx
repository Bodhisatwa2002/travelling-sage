import { BlogPost } from "@/types";
import BlogCard from "@/components/BlogCard";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="pt-8 pb-12">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
        </div>
        <div className="flex-1 h-px bg-[#CCCCCC]" />
        <h2 className="font-[family-name:var(--font-moret)] text-[22px] font-bold">
          You Might Also Like
        </h2>
        <div className="flex-1 h-px bg-[#CCCCCC]" />
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-5">
        {posts.map((post) => (
          <div key={post.slug} className="flex-1">
            <BlogCard post={post} />
          </div>
        ))}
        {/* Fill empty slots so cards don't stretch */}
        {posts.length < 3 &&
          Array.from({ length: 3 - posts.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex-1" />
          ))}
      </div>
    </div>
  );
}
