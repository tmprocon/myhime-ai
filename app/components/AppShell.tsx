"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AppShellProps = {
  title?: string;
  children: React.ReactNode;
};

export default function AppShell({ title = "Dashboard", children }: AppShellProps) {
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 280,
          borderRight: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Brand */}
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt="MyHiMe"
            width={140}
            height={46}
            priority
            style={{ borderRadius: 12 }}
          />
        </Link>

        {/* New chat */}
        <button
          style={{
            padding: "12px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.07)",
            color: "#e8eefc",
            cursor: "pointer",
            textAlign: "left",
            fontWeight: 600,
          }}
          onClick={() => router.push("/dashboard")}
        >
          + New chat
        </button>

        {/* Conversation list (placeholder for now) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>RECENT</div>

          {["Welcome to MyHiMe", "Business planning", "Health routine"].map((t) => (
            <button
              key={t}
              style={{
                padding: "10px 10px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(0,0,0,0.25)",
                color: "#e8eefc",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Account */}
        <div
          style={{
            paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.85, overflow: "hidden", textOverflow: "ellipsis" }}>
            {email ?? ""}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Link
              href="/profile"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "#e8eefc",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Profile
            </Link>

            <button
              onClick={logout}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.07)",
                color: "#e8eefc",
                cursor: "pointer",
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <section style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>MyHiMe Prototype • Phase 2</div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: 20 }}>{children}</div>
      </section>
    </div>
  );
}
