import { ActivateForm } from "./activate-form";
import { Wordmark } from "@/components/site-frame";
import { SetupNotice } from "@/components/platform/ui";
import { platformConfigured } from "@/lib/platform/runtime";

export default async function ActivatePage({
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
          Create your password
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.42_0.03_250)]">
          Payment is confirmed. Set a password to open your private dashboard.
        </p>
        {token ? (
          <ActivateForm token={token} />
        ) : (
          <p className="mt-6 text-sm">
            This link is missing its code. Please use the button in your email, or contact us.
          </p>
        )}
      </div>
    </div>
  );
}
