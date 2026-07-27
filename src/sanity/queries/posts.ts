import { sanityFetch } from "../lib/fetch";
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
    subSections[] {
      heading,
      paragraphs
    }
  }
`;

export const allPostsQuery = `*[_type == "post"] | order(issueNumber desc) { ${postFields} }`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`;

export const postsByCategoryQuery = `*[_type == "post" && category->name == $category] | order(issueNumber desc) { ${postFields} }`;

export const postsByDestinationQuery = `*[_type == "post" && destination->slug.current == $destinationSlug] | order(issueNumber desc) { ${postFields} }`;

export const allPostSlugsQuery = `*[_type == "post"]{ "slug": slug.current }`;

export async function getAllPosts(): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(allPostsQuery);
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>(postBySlugQuery, { slug });
}

export async function getPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(postsByCategoryQuery, { category });
}

export async function getPostsByDestination(
  destinationSlug: string,
): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(postsByDestinationQuery, { destinationSlug });
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(allPostSlugsQuery);
}
