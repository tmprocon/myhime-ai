"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AppShell from "../components/AppShell";
import ChatUI from "../components/ChatUI";

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
    <AppShell title="Chat">
      <ChatUI />
    </AppShell>
  );
}
