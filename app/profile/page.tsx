"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    })();
  }, [supabase]);

  return (
    <main>
      <NavBar />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
        <h1 style={{ fontSize: 32, marginBottom: 10 }}>Profile</h1>
        <p style={{ opacity: 0.85 }}>Email: {email ?? "Not signed in"}</p>
      </div>
    </main>
  );
}
