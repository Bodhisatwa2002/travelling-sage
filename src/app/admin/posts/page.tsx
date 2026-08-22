import { requireAdmin } from "@/lib/supabase/admin-guard";
import Link from "next/link";
import { Plus } from "lucide-react";
import PostsTable from "./PostsTable";

export default async function AdminPostsPage() {
  const { supabase } = await requireAdmin();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, issue_number, featured, published_at, categories(name), authors(name)")
    .order("issue_number", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-lg text-[13px] font-medium hover:bg-[#333] transition-colors"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>
      <PostsTable posts={posts ?? []} />
    </div>
  );
}
