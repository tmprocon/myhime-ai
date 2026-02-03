"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { signOut } from "../../lib/auth";

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/";
        return;
      }

      setEmail(data.user.email ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="p-10">Loading…</p>;
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Creator Dashboard</h1>
      <p className="mt-2 opacity-80">Logged in as {email}</p>

      <button
        onClick={signOut}
        className="mt-6 border rounded px-4 py-2"
      >
        Sign out
      </button>
    </main>
  );
}
