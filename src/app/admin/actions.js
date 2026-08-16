"use server";

import "server-only";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminData";
import { SUPABASE_URL } from "@/lib/supabase/config";
import { buildProjectUpdate, getAllClientProjects } from "@/lib/clientProjects";
import { sendHostingerMail } from "@/lib/hostingerMail";
import { sendAccountPush } from "@/lib/pushNotifications";


async function listUsers(serviceKey) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=1000`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not list users (${response.status})`);
  const payload = await response.json();
  return payload.users || [];
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function projectEmailHtml(project) {
  return `<!doctype html><html><body style="margin:0;background:#f6f0eb;font-family:Arial,Helvetica,sans-serif;color:#3f0b20"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f0eb;padding:32px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fffaf6;border:1px solid #decbbd"><tr><td style="background:#4b0823;padding:30px 36px;text-align:center"><img src="https://zameett.com/brand/zameett-email-logo.png" width="215" height="55" alt="Zameett" style="display:block;width:215px;max-width:100%;height:auto;border:0;margin:0 auto"><div style="margin-top:8px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#c9a24f">Project update</div></td></tr><tr><td style="padding:36px"><h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:30px;line-height:1.2;font-weight:500;color:#4b0823">Your project has moved forward.</h1><p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#6b4b57">There is a new update for <strong>${escapeHtml(project.title)}</strong>.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #decbbd"><tr><td style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9b7a68">Current stage</td><td align="right" style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:14px;color:#4b0823">${escapeHtml(project.currentStage)}</td></tr><tr><td style="padding:13px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9b7a68">Progress</td><td align="right" style="padding:13px 16px;font-size:14px;font-weight:700;color:#4b0823">${project.progress}%</td></tr></table><div style="padding-top:28px;text-align:center"><a href="https://zameett.com/account" style="display:inline-block;background:#4b0823;color:#fffaf6;text-decoration:none;padding:14px 28px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">View project</a></div></td></tr></table></td></tr></table></body></html>`;
}

async function updateSupabaseUser(serviceKey, user, appMetadata) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${encodeURIComponent(user.id)}`, {
    method: "PUT",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ app_metadata: appMetadata }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not update customer project (${response.status})`);
}

export async function updateClientProjectStage(formData) {
  await requireAdmin();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) redirect("/admin?projectUpdate=missing-key#projects");

  const projectId = String(formData.get("projectId") || "").trim();
  const stageIndex = Number(formData.get("stageIndex"));
  const baseProject = getAllClientProjects().find((project) => project.id === projectId);
  const update = buildProjectUpdate(projectId, stageIndex);
  if (!baseProject || !update) redirect("/admin?projectUpdate=invalid#projects");

  try {
    const users = await listUsers(serviceKey);
    const user = users.find((item) => String(item.email || "").trim().toLowerCase() === baseProject.email.toLowerCase());
    if (!user) redirect("/admin?projectUpdate=customer-missing#projects");

    const existingUpdates = user.app_metadata?.zameett_project_updates || {};
    const appMetadata = {
      ...(user.app_metadata || {}),
      zameett_project_updates: { ...existingUpdates, [projectId]: update },
    };
    await updateSupabaseUser(serviceKey, user, appMetadata);

    const updatedProject = getAllClientProjects({
      [baseProject.email.toLowerCase()]: appMetadata.zameett_project_updates,
    }).find((project) => project.id === projectId);
    const notificationBody = `${updatedProject.currentStage} ? ${updatedProject.progress}% complete`;
    const subscriptions = Array.isArray(appMetadata.zameett_push_subscriptions)
      ? appMetadata.zameett_push_subscriptions
      : [];

    const [emailResult, pushResult] = await Promise.allSettled([
      sendHostingerMail({
        to: [baseProject.email],
        displayName: "Zameett",
        subject: `Project update ? ${updatedProject.currentStage}`,
        text: [
          "Your Zameett project has moved forward.",
          `Project: ${updatedProject.title}`,
          `Current stage: ${updatedProject.currentStage}`,
          `Progress: ${updatedProject.progress}%`,
          "View your account: https://zameett.com/account",
        ].join("\n"),
        html: projectEmailHtml(updatedProject),
      }),
      sendAccountPush(subscriptions, {
        title: "Your Zameett project moved forward",
        body: notificationBody,
        url: "/account",
        tag: `project-${projectId}-${update.updatedAt}`,
      }),
    ]);

    const pushValue = pushResult.status === "fulfilled" ? pushResult.value : null;
    if (pushValue?.staleEndpoints?.length) {
      const stale = new Set(pushValue.staleEndpoints);
      appMetadata.zameett_push_subscriptions = subscriptions.filter((item) => !stale.has(item?.endpoint));
      await updateSupabaseUser(serviceKey, user, appMetadata).catch(() => undefined);
    }

    revalidatePath("/admin");
    revalidatePath("/account");
    const emailStatus = emailResult.status === "fulfilled" ? "sent" : "failed";
    const pushStatus = pushValue?.sent ? "sent" : pushValue?.configured ? "no-device" : "setup";
    redirect(`/admin?projectUpdate=done&email=${emailStatus}&push=${pushStatus}#projects`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    redirect("/admin?projectUpdate=error#projects");
  }
}
