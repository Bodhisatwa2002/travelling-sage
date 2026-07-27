import { sanityFetch } from "../lib/fetch";
import type { Author } from "@/types";

const authorFields = `
  "slug": slug.current,
  name,
  role,
  bio,
  image
`;

export const allAuthorsQuery = `*[_type == "author" && !isFounder] | order(name asc) { ${authorFields} }`;

export const founderQuery = `*[_type == "author" && isFounder][0] { ${authorFields} }`;

export async function getAllAuthors(): Promise<Author[]> {
  return sanityFetch<Author[]>(allAuthorsQuery);
}

export async function getFounder(): Promise<Author | null> {
  return sanityFetch<Author | null>(founderQuery);
}
