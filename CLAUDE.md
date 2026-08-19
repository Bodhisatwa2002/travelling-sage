# Traveling Sage Engineering Guidelines

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Core principles

1. **Content integrity.** All content lives in Sanity CMS. Never hardcode blog content, categories, or destination data in frontend components. Fetch from Sanity and render what exists — preserve an honest empty state when data is missing.
2. **Structured content over rich text.** Blog posts use deeply nested structured blocks (`contentSection → subSections`), not a rich-text editor. Respect this structure in queries, rendering, and upload scripts.
3. **SEO by default.** Every public page needs metadata, OpenGraph tags, and JSON-LD structured data. Use `seoTitle`/`metaDescription`/`ogImage` overrides when available, fall back to `title`/`subtitle`/`image`.
4. **Server-first rendering.** Default to React Server Components. Add `'use client'` only where browser APIs, event listeners, or hooks require it. Keep client components focused and small.
5. **Deterministic IDs.** Sanity documents use predictable ID patterns (`post-<slug>`, `category-<slug>`, `destination-<slug>`, `author-<slug>`). Upload scripts must use `createOrReplace()` with these IDs for idempotent writes.
6. **External image hosting.** Images are URLs (Unsplash, Cloudinary), not Sanity asset references. Both domains are whitelisted in `next.config.ts` remote patterns.

## Commands

```bash
npm run dev          # Start dev server (Next.js 16, port 3000)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals + TypeScript)
npx tsx scripts/<name>.ts  # Run Sanity upload/migration scripts
rm -rf .next         # Clear ISR cache after content changes
```

No test framework is configured. Verify changes with `npm run build` and manual inspection.

## Repository structure

```text
src/
  app/                 Next.js App Router pages, layouts, API routes, SEO files
    api/
      revalidate/      POST webhook for ISR cache invalidation (secret-gated)
      search/          GET endpoint — in-memory search across all posts
    blogs/[slug]/      Blog detail with TOC, reading progress, related posts, JSON-LD
    categories/[slug]/ Posts filtered by category
    destinations/[region]/[destination]/ Region → destination hierarchy
    about/, gallery/, instagram/  Static content pages
    studio/            Embedded Sanity Studio (basePath: /studio)
  components/          Reusable UI components (PascalCase filenames)
  sanity/
    schemas/           Sanity document types: post, category, destination, region, author
    queries/           GROQ query functions consumed by pages
    config/            Sanity client and environment configuration
    lib/               (empty — fetch wrapper removed; ISR config lives in config/client.ts)
  types/               Shared TypeScript interfaces (BlogPost, Category, Destination, etc.)
  data/                Site configuration (nav links, footer, socials)
scripts/               Sanity upload and migration scripts (TypeScript, run with tsx)
public/fonts/          Local Moret font files (.otf)
sanity.config.ts       Root Sanity Studio configuration
```

## Data flow

All content flows through Sanity CMS via this pipeline:

1. **Schemas** (`src/sanity/schemas/`) define document structure with validation rules
2. **Queries** (`src/sanity/queries/`) export typed GROQ query functions that call `client.fetch()` with the shared `ISR` constant from `config/client.ts`
3. **Pages** consume query functions as async Server Components
4. **Revalidation** happens via 1-hour ISR or the `/api/revalidate` webhook (requires `SANITY_REVALIDATE_SECRET`)

Upload scripts in `scripts/` use `@sanity/client` directly (not `next-sanity`) with a write token from `.env.local`.

## Sanity data model

| Document | Key fields | Notes |
|----------|-----------|-------|
| `region` | name, slug | Groups destinations geographically |
| `author` | name, slug, role, bio, image, isFounder | Founder flag for primary author |
| `category` | name, slug, description, image | Flat (no hierarchy), one per post |
| `destination` | name, slug, description, image, region (ref) | Belongs to a region |
| `post` | title, slug, issueNumber, subtitle, category (ref), destination (ref), author (ref), readTime, image, featured, publishedAt, content[], SEO fields | Content is array of `contentSection` objects |

**Content structure:** `post.content[]` → each `contentSection` has `heading` (h2), `paragraphs[]`, `images[]` (`{url, alt, caption}`), and `subSections[]` → each subsection has `heading` (h3), `paragraphs[]`, `images[]`.

## TypeScript and code patterns

- **Path alias:** `@/` maps to `src/`
- **Strict mode** enabled in `tsconfig.json` (target ES2017, module ESNext)
- **Props:** Define interfaces in-file, named `<ComponentName>Props`
- **Server Components:** Async functions that call Sanity query functions directly. Use `Promise.all()` for parallel fetches.
- **Client Components:** Only for interactive features — `SearchModal` (debounced search, keyboard shortcuts), `HeroBanner` (mouse tracking), `Navbar` (mobile menu, Cmd+K), `TableOfContents` (IntersectionObserver), `ShareButtons` (clipboard API).
- **Static generation:** Blog detail pages use `generateStaticParams()` from `getAllPosts()`.
- **Dynamic route params:** Next.js 16 uses `params: Promise<{ slug: string }>` — must `await params` before use.

