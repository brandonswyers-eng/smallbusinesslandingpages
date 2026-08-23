"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient, formError, getCurrentProfile } from "@/lib/platform/session";
import { isStaffRole } from "@/lib/platform/types";

export async function loginAction(_: string | null, formData: FormData) {
  try {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const next = String(formData.get("next") ?? "");
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return "That email or password did not match our records.";
    const profile = await getCurrentProfile();
    if (!profile) {
      await supabase.auth.signOut();
      return "This login is not linked to an account yet.";
    }
    if (profile.accountStatus === "paused") {
      await supabase.auth.signOut();
      return "This account is paused. Please contact us.";
    }
    if (profile.accountStatus !== "active") {
      await supabase.auth.signOut();
      return "This account is not active yet.";
    }
    if (isStaffRole(profile.role)) redirect(next.startsWith("/admin") ? next : "/admin");
    redirect(next.startsWith("/dashboard") ? next : "/dashboard");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return formError(error);
  }
}
