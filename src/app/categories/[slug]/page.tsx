import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import BlogCard from "@/components/BlogCard";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="max-w-360 mx-auto px-8 py-12 text-center">
        <h1 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[48px] font-bold">
          Category not found
        </h1>
      </div>
    );
  }

  const categoryPosts = posts.filter(
    (p) => p.category.toLowerCase() === category.name.toLowerCase()
  );

  // Split posts into rows of 3
  const rows: (typeof categoryPosts)[] = [];
  for (let i = 0; i < categoryPosts.length; i += 3) {
    rows.push(categoryPosts.slice(i, i + 3));
  }

  return (
    <div className="max-w-360 mx-auto">
      {/* Category Header */}
      <div className="flex gap-10 px-10 pt-16 pb-10">
        {/* Header Left */}
        <div className="flex-1 space-y-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-[13px] text-[#1A1A1A] hover:underline"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-[#555555]" />
            <Link
              href="/categories"
              className="text-[13px] text-[#1A1A1A] hover:underline"
            >
              All categories
            </Link>
          </div>

          {/* Category Name */}
          <h1 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[64px] font-bold leading-none">
            {category.name}
          </h1>

          {/* Description */}
          <p className="text-[15px] text-[#1A1A1A] leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Header Image */}
        <div className="relative w-[380px] h-[220px] shrink-0 overflow-hidden rounded">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="380px"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="px-5 pb-12 space-y-5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-5">
            {row.map((post) => (
              <div key={post.slug} className="flex-1">
                <BlogCard post={post} />
              </div>
            ))}
            {/* Fill empty slots so cards don't stretch */}
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1" />
              ))}
          </div>
        ))}

        {categoryPosts.length === 0 && (
          <p className="text-center text-[#555555] py-12 text-[15px]">
            No posts found in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
