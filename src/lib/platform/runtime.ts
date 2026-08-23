import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/utils/supabase/env";
import type { AuthPort, FilePort, PlatformContext } from "./services";
import { createStripePort, stripeConfigured } from "./stripe";
import { createSupabaseStore } from "./supabase-store";
import type { Mailer } from "./email";

export function platformConfigured() {
  return Boolean(
    getSupabaseUrl() &&
      getSupabasePublishableKey() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      stripeConfigured() &&
      process.env.RESEND_API_KEY,
  );
}

export function appUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://smallbusinesslandingpages.com"
  );
}

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service credentials are not set.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function createMailer(): Mailer {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from =
    process.env.PLATFORM_FROM_EMAIL ||
    "Small Business Landing Pages <inquiries@send.smallbusinesslandingpages.com>";
  return {
    async send(message) {
      await resend.emails.send({
        from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });
    },
  };
}

function createAuthPort(): AuthPort {
  const supabase = serviceClient();
  return {
    async createUser(input) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: input.email,
        password: input.password,
        email_confirm: true,
        user_metadata: { profile_id: input.profileId },
      });
      if (error || !data.user) {
        throw new Error(error?.message || "Could not create the login.");
      }
      return { authUserId: data.user.id };
    },
    async updatePassword(authUserId, password) {
      const { error } = await supabase.auth.admin.updateUserById(authUserId, { password });
      if (error) throw new Error(error.message);
    },
  };
}

function createFilePort(): FilePort {
  const supabase = serviceClient();
  return {
    async save(input) {
      const { error } = await supabase.storage.from("client-uploads").upload(input.path, input.bytes, {
        contentType: input.contentType,
        upsert: false,
      });
      if (error) throw new Error(error.message);
    },
  };
}

export function getPlatform(): PlatformContext {
  if (!platformConfigured()) {
    throw new Error("The client platform is not configured yet.");
  }
  return {
    store: createSupabaseStore(serviceClient()),
    mailer: createMailer(),
    auth: createAuthPort(),
    stripe: createStripePort(),
    files: createFilePort(),
    appUrl: appUrl(),
    teamNotifyEmail:
      process.env.TEAM_NOTIFY_EMAIL ||
      process.env.INQUIRY_TO_EMAIL ||
      "hello@smallbusinesslandingpages.com",
  };
}

export function getServiceSupabase() {
  return serviceClient();
}
