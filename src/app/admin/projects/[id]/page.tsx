import { requireProfile } from "@/lib/platform/session";
import { Panel, StatusPill, fieldClass } from "@/components/platform/ui";
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS } from "@/lib/platform/types";
import {
  createPaymentLinkAction,
  createTaskAction,
  markAgreementSignedAction,
  resendActivationAction,
  saveAgreementAction,
  setAccountStatusAction,
  updateProjectAction,
} from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { platform } = await requireProfile("admin");
  const project = await platform.store.getProjectById(id);
  if (!project) return <p>Project not found.</p>;
  const client = await platform.store.getProfileById(project.clientId);
  const agreements = await platform.store.listAgreementsByProject(project.id);
  const tasks = await platform.store.listTasksByProject(project.id);
  const billing = client ? await platform.store.listBillingByClient(client.id) : [];
  const latest = agreements[0] ?? null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{project.businessName}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <StatusPill>{PROJECT_STATUS_LABELS[project.projectStatus]}</StatusPill>
          {client ? <StatusPill>{client.accountStatus}</StatusPill> : null}
        </div>
      </div>

      <Panel title="Project" description="Demo URL, domain, notes, and stage.">
        <form action={updateProjectAction} className="grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="projectId" value={project.id} />
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="businessName">Business name</Label>
            <Input id="businessName" name="businessName" defaultValue={project.businessName} />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="demoWebsiteUrl">Demo website URL</Label>
            <Input id="demoWebsiteUrl" name="demoWebsiteUrl" defaultValue={project.demoWebsiteUrl ?? ""} />
            {project.demoWebsiteUrl ? (
              <a className="text-sm underline" href={project.demoWebsiteUrl} target="_blank" rel="noreferrer">
                Open demo
              </a>
            ) : null}
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="liveWebsiteUrl">Live website URL</Label>
            <Input id="liveWebsiteUrl" name="liveWebsiteUrl" defaultValue={project.liveWebsiteUrl ?? ""} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="domainName">Domain</Label>
            <Input id="domainName" name="domainName" defaultValue={project.domainName ?? ""} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expectedLaunchDate">Expected launch date</Label>
            <Input id="expectedLaunchDate" name="expectedLaunchDate" type="date" defaultValue={project.expectedLaunchDate ?? ""} />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="projectStatus">Status</Label>
            <select id="projectStatus" name="projectStatus" defaultValue={project.projectStatus} className={fieldClass()}>
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {PROJECT_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="internalNotes">Internal notes</Label>
            <Textarea id="internalNotes" name="internalNotes" defaultValue={project.internalNotes ?? ""} />
          </div>
          <Button type="submit" className="rounded-full">Save project</Button>
        </form>
      </Panel>

      <Panel title="Agreement" description="Paste the HelloSign, DocuSign, or PandaDoc link. Do not collect signatures in this app.">
        <form action={saveAgreementAction} className="grid gap-4">
          <input type="hidden" name="projectId" value={project.id} />
          <Input name="agreementName" placeholder="Agreement name" defaultValue="Website service agreement" />
          <Input name="externalSigningUrl" placeholder="External signing URL" defaultValue={latest?.externalSigningUrl ?? ""} />
          <Input name="documentUrl" placeholder="Signed PDF URL" defaultValue={latest?.documentUrl ?? ""} />
          <select name="status" defaultValue={latest?.status ?? "draft"} className={fieldClass()}>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="signed">Signed</option>
          </select>
          <label className="text-sm">
            <input type="checkbox" name="notifyClient" className="mr-2" /> Email signing link to the client
          </label>
          <Button type="submit" className="rounded-full">Save agreement</Button>
        </form>
        {latest ? (
          <form action={markAgreementSignedAction} className="mt-4">
            <input type="hidden" name="agreementId" value={latest.id} />
            <Button type="submit" variant="outline" className="rounded-full">
              Mark latest as signed
            </Button>
          </form>
        ) : null}
      </Panel>

      <Panel title="Private payment link" description="Creates a Stripe Checkout page. First charge is $797, then $69 each month.">
        <form action={createPaymentLinkAction} className="grid gap-4">
          <input type="hidden" name="projectId" value={project.id} />
          <Textarea name="overrideReason" placeholder="Needed only if the agreement is not marked signed" />
          <label className="text-sm">
            <input type="checkbox" name="sendEmail" className="mr-2" /> Email the payment link
          </label>
          <Button type="submit" className="rounded-full">Create payment link</Button>
        </form>
      </Panel>

      <Panel title="Tasks" description="Requests the client can complete in their dashboard.">
        <form action={createTaskAction} className="grid gap-3">
          <input type="hidden" name="projectId" value={project.id} />
          <Input name="title" placeholder="Title" required />
          <Textarea name="description" placeholder="What you need" />
          <label className="text-sm">
            <input type="checkbox" name="notifyClient" className="mr-2" defaultChecked /> Email the client
          </label>
          <Button type="submit" className="rounded-full">Add task</Button>
        </form>
        <ul className="mt-4 space-y-2 text-sm">
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} — {task.status.replaceAll("_", " ")}
            </li>
          ))}
        </ul>
      </Panel>

      {client ? (
        <Panel title="Account">
          <p className="text-sm">{client.fullName} · {client.email}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <form action={resendActivationAction}>
              <input type="hidden" name="profileId" value={client.id} />
              <Button type="submit" variant="outline" className="rounded-full">
                Resend activation email
              </Button>
            </form>
            {(["active", "paused", "archived"] as const).map((status) => (
              <form action={setAccountStatusAction} key={status}>
                <input type="hidden" name="profileId" value={client.id} />
                <input type="hidden" name="accountStatus" value={status} />
                <Button type="submit" variant="outline" className="rounded-full">
                  Set {status}
                </Button>
              </form>
            ))}
          </div>
        </Panel>
      ) : null}

      <Panel title="Billing (read only)">
        {billing.length === 0 ? (
          <p className="text-sm">No invoices stored yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {billing.map((row) => (
              <li key={row.id}>
                {(row.amount / 100).toLocaleString("en-US", { style: "currency", currency: row.currency.toUpperCase() })}{" "}
                · {row.invoiceStatus} · {row.subscriptionStatus}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-xs text-[oklch(0.5_0.02_250)]">
          Card changes and invoices are handled in Stripe. This screen does not manage cards.
        </p>
      </Panel>
    </div>
  );
}
