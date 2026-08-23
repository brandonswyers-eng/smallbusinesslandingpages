"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wordmark } from "@/components/site-frame";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [error, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="mt-8 grid gap-4">
      <input type="hidden" name="next" value={nextPath} />
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 rounded-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-sm text-[oklch(0.42_0.03_250)]">
        Need a password? Check your activation email, or{" "}
        <a className="underline" href="/forgot-password">
          reset it here
        </a>
        .
      </p>
      <Wordmark />
    </form>
  );
}
