"use client";

import { useActionState } from "react";
import { forgotPasswordAction, resetPasswordAction } from "../activate/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm({ token }: { token?: string }) {
  const [message, action, pending] = useActionState(
    token ? resetPasswordAction : forgotPasswordAction,
    null,
  );
  return (
    <form action={action} className="mt-8 grid gap-4">
      {token ? <input type="hidden" name="token" value={token} /> : null}
      {token ? (
        <div className="grid gap-2">
          <Label htmlFor="password">New password</Label>
          <Input id="password" name="password" type="password" required minLength={10} />
        </div>
      ) : (
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
      )}
      {message ? <p className="text-sm">{message}</p> : null}
      <Button type="submit" disabled={pending} className="h-11 rounded-full">
        {pending ? "Please wait…" : token ? "Save new password" : "Send reset link"}
      </Button>
    </form>
  );
}
