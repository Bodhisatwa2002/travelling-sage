"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#CCCCCC] text-center">
        <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold mb-4">
          Check Your Email
        </h1>
        <p className="text-gray-500 mb-6">
          We&apos;ve sent you a password reset link. Click it to set a new password.
        </p>
        <Link
          href="/login"
          className="text-[#298DFF] hover:underline text-sm"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#CCCCCC]">
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold text-center mb-2">
        Forgot Password
      </h1>
      <p className="text-center text-gray-500 mb-8 text-sm">
        Enter your email and we&apos;ll send you a reset link
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-[#CCCCCC] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#E8D5A3] transition"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-[#1A1A1A] text-white font-medium hover:bg-[#333] transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-gray-500">
        Remember your password?{" "}
        <Link href="/login" className="text-[#298DFF] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
