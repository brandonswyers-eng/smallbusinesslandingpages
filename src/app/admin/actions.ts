"use server";

import { redirect } from "next/navigation";
import { requireProfile, formError } from "@/lib/platform/session";
import {
  createClientTask,
  createPaymentLink,
  createProspect,
  respondToSupport,
  saveAgreement,
  setClientAccountStatus,
  updateAgreementStatus,
  updateProjectRecord,
  resendActivation,
} from "@/lib/platform/services";
import { PROJECT_STATUSES, type ProjectStatus } from "@/lib/platform/types";

export async function createProspectAction(_: string | null, formData: FormData) {
  try {
    const { profile, platform } = await requireProfile("admin");
    const created = await createProspect(platform, profile, {
      email: String(formData.get("email") ?? ""),
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? "") || undefined,
      businessName: String(formData.get("businessName") ?? ""),
      demoWebsiteUrl: String(formData.get("demoWebsiteUrl") ?? "") || undefined,
      domainName: String(formData.get("domainName") ?? "") || undefined,
      internalNotes: String(formData.get("internalNotes") ?? "") || undefined,
    });
    redirect(`/admin/projects/${created.project.id}`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return formError(error);
  }
}

export async function updateProjectAction(formData: FormData) {
  try {
    const { profile, platform } = await requireProfile("admin");
    const projectId = String(formData.get("projectId") ?? "");
    const status = String(formData.get("projectStatus") ?? "") as ProjectStatus;
    await updateProjectRecord(platform, profile, projectId, {
      businessName: String(formData.get("businessName") ?? ""),
      demoWebsiteUrl: String(formData.get("demoWebsiteUrl") ?? "") || null,
      liveWebsiteUrl: String(formData.get("liveWebsiteUrl") ?? "") || null,
      domainName: String(formData.get("domainName") ?? "") || null,
      internalNotes: String(formData.get("internalNotes") ?? "") || null,
      expectedLaunchDate: String(formData.get("expectedLaunchDate") ?? "") || null,
      projectStatus: PROJECT_STATUSES.includes(status) ? status : undefined,
    });
  } catch (error) {
    throw new Error(formError(error));
  }
}

export async function saveAgreementAction(formData: FormData) {
  try {
    const { profile, platform } = await requireProfile("admin");
    await saveAgreement(platform, profile, {
      projectId: String(formData.get("projectId") ?? ""),
      agreementName: String(formData.get("agreementName") ?? "Service agreement"),
      externalSigningUrl: String(formData.get("externalSigningUrl") ?? "") || undefined,
      documentUrl: String(formData.get("documentUrl") ?? "") || undefined,
      status: String(formData.get("status") ?? "draft") as
        | "draft"
        | "sent"
        | "signed",
      notifyClient: formData.get("notifyClient") === "on",
    });
  } catch (error) {
    throw new Error(formError(error));
  }
}

export async function markAgreementSignedAction(formData: FormData) {
  const { profile, platform } = await requireProfile("admin");
  await updateAgreementStatus(
    platform,
    profile,
    String(formData.get("agreementId") ?? ""),
    "signed",
  );
}

export async function createPaymentLinkAction(formData: FormData) {
  try {
    const { profile, platform } = await requireProfile("admin");
    const result = await createPaymentLink(platform, profile, {
      projectId: String(formData.get("projectId") ?? ""),
      overrideReason: String(formData.get("overrideReason") ?? "") || undefined,
      sendEmail: formData.get("sendEmail") === "on",
    });
  } catch (error) {
    throw new Error(formError(error));
  }
}

export async function createTaskAction(formData: FormData) {
  try {
    const { profile, platform } = await requireProfile("admin");
    await createClientTask(platform, profile, {
      projectId: String(formData.get("projectId") ?? ""),
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? "") || undefined,
      notifyClient: formData.get("notifyClient") === "on",
    });
  } catch (error) {
    throw new Error(formError(error));
  }
}

export async function resendActivationAction(formData: FormData) {
  const { profile, platform } = await requireProfile("admin");
  await resendActivation(
    platform,
    profile,
    String(formData.get("profileId") ?? ""),
  );
}

export async function setAccountStatusAction(formData: FormData) {
  const { profile, platform } = await requireProfile("admin");
  await setClientAccountStatus(
    platform,
    profile,
    String(formData.get("profileId") ?? ""),
    String(formData.get("accountStatus") ?? "active") as "active" | "paused" | "archived",
  );
}

export async function respondSupportAction(formData: FormData) {
  const { profile, platform } = await requireProfile("admin");
  await respondToSupport(platform, profile, {
    requestId: String(formData.get("requestId") ?? ""),
    response: String(formData.get("response") ?? ""),
  });
}
