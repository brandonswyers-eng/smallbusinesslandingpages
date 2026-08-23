import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const businessName = String(body.businessName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const businessType = String(body.businessType ?? "").trim();

    if (!name || !businessName || !email || !phone || !businessType) {
      return NextResponse.json(
        { ok: false, error: "Please complete every field." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.INQUIRY_TO_EMAIL;
    const from = process.env.INQUIRY_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.error("Inquiry email env vars are missing");
      return NextResponse.json(
        { ok: false, error: "Could not process inquiry." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New landing page inquiry — ${businessName}`,
      text: [
        "New inquiry from smallbusinesslandingpages.com",
        "",
        `Name: ${name}`,
        `Business: ${businessName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Business type: ${businessType}`,
      ].join("\n"),
      html: `
        <h1>New landing page inquiry</h1>
        <p>From smallbusinesslandingpages.com</p>
        <table>
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Business</strong></td><td>${escapeHtml(businessName)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td><strong>Business type</strong></td><td>${escapeHtml(businessType)}</td></tr>
        </table>
        <p>Reply to this email to reach the customer.</p>
      `,
    });

    if (error) {
      console.error("Resend inquiry error", error);
      return NextResponse.json(
        { ok: false, error: "Could not process inquiry." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not process inquiry." },
      { status: 500 },
    );
  }
}
