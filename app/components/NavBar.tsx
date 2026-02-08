"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NavBar() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    })();
  }, [supabase]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header style={{ padding: 16, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Image src="/logo.png" alt="MyHiMe" width={160} height={54} priority />
          </Link>

          <nav style={{ display: "flex", gap: 14 }}>
            <Link href="/dashboard" style={{ color: "#e8eefc", textDecoration: "none" }}>Dashboard</Link>
            <Link href="/profile" style={{ color: "#e8eefc", textDecoration: "none" }}>Profile</Link>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ opacity: 0.85, fontSize: 14 }}>{email ?? ""}</span>
          <button
            onClick={logout}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#e8eefc",
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
