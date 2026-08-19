import { client, ISR } from "../config/client";
import type { BlogPost } from "@/types";

const postFields = `
  "slug": slug.current,
  issueNumber,
  title,
  subtitle,
  "category": category->name,
  "destination": destination->slug.current,
  "author": author->name,
  readTime,
  image,
  featured,
  publishedAt,
  seoTitle,
  metaDescription,
  ogImage,
  content[] {
    heading,
    paragraphs,
    images[] { url, alt, caption },
    subSections[] {
      heading,
      paragraphs,
      images[] { url, alt, caption }
    }
  }
`;

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    `*[_type == "post"] | order(issueNumber desc) { ${postFields} }`,
    {},
    ISR,
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`,
    { slug },
    ISR,
  );
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    `*[_type == "post" && category->name == $category] | order(issueNumber desc) { ${postFields} }`,
    { category },
    ISR,
  );
}

export async function getPostsByDestination(destinationSlug: string): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    `*[_type == "post" && destination->slug.current == $destinationSlug] | order(issueNumber desc) { ${postFields} }`,
    { destinationSlug },
    ISR,
  );
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch<{ slug: string }[]>(
    `*[_type == "post"]{ "slug": slug.current }`,
    {},
    ISR,
  );
}
