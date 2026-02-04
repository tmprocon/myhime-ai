"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { signInWithEmail } from "../lib/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function joinBeta(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving your spot...");

    // 1) Save to waitlist (no duplicate error)
    const { error } = await supabase
      .from("beta_signups")
      .upsert({ email }, { onConflict: "email" });

    if (error) {
      setStatus(`Error: ${error.message}`);
      return;
    }

    // 2) Send magic link
    const { error: authError } = await signInWithEmail(email);
    if (authError) {
      setStatus(`Auth Error: ${authError.message}`);
      return;
    }

    setStatus("✅ Check your email for the login link.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-10">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold">MyHiMe Beta</h1>
        <p className="mt-2 opacity-80">
          Join the waitlist and get early access to the Creator Dashboard.
        </p>

        <form onSubmit={joinBeta} className="mt-6 flex gap-2 flex-wrap">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="border rounded px-4 py-3 w-[280px]"
          />
          <button
            type="submit"
            className="rounded px-5 py-3 font-semibold border"
          >
            Join Beta
          </button>
        </form>

        {status && <p className="mt-3">{status}</p>}

        <a
          href="/dashboard"
          className="inline-block mt-8 border rounded px-5 py-3 font-semibold"
        >
          Go to Dashboard (Preview)
        </a>
      </div>
    </main>
  );
}
