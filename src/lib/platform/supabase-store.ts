import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Agreement,
  AuditEvent,
  AuthToken,
  BillingRecord,
  ClientTask,
  Profile,
  Project,
  StripeEventRecord,
  SupportRequest,
  TaskFile,
} from "./types";
import type { Store } from "./store";

function camel(value: string) {
  return value.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function snake(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function toCamel<T>(row: Record<string, unknown> | null): T | null {
  if (!row) return null;
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) next[camel(key)] = value;
  return next as T;
}

function toSnake(patch: Record<string, unknown>) {
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(patch)) {
    if (value !== undefined) next[snake(key)] = value;
  }
  return next;
}

function required<T>(row: T | null, label: string): T {
  if (!row) throw new Error(`${label} not found`);
  return row;
}

export function createSupabaseStore(client: SupabaseClient): Store {
  const from = (table: string) => client.from(table);

  async function one<T>(table: string, column: string, value: string) {
    const { data, error } = await from(table).select("*").eq(column, value).maybeSingle();
    if (error) throw error;
    return toCamel<T>(data);
  }

  async function many<T>(table: string, column?: string, value?: string, order = "created_at") {
    let query = from(table).select("*").order(order, { ascending: false });
    if (column && value) query = query.eq(column, value);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((row) => toCamel<T>(row as Record<string, unknown>)!);
  }

  async function insert<T>(table: string, record: object) {
    const { data, error } = await from(table)
      .insert(toSnake(record as Record<string, unknown>))
      .select("*")
      .single();
    if (error) throw error;
    return toCamel<T>(data)!;
  }

  async function update<T>(table: string, id: string, patch: object, label: string) {
    const { data, error } = await from(table)
      .update(toSnake(patch as Record<string, unknown>))
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return required(toCamel<T>(data), label);
  }

  return {
    getProfileById: (id) => one<Profile>("profiles", "id", id),
    getProfileByEmail: (email) => one<Profile>("profiles", "email", email),
    getProfileByAuthUserId: (authUserId) => one<Profile>("profiles", "auth_user_id", authUserId),
    async listProfilesByRole(role) {
      const rows = await many<Profile>("profiles");
      return role === "staff"
        ? rows.filter((row) => row.role === "admin" || row.role === "team_member")
        : rows.filter((row) => row.role === role);
    },
    insertProfile: (profile) => insert<Profile>("profiles", profile),
    updateProfile: (id, patch) => update<Profile>("profiles", id, patch, "Profile"),

    getProjectById: (id) => one<Project>("projects", "id", id),
    listProjects: () => many<Project>("projects"),
    listProjectsByClient: (clientId) => many<Project>("projects", "client_id", clientId),
    insertProject: (project) => insert<Project>("projects", project),
    updateProject: (id, patch) => update<Project>("projects", id, patch, "Project"),

    listAgreementsByProject: (projectId) => many<Agreement>("agreements", "project_id", projectId),
    getAgreementById: (id) => one<Agreement>("agreements", "id", id),
    insertAgreement: (agreement) => insert<Agreement>("agreements", agreement),
    updateAgreement: (id, patch) => update<Agreement>("agreements", id, patch, "Agreement"),

    listTasksByProject: (projectId) => many<ClientTask>("client_tasks", "project_id", projectId),
    getTaskById: (id) => one<ClientTask>("client_tasks", "id", id),
    insertTask: (task) => insert<ClientTask>("client_tasks", task),
    updateTask: (id, patch) => update<ClientTask>("client_tasks", id, patch, "Task"),

    listTaskFiles: (taskId) => many<TaskFile>("task_files", "task_id", taskId),
    insertTaskFile: (file) => insert<TaskFile>("task_files", file),

    listSupportByProject: (projectId) =>
      many<SupportRequest>("support_requests", "project_id", projectId),
    async listOpenSupport() {
      const { data, error } = await from("support_requests")
        .select("*")
        .neq("status", "closed")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((row) => toCamel<SupportRequest>(row as Record<string, unknown>)!);
    },
    getSupportById: (id) => one<SupportRequest>("support_requests", "id", id),
    insertSupport: (request) => insert<SupportRequest>("support_requests", request),
    updateSupport: (id, patch) => update<SupportRequest>("support_requests", id, patch, "Support request"),

    async getStripeEvent(stripeEventId) {
      return one<StripeEventRecord>("stripe_events", "stripe_event_id", stripeEventId);
    },
    async insertStripeEvent(record) {
      const { data, error } = await from("stripe_events")
        .insert(toSnake(record as unknown as Record<string, unknown>))
        .select("*")
        .single();
      if (error) {
        if (error.code === "23505") {
          const existing = await one<StripeEventRecord>(
            "stripe_events",
            "stripe_event_id",
            record.stripeEventId,
          );
          return { duplicate: true, record: existing! };
        }
        throw error;
      }
      return { duplicate: false, record: toCamel<StripeEventRecord>(data)! };
    },
    updateStripeEvent: (id, patch) =>
      update<StripeEventRecord>("stripe_events", id, patch, "Stripe event"),

    listBillingByClient: (clientId) => many<BillingRecord>("billing_records", "client_id", clientId),
    insertBilling: (record) => insert<BillingRecord>("billing_records", record),
    async upsertBillingByInvoiceId(record) {
      if (record.stripeInvoiceId) {
        const existing = await one<BillingRecord>(
          "billing_records",
          "stripe_invoice_id",
          record.stripeInvoiceId,
        );
        if (existing) {
          return update<BillingRecord>("billing_records", existing.id, record, "Billing record");
        }
      }
      return insert<BillingRecord>("billing_records", record);
    },

    insertToken: (token) => insert<AuthToken>("auth_tokens", token),
    getTokenByHash: (hash) => one<AuthToken>("auth_tokens", "token_hash", hash),
    updateToken: (id, patch) => update<AuthToken>("auth_tokens", id, patch, "Token"),
    async invalidateTokens(profileId, type) {
      const { error } = await from("auth_tokens")
        .update({ used_at: new Date().toISOString() })
        .eq("profile_id", profileId)
        .eq("token_type", type)
        .is("used_at", null);
      if (error) throw error;
    },

    insertAudit: (event) => insert<AuditEvent>("audit_events", event),
  };
}
