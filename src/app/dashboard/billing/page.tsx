import { Panel } from "@/components/platform/ui";
import { requireProfile } from "@/lib/platform/session";

export default async function DashboardBillingPage() {
  const { platform, profile } = await requireProfile("dashboard");
  const project = (await platform.store.listProjectsByClient(profile.id))[0];
  const billing = await platform.store.listBillingByClient(profile.id);
  const latest = billing[0];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Billing status</h1>
      <Panel
        title="Hosting plan"
        description="This page is a summary only. It cannot change cards, cancel service, or take payment."
      >
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Setup payment</dt>
            <dd>{project?.provisionedAt ? "Received" : "Not received yet"}</dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Latest invoice</dt>
            <dd>{latest?.invoiceStatus ?? "None yet"}</dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Monthly hosting</dt>
            <dd>$59</dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Hosting status</dt>
            <dd>{project?.subscriptionStatus ?? latest?.subscriptionStatus ?? "Not started"}</dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Minimum term ends</dt>
            <dd>{project?.minimumTermEnd ?? "Starts after the first payment"}</dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}
