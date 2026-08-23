"use server";

import { requireProfile } from "@/lib/platform/session";
import {
  closeSupportRequest,
  createSupportRequest,
  submitClientTask,
} from "@/lib/platform/services";

export async function submitTaskAction(formData: FormData) {
  const { profile, platform } = await requireProfile("dashboard");
  const file = formData.get("file");
  await submitClientTask(platform, profile, {
    taskId: String(formData.get("taskId") ?? ""),
    response: String(formData.get("response") ?? "") || undefined,
    approveWebsite: formData.get("approveWebsite") === "on",
    file:
      file instanceof File && file.size > 0
        ? {
            fileName: file.name,
            mimeType: file.type,
            sizeBytes: file.size,
            bytes: new Uint8Array(await file.arrayBuffer()),
          }
        : undefined,
  });
}

export async function createSupportAction(formData: FormData) {
  const { profile, platform } = await requireProfile("dashboard");
  const projects = await platform.store.listProjectsByClient(profile.id);
  const project = projects[0];
  if (!project) return;
  await createSupportRequest(platform, profile, {
    projectId: project.id,
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  });
}

export async function closeSupportAction(formData: FormData) {
  const { profile, platform } = await requireProfile("dashboard");
  await closeSupportRequest(
    platform,
    profile,
    String(formData.get("requestId") ?? ""),
  );
}
