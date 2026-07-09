-- Value-to-Impact Desk MVP schema
-- Run in Supabase SQL Editor or with Supabase CLI once a project is linked.

create extension if not exists pgcrypto;

create type public.app_role as enum (
  'admin',
  'reviewer',
  'organization',
  'donor_investor',
  'company_csr'
);

create type public.organization_category as enum (
  'social_enterprise',
  'nonprofit',
  'impact_venture',
  'bam',
  'faith_driven',
  'sample',
  'other'
);

create type public.profile_visibility as enum ('public', 'private', 'deal_room');
create type public.review_status as enum ('draft', 'new', 'in_review', 'needs_changes', 'approved', 'on_hold');
create type public.need_type as enum ('donation', 'investment', 'procurement', 'partnership', 'mentoring', 'research', 'other');
create type public.evidence_status as enum ('not_submitted', 'submitted', 'reviewed', 'rejected');
create type public.scouting_action_type as enum (
  'mark_contacted',
  'add_contact_memo',
  'request_organization_intake',
  'convert_to_profile_draft',
  'generate_internal_ai_brief',
  'request_evidence_submission',
  'update_verification_level',
  'hide_from_public',
  'show_in_deal_room',
  'archive_candidate'
);
create type public.report_type as enum (
  'impact_summary_1p',
  'donor_investor_brief_5p',
  'monthly_impact_report',
  'csr_procurement_brief',
  'english_impact_profile'
);

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role public.app_role not null default 'organization',
  created_at timestamptz not null default now()
);

create table public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  organization_name text,
  phone text,
  company_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  organization_id uuid,
  terms_required boolean not null default false,
  privacy_required boolean not null default false,
  report_processing_required boolean not null default false,
  media_rights_required boolean not null default false,
  sensitive_data_notice_required boolean not null default false,
  anonymized_research_optional boolean not null default false,
  service_analytics_optional boolean not null default false,
  overseas_profile_share_optional boolean not null default false,
  withdrawn_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.users(id) on delete set null,
  seed_rank int,
  name_ko text not null,
  name_en text,
  slug text not null unique,
  category public.organization_category not null,
  legal_type text,
  country text not null default 'KR',
  region text,
  location text,
  founded_year int,
  primary_url text,
  website text,
  primary_url_confidence text,
  contact_email text,
  source_type text not null default 'Self-Reported',
  source_url text,
  source_urls text[] not null default '{}',
  search_queries text[] not null default '{}',
  category_tags text[] not null default '{}',
  fit_types text[] not null default '{}',
  activity_index_score int check (activity_index_score between 0 and 100),
  recommended_action text,
  contact_priority text,
  homepage_verification_needed boolean not null default false,
  field_verified boolean not null default false,
  accountant_reviewed boolean not null default false,
  risk_note text,
  public_visibility text not null default 'admin_only',
  deal_room_visibility boolean not null default false,
  profile_status text not null default 'seeded_public_source',
  last_updated date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.consents
  add constraint consents_organization_id_fkey
  foreign key (organization_id) references public.organizations(id) on delete set null;

create table public.impact_profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  visibility public.profile_visibility not null default 'private',
  review_status public.review_status not null default 'draft',
  verification_level int not null default 0 check (verification_level between 0 and 4),
  verification_status text not null default 'Draft',
  one_line_ko text,
  summary_ko text,
  summary_en text,
  mission_ko text,
  mission_en text,
  core_value_summary_ko text,
  social_problem text,
  social_problem_ko text,
  beneficiaries text,
  primary_beneficiaries_ko text,
  business_model text,
  business_model_summary_ko text,
  products_services_summary_ko text,
  donation_fit_summary_ko text,
  procurement_fit_summary_ko text,
  impact_investment_fit_summary_ko text,
  research_note_ko text,
  financial_summary text,
  risk_notes text[],
  tags text[],
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  description text,
  activity_date date,
  created_at timestamptz not null default now()
);

create table public.employment_stats (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  report_month date not null,
  total_workers int,
  vulnerable_workers int,
  new_hires int,
  exits int,
  notes text,
  created_at timestamptz not null default now()
);

create table public.products_services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  price_note text,
  monthly_capacity text,
  past_clients text[],
  procurement_ready boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.financial_snapshots (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  period_month date not null,
  revenue_amount numeric,
  donation_amount numeric,
  grant_amount numeric,
  expense_amount numeric,
  debt_amount numeric,
  currency text not null default 'KRW',
  notes text,
  created_at timestamptz not null default now()
);

