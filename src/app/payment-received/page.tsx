import { Wordmark } from "@/components/site-frame";
import Link from "next/link";

export default function PaymentReceivedPage() {
  return (
    <div className="flex min-h-full items-center justify-center bg-[oklch(0.97_0.008_250)] px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <Wordmark />
        <h1 className="mt-6 text-3xl font-semibold text-[oklch(0.22_0.05_250)]">
          Payment received
        </h1>
        <p className="mt-4 text-[oklch(0.38_0.03_250)]">
          Thank you. We are confirming your payment now. You will get an email to create your
          password and open your dashboard. You do not need to wait on this page.
        </p>
        <Link className="mt-6 inline-block text-sm underline" href="/">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
