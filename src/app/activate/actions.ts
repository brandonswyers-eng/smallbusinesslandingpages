"use server";

import { activateAccount, requestPasswordReset, completePasswordReset } from "@/lib/platform/services";
import { createSupabaseServerClient, formError } from "@/lib/platform/session";
import { getPlatform } from "@/lib/platform/runtime";
import { redirect } from "next/navigation";

export async function activateAction(_: string | null, formData: FormData) {
  try {
    const token = String(formData.get("token") ?? "");
    const password = String(formData.get("password") ?? "");
    const platform = getPlatform();
    const profile = await activateAccount(platform, { token, password });
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signInWithPassword({ email: profile.email, password });
    redirect("/dashboard");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return formError(error);
  }
}

export async function forgotPasswordAction(_: string | null, formData: FormData) {
  try {
    await requestPasswordReset(getPlatform(), String(formData.get("email") ?? ""));
    return "If we have an active account for that email, we sent a reset link.";
  } catch (error) {
    return formError(error);
  }
}

export async function resetPasswordAction(_: string | null, formData: FormData) {
  try {
    await completePasswordReset(getPlatform(), {
      token: String(formData.get("token") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    redirect("/login");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return formError(error);
  }
}
