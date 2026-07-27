import { sanityFetch } from "../lib/fetch";
import type { Category } from "@/types";

const categoryFields = `
  "slug": slug.current,
  name,
  description,
  image
`;

export const allCategoriesQuery = `*[_type == "category"] | order(name asc) { ${categoryFields} }`;

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0] { ${categoryFields} }`;

export async function getAllCategories(): Promise<Category[]> {
  return sanityFetch<Category[]>(allCategoriesQuery);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  return sanityFetch<Category | null>(categoryBySlugQuery, { slug });
}
