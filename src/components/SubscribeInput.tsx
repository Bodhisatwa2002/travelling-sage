"use client";

import { useState } from "react";

export default function SubscribeInput() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit() {
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-green-700 font-medium">Subscribed! 🎉</p>;
  }

  return (
    <>
      <div className="flex gap-0">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-1 border border-[#CCCCCC] bg-white px-4 py-3 text-sm placeholder:text-[#AAAAAA] focus:outline-none focus:border-[#1A1A1A]"
        />
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="bg-[#1A1A1A] text-white px-6 py-3 text-xs font-bold tracking-wider hover:bg-[#333] transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "..." : "SUBSCRIBE"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Try again.</p>
      )}
    </>
  );
}
