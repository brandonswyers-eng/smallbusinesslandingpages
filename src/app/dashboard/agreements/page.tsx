import { Panel, StatusPill } from "@/components/platform/ui";
import { requireProfile } from "@/lib/platform/session";

export default async function DashboardAgreementsPage() {
  const { platform, profile } = await requireProfile("dashboard");
  const project = (await platform.store.listProjectsByClient(profile.id))[0];
  if (!project) return <p>No project found.</p>;
  const agreements = await platform.store.listAgreementsByProject(project.id);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Agreements</h1>
      {agreements.length === 0 ? <p>No agreement has been posted yet.</p> : null}
      {agreements.map((agreement) => (
        <Panel key={agreement.id} title={agreement.agreementName}>
          <StatusPill>{agreement.status}</StatusPill>
          <div className="mt-4 space-y-2 text-sm">
            {agreement.externalSigningUrl && agreement.status !== "signed" ? (
              <p>
                <a className="underline" href={agreement.externalSigningUrl} target="_blank" rel="noreferrer">
                  Open signing page
                </a>
              </p>
            ) : null}
            {agreement.documentUrl ? (
              <p>
                <a className="underline" href={agreement.documentUrl} target="_blank" rel="noreferrer">
                  View completed agreement
                </a>
              </p>
            ) : null}
            {agreement.signedAt ? <p>Signed {new Date(agreement.signedAt).toLocaleDateString()}</p> : null}
          </div>
        </Panel>
      ))}
    </div>
  );
}
