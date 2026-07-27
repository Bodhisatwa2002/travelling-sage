import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article className="space-y-3">
        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
          </div>
          <div className="flex-1 h-px bg-[#CCCCCC]" />
          <span className="text-[11px] font-medium text-[#1A1A1A]">
            [{post.issueNumber}]
          </span>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:grayscale transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 440px"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium">{post.category}</span>
          <span className="text-[13px] text-[#555555]">
            by {post.author} &nbsp;|&nbsp; {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-moret)] text-[18px] md:text-[22px] font-bold leading-tight">
          <span className="group-hover:bg-[#E8D5A3] group-hover:decoration-0 transition-colors duration-300 box-decoration-clone">
            {post.title}
          </span>
        </h3>
      </article>
    </Link>
  );
}
