import Link from "next/link";
import {
  Mountain,
  Waves,
  Footprints,
  Star,
  Map,
} from "lucide-react";
import { getAllCategories } from "@/sanity/queries/categories";

const iconMap: Record<string, React.ReactNode> = {
  mountains: <Mountain size={16} />,
  beaches: <Waves size={16} />,
  hikes: <Footprints size={16} />,
  "bucket-list": <Star size={16} />,
  itineraries: <Map size={16} />,
};

export default async function CategoryBar() {
  const categories = await getAllCategories();

  return (
    <div className="bg-[#1A1A1A] text-white">
      <div className="max-w-360 mx-auto flex items-center justify-start md:justify-center overflow-x-auto scrollbar-hide">
        {categories.map((cat, i) => (
          <div key={cat.slug} className="flex items-center shrink-0">
            <div className="w-px h-10 bg-white/20" />
            <Link
              href={`/categories`}
              className="flex items-center gap-2 px-4 md:px-6 py-3 text-[12px] md:text-[13px] font-semibold tracking-wide hover:bg-white/10 transition-colors uppercase whitespace-nowrap"
            >
              {iconMap[cat.slug]}
              {cat.name}
            </Link>
            {i === categories.length - 1 && (
              <div className="w-px h-10 bg-white/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
