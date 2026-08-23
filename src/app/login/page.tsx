import { LoginForm } from "./login-form";
import { Wordmark } from "@/components/site-frame";
import { platformConfigured } from "@/lib/platform/runtime";
import { SetupNotice } from "@/components/platform/ui";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (!platformConfigured()) return <SetupNotice />;
  const params = await searchParams;
  return (
    <div className="flex min-h-full items-center justify-center bg-[oklch(0.97_0.008_250)] px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <Wordmark />
        <h1 className="mt-6 text-3xl font-semibold text-[oklch(0.22_0.05_250)]">Sign in</h1>
        <p className="mt-2 text-sm text-[oklch(0.42_0.03_250)]">
          This workspace is invitation only. There is no public sign-up.
        </p>
        <LoginForm nextPath={params.next || ""} />
      </div>
    </div>
  );
}
