# Travelling Sage

A modern travel magazine and blog platform for curious explorers. Built with Next.js 16, powered by Sanity CMS, and styled with Tailwind CSS.

> Dive into stories from India's most captivating destinations — from ancient ghats and Himalayan trails to hidden beaches and tribal heartlands.

---

## Overview

Travelling Sage is a full-featured travel blog that showcases destinations across India through in-depth articles, curated photo galleries, and region-based exploration. Content is managed through Sanity Studio, a built-in visual editor accessible at `/studio`.

### Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured post, recent blogs, editor's choice, and more |
| `/blogs` | All blog posts in a grid layout |
| `/blogs/[slug]` | Full article with table of contents, share buttons, reading progress, and related posts |
| `/categories` | Browse by category (Mountains, Beaches, Hikes, Bucket List, Itineraries) |
| `/categories/[slug]` | Posts filtered by a specific category |
| `/destinations` | All destinations organized by region |
| `/destinations/[region]` | Destinations within a region (North India, Northeast India, South India) |
| `/destinations/[region]/[slug]` | Posts about a specific destination |
| `/gallery` | Photo gallery with toggle between all photos and folder-by-location view |
| `/about` | About the team, founder bio, contact form |
| `/studio` | Sanity Studio CMS (visual content editor) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| CMS | [Sanity](https://www.sanity.io) (headless, embedded Studio) |
| Icons | Lucide React |
| Fonts | Moret (custom), Inter, Plus Jakarta Sans, Anton, JetBrains Mono |
| Image CDN | Cloudinary + Unsplash (configurable) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout (Navbar + Footer)
│   ├── not-found.tsx             # 404 page
│   ├── blogs/                    # Blog listing + detail pages
│   ├── categories/               # Category listing + detail pages
│   ├── destinations/             # Region > Destination > Posts hierarchy
│   ├── gallery/                  # Photo gallery
│   ├── about/                    # About + Contact
│   ├── studio/                   # Sanity Studio (embedded CMS)
│   └── api/
│       ├── search/               # Search API endpoint
│       └── revalidate/           # ISR on-demand revalidation webhook
│
├── components/                   # React components (26 total)
│   ├── Navbar.tsx                # Navigation with destination mega-menu
│   ├── Footer.tsx                # Footer with dynamic content from Sanity
│   ├── BlogCard.tsx              # Reusable blog post card
│   ├── GalleryView.tsx           # Gallery with all/folder toggle
│   ├── SearchModal.tsx           # Full-text search (Cmd+K)
│   ├── TableOfContents.tsx       # Auto-generated TOC from headings
│   ├── ReadingProgress.tsx       # Scroll progress bar
│   ├── ShareButtons.tsx          # Social sharing (Twitter, Facebook, LinkedIn, copy)
│   ├── RelatedPosts.tsx          # Related posts by category/destination
│   ├── JsonLd.tsx                # Schema.org structured data
│   └── ...                       # Homepage sections, cards, forms
│
├── sanity/
│   ├── config/                   # Sanity client and env config
│   ├── schemas/                  # Content type definitions
│   │   ├── post.ts               # Blog post (with SEO fields)
│   │   ├── category.ts
│   │   ├── destination.ts
│   │   ├── region.ts
│   │   └── author.ts
│   ├── queries/                  # GROQ queries + typed async fetchers
│   └── lib/                      # Fetch wrapper (ISR) + image helpers
│
├── types/                        # Shared TypeScript interfaces
│   └── index.ts
│
└── data/
    └── site.ts                   # Site name, nav links, footer config
```

---

## Features

**Content & CMS**
- Visual content editor at `/studio` (Sanity Studio)
- Structured content: posts with nested sections and subsections
- SEO fields per post (custom title, meta description, OG image)
- ISR with 1-hour revalidation + on-demand revalidation webhook

**Blog Experience**
- Reading progress indicator
- Auto-generated table of contents
- Social share buttons
- Related posts by category and destination
- Previous/next post navigation

**Discovery**
- Full-text search with keyboard shortcut (Cmd+K)
- Browse by category, region, or destination
- Destination mega-menu in navigation
- Gallery with all-photos and folder-by-location views

**SEO & Performance**
- JSON-LD structured data (Article, Website, Breadcrumb)
- Open Graph and Twitter Card meta tags
- Static generation with ISR
- Next.js Image optimization with remote patterns

**Design**
- Magazine-style editorial layout
- Custom Moret serif typeface
- Responsive design (mobile + desktop)
- Hover effects (grayscale images, highlighted titles)

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Sanity](https://www.sanity.io) account (free tier)

### Installation

```bash
git clone <repo-url>
cd travel-blog
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-26
SANITY_API_TOKEN=your-write-token
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### Running Locally

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- CMS: [http://localhost:3000/studio](http://localhost:3000/studio)

### Data Migration

To push existing seed data into Sanity:

```bash
npx tsx scripts/migrate-to-sanity.ts
```

### Build

```bash
npm run build
npm start
```

---

## Content Management

All content is managed through Sanity Studio at `/studio`. Content types:

| Type | Description |
|------|-------------|
| **Blog Post** | Articles with title, category, author, destination, content sections, and SEO fields |
| **Category** | Groupings like Mountains, Beaches, Hikes, Bucket List, Itineraries |
| **Destination** | Places like Rishikesh, Banaras, Pondicherry — linked to a region |
| **Region** | Geographic groupings (North India, Northeast India, South India) |
| **Author** | Writer profiles with name, bio, and photo |

### Adding Content

1. Open `/studio` and sign in
2. Create entries in order: **Regions** > **Authors** > **Categories** > **Destinations** > **Posts**
3. Click **Publish** after each entry
4. Content appears on the site within 1 hour (ISR) or instantly via the revalidation webhook

---

## Deployment

Deploy to [Vercel](https://vercel.com):

1. Push to GitHub
2. Import the repo on Vercel
3. Add environment variables in Vercel project settings
4. Add the production URL to Sanity CORS origins (with credentials)

---

## License

Private project. All rights reserved.
