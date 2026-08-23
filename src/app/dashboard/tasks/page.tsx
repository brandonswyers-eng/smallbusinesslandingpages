import { Panel } from "@/components/platform/ui";
import { requireProfile } from "@/lib/platform/session";
import { submitTaskAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default async function DashboardTasksPage() {
  const { platform, profile } = await requireProfile("dashboard");
  const project = (await platform.store.listProjectsByClient(profile.id))[0];
  if (!project) return <p>No project found.</p>;
  const tasks = (await platform.store.listTasksByProject(project.id)).filter(
    (task) => task.clientVisible,
  );
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Tasks</h1>
      {tasks.length === 0 ? <p>You are all caught up. We will email you if we need anything.</p> : null}
      {tasks.map((task) => (
        <Panel key={task.id} title={task.title} description={task.description ?? undefined}>
          <p className="mb-3 text-sm">Status: {task.status.replaceAll("_", " ")}</p>
          {task.clientResponse ? <p className="mb-3 text-sm">You sent: {task.clientResponse}</p> : null}
          {["open", "in_progress", "submitted"].includes(task.status) ? (
            <form action={submitTaskAction} className="grid gap-3" encType="multipart/form-data">
              <input type="hidden" name="taskId" value={task.id} />
              <Textarea name="response" placeholder="Your notes" />
              <input type="file" name="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" />
              {task.taskType === "website_approval" ? (
                <label className="text-sm">
                  <input type="checkbox" name="approveWebsite" className="mr-2" /> I approve this website
                </label>
              ) : null}
              <Button type="submit" className="rounded-full">Submit</Button>
            </form>
          ) : null}
        </Panel>
      ))}
    </div>
  );
}
