"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/login");
      setLoading(false);
    })();
  }, [router, supabase]);

  if (loading) return null;

  return (
    <main>
      <NavBar />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
        <h1 style={{ fontSize: 32, marginBottom: 10 }}>Dashboard</h1>
        <p style={{ opacity: 0.85 }}>
          You’re logged in. Next we’ll add the chat UI here.
        </p>
      </div>
    </main>
  );
}
