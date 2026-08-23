import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { assertRouteAccess, PlatformError, type PlatformContext } from "./services";
import { getPlatform, platformConfigured } from "./runtime";
import type { Profile } from "./types";

export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Supabase public credentials are not set.");
  const cookieStore = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component; middleware can refresh the session.
        }
      },
    },
  });
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!platformConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const platform = getPlatform();
  return platform.store.getProfileByAuthUserId(data.user.id);
}

export async function requireProfile(area: "admin" | "dashboard") {
  const profile = await getCurrentProfile();
  try {
    await assertRouteAccess(profile, area);
  } catch (error) {
    if (error instanceof PlatformError && error.code === "unauthorized") {
      redirect(`/login?next=/${area}`);
    }
    redirect("/login");
  }
  return { profile: profile!, platform: getPlatform() as PlatformContext };
}

export function formError(error: unknown) {
  if (error instanceof PlatformError) return error.message;
  if (error instanceof Error && !/supabase|stripe|postgres|stack/i.test(error.message)) {
    return error.message;
  }
  return "Something went wrong. Please try again or email us.";
}
