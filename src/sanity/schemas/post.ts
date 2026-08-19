import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 200 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issueNumber",
      title: "Issue Number",
      type: "string",
      description: 'e.g. "No. 001"',
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "6 min read"',
    }),
    defineField({
      name: "image",
      title: "Image URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "Used for SEO metadata and RSS feeds",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Override the post title for search engines (optional, falls back to Title)",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Short summary for search engines (optional, falls back to Subtitle)",
      validation: (rule) => rule.max(160),
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "url",
      description: "Override image for social media cards (optional, falls back to main Image)",
      group: "seo",
    }),
    defineField({
      name: "content",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "contentSection",
          title: "Content Section",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [{ type: "text" }],
            }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "inlineImage",
                  title: "Image",
                  fields: [
                    defineField({
                      name: "url",
                      title: "Image URL",
                      type: "url",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    }),
                    defineField({
                      name: "caption",
                      title: "Caption",
                      type: "string",
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: "subSections",
              title: "Sub Sections",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "subSection",
                  title: "Sub Section",
                  fields: [
                    defineField({
                      name: "heading",
                      title: "Heading",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "paragraphs",
                      title: "Paragraphs",
                      type: "array",
                      of: [{ type: "text" }],
                    }),
                    defineField({
                      name: "images",
                      title: "Images",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          name: "subSectionImage",
                          title: "Image",
                          fields: [
                            defineField({
                              name: "url",
                              title: "Image URL",
                              type: "url",
                              validation: (rule) => rule.required(),
                            }),
                            defineField({
                              name: "alt",
                              title: "Alt Text",
                              type: "string",
                            }),
                            defineField({
                              name: "caption",
                              title: "Caption",
                              type: "string",
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      category: "category.name",
    },
    prepare({ title, author, category }) {
      return {
        title,
        subtitle: `${category || "Uncategorized"} · by ${author || "Unknown"}`,
      };
    },
  },
});
