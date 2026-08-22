import { requireAdmin } from "@/lib/supabase/admin-guard";
import PostForm from "../PostForm";

export default async function NewPostPage() {
  const { supabase } = await requireAdmin();

  const [cats, dests, auths] = await Promise.all([
    supabase.from("categories").select("id, name, slug").order("name"),
    supabase.from("destinations").select("id, name, slug").order("name"),
    supabase.from("authors").select("id, name").order("name"),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold mb-8">
        New Post
      </h1>
      <PostForm
        categories={cats.data ?? []}
        destinations={dests.data ?? []}
        authors={auths.data ?? []}
      />
    </div>
  );
}
