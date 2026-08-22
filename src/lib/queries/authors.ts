import { supabase } from "./client";
import type { Author } from "@/types";

export async function getAllAuthors(): Promise<Author[]> {
  const { data } = await supabase
    .from("authors")
    .select("slug, name, role, bio, image")
    .eq("is_founder", false)
    .order("name");

  return data ?? [];
}

export async function getFounder(): Promise<Author | null> {
  const { data } = await supabase
    .from("authors")
    .select("slug, name, role, bio, image")
    .eq("is_founder", true)
    .limit(1)
    .single();

  return data;
}
