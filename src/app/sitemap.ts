import type { MetadataRoute } from "next";
import { getAllPosts } from "@/sanity/queries/posts";
import { getAllCategories } from "@/sanity/queries/categories";
import { getAllDestinations, getAllRegions } from "@/sanity/queries/destinations";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://travelingsage.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, destinations, regions] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllDestinations(),
    getAllRegions(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blogs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/destinations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const regionPages: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${SITE_URL}/destinations/${region.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const destinationPages: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${SITE_URL}/destinations/${dest.region}/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...postPages,
    ...categoryPages,
    ...regionPages,
    ...destinationPages,
  ];
}
