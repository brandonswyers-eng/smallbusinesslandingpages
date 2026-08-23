import { Panel } from "@/components/platform/ui";
import { requireProfile } from "@/lib/platform/session";

export default async function DashboardAccountPage() {
  const { profile } = await requireProfile("dashboard");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Account</h1>
      <Panel title="Your details">
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Name</dt>
            <dd>{profile.fullName}</dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Email</dt>
            <dd>{profile.email}</dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Business</dt>
            <dd>{profile.businessName || "—"}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm">
          Need a password change? Use{" "}
          <a className="underline" href="/forgot-password">
            forgot password
          </a>
          .
        </p>
      </Panel>
    </div>
  );
}
