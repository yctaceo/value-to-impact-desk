-- Compatibility migration if the initial MVP schema was already applied before
-- the Korea 50 public-source scouting import logic was added.

do $$
begin
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
exception
  when duplicate_object then null;
end $$;

alter table public.organizations
  add column if not exists seed_rank int,
  add column if not exists country text not null default 'KR',
  add column if not exists region text,
  add column if not exists primary_url text,
  add column if not exists primary_url_confidence text,
  add column if not exists source_urls text[] not null default '{}',
  add column if not exists search_queries text[] not null default '{}',
  add column if not exists category_tags text[] not null default '{}',
  add column if not exists fit_types text[] not null default '{}',
  add column if not exists activity_index_score int check (activity_index_score between 0 and 100),
  add column if not exists recommended_action text,
  add column if not exists contact_priority text,
  add column if not exists homepage_verification_needed boolean not null default false,
  add column if not exists field_verified boolean not null default false,
  add column if not exists accountant_reviewed boolean not null default false,
  add column if not exists risk_note text,
  add column if not exists public_visibility text not null default 'admin_only',
  add column if not exists deal_room_visibility boolean not null default false,
  add column if not exists profile_status text not null default 'seeded_public_source';

alter table public.impact_profiles
  add column if not exists core_value_summary_ko text,
  add column if not exists social_problem_ko text,
  add column if not exists primary_beneficiaries_ko text,
  add column if not exists business_model_summary_ko text,
  add column if not exists products_services_summary_ko text,
  add column if not exists donation_fit_summary_ko text,
  add column if not exists procurement_fit_summary_ko text,
  add column if not exists impact_investment_fit_summary_ko text,
  add column if not exists research_note_ko text;

do $$
begin
  alter table public.impact_profiles
    add constraint impact_profiles_organization_id_key unique (organization_id);
exception
  when duplicate_table then null;
  when duplicate_object then null;
end $$;

alter table public.verification_reviews
  add column if not exists review_type text not null default 'manual_review',
  add column if not exists review_status text not null default 'not_field_verified',
  add column if not exists reviewer_name text;

create table if not exists public.scouting_actions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_id uuid references public.users(id) on delete set null,
  action_type public.scouting_action_type not null,
  memo text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.scouting_actions enable row level security;

drop policy if exists "scouting actions read by admins" on public.scouting_actions;
create policy "scouting actions read by admins" on public.scouting_actions
  for select using (public.is_admin_or_reviewer());

drop policy if exists "scouting actions manage by admins" on public.scouting_actions;
create policy "scouting actions manage by admins" on public.scouting_actions
  for all using (public.is_admin_or_reviewer())
  with check (public.is_admin_or_reviewer());