create table public.funding_requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  type public.need_type not null,
  label text not null,
  amount numeric,
  currency text default 'KRW',
  description text,
  expected_impact text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table public.evidence_files (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  uploaded_by uuid references public.users(id) on delete set null,
  label text not null,
  file_path text,
  file_type text,
  status public.evidence_status not null default 'submitted',
  public_safe boolean not null default false,
  contains_sensitive_data boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table public.verification_reviews (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  reviewer_id uuid references public.users(id) on delete set null,
  review_type text not null default 'manual_review',
  level int not null check (level between 0 and 4),
  verification_level int generated always as (level) stored,
  verifier_type text not null,
  review_status text not null default 'not_field_verified',
  reviewer_name text,
  notes text not null,
  review_note text generated always as (notes) stored,
  risk_notes text,
  reviewed_at timestamptz not null default now()
);

create table public.scouting_actions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_id uuid references public.users(id) on delete set null,
  action_type public.scouting_action_type not null,
  memo text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.monthly_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  submitted_by uuid references public.users(id) on delete set null,
  report_month date not null,
  activities text,
  employment_changes text,
  revenue_amount numeric,
  donation_amount numeric,
  product_sales text,
  issues_and_needs text,
  next_month_plan text,
  consent_reconfirmed boolean not null default false,
  review_status public.review_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, report_month)
);

create table public.generated_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  monthly_report_id uuid references public.monthly_reports(id) on delete set null,
  type public.report_type not null,
  title text not null,
  content_markdown text not null,
  source_fields jsonb not null default '[]'::jsonb,
  generated_by uuid references public.users(id) on delete set null,
  model text,
  is_mock boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  requester_id uuid references public.users(id) on delete set null,
  requester_name text,
  requester_email text,
  inquiry_type text not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.profile_access_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  user_id uuid references public.users(id) on delete set null,
  access_context text,
  created_at timestamptz not null default now()
);

create or replace function public.current_app_role()
returns public.app_role
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select role from public.users where id = auth.uid()),
    'organization'::public.app_role
  );
$$;

create or replace function public.is_admin_or_reviewer()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_app_role() in ('admin', 'reviewer');
$$;

create or replace function public.is_org_owner(org_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.organizations
    where id = org_id and owner_id = auth.uid()
  );
$$;

alter table public.users enable row level security;
alter table public.user_profiles enable row level security;
alter table public.roles enable row level security;
alter table public.consents enable row level security;
alter table public.organizations enable row level security;
alter table public.impact_profiles enable row level security;
alter table public.activities enable row level security;
alter table public.employment_stats enable row level security;
alter table public.products_services enable row level security;
alter table public.financial_snapshots enable row level security;
alter table public.funding_requests enable row level security;
alter table public.evidence_files enable row level security;
alter table public.verification_reviews enable row level security;
alter table public.scouting_actions enable row level security;
alter table public.monthly_reports enable row level security;
alter table public.generated_reports enable row level security;
alter table public.inquiries enable row level security;
alter table public.profile_access_logs enable row level security;

create policy "users can read own user row" on public.users
  for select using (id = auth.uid() or public.is_admin_or_reviewer());

create policy "users can update own user row" on public.users
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "admins manage users" on public.users
  for all using (public.current_app_role() = 'admin')
  with check (public.current_app_role() = 'admin');

create policy "profile owners read and update" on public.user_profiles
  for all using (user_id = auth.uid() or public.is_admin_or_reviewer())
  with check (user_id = auth.uid() or public.is_admin_or_reviewer());

create policy "admins manage roles" on public.roles
  for all using (public.current_app_role() = 'admin')
  with check (public.current_app_role() = 'admin');

create policy "users read own roles" on public.roles
  for select using (user_id = auth.uid() or public.is_admin_or_reviewer());