## Styling conventions

- **Framework:** Tailwind CSS 4 via PostCSS plugin (`@tailwindcss/postcss`)
- **No CSS modules.** All styling is Tailwind utility classes in `className`.
- **Color palette:** `#1A1A1A` (text), `#EBEBEB` (background), `#E8D5A3` (hover highlight/cream), `#298DFF` (link blue), `#060610` (footer dark), `#CCCCCC` (borders)
- **Font usage:**
  - Body text: Inter (`font-[family-name:var(--font-inter)]`)
  - Headings/titles: Moret (`font-[family-name:var(--font-moret)]`) — local serif font
  - Footer: JetBrains Mono (`font-[family-name:var(--font-jetbrains)]`)
  - Decorative: Anton, Press Start 2P
- **Responsive:** Mobile-first. Common breakpoints: `md:` for desktop layouts. Grids go from 1 col → 2–3 cols.
- **Hover effects:** Grayscale on images, cream background highlight on titles, color transitions (300ms).
- **No icon libraries besides `lucide-react`.** No emoji in UI.

## SEO infrastructure

- **Sitemap** (`src/app/sitemap.ts`): Auto-generates from all static + dynamic routes with priority/frequency metadata
- **Robots** (`src/app/robots.ts`): Allows all, disallows `/studio/`
- **OG Image** (`src/app/opengraph-image.tsx`): Dynamic 1200×630 image using Next.js ImageResponse API
- **JSON-LD** (`src/components/JsonLd.tsx`): `ArticleJsonLd`, `BreadcrumbJsonLd`, `WebSiteJsonLd` — used on blog detail and homepage
- **Per-post SEO:** `seoTitle`, `metaDescription`, `ogImage` fields override defaults

## Environment variables

```bash
# Required in .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=<project_id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-26
SANITY_API_TOKEN=<write_token>           # Used by upload scripts
SANITY_REVALIDATE_SECRET=<webhook_secret> # Used by /api/revalidate
NEXT_PUBLIC_SITE_URL=https://travelingsage.vercel.app
```

Never commit `.env.local`, tokens, or credentials.

## Component reuse patterns

- **BlogCard:** Used on homepage, blog listing, related posts, sidebar — accepts `BlogPost` interface
- **CategoryCard:** Used for both categories AND destinations — generic via `linkPrefix` prop
- **Footer:** Dynamically generates all links from Sanity data (destinations, categories, recent posts)
- **Navbar:** Builds 3-level destination dropdown from `regions` + `destinations` props passed from root layout

## Working procedure

1. Read applicable instructions — this file and any directory-specific `AGENTS.md`.
2. Inspect relevant source files, schemas, and queries before editing.
3. For content changes: create/update in Sanity Studio at `/studio`, or write an upload script following existing patterns in `scripts/`.
4. For frontend changes: maintain Server Component default, keep styling in Tailwind utilities, preserve SEO metadata.
5. Verify with `npm run build`. Check rendered output in dev server.
6. After Sanity content changes, run `rm -rf .next` for the dev server to pick up new data.

## Blog Post Workflow

When the `/travelling-sage-seo-writer` skill is used to write a blog post, **always** follow this end-to-end flow:

1. **Write the blog** — Follow the 4-step skill workflow (gather requirements -> research -> outline for approval -> write).
2. **Upload to Sanity CMS** — After the blog is written, create a TypeScript upload script in `scripts/` (like `scripts/upload-<slug>.ts`) that:
   - Connects to Sanity using `@sanity/client` and `.env.local` credentials
   - Fetches the correct `category`, `destination`, and `author` references from Sanity
   - Structures the blog content into the Sanity `post` schema format (contentSection -> heading, paragraphs, images, subSections)
   - Uploads using `client.createOrReplace()`
   - Reference existing scripts in `scripts/` for the exact pattern
3. **Run the script** — Execute `npx tsx scripts/upload-<slug>.ts` to push to Sanity
4. **Clear cache** — Run `rm -rf .next` so the local dev server picks up new content

### Sanity Post Schema Quick Reference

- **Required fields:** title, slug, category (reference), author (reference), image (URL)
- **Optional fields:** issueNumber, subtitle, destination (reference), readTime, featured, publishedAt, seoTitle, metaDescription, ogImage
- **Content structure:** Array of `contentSection` objects, each with:
  - `heading` (string), `paragraphs` (string[]), `images` (array of `{url, alt, caption}`)
  - `subSections` (array of `{heading, paragraphs, images}`)
- **Reference IDs follow pattern:** `category-<slug>`, `destination-<slug>`, `author-<slug>`
- **Post IDs follow pattern:** `post-<slug>`

### Current Site State

- **Live URL:** https://travelingsage.vercel.app
- **CMS:** Sanity (project ID in `.env.local`)
- **Existing categories:** Mountains, Beaches, Hikes, Bucket List, Itineraries
- **Existing destinations:** Uttarakhand (North India), Banaras, Delhi (North India), Nagaland (Northeast India), Pondicherry (South India)
- **Author:** Founder author (isFounder: true) is used for all posts
