"use client";

import { useEffect, useState } from "react";

interface Comment {
  name: string;
  message: string;
  createdAt: string;
}

interface CommentSectionProps {
  slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    fetch(`/api/comments?slug=${slug}`)
      .then((res) => res.json())
      .then(setComments)
      .catch(() => {});
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, slug }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <section className="pt-10 pb-8">
      <h2 className="font-[family-name:var(--font-moret)] text-[28px] font-bold mb-6">
        Comments
      </h2>

      {/* Existing comments */}
      {comments.length > 0 ? (
        <div className="space-y-6 mb-10">
          {comments.map((c, i) => (
            <div key={i} className="border-b border-[#EBEBEB] pb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-sm font-bold">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-[11px] text-[#999]">{formatDate(c.createdAt)}</p>
                </div>
              </div>
              <p className="text-[15px] leading-[1.6] text-[#333] pl-11">{c.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#777] mb-8">No comments yet. Be the first!</p>
      )}

      {/* Comment form */}
      <div className="border border-[#CCCCCC] p-6">
        <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
        {status === "success" ? (
          <p className="text-sm text-green-700">
            Comment submitted! It will appear after review.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#CCCCCC] bg-white px-4 py-3 text-sm placeholder:text-[#AAAAAA] focus:outline-none focus:border-[#1A1A1A]"
            />
            <textarea
              placeholder="Your comment"
              required
              maxLength={2000}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-[#CCCCCC] bg-white px-4 py-3 text-sm placeholder:text-[#AAAAAA] focus:outline-none focus:border-[#1A1A1A] resize-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#1A1A1A] text-white px-6 py-3 text-xs font-bold tracking-wider hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "SUBMITTING..." : "POST COMMENT"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600">Failed to submit. Try again.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
