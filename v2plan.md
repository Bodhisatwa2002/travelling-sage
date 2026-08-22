# Travelling Sage v2 — Feature Tracker

## Progress: 8/17 done

---

## Low-hanging fruit (bounded, high ROI)

- [x] **Estimated reading progress ("X min left")** — Shows "X min remaining" next to progress bar using readTime + scroll position.
  - `src/components/ReadingProgress.tsx`

- [x] **"Back to top" floating button** — Appears after scrolling 500px. Smooth-scrolls to top.
  - `src/components/BackToTop.tsx`

- [x] **Connect the newsletter subscribe box** — Writes subscriber emails to Sanity via `/api/subscribe`. Subscribe modal in Navbar.
  - `src/components/SubscribeBox.tsx`, `src/components/SubscribeInput.tsx`, `src/app/api/subscribe/route.ts`

- [x] **Connect the contact form** — Integrated with Web3Forms. Requires `NEXT_PUBLIC_WEB3FORMS_KEY` env var.
  - `src/components/ContactForm.tsx`

- [x] **Post reading time filter on blog listing** — Filter by "All", "Quick reads (<5 min)", "Long reads (5+ min)".
  - `src/components/BlogListingFilter.tsx`
  - **Bug:** Pagination NEXT button has no onClick handler — only page 1 works.

---

## Medium effort, high engagement

- [ ] **Bookmark / "Save for later" list** — localStorage-based. Heart/bookmark icon on BlogCard, /saved page. No auth needed.

- [ ] **Dark mode toggle** — Tailwind `dark:` variant. Travel blogs get a lot of nighttime reading.

- [ ] **Image lightbox in blog posts** — Click inline image to see full-screen with caption.

- [ ] **"Copy quote" on text selection** — Select text in a blog post, popup to copy as formatted quote or share on Twitter.

- [ ] **Related destinations widget** — On blog detail, show card linking to destination page.
  - **Partial:** Currently shows related posts by category, not destination cards.

---

## Bigger features (architectural)

- [ ] **Interactive trip planner / itinerary builder** — Drag blog posts and destinations into a trip. Saves to localStorage or shareable URL.

- [x] **Comment system** — Custom Sanity-backed comments with moderation. Comments require approval before appearing.
  - `src/components/CommentSection.tsx`, `src/app/api/comments/route.ts`, `src/sanity/schemas/comment.ts`

- [ ] **"Travel journal" user accounts** — User profiles, server-side bookmarks, destination reviews. Full auth + DB.

- [ ] **Interactive map page** — Map of India with pins for each destination. Click pin to see posts. Mapbox or Leaflet.

- [ ] **Audio narration of blog posts** — "Listen to this article" button using Web Speech API or pre-recorded audio.

---

## Bonus (added during implementation)

- [x] **Subscribe modal in Navbar** — Desktop + mobile subscribe buttons open a modal with email input.
  - `src/components/Navbar.tsx`

- [x] **Email notifications for new posts (Resend)** — `/api/notify` sends email blast to all active subscribers when a new post is published.
  - `src/app/api/notify/route.ts`
  - **Needs:** Verified sending domain in Resend for production. Currently using `onboarding@resend.dev` (free tier).

---

## Environment setup needed

| Env var | Service | Status |
|---------|---------|--------|
| `SANITY_API_TOKEN` | Sanity | Set |
| `SANITY_REVALIDATE_SECRET` | Sanity webhook | Set |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms | Set |
| `RESEND_API_KEY` | Resend | Set (regenerate — was exposed) |
| `RESEND_FROM_EMAIL` | Resend | Set (free tier) |

## Still needed for production
- [ ] Sanity webhook to auto-trigger `/api/notify` on post publish
- [ ] Verify sending domain in Resend
- [ ] Fix pagination in BlogListingFilter
