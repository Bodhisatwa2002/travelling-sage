import { supabase } from "./client";
import type { BlogPost } from "@/types";

const postSelect = `
  slug, issue_number, title, subtitle,
  read_time, image, featured, published_at,
  seo_title, meta_description, og_image, content,
  categories(name), destinations(slug), authors(name)
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(row: any): BlogPost {
  return {
    slug: row.slug,
    issueNumber: row.issue_number,
    title: row.title,
    subtitle: row.subtitle,
    category: row.categories?.name,
    destination: row.destinations?.slug,
    author: row.authors?.name,
    readTime: row.read_time,
    image: row.image,
    featured: row.featured,
    publishedAt: row.published_at,
    seoTitle: row.seo_title,
    metaDescription: row.meta_description,
    ogImage: row.og_image,
    content: row.content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {

  const { data } = await supabase
    .from("posts")
    .select(postSelect)
    .order("issue_number", { ascending: false });

  return (data ?? []).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {

  const { data } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("slug", slug)
    .limit(1)
    .single();

  return data ? mapPost(data) : null;
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {

  const { data } = await supabase
    .from("posts")
    .select(`${postSelect.replace("categories(name)", "categories!inner(name)")}`)
    .eq("categories.name", category)
    .order("issue_number", { ascending: false });

  return (data ?? []).map(mapPost);
}

export async function getPostsByDestination(destinationSlug: string): Promise<BlogPost[]> {

  const { data } = await supabase
    .from("posts")
    .select(`${postSelect.replace("destinations(slug)", "destinations!inner(slug)")}`)
    .eq("destinations.slug", destinationSlug)
    .order("issue_number", { ascending: false });

  return (data ?? []).map(mapPost);
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {

  const { data } = await supabase
    .from("posts")
    .select("slug");

  return data ?? [];
}
