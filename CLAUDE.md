@AGENTS.md

## Blog Post Workflow

When the `/travelling-sage-seo-writer` skill is used to write a blog post, **always** follow this end-to-end flow:

1. **Write the blog** — Follow the 4-step skill workflow (gather requirements → research → outline for approval → write).
2. **Upload to Sanity CMS** — After the blog is written, create a TypeScript upload script in `scripts/` (like `scripts/upload-<slug>.ts`) that:
   - Connects to Sanity using `@sanity/client` and `.env.local` credentials
   - Fetches the correct `category`, `destination`, and `author` references from Sanity
   - Structures the blog content into the Sanity `post` schema format (contentSection → heading, paragraphs, images, subSections)
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
