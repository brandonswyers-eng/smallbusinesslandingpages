"use client";

import { useActionState } from "react";
import { createProspectAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Panel } from "@/components/platform/ui";

export default function NewProspectPage() {
  const [error, action, pending] = useActionState(createProspectAction, null);
  return (
    <Panel
      title="New prospect"
      description="Saves the business and project only. No invitation email is sent until payment is confirmed."
    >
      <form action={action} className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Owner name</Label>
          <Input id="fullName" name="fullName" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="businessName">Business name</Label>
          <Input id="businessName" name="businessName" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="demoWebsiteUrl">Demo website URL</Label>
          <Input id="demoWebsiteUrl" name="demoWebsiteUrl" />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="domainName">Domain name</Label>
          <Input id="domainName" name="domainName" />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="internalNotes">Internal notes</Label>
          <Textarea id="internalNotes" name="internalNotes" />
        </div>
        {error ? <p className="text-sm text-destructive sm:col-span-2">{error}</p> : null}
        <Button type="submit" disabled={pending} className="rounded-full sm:col-span-2">
          {pending ? "Saving…" : "Save prospect"}
        </Button>
      </form>
    </Panel>
  );
}
