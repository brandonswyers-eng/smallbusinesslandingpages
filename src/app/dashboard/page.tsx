import Link from "next/link";
import { Panel, StatusPill } from "@/components/platform/ui";
import { requireProfile } from "@/lib/platform/session";
import { nextClientAction, PROJECT_STATUS_LABELS } from "@/lib/platform/types";

export default async function DashboardHomePage() {
  const { platform, profile } = await requireProfile("dashboard");
  const projects = await platform.store.listProjectsByClient(profile.id);
  const project = projects[0];
  if (!project) {
    return <p>We do not have a website project on file yet. Please contact us.</p>;
  }
  const agreements = await platform.store.listAgreementsByProject(project.id);
  const tasks = (await platform.store.listTasksByProject(project.id)).filter(
    (task) => task.clientVisible && !["completed", "approved"].includes(task.status),
  );
  const next = nextClientAction({
    project,
    agreement: agreements[0],
    openTaskCount: tasks.length,
  });
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[oklch(0.45_0.03_250)]">Welcome</p>
        <h1 className="text-3xl font-semibold text-[oklch(0.22_0.05_250)]">
          {profile.fullName}
        </h1>
        <p className="mt-1 text-[oklch(0.38_0.03_250)]">{project.businessName}</p>
      </div>
      <Panel title="Where things stand">
        <StatusPill>{PROJECT_STATUS_LABELS[project.projectStatus]}</StatusPill>
        <p className="mt-4 text-lg">{next}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/dashboard/tasks">
            Open tasks
          </Link>
          <Link className="underline" href="/dashboard/project">
            Project details
          </Link>
          <Link className="underline" href="/dashboard/support">
            Ask a question
          </Link>
        </div>
      </Panel>
    </div>
  );
}
