import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/sanity/queries/posts";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Blog post on Traveling Sage";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1A1A1A",
            color: "#FFFFFF",
            fontSize: 48,
          }}
        >
          Traveling Sage
        </div>
      ),
      { ...size }
    );
  }

  const title = post.title;
  const category = post.category?.toUpperCase() || "";
  const author = post.author || "";
  const readTime = post.readTime || "";

  // If the post has a custom OG image from CMS, use it as background
  const bgImage = post.ogImage || post.image;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        {/* Background image */}
        {bgImage ? (
          <img
            src={bgImage}
            alt=""
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
            display: "flex",
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "48px 56px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Category badge */}
          {category && (
            <div
              style={{
                fontSize: 14,
                letterSpacing: "3px",
                color: "#FFFFFF",
                textTransform: "uppercase",
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "6px 16px",
                borderRadius: 4,
                alignSelf: "flex-start",
              }}
            >
              {category}
            </div>
          )}
          {/* Title */}
          <div
            style={{
              fontSize: title.length > 60 ? 36 : 48,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {/* Author and read time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 16,
              color: "#CCCCCC",
            }}
          >
            {author && <span>by {author}</span>}
            {author && readTime && <span>|</span>}
            {readTime && <span>{readTime}</span>}
          </div>
        </div>
        {/* Site branding - top right */}
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 40,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#FFFFFF",
            fontSize: 18,
            letterSpacing: "3px",
          }}
        >
          TRAVELING SAGE
        </div>
      </div>
    ),
    { ...size }
  );
}
