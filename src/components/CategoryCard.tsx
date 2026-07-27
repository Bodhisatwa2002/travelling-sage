import Image from "next/image";
import Link from "next/link";

interface CardItem {
  slug: string;
  name: string;
  description: string;
  image: string;
}

interface CategoryCardProps {
  category: CardItem;
  linkPrefix?: string;
}

export default function CategoryCard({
  category,
  linkPrefix = "/categories",
}: CategoryCardProps) {
  return (
    <Link href={`${linkPrefix}/${category.slug}`} className="group block">
      <article className="flex gap-0 overflow-hidden">
        {/* Image */}
        <div className="relative w-1/2 min-h-[160px]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:grayscale transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 350px"
          />
        </div>

        {/* Text */}
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h3 className="font-[family-name:var(--font-moret)] text-[22px] font-bold mb-2">
            <span className="group-hover:bg-[#E8D5A3] transition-colors duration-300 box-decoration-clone">
              {category.name}
            </span>
          </h3>
          <p className="text-[13px] text-[#555555] leading-relaxed">
            {category.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
