"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTACT_EMAIL } from "@/lib/site";

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
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

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
          website: data.get("website"),
          startedAt: startedAt.current,
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
        `We couldn’t send your inquiry just now. Please try again, or email ${CONTACT_EMAIL}.`,
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
        <p className="mt-2 text-sm leading-relaxed text-[oklch(0.38_0.03_250)]">
          We’ll review your details and follow up by email. This is not an
          order confirmation; we’ll discuss scope and next steps before any
          work begins.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  const col = compact ? "grid gap-2" : "grid gap-2 sm:col-span-2";

  return (
    <form
      onSubmit={onSubmit}
      className={
        compact
          ? "relative grid gap-4"
          : "relative grid gap-4 sm:grid-cols-2"
      }
    >
      <Field
        id="name"
        name="name"
        label="Name"
        required
        autoComplete="name"
        placeholder="Alex Rivera"
      />
      <Field
        id="businessName"
        name="businessName"
        label="Business name"
        required
        autoComplete="organization"
        placeholder="Rivera Auto Care"
      />
      <Field
        id="email"
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@business.com"
      />
      <Field
        id="phone"
        name="phone"
        label="Phone number"
        type="tel"
        required
        autoComplete="tel"
        placeholder="(555) 010-1234"
      />
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className={col}>
        <Label htmlFor="businessType">
          Business type{" "}
          <span className="text-[oklch(0.45_0.08_250)]">(required)</span>
        </Label>
        <select
          id="businessType"
          name="businessType"
          required
          aria-required="true"
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
          aria-busy={status === "sending"}
          className="h-12 w-full rounded-full px-7 text-base font-semibold text-[oklch(0.22_0.05_250)] shadow-[0_12px_30px_-12px_oklch(0.88_0.155_128)] sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Get My Website"}
        </Button>
        <p className="mt-3 text-sm leading-relaxed text-[oklch(0.38_0.03_250)]">
          Submitting this form starts a conversation, not a contract. You agree
          we may contact you by email or phone about this inquiry. Additional
          work outside the package is quoted and approved before we begin.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[oklch(0.38_0.03_250)]">
          We use the information you submit to respond to this inquiry, as
          described in our{" "}
          <Link className="underline underline-offset-4" href="/privacy">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className="underline underline-offset-4" href="/terms">
            Terms
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label}{" "}
        {required ? (
          <span className="text-[oklch(0.45_0.08_250)]">(required)</span>
        ) : null}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-11 rounded-xl bg-white"
      />
    </div>
  );
}