create policy "users manage own consents" on public.consents
  for all using (user_id = auth.uid() or public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (user_id = auth.uid() or public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "public can read approved public organizations" on public.organizations
  for select using (
    exists (
      select 1 from public.impact_profiles p
      where p.organization_id = organizations.id
        and p.visibility = 'public'
        and p.review_status = 'approved'
    )
    or public.is_admin_or_reviewer()
    or owner_id = auth.uid()
    or public.current_app_role() in ('donor_investor', 'company_csr')
  );

create policy "org owners insert organizations" on public.organizations
  for insert with check (owner_id = auth.uid() or public.is_admin_or_reviewer());

create policy "org owners update organizations" on public.organizations
  for update using (owner_id = auth.uid() or public.is_admin_or_reviewer())
  with check (owner_id = auth.uid() or public.is_admin_or_reviewer());

create policy "profile visibility select" on public.impact_profiles
  for select using (
    (visibility = 'public' and review_status = 'approved')
    or public.current_app_role() in ('admin', 'reviewer', 'donor_investor', 'company_csr')
    or public.is_org_owner(organization_id)
  );

create policy "org owners manage profiles" on public.impact_profiles
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "org scoped data select" on public.activities
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer() or public.current_app_role() in ('donor_investor', 'company_csr'));
create policy "org scoped data manage" on public.activities
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "employment select" on public.employment_stats
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer() or public.current_app_role() in ('donor_investor', 'company_csr'));
create policy "employment manage" on public.employment_stats
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "products select" on public.products_services
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer() or public.current_app_role() in ('donor_investor', 'company_csr'));
create policy "products manage" on public.products_services
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "financial select restricted" on public.financial_snapshots
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer() or public.current_app_role() in ('donor_investor', 'company_csr'));
create policy "financial manage" on public.financial_snapshots
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "funding select" on public.funding_requests
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer() or public.current_app_role() in ('donor_investor', 'company_csr'));
create policy "funding manage" on public.funding_requests
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "evidence select private" on public.evidence_files
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());
create policy "evidence manage" on public.evidence_files
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "reviews select" on public.verification_reviews
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer() or public.current_app_role() in ('donor_investor', 'company_csr'));
create policy "reviews manage by reviewers" on public.verification_reviews
  for all using (public.is_admin_or_reviewer())
  with check (public.is_admin_or_reviewer());

create policy "scouting actions read by admins" on public.scouting_actions
  for select using (public.is_admin_or_reviewer());
create policy "scouting actions manage by admins" on public.scouting_actions
  for all using (public.is_admin_or_reviewer())
  with check (public.is_admin_or_reviewer());

create policy "monthly select" on public.monthly_reports
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer() or public.current_app_role() in ('donor_investor', 'company_csr'));
create policy "monthly manage" on public.monthly_reports
  for all using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer())
  with check (public.is_org_owner(organization_id) or public.is_admin_or_reviewer());

create policy "generated reports select" on public.generated_reports
  for select using (public.is_org_owner(organization_id) or public.is_admin_or_reviewer() or public.current_app_role() in ('donor_investor', 'company_csr'));
create policy "generated reports manage" on public.generated_reports
  for all using (public.is_admin_or_reviewer())
  with check (public.is_admin_or_reviewer());

create policy "inquiries insert public authenticated" on public.inquiries
  for insert with check (true);
create policy "inquiries read scoped" on public.inquiries
  for select using (requester_id = auth.uid() or public.is_org_owner(organization_id) or public.is_admin_or_reviewer());
create policy "logs insert" on public.profile_access_logs
  for insert with check (user_id = auth.uid() or user_id is null);
create policy "logs read admin" on public.profile_access_logs
  for select using (public.is_admin_or_reviewer());

insert into storage.buckets (id, name, public)
values
  ('impact-evidence', 'impact-evidence', false),
  ('public-impact-assets', 'public-impact-assets', true)
on conflict (id) do nothing;

create policy "public assets are readable" on storage.objects
  for select using (bucket_id = 'public-impact-assets');

create policy "evidence upload by authenticated users" on storage.objects
  for insert with check (bucket_id = 'impact-evidence' and auth.role() = 'authenticated');

create policy "evidence readable by authenticated users" on storage.objects
  for select using (bucket_id = 'impact-evidence' and auth.role() = 'authenticated');

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

insert into public.organizations
  (id, name_ko, name_en, slug, category, location, founded_year, website, source_type, source_url, last_updated)
