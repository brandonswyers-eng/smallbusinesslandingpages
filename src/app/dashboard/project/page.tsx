import { Panel, StatusPill } from "@/components/platform/ui";
import { requireProfile } from "@/lib/platform/session";
import { PROJECT_STATUS_LABELS, STAGE_LABELS } from "@/lib/platform/types";

export default async function DashboardProjectPage() {
  const { platform, profile } = await requireProfile("dashboard");
  const project = (await platform.store.listProjectsByClient(profile.id))[0];
  if (!project) return <p>No project found.</p>;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Project</h1>
      <Panel title={project.businessName}>
        <StatusPill>{PROJECT_STATUS_LABELS[project.projectStatus]}</StatusPill>
        <p className="mt-3 text-sm">Stage: {STAGE_LABELS[project.onboardingStage]}</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Demo website</dt>
            <dd>
              {project.demoWebsiteUrl ? (
                <a className="underline" href={project.demoWebsiteUrl} target="_blank" rel="noreferrer">
                  Preview demo
                </a>
              ) : (
                "Not posted yet"
              )}
            </dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Live website</dt>
            <dd>
              {project.liveWebsiteUrl ? (
                <a className="underline" href={project.liveWebsiteUrl} target="_blank" rel="noreferrer">
                  Open live site
                </a>
              ) : (
                "Not launched yet"
              )}
            </dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Domain</dt>
            <dd>{project.domainName || "To be confirmed"}</dd>
          </div>
          <div>
            <dt className="text-[oklch(0.5_0.02_250)]">Expected launch</dt>
            <dd>{project.expectedLaunchDate || "We will confirm a date with you"}</dd>
          </div>
        </dl>
      </Panel>
    </div>
  );
}
