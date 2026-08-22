"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2 } from "lucide-react";

interface Category { id: string; name: string; slug: string }
interface Destination { id: string; name: string; slug: string }
interface Author { id: string; name: string }

interface ContentSection {
  heading: string;
  paragraphs: string[];
  images: { url: string; alt: string; caption: string }[];
  subSections: {
    heading: string;
    paragraphs: string[];
    images: { url: string; alt: string; caption: string }[];
  }[];
}

interface PostData {
  id?: string;
  title: string;
  slug: string;
  issue_number: string;
  subtitle: string;
  category_id: string;
  destination_id: string;
  author_id: string;
  read_time: string;
  image: string;
  featured: boolean;
  published_at: string;
  seo_title: string;
  meta_description: string;
  og_image: string;
  content: ContentSection[];
}

interface PostFormProps {
  post?: PostData;
  categories: Category[];
  destinations: Destination[];
  authors: Author[];
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const inputClass = "w-full px-4 py-2.5 rounded-lg border border-[#CCCCCC] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#E8D5A3] transition text-sm";
const labelClass = "block text-sm font-medium mb-1";

export default function PostForm({ post, categories, destinations, authors }: PostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [issueNumber, setIssueNumber] = useState(post?.issue_number ?? "");
  const [subtitle, setSubtitle] = useState(post?.subtitle ?? "");
  const [categoryId, setCategoryId] = useState(post?.category_id ?? "");
  const [destinationId, setDestinationId] = useState(post?.destination_id ?? "");
  const [authorId, setAuthorId] = useState(post?.author_id ?? authors[0]?.id ?? "");
  const [readTime, setReadTime] = useState(post?.read_time ?? "");
  const [image, setImage] = useState(post?.image ?? "");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [publishedAt, setPublishedAt] = useState(post?.published_at?.slice(0, 16) ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
  const [ogImage, setOgImage] = useState(post?.og_image ?? "");
  const [content, setContent] = useState<ContentSection[]>(post?.content ?? []);

  function autoSlug(t: string) {
    setTitle(t);
    if (!post) setSlug(slugify(t));
  }

  function addSection() {
    setContent([...content, { heading: "", paragraphs: [""], images: [], subSections: [] }]);
  }

  function removeSection(i: number) {
    setContent(content.filter((_, idx) => idx !== i));
  }

  function updateSection(i: number, field: string, value: string) {
    const updated = [...content];
    (updated[i] as unknown as Record<string, unknown>)[field] = value;
    setContent(updated);
  }

  function updateParagraphs(sectionIdx: number, text: string) {
    const updated = [...content];
    updated[sectionIdx].paragraphs = text.split("\n\n").filter(Boolean);
    setContent(updated);
  }

  function addSubSection(sectionIdx: number) {
    const updated = [...content];
    updated[sectionIdx].subSections.push({ heading: "", paragraphs: [""], images: [] });
    setContent(updated);
  }

  function removeSubSection(sectionIdx: number, subIdx: number) {
    const updated = [...content];
    updated[sectionIdx].subSections = updated[sectionIdx].subSections.filter((_, i) => i !== subIdx);
    setContent(updated);
  }

  function updateSubSection(sectionIdx: number, subIdx: number, field: string, value: string) {
    const updated = [...content];
    (updated[sectionIdx].subSections[subIdx] as unknown as Record<string, unknown>)[field] = value;
    setContent(updated);
  }

  function updateSubParagraphs(sectionIdx: number, subIdx: number, text: string) {
    const updated = [...content];
    updated[sectionIdx].subSections[subIdx].paragraphs = text.split("\n\n").filter(Boolean);
    setContent(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const data = {
      title,
      slug,
      issue_number: issueNumber || null,
      subtitle: subtitle || null,
      category_id: categoryId,
      destination_id: destinationId || null,
      author_id: authorId,
      read_time: readTime || null,
      image: image || null,
      featured,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
      seo_title: seoTitle || null,
      meta_description: metaDescription || null,
      og_image: ogImage || null,
      content: content.length > 0 ? content : null,
    };

    let result;
    if (post?.id) {
      result = await supabase.from("posts").update(data).eq("id", post.id);
    } else {
      result = await supabase.from("posts").insert(data);
    }

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <fieldset className="bg-white rounded-xl border border-[#CCCCCC] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[#555] px-2">Basic Info</legend>

        <div>
          <label className={labelClass}>Title *</label>
          <input type="text" value={title} onChange={(e) => autoSlug(e.target.value)} required className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Slug *</label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className={inputClass} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Issue Number</label>
            <input type="text" value={issueNumber} onChange={(e) => setIssueNumber(e.target.value)} placeholder="No. 001" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Read Time</label>
            <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="6 min read" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Subtitle</label>
          <textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={2} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Category *</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className={inputClass}>
              <option value="">Select...</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Destination</label>
            <select value={destinationId} onChange={(e) => setDestinationId(e.target.value)} className={inputClass}>
              <option value="">None</option>
              {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Author *</label>
            <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required className={inputClass}>
              {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Cover Image URL *</label>
          <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className={inputClass} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Published At</label>
            <input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={inputClass} />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 accent-[#1A1A1A]" />
              Featured Post
            </label>
          </div>
        </div>
      </fieldset>

      {/* SEO */}
      <fieldset className="bg-white rounded-xl border border-[#CCCCCC] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[#555] px-2">SEO (Optional)</legend>
        <div>
          <label className={labelClass}>SEO Title</label>
          <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Meta Description</label>
          <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} maxLength={160} className={inputClass} />
          <p className="text-[11px] text-[#999] mt-1">{metaDescription.length}/160</p>
        </div>
        <div>
          <label className={labelClass}>OG Image URL</label>
          <input type="url" value={ogImage} onChange={(e) => setOgImage(e.target.value)} className={inputClass} />
        </div>
      </fieldset>

      {/* Content Sections */}
      <fieldset className="bg-white rounded-xl border border-[#CCCCCC] p-6 space-y-4">
        <legend className="text-sm font-semibold text-[#555] px-2">Content Sections</legend>

        {content.map((section, i) => (
          <div key={i} className="border border-[#EBEBEB] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#999] uppercase">Section {i + 1}</span>
              <button type="button" onClick={() => removeSection(i)} className="p-1 text-[#999] hover:text-red-600 transition-colors cursor-pointer">
                <Trash2 size={14} />
              </button>
            </div>

            <div>
              <label className={labelClass}>Heading (H2)</label>
              <input type="text" value={section.heading} onChange={(e) => updateSection(i, "heading", e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Paragraphs</label>
              <textarea
                value={section.paragraphs.join("\n\n")}
                onChange={(e) => updateParagraphs(i, e.target.value)}
                rows={4}
                placeholder="Separate paragraphs with blank lines"
                className={inputClass}
              />
            </div>

            {/* Sub-sections */}
            {section.subSections.map((sub, j) => (
              <div key={j} className="ml-4 border-l-2 border-[#E8D5A3] pl-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#999]">Sub-section {j + 1}</span>
                  <button type="button" onClick={() => removeSubSection(i, j)} className="p-1 text-[#999] hover:text-red-600 cursor-pointer">
                    <Trash2 size={12} />
                  </button>
                </div>
                <input
                  type="text"
                  value={sub.heading}
                  onChange={(e) => updateSubSection(i, j, "heading", e.target.value)}
                  placeholder="Sub-heading (H3)"
                  className={inputClass}
                />
                <textarea
                  value={sub.paragraphs.join("\n\n")}
                  onChange={(e) => updateSubParagraphs(i, j, e.target.value)}
                  rows={3}
                  placeholder="Paragraphs (blank lines to separate)"
                  className={inputClass}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => addSubSection(i)}
              className="text-[12px] text-[#298DFF] hover:underline cursor-pointer"
            >
              + Add Sub-section
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="flex items-center gap-2 text-sm text-[#555] hover:text-[#1A1A1A] transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Add Content Section
        </button>
      </fieldset>

      {/* Submit */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#1A1A1A] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#333] transition disabled:opacity-50"
        >
          {saving ? "Saving..." : post?.id ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className="px-6 py-2.5 rounded-lg text-sm font-medium border border-[#CCCCCC] hover:bg-[#F5F5F5] transition cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
