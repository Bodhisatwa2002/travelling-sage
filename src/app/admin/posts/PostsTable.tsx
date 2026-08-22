"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

interface Post {
  id: string;
  title: string;
  slug: string;
  issue_number: string | null;
  featured: boolean;
  published_at: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authors: any;
}

export default function PostsTable({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    const supabase = createClient();
    await supabase.from("posts").delete().eq("id", id);
    router.refresh();
    setDeleting(null);
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#CCCCCC] p-8 text-center text-[#999]">
        No posts yet. Create your first post.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#CCCCCC] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#EBEBEB] text-left text-[12px] text-[#999] uppercase tracking-wide">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
            <th className="px-4 py-3 font-medium hidden lg:table-cell">Issue</th>
            <th className="px-4 py-3 font-medium hidden lg:table-cell">Featured</th>
            <th className="px-4 py-3 font-medium w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors">
              <td className="px-4 py-3">
                <Link href={`/blogs/${post.slug}`} className="font-medium hover:underline" target="_blank">
                  {post.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-[#555] hidden md:table-cell">
                {(Array.isArray(post.categories) ? post.categories[0]?.name : post.categories?.name) ?? "—"}
              </td>
              <td className="px-4 py-3 text-[#555] hidden lg:table-cell">
                {post.issue_number ?? "—"}
              </td>
              <td className="px-4 py-3 hidden lg:table-cell">
                {post.featured ? (
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                ) : (
                  <span className="inline-block w-2 h-2 rounded-full bg-[#CCCCCC]" />
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="p-1.5 text-[#999] hover:text-[#1A1A1A] transition-colors"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="p-1.5 text-[#999] hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
