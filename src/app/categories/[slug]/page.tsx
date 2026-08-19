import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllCategories, getCategoryBySlug } from "@/sanity/queries/categories";
import { getPostsByCategory } from "@/sanity/queries/posts";
import BlogCard from "@/components/BlogCard";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://travelingsage.vercel.app";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: "Category Not Found" };

  const title = `${category.name} - Traveling Sage`;
  const description = category.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/categories/${slug}`,
      images: [{ url: category.image, width: 1200, height: 630, alt: category.name }],
      siteName: "Traveling Sage",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category.image],
    },
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className="max-w-360 mx-auto px-8 py-12 text-center">
        <h1 className="font-[family-name:var(--font-moret)] text-[48px] font-bold">
          Category not found
        </h1>
      </div>
    );
  }

  const categoryPosts = await getPostsByCategory(category.name);

  // Split posts into rows of 3
  const rows: (typeof categoryPosts)[] = [];
  for (let i = 0; i < categoryPosts.length; i += 3) {
    rows.push(categoryPosts.slice(i, i + 3));
  }

  return (
    <div className="max-w-360 mx-auto">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: SITE_URL },
          { name: "Categories", href: `${SITE_URL}/categories` },
          { name: category.name, href: `${SITE_URL}/categories/${slug}` },
        ]}
      />
      {/* Category Header */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-10 pt-8 md:pt-16 pb-8 md:pb-10">
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
          <h1 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[64px] font-bold leading-none">
            {category.name}
          </h1>

          {/* Description */}
          <p className="text-[15px] text-[#1A1A1A] leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Header Image */}
        <div className="relative w-full md:w-[380px] h-[200px] md:h-[220px] shrink-0 overflow-hidden rounded">
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
      <div className="px-4 md:px-5 pb-12 space-y-5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col sm:flex-row gap-5">
            {row.map((post) => (
              <div key={post.slug} className="flex-1">
                <BlogCard post={post} />
              </div>
            ))}
            {/* Fill empty slots so cards don't stretch */}
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="hidden sm:block flex-1" />
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
