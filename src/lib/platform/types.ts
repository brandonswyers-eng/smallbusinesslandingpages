export const USER_ROLES = ["admin", "team_member", "client"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ACCOUNT_STATUSES = [
  "pending",
  "invited",
  "active",
  "paused",
  "archived",
] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

export const PROJECT_STATUSES = [
  "prospect",
  "demo_ready",
  "proposal_sent",
  "agreement_sent",
  "agreement_signed",
  "awaiting_payment",
  "payment_received",
  "onboarding",
  "building",
  "awaiting_approval",
  "ready_to_launch",
  "live",
  "paused",
  "cancelled",
] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const ONBOARDING_STAGES = [
  "prospect",
  "demo_ready",
  "agreement_sent",
  "agreement_signed",
  "awaiting_payment",
  "paid",
  "onboarding",
  "building",
  "approval",
  "live",
] as const;
export type OnboardingStage = (typeof ONBOARDING_STAGES)[number];

export const PIPELINE_STAGES: OnboardingStage[] = [...ONBOARDING_STAGES];

export const AGREEMENT_STATUSES = [
  "draft",
  "sent",
  "viewed",
  "signed",
  "declined",
  "expired",
] as const;
export type AgreementStatus = (typeof AGREEMENT_STATUSES)[number];

export const TASK_STATUSES = [
  "open",
  "in_progress",
  "submitted",
  "approved",
  "completed",
] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_TYPES = [
  "business_hours",
  "services",
  "logo",
  "photos",
  "contact_info",
  "website_approval",
  "other",
] as const;
export type TaskType = (typeof TASK_TYPES)[number];

export const SUPPORT_STATUSES = ["open", "responded", "closed"] as const;
export type SupportStatus = (typeof SUPPORT_STATUSES)[number];

export type AuthTokenType = "activation" | "password_reset";

export type Profile = {
  id: string;
  authUserId: string | null;
  email: string;
  fullName: string;
  phone: string | null;
  businessName: string | null;
  role: UserRole;
  accountStatus: AccountStatus;
  stripeCustomerId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  clientId: string;
  businessName: string;
  internalProjectName: string | null;
  demoWebsiteUrl: string | null;
  liveWebsiteUrl: string | null;
  domainName: string | null;
  projectStatus: ProjectStatus;
  onboardingStage: OnboardingStage;
  launchDate: string | null;
  expectedLaunchDate: string | null;
  minimumTermStart: string | null;
  minimumTermEnd: string | null;
  internalNotes: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: string | null;
  paymentOverrideReason: string | null;
  provisionedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Agreement = {
  id: string;
  clientId: string;
  projectId: string;
  agreementName: string;
  agreementVersion: string | null;
  documentUrl: string | null;
  externalSigningUrl: string | null;
  esignatureProviderId: string | null;
  status: AgreementStatus;
  sentAt: string | null;
  signedAt: string | null;
  createdAt: string;
};

export type ClientTask = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  taskType: TaskType;
  status: TaskStatus;
  dueDate: string | null;
  clientVisible: boolean;
  clientResponse: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TaskFile = {
  id: string;
  taskId: string;
  uploadedBy: string | null;
  storagePath: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

export type SupportRequest = {
  id: string;
  clientId: string;
  projectId: string;
  subject: string;
  message: string;
  status: SupportStatus;
  adminResponse: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StripeEventRecord = {
  id: string;
  stripeEventId: string;
  eventType: string;
  processingStatus: "processed" | "failed" | "ignored";
  processedAt: string | null;
  clientId: string | null;
  projectId: string | null;
  errorMessage: string | null;
  createdAt: string;
};

export type BillingRecord = {
  id: string;
  stripeInvoiceId: string | null;
  stripeSubscriptionId: string | null;
  invoiceNumber: string | null;
  clientId: string;
  projectId: string | null;
  amount: number;
  currency: string;
  invoiceStatus: string | null;
  subscriptionStatus: string | null;
  invoiceDate: string | null;
  paidAt: string | null;
  createdAt: string;
};

export type AuthToken = {
  id: string;
  profileId: string;
  tokenHash: string;
  tokenType: AuthTokenType;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
};

export type AuditEvent = {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export {
  HOSTING_MONTHLY_CENTS,
  LANDING_PAGE_CENTS,
  DOMAIN_SETUP_CENTS,
  INITIAL_CHARGE_CENTS,
} from "@/lib/pricing";
export const MINIMUM_TERM_MONTHS = 12;
export const ACTIVATION_TOKEN_HOURS = 48;
export const RESET_TOKEN_HOURS = 2;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
] as const;

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  prospect: "Prospect",
  demo_ready: "Demo ready",
  proposal_sent: "Proposal sent",
  agreement_sent: "Agreement sent",
  agreement_signed: "Agreement signed",
  awaiting_payment: "Awaiting payment",
  payment_received: "Payment received",
  onboarding: "Onboarding",
  building: "Building",
  awaiting_approval: "Waiting for your approval",
  ready_to_launch: "Ready to launch",
  live: "Live",
  paused: "Paused",
  cancelled: "Cancelled",
};

export const STAGE_LABELS: Record<OnboardingStage, string> = {
  prospect: "Prospect",
  demo_ready: "Demo ready",
  agreement_sent: "Agreement sent",
  agreement_signed: "Agreement signed",
  awaiting_payment: "Awaiting payment",
  paid: "Paid",
  onboarding: "Onboarding",
  building: "Building",
  approval: "Approval",
  live: "Live",
};

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  business_hours: "Business hours",
  services: "Services",
  logo: "Logo",
  photos: "Photos",
  contact_info: "Contact information",
  website_approval: "Website approval",
  other: "Other",
};

export function addMonths(isoDate: string, months: number): string {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  const day = date.getUTCDate();
  date.setUTCMonth(date.getUTCMonth() + months);
  if (date.getUTCDate() < day) date.setUTCDate(0);
  return date.toISOString().slice(0, 10);
}

export function stageFromStatus(status: ProjectStatus): OnboardingStage {
  switch (status) {
    case "prospect":
      return "prospect";
    case "demo_ready":
    case "proposal_sent":
      return "demo_ready";
    case "agreement_sent":
      return "agreement_sent";
    case "agreement_signed":
      return "agreement_signed";
    case "awaiting_payment":
      return "awaiting_payment";
    case "payment_received":
      return "paid";
    case "onboarding":
      return "onboarding";
    case "building":
      return "building";
    case "awaiting_approval":
    case "ready_to_launch":
      return "approval";
    case "live":
    case "paused":
    case "cancelled":
      return "live";
    default:
      return "prospect";
  }
}

export function nextClientAction(input: {
  project: Project;
  agreement?: Agreement | null;
  openTaskCount: number;
}) {
  const { project, agreement, openTaskCount } = input;
  if (agreement && agreement.status !== "signed" && agreement.externalSigningUrl) {
    return "Please review and sign your service agreement.";
  }
  if (openTaskCount > 0 && ["payment_received", "onboarding", "building", "awaiting_approval"].includes(project.projectStatus)) {
    return "Please complete the open information requests so we can keep moving.";
  }
  switch (project.projectStatus) {
    case "awaiting_payment":
      return "Payment is still being confirmed.";
    case "payment_received":
    case "onboarding":
      return "Please complete any open requests in Tasks.";
    case "building":
      return "We are building your page. You will be notified when it is ready to review.";
    case "awaiting_approval":
      return "Please review your website and approve it when you are ready.";
    case "ready_to_launch":
      return "Your website is ready. We will launch it after final checks.";
    case "live":
      return "Your website is live. Use Support if you need a change.";
    case "paused":
      return "Your website is paused. Contact us if you need help.";
    default:
      return "Your project is in progress.";
  }
}

export function isStaffRole(role: UserRole) {
  return role === "admin" || role === "team_member";
}
