import Link from "next/link";
import {
  Mountain,
  Landmark,
  Palette,
  Footprints,
  UtensilsCrossed,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { categories } from "@/data/categories";

const iconMap: Record<string, React.ReactNode> = {
  adventure: <Mountain size={16} />,
  heritage: <Landmark size={16} />,
  culture: <Palette size={16} />,
  trekking: <Footprints size={16} />,
  food: <UtensilsCrossed size={16} />,
  spiritual: <Sparkles size={16} />,
  guides: <BookOpen size={16} />,
};

export default function CategoryBar() {
  return (
    <div className="bg-[#1A1A1A] text-white">
      <div className="max-w-360 mx-auto flex items-center justify-center">
        {categories.map((cat, i) => (
          <div key={cat.slug} className="flex items-center">
            <div className="w-px h-10 bg-white/20" />
            <Link
              href={`/categories`}
              className="flex items-center gap-2 px-6 py-3 text-[13px] font-semibold tracking-wide hover:bg-white/10 transition-colors uppercase"
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