values
  ('11111111-1111-1111-1111-111111111111', '베어베터', 'Bear Better', 'bear-better', 'social_enterprise', 'Seoul, Korea', 2012, 'https://www.bearbetter.net/', 'Public Source', 'https://www.bearbetter.net/mission', '2026-07-09'),
  ('22222222-2222-2222-2222-222222222222', '동구밭', 'Donggubat', 'donggubat', 'social_enterprise', 'Hanam, Korea', null, 'https://donggubat.co.kr/', 'Public Source', 'https://donggubat.co.kr/', '2026-07-09'),
  ('33333333-3333-3333-3333-333333333333', '빅이슈코리아', 'Big Issue Korea', 'big-issue-korea', 'nonprofit', 'Seoul, Korea', 2010, 'https://bigissue.kr/', 'Public Source', 'https://bigissue.kr/about/mission', '2026-07-09'),
  ('44444444-4444-4444-4444-444444444444', 'Bloom Paper Art Collective', 'Bloom Paper Art Collective', 'bloom-paper-art', 'sample', 'Seoul, Korea', null, null, 'Fictional Sample', null, '2026-07-09')
on conflict (slug) do nothing;

insert into public.impact_profiles
  (organization_id, visibility, review_status, verification_level, verification_status, one_line_ko, mission_ko, social_problem, beneficiaries, business_model, financial_summary, risk_notes, tags, published_at)
values
  ('11111111-1111-1111-1111-111111111111', 'deal_room', 'approved', 1, 'Not Field Verified', '발달장애인이 일하는 방식을 기업 서비스와 제품으로 구조화한 한국 사회적기업.', '발달장애인이 함께 어울려 일할 수 있는 사회를 지향합니다.', '발달장애인의 안정적 고용 기회 부족.', '발달장애인 근로자와 기업 파트너.', '커피, 제과, 인쇄, 플라워, 카페 위탁 운영.', '공개자료 기반. 플랫폼 회계 검토 전.', array['공개자료 기반', '개인정보 비공개 필요'], array['장애인고용','기업구매','사회적기업'], now()),
  ('22222222-2222-2222-2222-222222222222', 'deal_room', 'approved', 1, 'Not Field Verified', '발달장애인 고용과 플라스틱 저감 생활용품을 결합한 제품 기반 사회적기업.', '발달장애인의 근속연수 문제 해결과 기후정의 실천.', '장기근속과 플라스틱 소비 문제.', '발달장애인 근로자와 지속가능 소비자.', '생활용품 제조, 공식몰, ODM/OEM.', '재무자료 미제출.', array['고용 지표 직접 제출 필요'], array['친환경','기업기프트','OEM'], now()),
  ('33333333-3333-3333-3333-333333333333', 'deal_room', 'approved', 1, 'Not Field Verified', '홈리스의 자립을 잡지 판매와 비즈니스 솔루션으로 지원하는 비영리 사회적기업.', 'A Hand Up, Not a Hand Out.', '주거취약계층의 합법적 소득과 자립 기회 부족.', '홈리스와 주거취약계층.', '매거진 판매, 캠페인, 파트너십.', '후원/판매 기반 구조로 보이나 플랫폼 검토 전.', array['취약계층 개인정보 보호 필요'], array['비영리','홈리스','자립'], now()),
  ('44444444-4444-4444-4444-444444444444', 'public', 'approved', 2, 'Sample Evidence Submitted', '경계선지능 청년에게 대형 종이꽃 공예를 교육하고 기업 행사 아트 설치로 연결하는 샘플 프로필.', '느린 학습자가 자신의 속도로 기술을 배우고 존중받는 작업자가 되도록 돕습니다.', '경계선지능 청년의 학교 이후 고용 기회 부족.', '경계선지능 청년과 가족.', '기업행사 아트 설치와 워크숍.', '샘플 데이터.', array['작업공간 부족','재료비 변동'], array['샘플','경계선지능','기업구매'], now())
on conflict do nothing;

insert into public.funding_requests
  (organization_id, type, label, description, expected_impact)
values
  ('11111111-1111-1111-1111-111111111111', 'procurement', '기업 구매/위탁 파트너십', '커피, 제과, 인쇄, 플라워, 카페 위탁', '기업 구매와 위탁 운영을 통해 지속 가능한 고용 확대'),
  ('22222222-2222-2222-2222-222222222222', 'procurement', '기업 ESG 기프트/구매', '친환경 생활용품 구매', '친환경 소비와 발달장애인 고용 임팩트 창출'),
  ('33333333-3333-3333-3333-333333333333', 'donation', '자립 지원 후원', '홈리스 자립 지원', '주거취약계층의 소득과 자립 기회 확대'),
  ('44444444-4444-4444-4444-444444444444', 'donation', 'KRW 30M training space and materials', '훈련공간과 재료비', '6개월간 추가 20명 훈련')
on conflict do nothing;
