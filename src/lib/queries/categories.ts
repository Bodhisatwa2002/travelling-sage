import { supabase } from "./client";
import type { Category } from "@/types";

export async function getAllCategories(): Promise<Category[]> {
  const { data } = await supabase
    .from("categories")
    .select("slug, name, description, image")
    .order("name");

  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data } = await supabase
    .from("categories")
    .select("slug, name, description, image")
    .eq("slug", slug)
    .limit(1)
    .single();

  return data;
}
