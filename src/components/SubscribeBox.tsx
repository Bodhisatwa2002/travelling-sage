"use client";

import { useState } from "react";

export default function SubscribeBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div className="bg-[#F0F0EC] p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="font-[family-name:var(--font-moret)] text-[22px] font-bold">
            Don&apos;t miss a thing
          </h3>
          <p className="text-sm text-[#555555]">
            Subscribe to get updates straight to your inbox.
          </p>
        </div>

        {/* Stamp decoration */}
        <div className="border-2 border-[#1A1A1A] p-2 text-center rotate-[-8deg] opacity-60">
          <p className="text-[8px] font-bold tracking-wider">CAIRO</p>
          <p className="text-[10px] font-semibold leading-tight">
            27 APR
            <br />
            1950
          </p>
          <p className="text-[8px] font-bold tracking-wider">EGYPT</p>
        </div>
      </div>

      {status === "success" ? (
        <p className="text-sm text-green-700 font-medium">{message}</p>
      ) : (
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
            <p className="text-sm text-red-600">{message}</p>
          )}
        </>
      )}
    </div>
  );
}
