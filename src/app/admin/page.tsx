import Link from "next/link";
import { Panel, StatusPill } from "@/components/platform/ui";
import { requireProfile } from "@/lib/platform/session";
import { PIPELINE_STAGES, STAGE_LABELS } from "@/lib/platform/types";

export default async function AdminHomePage() {
  const { platform } = await requireProfile("admin");
  const projects = await platform.store.listProjects();
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[oklch(0.22_0.05_250)]">Pipeline</h1>
          <p className="mt-1 text-sm text-[oklch(0.42_0.03_250)]">
            Prospect to live. Creating a client does not send a login.
          </p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          New client
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {PIPELINE_STAGES.map((stage) => {
          const items = projects.filter((project) => project.onboardingStage === stage);
          return (
            <Panel key={stage} title={`${STAGE_LABELS[stage]} (${items.length})`}>
              {items.length === 0 ? (
                <p className="text-sm text-[oklch(0.5_0.02_250)]">Nothing in this stage.</p>
              ) : (
                <ul className="space-y-3">
                  {items.map((project) => (
                    <li key={project.id}>
                      <Link href={`/admin/projects/${project.id}`} className="block rounded-2xl bg-[oklch(0.97_0.008_250)] p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">{project.businessName}</span>
                          <StatusPill>{project.projectStatus.replaceAll("_", " ")}</StatusPill>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
