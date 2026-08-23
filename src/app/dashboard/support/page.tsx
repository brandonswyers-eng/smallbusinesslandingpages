import { Panel } from "@/components/platform/ui";
import { requireProfile } from "@/lib/platform/session";
import { closeSupportAction, createSupportAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function DashboardSupportPage() {
  const { platform, profile } = await requireProfile("dashboard");
  const project = (await platform.store.listProjectsByClient(profile.id))[0];
  const requests = project ? await platform.store.listSupportByProject(project.id) : [];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Support</h1>
      <Panel title="Send a request">
        <form action={createSupportAction} className="grid gap-3">
          <Input name="subject" placeholder="Subject" required />
          <Textarea name="message" placeholder="How can we help?" required />
          <Button type="submit" className="rounded-full">Send</Button>
        </form>
      </Panel>
      {requests.map((request) => (
        <Panel key={request.id} title={request.subject} description={request.message}>
          <p className="text-sm">Status: {request.status}</p>
          {request.adminResponse ? (
            <p className="mt-3 rounded-2xl bg-[oklch(0.97_0.01_250)] p-3 text-sm">{request.adminResponse}</p>
          ) : null}
          {request.status !== "closed" ? (
            <form action={closeSupportAction} className="mt-3">
              <input type="hidden" name="requestId" value={request.id} />
              <Button type="submit" variant="outline" className="rounded-full">
                Close this request
              </Button>
            </form>
          ) : null}
        </Panel>
      ))}
    </div>
  );
}
