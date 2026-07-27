# Plan: Backend Content Management + Image Hosting (Free)

## Context

The Traveling Sage blog currently stores all content (11 posts, 5 categories, 7 destinations, 7 authors) as hardcoded TypeScript arrays in `src/data/`. All images are Unsplash URLs. There is no backend, no database, no CMS. The user wants:
- A visual editor to manage content (no code editing)
- A way to host their own original photos (no more Unsplash)
- Everything free

## Chosen Stack

| Concern | Solution | Free Tier |
|---------|----------|-----------|
| **Content backend + editor** | **Sanity.io** | 100K API req/mo, 10GB bandwidth, 3 users |
| **Image hosting** | **Cloudinary** | 25GB storage, 25GB bandwidth/mo |

**Why Sanity?** Built-in visual editor (Sanity Studio) runs at `/studio` inside the Next.js app. Schema-as-code maps perfectly to existing TypeScript interfaces. First-party `next-sanity` package. At ~11 posts with SSG, API usage will be <1% of free tier.

**Why Cloudinary?** Generous free tier, automatic image optimization (WebP/AVIF), on-the-fly resizing via URL params, works seamlessly with Next.js `<Image>`.

---

## Implementation Steps

### Phase 1: Install Dependencies & Configure

1. Install packages: `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/vision`
2. Create Sanity project (free) via `npx sanity@latest init` — get project ID and dataset name
3. Create Cloudinary account (free) — get cloud name
4. Add environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2026-07-26
   SANITY_API_TOKEN=xxxxx
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxxx
   ```
5. Update `next.config.ts` — add `res.cloudinary.com` to `remotePatterns`

### Phase 2: Sanity Schemas & Studio

Create `src/sanity/` directory:

```
src/sanity/
├── config/
│   ├── client.ts        — Sanity client setup
│   └── env.ts           — Env var exports
├── schemas/
│   ├── index.ts         — Schema registry
│   ├── post.ts          — BlogPost schema (mirrors existing interface)
│   ├── category.ts      — Category schema
│   ├── destination.ts   — Destination schema
│   ├── author.ts        — Author schema
│   └── region.ts        — Region schema
├── queries/
│   ├── posts.ts         — GROQ queries + typed fetchers
│   ├── categories.ts
│   ├── destinations.ts
│   └── authors.ts
└── lib/
    ├── fetch.ts         — sanityFetch wrapper with ISR caching
    └── image.ts         — Cloudinary URL helper
```

**Key schema decision:** The nested `content` field (heading → paragraphs → subSections) will be modeled as Sanity **object arrays** (not Portable Text), preserving the exact current data shape so the rendering layer stays unchanged.

**Sanity Studio route:** Create `src/app/studio/[[...tool]]/page.tsx` — embeds the visual editor at `/studio`.

**Image field approach:** Use Cloudinary URLs stored as string fields in Sanity documents. Upload photos to Cloudinary, paste the URL into Sanity Studio. This avoids double-counting against Sanity's asset quota.

### Phase 3: Data Fetching Layer

Create GROQ queries and async fetcher functions that replace current synchronous imports:

- `getAllPosts()`, `getPostBySlug(slug)`, `getPostsByCategory(category)`
- `getAllCategories()`, `getCategoryBySlug(slug)`
- `getAllDestinations()`, `getDestinationsByRegion(region)`
- `getAllAuthors()`, `getFounder()`

All use `sanityFetch()` with `next: { revalidate: 3600 }` for hourly ISR.

### Phase 4: Migrate Page Components

Update every file that imports from `src/data/` to use async Sanity fetchers:

| File | Change |
|------|--------|
| `src/app/page.tsx` | `await getAllPosts()` etc. |
| `src/app/blogs/page.tsx` | `await getAllPosts()` |
| `src/app/blogs/[slug]/page.tsx` | `await getPostBySlug(slug)` |
| `src/app/categories/page.tsx` | `await getAllCategories()` |
| `src/app/categories/[slug]/page.tsx` | `await getPostsByCategory()` |
| `src/app/destinations/page.tsx` | `await getAllRegions()` |
| `src/app/destinations/[region]/page.tsx` | `await getDestinationsByRegion()` |
| `src/app/destinations/[region]/[slug]/page.tsx` | `await getPostsByDestination()` |
| `src/app/gallery/page.tsx` | `await getGalleryImages()` |
| `src/app/about/page.tsx` | `await getAllAuthors()` |

**Component considerations:**
- `Footer.tsx` — server component, can call Sanity directly
- `Navbar.tsx` — `"use client"`, must receive data as props from `layout.tsx`
- `CategoryBar.tsx` — client component, must receive data as props

Update `generateStaticParams()` in all dynamic routes to fetch slugs from Sanity.

### Phase 5: Content Migration

Create `scripts/migrate-to-sanity.ts` — one-time script that:
1. Reads existing data from `src/data/` files
2. Transforms to Sanity document format
3. Pushes to Sanity via `createOrReplace` in dependency order: Regions → Authors → Categories → Destinations → Posts
4. Replaces Unsplash image URLs with Cloudinary URLs (after manual upload of own photos)

### Phase 6: On-Demand Revalidation (Optional)

Create `src/app/api/revalidate/route.ts` — a webhook endpoint that Sanity calls when content is published, triggering instant page regeneration instead of waiting for the hourly ISR timer.

### Phase 7: Cleanup

- Remove `src/data/posts.ts`, `categories.ts`, `destinations.ts`, `authors.ts`
- Keep `src/data/site.ts` (site config doesn't need CMS)
- Add `.env.local` to `.gitignore`

---

## Verification

1. Run `npm run dev` and visit `/studio` — confirm Sanity Studio loads with all schemas
2. Create a test blog post in Studio with a Cloudinary image URL
3. Visit `/blogs` — confirm the post appears with the image
4. Visit `/blogs/[slug]` — confirm full post renders correctly
5. Edit the post in Studio — confirm changes appear after revalidation
6. Run `npm run build` — confirm static generation works with Sanity data

---

## Summary of Free Services Needed

| Service | Sign-up URL | What you get free |
|---------|-------------|-------------------|
| **Sanity.io** | sanity.io/get-started | Visual editor, API, 100K req/mo |
| **Cloudinary** | cloudinary.com/users/register | Image hosting, 25GB storage |
| **Vercel** (deploy) | vercel.com | Hosting, SSL, CDN |
