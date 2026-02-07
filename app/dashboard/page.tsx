import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();   // ← THIS is the fix

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return <div>Dashboard</div>;
}
