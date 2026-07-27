/**
 * One-time migration script to push existing data from src/data/ to Sanity.
 *
 * Prerequisites:
 *   1. Create a Sanity project at https://www.sanity.io/manage
 *   2. Fill in .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN
 *   3. Run: npx tsx scripts/migrate-to-sanity.ts
 *
 * Migration order (respects references):
 *   Regions → Authors → Categories → Destinations → Posts
 */

import { createClient } from "@sanity/client";
import { regions, destinations } from "../src/data/destinations";
import { categories } from "../src/data/categories";
import { founder, authors } from "../src/data/authors";
import { posts } from "../src/data/posts";

// Load env
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-07-26",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

async function migrate() {
  console.log("Starting migration...\n");

  // 1. Regions
  console.log("Migrating regions...");
  for (const region of regions) {
    await client.createOrReplace({
      _id: `region-${region.slug}`,
      _type: "region",
      name: region.name,
      slug: { _type: "slug", current: region.slug },
    });
    console.log(`  ✓ ${region.name}`);
  }

  // 2. Authors (founder + regular authors)
  console.log("\nMigrating authors...");
  await client.createOrReplace({
    _id: `author-${founder.slug}`,
    _type: "author",
    name: founder.name,
    slug: { _type: "slug", current: founder.slug },
    role: founder.role,
    bio: founder.bio,
    image: founder.image,
    isFounder: true,
  });
  console.log(`  ✓ ${founder.name} (founder)`);

  for (const author of authors) {
    await client.createOrReplace({
      _id: `author-${author.slug}`,
      _type: "author",
      name: author.name,
      slug: { _type: "slug", current: author.slug },
      role: author.role,
      bio: author.bio,
      image: author.image,
      isFounder: false,
    });
    console.log(`  ✓ ${author.name}`);
  }

  // 3. Categories
  console.log("\nMigrating categories...");
  for (const cat of categories) {
    await client.createOrReplace({
      _id: `category-${cat.slug}`,
      _type: "category",
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
      description: cat.description,
      image: cat.image,
    });
    console.log(`  ✓ ${cat.name}`);
  }

  // 4. Destinations
  console.log("\nMigrating destinations...");
  for (const dest of destinations) {
    await client.createOrReplace({
      _id: `destination-${dest.slug}`,
      _type: "destination",
      name: dest.name,
      slug: { _type: "slug", current: dest.slug },
      description: dest.description,
      image: dest.image,
      region: {
        _type: "reference",
        _ref: `region-${dest.region}`,
      },
    });
    console.log(`  ✓ ${dest.name}`);
  }

  // 5. Posts
  console.log("\nMigrating posts...");

  // Build a lookup for author name → slug
  const allAuthors = [founder, ...authors];
  const authorSlugMap = new Map(allAuthors.map((a) => [a.name, a.slug]));

  // Build a lookup for category name → slug
  const categorySlugMap = new Map(categories.map((c) => [c.name, c.slug]));

  for (const post of posts) {
    const authorSlug = authorSlugMap.get(post.author);
    const categorySlug = categorySlugMap.get(post.category);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = {
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      issueNumber: post.issueNumber,
      subtitle: post.subtitle,
      readTime: post.readTime,
      image: post.image,
      featured: post.featured || false,
    };

    if (categorySlug) {
      doc.category = { _type: "reference", _ref: `category-${categorySlug}` };
    }

    if (authorSlug) {
      doc.author = { _type: "reference", _ref: `author-${authorSlug}` };
    }

    if (post.destination) {
      doc.destination = {
        _type: "reference",
        _ref: `destination-${post.destination}`,
      };
    }

    if (post.content) {
      doc.content = post.content.map((section, i) => ({
        _key: `section-${i}`,
        _type: "contentSection",
        heading: section.heading,
        paragraphs: section.paragraphs,
        subSections: section.subSections?.map((sub, j) => ({
          _key: `sub-${j}`,
          _type: "subSection",
          heading: sub.heading,
          paragraphs: sub.paragraphs,
        })),
      }));
    }

    await client.createOrReplace(doc);
    console.log(`  ✓ ${post.title}`);
  }

  console.log("\n✅ Migration complete!");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
