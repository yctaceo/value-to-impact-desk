-- Dashboard tracking tables for UX realignment.
-- These support favorites, mock donation/investment records, receipts,
-- impact metrics, and report download history. No payment or brokerage logic.

create table if not exists public.user_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, organization_id)
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  amount numeric not null check (amount >= 0),
  currency text not null default 'KRW',
  donation_date date not null default current_date,
  payment_status text not null default 'record_only',
  receipt_requested boolean not null default false,
  receipt_issued boolean not null default false,
  memo text,
  created_at timestamptz not null default now()
);

create table if not exists public.investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  amount numeric check (amount >= 0),
  currency text not null default 'KRW',
  investment_type text not null default 'interest_record',
  investment_date date not null default current_date,
  status text not null default 'interest_only_due_diligence_required',
  memo text,
  created_at timestamptz not null default now()
);

create table if not exists public.organization_supporters (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  supporter_type text not null check (
    supporter_type in ('donor', 'investor', 'company_partner', 'csr_partner', 'mentor')
  ),
  relationship_status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (organization_id, user_id, supporter_type)
);

create table if not exists public.donation_receipts (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  receipt_requested boolean not null default true,
  receipt_issued boolean not null default false,
  issued_at timestamptz,
  receipt_file_path text,
  memo text,
  created_at timestamptz not null default now()
);

create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  month date not null,
  metric_name text not null,
  metric_value numeric not null,
  metric_unit text,
  source_monthly_report_id uuid references public.monthly_reports(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.report_downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  generated_report_id uuid references public.generated_reports(id) on delete set null,
  downloaded_at timestamptz not null default now(),
  report_type text
);

alter table public.user_favorites enable row level security;
alter table public.donations enable row level security;
alter table public.investments enable row level security;
alter table public.organization_supporters enable row level security;
alter table public.donation_receipts enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.report_downloads enable row level security;

create policy "favorites are user scoped" on public.user_favorites
  for all using (user_id = auth.uid() or public.is_admin_or_reviewer())
  with check (user_id = auth.uid() or public.is_admin_or_reviewer());

create policy "donations are participant scoped" on public.donations
  for select using (
    user_id = auth.uid()
    or public.is_org_owner(organization_id)
    or public.is_admin_or_reviewer()
  );
create policy "admins manage donations" on public.donations
  for all using (public.is_admin_or_reviewer())
  with check (public.is_admin_or_reviewer());

create policy "investments are participant scoped" on public.investments
  for select using (
    user_id = auth.uid()
    or public.is_org_owner(organization_id)
    or public.is_admin_or_reviewer()
  );
create policy "admins manage investments" on public.investments
  for all using (public.is_admin_or_reviewer())
  with check (public.is_admin_or_reviewer());

create policy "supporters are participant scoped" on public.organization_supporters
  for select using (
    user_id = auth.uid()
    or public.is_org_owner(organization_id)
    or public.is_admin_or_reviewer()
  );
create policy "admins manage supporters" on public.organization_supporters
  for all using (public.is_admin_or_reviewer())
  with check (public.is_admin_or_reviewer());

create policy "receipts are participant scoped" on public.donation_receipts
  for select using (
    user_id = auth.uid()
    or public.is_org_owner(organization_id)
    or public.is_admin_or_reviewer()
  );
create policy "admins manage receipts" on public.donation_receipts
  for all using (public.is_admin_or_reviewer())
  with check (public.is_admin_or_reviewer());

create policy "impact metrics visible to stakeholders" on public.impact_metrics
  for select using (
    public.is_org_owner(organization_id)
    or public.is_admin_or_reviewer()
    or public.current_app_role() in ('donor_investor', 'company_csr')
  );
create policy "orgs and admins manage impact metrics" on public.impact_metrics
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "report downloads are user scoped" on public.report_downloads
  for all using (user_id = auth.uid() or public.is_admin_or_reviewer())
  with check (user_id = auth.uid() or public.is_admin_or_reviewer());
