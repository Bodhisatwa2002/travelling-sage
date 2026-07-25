import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function CategoriesPage() {
  return (
    <div className="max-w-360 mx-auto px-8 py-12">
      <h1 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[64px] font-bold text-center mb-12">
        Categories
      </h1>

      <div className="grid grid-cols-2 gap-6">
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
