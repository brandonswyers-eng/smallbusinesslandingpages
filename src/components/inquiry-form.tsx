"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BUSINESS_TYPES = [
  "Mechanic / auto repair",
  "Contractor / trades",
  "Landscaper",
  "Cleaning service",
  "Salon / barber",
  "Restaurant / café",
  "Auto detailer",
  "Other local service",
];

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          businessName: data.get("businessName"),
          email: data.get("email"),
          phone: data.get("phone"),
          businessType: data.get("businessType"),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error || "Request failed");
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "We couldn’t send your inquiry just now. Please try again, or email hello@smallbusinesslandingpages.com.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-2xl border border-primary/20 bg-accent/40 p-6 text-left shadow-sm"
        role="status"
      >
        <p className="text-lg font-semibold text-[oklch(0.28_0.055_250)]">
          Thanks — we received your inquiry.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We’ll review your details and follow up by email. This is not an
          order confirmation; we’ll discuss scope and next steps before any
          work begins.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Alex Rivera"
          className="h-11 rounded-xl bg-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="businessName">Business name</Label>
        <Input
          id="businessName"
          name="businessName"
          required
          autoComplete="organization"
          placeholder="Rivera Auto Care"
          className="h-11 rounded-xl bg-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@business.com"
          className="h-11 rounded-xl bg-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(555) 010-1234"
          className="h-11 rounded-xl bg-white"
        />
      </div>
      <div className={compact ? "grid gap-2" : "grid gap-2 sm:col-span-2"}>
        <Label htmlFor="businessType">Business type</Label>
        <select
          id="businessType"
          name="businessType"
          required
          defaultValue=""
          className="h-11 w-full rounded-xl border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="" disabled>
            Select your type of business
          </option>
          {BUSINESS_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p className="text-sm text-destructive sm:col-span-2" role="alert">
          {error}
        </p>
      ) : null}
      <div className={compact ? "" : "sm:col-span-2"}>
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-12 w-full rounded-full px-7 text-base font-semibold text-[oklch(0.22_0.05_250)] shadow-[0_12px_30px_-12px_oklch(0.88_0.155_128)] sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Get My Landing Page"}
        </Button>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Submitting this form starts a conversation, not a contract. Additional
          work outside the package is quoted and approved before we begin.
        </p>
      </div>
    </form>
  );
}
