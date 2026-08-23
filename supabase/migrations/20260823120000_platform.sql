-- Small Business Landing Pages — customer platform
-- Run in the Supabase SQL editor or with the Supabase CLI.

create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('admin', 'team_member', 'client');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.account_status as enum ('pending', 'invited', 'active', 'paused', 'archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.project_status as enum (
    'prospect',
    'demo_ready',
    'proposal_sent',
    'agreement_sent',
    'agreement_signed',
    'awaiting_payment',
    'payment_received',
    'onboarding',
    'building',
    'awaiting_approval',
    'ready_to_launch',
    'live',
    'paused',
    'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.onboarding_stage as enum (
    'prospect',
    'demo_ready',
    'agreement_sent',
    'agreement_signed',
    'awaiting_payment',
    'paid',
    'onboarding',
    'building',
    'approval',
    'live'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.agreement_status as enum ('draft', 'sent', 'viewed', 'signed', 'declined', 'expired');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.task_status as enum ('open', 'in_progress', 'submitted', 'approved', 'completed');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.task_type as enum (
    'business_hours',
    'services',
    'logo',
    'photos',
    'contact_info',
    'website_approval',
    'other'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.support_status as enum ('open', 'responded', 'closed');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.stripe_event_status as enum ('processed', 'failed', 'ignored');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.auth_token_type as enum ('activation', 'password_reset');
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  email text not null unique,
  full_name text not null default '',
  phone text,
  business_name text,
  role public.user_role not null default 'client',
  account_status public.account_status not null default 'pending',
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_lowercase check (email = lower(email))
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete restrict,
  business_name text not null,
  internal_project_name text,
  demo_website_url text,
  live_website_url text,
  domain_name text,
  project_status public.project_status not null default 'prospect',
  onboarding_stage public.onboarding_stage not null default 'prospect',
  launch_date date,
  expected_launch_date date,
  minimum_term_start date,
  minimum_term_end date,
  internal_notes text,
  stripe_subscription_id text,
  subscription_status text,
  payment_override_reason text,
  provisioned_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agreements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete restrict,
  project_id uuid not null references public.projects (id) on delete cascade,
  agreement_name text not null,
  agreement_version text,
  document_url text,
  external_signing_url text,
  esignature_provider_id text,
  status public.agreement_status not null default 'draft',
  sent_at timestamptz,
  signed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.client_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  description text,
  task_type public.task_type not null default 'other',
  status public.task_status not null default 'open',
  due_date date,
  client_visible boolean not null default true,
  client_response text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.task_files (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.client_tasks (id) on delete cascade,
  uploaded_by uuid references public.profiles (id) on delete set null,
  storage_path text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes integer not null,
  created_at timestamptz not null default now(),
  constraint task_files_size_limit check (size_bytes > 0 and size_bytes <= 10485760)
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete restrict,
  project_id uuid not null references public.projects (id) on delete cascade,
  subject text not null,
  message text not null,
  status public.support_status not null default 'open',
  admin_response text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  event_type text not null,
  processing_status public.stripe_event_status not null default 'processed',
  processed_at timestamptz,
  client_id uuid references public.profiles (id) on delete set null,
  project_id uuid references public.projects (id) on delete set null,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.billing_records (
  id uuid primary key default gen_random_uuid(),
  stripe_invoice_id text unique,
  stripe_subscription_id text,
  invoice_number text,
  client_id uuid not null references public.profiles (id) on delete restrict,
  project_id uuid references public.projects (id) on delete set null,
  amount integer not null default 0,
  currency text not null default 'usd',
  invoice_status text,
  subscription_status text,
  invoice_date timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.auth_tokens (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  token_hash text not null unique,
  token_type public.auth_token_type not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists projects_client_id_idx on public.projects (client_id);
create index if not exists agreements_project_id_idx on public.agreements (project_id);
create index if not exists client_tasks_project_id_idx on public.client_tasks (project_id);
create index if not exists support_requests_client_id_idx on public.support_requests (client_id);
create index if not exists billing_records_client_id_idx on public.billing_records (client_id);
create index if not exists auth_tokens_profile_id_idx on public.auth_tokens (profile_id);
create index if not exists profiles_auth_user_id_idx on public.profiles (auth_user_id);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists client_tasks_updated_at on public.client_tasks;
create trigger client_tasks_updated_at before update on public.client_tasks
for each row execute function public.set_updated_at();

drop trigger if exists support_requests_updated_at on public.support_requests;
create trigger support_requests_updated_at before update on public.support_requests
for each row execute function public.set_updated_at();

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where auth_user_id = auth.uid()
      and role in ('admin', 'team_member')
      and account_status = 'active'
  );
$$;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.profiles
  where auth_user_id = auth.uid()
  limit 1;
$$;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.agreements enable row level security;
alter table public.client_tasks enable row level security;
alter table public.task_files enable row level security;
alter table public.support_requests enable row level security;
alter table public.stripe_events enable row level security;
alter table public.billing_records enable row level security;
alter table public.auth_tokens enable row level security;
alter table public.audit_events enable row level security;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated
  using (public.is_staff() or id = public.current_profile_id());

drop policy if exists profiles_staff_write on public.profiles;
create policy profiles_staff_write on public.profiles
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists projects_select on public.projects;
create policy projects_select on public.projects
  for select to authenticated
  using (public.is_staff() or client_id = public.current_profile_id());

drop policy if exists projects_staff_write on public.projects;
create policy projects_staff_write on public.projects
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists agreements_select on public.agreements;
create policy agreements_select on public.agreements
  for select to authenticated
  using (public.is_staff() or client_id = public.current_profile_id());

drop policy if exists agreements_staff_write on public.agreements;
create policy agreements_staff_write on public.agreements
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists tasks_select on public.client_tasks;
create policy tasks_select on public.client_tasks
  for select to authenticated
  using (
    public.is_staff()
    or exists (
      select 1 from public.projects p
      where p.id = client_tasks.project_id
        and p.client_id = public.current_profile_id()
        and client_tasks.client_visible = true
    )
  );

drop policy if exists tasks_staff_write on public.client_tasks;
create policy tasks_staff_write on public.client_tasks
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists tasks_client_update on public.client_tasks;
create policy tasks_client_update on public.client_tasks
  for update to authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = client_tasks.project_id
        and p.client_id = public.current_profile_id()
        and client_tasks.client_visible = true
    )
  )
  with check (
    exists (
      select 1 from public.projects p
      where p.id = client_tasks.project_id
        and p.client_id = public.current_profile_id()
        and client_tasks.client_visible = true
    )
  );

drop policy if exists task_files_select on public.task_files;
create policy task_files_select on public.task_files
  for select to authenticated
  using (
    public.is_staff()
    or exists (
      select 1
      from public.client_tasks t
      join public.projects p on p.id = t.project_id
      where t.id = task_files.task_id
        and p.client_id = public.current_profile_id()
        and t.client_visible = true
    )
  );

drop policy if exists task_files_insert on public.task_files;
create policy task_files_insert on public.task_files
  for insert to authenticated
  with check (
    public.is_staff()
    or exists (
      select 1
      from public.client_tasks t
      join public.projects p on p.id = t.project_id
      where t.id = task_files.task_id
        and p.client_id = public.current_profile_id()
        and t.client_visible = true
    )
  );

drop policy if exists support_select on public.support_requests;
create policy support_select on public.support_requests
  for select to authenticated
  using (public.is_staff() or client_id = public.current_profile_id());

drop policy if exists support_client_insert on public.support_requests;
create policy support_client_insert on public.support_requests
  for insert to authenticated
  with check (client_id = public.current_profile_id());

drop policy if exists support_client_update on public.support_requests;
create policy support_client_update on public.support_requests
  for update to authenticated
  using (client_id = public.current_profile_id())
  with check (client_id = public.current_profile_id());

drop policy if exists support_staff_write on public.support_requests;
create policy support_staff_write on public.support_requests
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists billing_select on public.billing_records;
create policy billing_select on public.billing_records
  for select to authenticated
  using (public.is_staff() or client_id = public.current_profile_id());

drop policy if exists billing_staff_write on public.billing_records;
create policy billing_staff_write on public.billing_records
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Tokens, Stripe events, and audit logs are server-only (service role).
drop policy if exists stripe_events_staff_select on public.stripe_events;
create policy stripe_events_staff_select on public.stripe_events
  for select to authenticated
  using (public.is_staff());

drop policy if exists audit_staff_select on public.audit_events;
create policy audit_staff_select on public.audit_events
  for select to authenticated
  using (public.is_staff());

insert into storage.buckets (id, name, public)
values ('client-uploads', 'client-uploads', false)
on conflict (id) do nothing;

drop policy if exists client_uploads_select on storage.objects;
create policy client_uploads_select on storage.objects
  for select to authenticated
  using (
    bucket_id = 'client-uploads'
    and (
      public.is_staff()
      or split_part(name, '/', 1) = public.current_profile_id()::text
    )
  );

drop policy if exists client_uploads_insert on storage.objects;
create policy client_uploads_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'client-uploads'
    and (
      public.is_staff()
      or split_part(name, '/', 1) = public.current_profile_id()::text
    )
  );
