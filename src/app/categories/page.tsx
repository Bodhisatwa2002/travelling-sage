import type { Metadata } from "next";
import { getAllCategories } from "@/lib/queries/categories";
import CategoryCard from "@/components/CategoryCard";

export const metadata: Metadata = {
  title: "Categories — Mountains, Beaches, Hikes & More",
  description:
    "Explore travel stories by category — mountains, beaches, hikes, bucket list adventures, and curated itineraries across India.",
  openGraph: {
    title: "Categories — Mountains, Beaches, Hikes & More",
    description:
      "Explore travel stories by category — mountains, beaches, hikes, bucket list adventures, and curated itineraries.",
    url: "/categories",
  },
  twitter: {
    card: "summary_large_image",
    title: "Categories — Mountains, Beaches, Hikes & More",
    description:
      "Explore travel stories by category — mountains, beaches, hikes, bucket list adventures, and curated itineraries.",
  },
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 py-8 md:py-12">
      <h1 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[64px] font-bold text-center mb-8 md:mb-12">
        Categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 mt-12">
        <span className="text-sm text-[#555555]">1 / 2</span>
        <button className="bg-[#1A1A1A] text-white px-6 py-2.5 text-[13px] font-semibold tracking-wide hover:bg-[#333] transition-colors">
          NEXT PAGE
        </button>
      </div>
    </div>
  );
}
