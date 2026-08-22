import { requireAdmin } from "@/lib/supabase/admin-guard";
import { notFound } from "next/navigation";
import PostForm from "../PostForm";

interface EditPostProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostProps) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const [postRes, cats, dests, auths] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).single(),
    supabase.from("categories").select("id, name, slug").order("name"),
    supabase.from("destinations").select("id, name, slug").order("name"),
    supabase.from("authors").select("id, name").order("name"),
  ]);

  if (!postRes.data) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold mb-8">
        Edit Post
      </h1>
      <PostForm
        post={postRes.data}
        categories={cats.data ?? []}
        destinations={dests.data ?? []}
        authors={auths.data ?? []}
      />
    </div>
  );
}
