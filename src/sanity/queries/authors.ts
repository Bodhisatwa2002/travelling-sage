import { client, ISR } from "../config/client";
import type { Author } from "@/types";

const authorFields = `
  "slug": slug.current,
  name,
  role,
  bio,
  image
`;

export async function getAllAuthors(): Promise<Author[]> {
  return client.fetch<Author[]>(
    `*[_type == "author" && !isFounder] | order(name asc) { ${authorFields} }`,
    {},
    ISR,
  );
}

export async function getFounder(): Promise<Author | null> {
  return client.fetch<Author | null>(
    `*[_type == "author" && isFounder][0] { ${authorFields} }`,
    {},
    ISR,
  );
}
