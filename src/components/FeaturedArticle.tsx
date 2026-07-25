import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/posts";

interface FeaturedArticleProps {
  post: BlogPost;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <article className="space-y-4">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:grayscale transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium">{post.category}</span>
          <span className="text-[13px] text-[#555555]">
            by {post.author} &nbsp;|&nbsp; {post.readTime}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[30px] font-bold leading-tight">
          <span className="group-hover:bg-[#E8D5A3] transition-colors duration-300 box-decoration-clone">
            {post.title}
          </span>
        </h2>
      </article>
    </Link>
  );
}
