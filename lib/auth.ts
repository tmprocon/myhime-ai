import { supabase } from "./supabaseClient";

export async function signInWithEmail(email: string) {
  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/dashboard`
          : undefined,
    },
  });
}

export async function signOut() {
  await supabase.auth.signOut();
  if (typeof window !== "undefined") window.location.href = "/";
}
