"use client";

import { useState } from "react";
import { BlogPost } from "@/types";
import BlogCard from "@/components/BlogCard";

interface BlogListingFilterProps {
  posts: BlogPost[];
}

type Filter = "all" | "quick" | "long";

export default function BlogListingFilter({ posts }: BlogListingFilterProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = posts.filter((post) => {
    if (filter === "all") return true;
    const mins = parseInt(post.readTime) || 0;
    return filter === "quick" ? mins < 5 : mins >= 5;
  });

  const buttons: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "quick", label: "Quick reads (< 5 min)" },
    { value: "long", label: "Long reads (5+ min)" },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-8 md:mb-12">
        {buttons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`px-4 py-2 text-[13px] font-semibold tracking-wide border transition-colors ${
              filter === btn.value
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                : "bg-white text-[#1A1A1A] border-[#CCCCCC] hover:border-[#1A1A1A]"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#555555] py-12">No posts match this filter.</p>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 mt-12">
        <span className="text-sm text-[#555555]">
          1 / {Math.ceil(filtered.length / 9) || 1}
        </span>
        <button className="bg-[#1A1A1A] text-white px-6 py-2.5 text-[13px] font-semibold tracking-wide hover:bg-[#333] transition-colors">
          NEXT
        </button>
      </div>
    </>
  );
}
