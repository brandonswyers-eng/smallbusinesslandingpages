import { ForgotPasswordForm } from "./forgot-form";
import { Wordmark } from "@/components/site-frame";
import { SetupNotice } from "@/components/platform/ui";
import { platformConfigured } from "@/lib/platform/runtime";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  if (!platformConfigured()) return <SetupNotice />;
  const { token } = await searchParams;
  return (
    <div className="flex min-h-full items-center justify-center bg-[oklch(0.97_0.008_250)] px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <Wordmark />
        <h1 className="mt-6 text-3xl font-semibold text-[oklch(0.22_0.05_250)]">
          {token ? "Choose a new password" : "Forgot password"}
        </h1>
        <ForgotPasswordForm token={token} />
      </div>
    </div>
  );
}
