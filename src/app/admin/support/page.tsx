import { requireProfile } from "@/lib/platform/session";
import { Panel } from "@/components/platform/ui";
import { respondSupportAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminSupportPage() {
  const { platform } = await requireProfile("admin");
  const requests = await platform.store.listOpenSupport();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Support</h1>
      {requests.length === 0 ? <p>No open requests.</p> : null}
      {requests.map((request) => (
        <Panel key={request.id} title={request.subject} description={request.message}>
          <form action={respondSupportAction} className="grid gap-3">
            <input type="hidden" name="requestId" value={request.id} />
            <Textarea name="response" placeholder="Reply" required />
            <Button type="submit" className="rounded-full">Send reply</Button>
          </form>
        </Panel>
      ))}
    </div>
  );
}
