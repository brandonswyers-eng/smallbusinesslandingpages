"use client";

import { useActionState } from "react";
import { activateAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ActivateForm({ token }: { token: string }) {
  const [error, action, pending] = useActionState(activateAction, null);
  return (
    <form action={action} className="mt-8 grid gap-4">
      <input type="hidden" name="token" value={token} />
      <div className="grid gap-2">
        <Label htmlFor="password">Choose a password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
        />
        <p className="text-xs text-[oklch(0.45_0.03_250)]">
          Use at least 10 characters, with letters and numbers. We will never email you a
          password.
        </p>
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 rounded-full">
        {pending ? "Saving…" : "Create password and continue"}
      </Button>
    </form>
  );
}
