"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          ...formData,
          subject: `New contact from ${formData.name} — Traveling Sage`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-3">
        <p className="text-lg font-semibold">Message sent!</p>
        <p className="text-sm text-[#555555]">We&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm underline hover:text-[#333]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name*</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-[#CCCCCC] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email*</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-[#CCCCCC] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          rows={4}
          placeholder="Enter your message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full border border-[#CCCCCC] bg-white px-4 py-3 text-sm placeholder:text-[#999999] focus:outline-none focus:border-[#1A1A1A] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#1A1A1A] text-white px-8 py-3 text-xs font-bold tracking-wider hover:bg-[#333] transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "SENDING..." : "SUBMIT"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">Failed to send. Please try again.</p>
      )}
    </form>
  );
}
