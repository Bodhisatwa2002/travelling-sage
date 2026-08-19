import { client, ISR } from "../config/client";
import type { Category } from "@/types";

const categoryFields = `
  "slug": slug.current,
  name,
  description,
  image
`;

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch<Category[]>(
    `*[_type == "category"] | order(name asc) { ${categoryFields} }`,
    {},
    ISR,
  );
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return client.fetch<Category | null>(
    `*[_type == "category" && slug.current == $slug][0] { ${categoryFields} }`,
    { slug },
    ISR,
  );
}
