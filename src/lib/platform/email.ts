import { BRAND_NAME as SITE_NAME } from "@/lib/site";

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type Mailer = {
  send(message: MailMessage): Promise<void>;
};

const brand = SITE_NAME;

function wrap(title: string, bodyHtml: string, bodyText: string): Pick<MailMessage, "html" | "text"> {
  return {
    html: `<!doctype html>
<html>
  <body style="margin:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#112A43;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px;">
          <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:16px;padding:32px;text-align:left;">
            <tr><td style="font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#6a7c8d;">${brand}</td></tr>
            <tr><td style="padding-top:16px;font-size:24px;font-weight:700;">${title}</td></tr>
            <tr><td style="padding-top:16px;font-size:16px;line-height:1.6;color:#334155;">${bodyHtml}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text: `${title}\n\n${bodyText}\n\n${brand}`,
  };
}

function button(href: string, label: string) {
  return `<p style="margin:24px 0;"><a href="${href}" style="background:#BAEB76;color:#061C31;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:999px;display:inline-block;">${label}</a></p>`;
}

export const templates = {
  agreementReady(input: { name: string; signingUrl: string }) {
    return {
      subject: `Your ${brand} agreement is ready to sign`,
      ...wrap(
        "Your agreement is ready",
        `<p>Hi ${input.name},</p><p>Your service agreement is ready. Please review and sign it using the secure link below. Signing happens on our signature provider’s site.</p>${button(input.signingUrl, "Review and sign")}`,
        `Hi ${input.name},\n\nYour service agreement is ready:\n${input.signingUrl}`,
      ),
    };
  },
  paymentLink(input: { name: string; paymentUrl: string }) {
    return {
      subject: `Private payment link from ${brand}`,
      ...wrap(
        "Your private payment link",
        `<p>Hi ${input.name},</p><p>Your agreement is in place. Use this private checkout link to pay the one-time setup and the first month of hosting. Do not share this link.</p>${button(input.paymentUrl, "Complete payment")}<p>After payment is confirmed, we will email you a link to create your account password.</p>`,
        `Hi ${input.name},\n\nUse this private payment link:\n${input.paymentUrl}\n\nAfter payment is confirmed, we will email you a link to create your account password.`,
      ),
    };
  },
  paymentReceived(input: { name: string; businessName: string }) {
    return {
      subject: `Payment received for ${input.businessName}`,
      ...wrap(
        "Payment received",
        `<p>Hi ${input.name},</p><p>We received payment for ${input.businessName}. Your account is being prepared. You will get a separate email to create your password and open your dashboard.</p>`,
        `Hi ${input.name},\n\nWe received payment for ${input.businessName}. Watch for a separate email to create your password.`,
      ),
    };
  },
  activation(input: { name: string; activateUrl: string }) {
    return {
      subject: `Create your ${brand} account password`,
      ...wrap(
        "Your account is ready",
        `<p>Hi ${input.name},</p><p>Payment is confirmed and your private dashboard is ready. Use the button below to create your own password. This link expires and can be used once. We will never email you a password.</p>${button(input.activateUrl, "Create your password")}`,
        `Hi ${input.name},\n\nCreate your password using this one-time link:\n${input.activateUrl}\n\nThis link expires. We will never email you a password.`,
      ),
    };
  },
  passwordReset(input: { name: string; resetUrl: string }) {
    return {
      subject: `Reset your ${brand} password`,
      ...wrap(
        "Reset your password",
        `<p>Hi ${input.name},</p><p>We received a request to reset your password. If you made this request, use the button below. The link expires soon.</p>${button(input.resetUrl, "Choose a new password")}<p>If you did not ask for this, you can ignore this email.</p>`,
        `Hi ${input.name},\n\nReset your password:\n${input.resetUrl}\n\nIf you did not ask for this, ignore this email.`,
      ),
    };
  },
  newTask(input: { name: string; taskTitle: string; dashboardUrl: string }) {
    return {
      subject: `We need a little information: ${input.taskTitle}`,
      ...wrap(
        "New request in your dashboard",
        `<p>Hi ${input.name},</p><p>We added a request: <strong>${input.taskTitle}</strong>. You can complete it in your dashboard.</p>${button(input.dashboardUrl, "Open dashboard")}`,
        `Hi ${input.name},\n\nNew request: ${input.taskTitle}\n${input.dashboardUrl}`,
      ),
    };
  },
  taskCompleted(input: { name: string; taskTitle: string }) {
    return {
      subject: `Received: ${input.taskTitle}`,
      ...wrap(
        "We received your information",
        `<p>Hi ${input.name},</p><p>Thanks — we received your response for “${input.taskTitle}”.</p>`,
        `Hi ${input.name},\n\nWe received your response for "${input.taskTitle}".`,
      ),
    };
  },
  websiteReadyForApproval(input: { name: string; dashboardUrl: string }) {
    return {
      subject: `Your website is ready to review`,
      ...wrap(
        "Ready for your review",
        `<p>Hi ${input.name},</p><p>Your website is ready to review. Please look it over and approve it in your dashboard when you are happy with it.</p>${button(input.dashboardUrl, "Review website")}`,
        `Hi ${input.name},\n\nYour website is ready to review:\n${input.dashboardUrl}`,
      ),
    };
  },
  websiteLaunched(input: { name: string; liveUrl: string }) {
    return {
      subject: `Your website is live`,
      ...wrap(
        "Your website is live",
        `<p>Hi ${input.name},</p><p>Your website is live.</p>${button(input.liveUrl, "View website")}`,
        `Hi ${input.name},\n\nYour website is live:\n${input.liveUrl}`,
      ),
    };
  },
  paymentFailed(input: { name: string }) {
    return {
      subject: `We could not process a hosting payment`,
      ...wrap(
        "A payment needs attention",
        `<p>Hi ${input.name},</p><p>A monthly hosting payment did not go through. Your website has not been removed. Please contact us and we will help you get this sorted.</p>`,
        `Hi ${input.name},\n\nA monthly hosting payment did not go through. Your website has not been removed. Please contact us.`,
      ),
    };
  },
  supportResponse(input: { name: string; subject: string; response: string; dashboardUrl: string }) {
    return {
      subject: `Update on your request: ${input.subject}`,
      ...wrap(
        "We replied to your request",
        `<p>Hi ${input.name},</p><p>${input.response.replaceAll("\n", "<br/>")}</p>${button(input.dashboardUrl, "View in dashboard")}`,
        `Hi ${input.name},\n\n${input.response}\n\n${input.dashboardUrl}`,
      ),
    };
  },
  teamPaymentFailed(input: { businessName: string; email: string }) {
    return {
      subject: `Payment failed: ${input.businessName}`,
      ...wrap(
        "Client payment failed",
        `<p>${input.businessName} (${input.email}) had a payment fail. The site should stay online. Follow up with the client.</p>`,
        `${input.businessName} (${input.email}) had a payment fail.`,
      ),
    };
  },
};
