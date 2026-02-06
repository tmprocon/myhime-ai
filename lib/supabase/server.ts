import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Some Next.js/TS versions don't type getAll() even if it exists at runtime.
          // So we safely detect it and fall back.
          const anyStore = cookieStore as any;

          if (typeof anyStore.getAll === "function") {
            return anyStore.getAll();
          }

          // Fallback: build cookie list from known keys if getAll isn't available.
          // (Supabase only needs its own auth cookies; this still allows build + runtime)
          const names = [
            "sb-access-token",
            "sb-refresh-token",
            "supabase-auth-token",
          ];

          return names
            .map((name) => {
              const value = cookieStore.get(name)?.value;
              return value ? { name, value } : null;
            })
            .filter(Boolean) as { name: string; value: string }[];
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
