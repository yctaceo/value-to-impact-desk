# Value-to-Impact Desk MVP

Verified impact profiling and reporting platform for social enterprises, nonprofits, donors, investors, and corporate CSR teams.

This MVP is not a donation platform, investment brokerage platform, or marketplace. The core object is an `Organization Impact Profile` with evidence, verification level, monthly reports, and AI-generated report drafts.

## What is included

- Next.js + TypeScript + Tailwind
- Korean-first, English-ready UI
- Public landing pages
- Organization intake form
- Monthly performance report form
- Admin review dashboard
- Private deal-room style listing
- Public-source and fictional sample organization seed data
- Supabase Auth client scaffold
- Supabase Postgres / Storage / RLS migration SQL
- Korea 50 public-source scouting seed import logic
- AI report route with OpenAI Responses API scaffold and mock fallback

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill values when ready.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4-mini
```

If `OPENAI_API_KEY` is missing, `/api/reports/generate` returns a mock report so Vercel demos still work.

## Supabase setup

Supabase CLI is installed as a local dev dependency and the project is initialized
with `supabase/config.toml`.

Check the CLI:

```bash
npx supabase --version
```

Apply the SQL in:

```text
supabase/migrations/202607090001_initial_value_to_impact_desk.sql
```

Run it in Supabase SQL Editor or with Supabase CLI after linking a project.

If the first migration was already applied before the Korea scouting module was
added, also run:

```text
supabase/migrations/202607090002_korea_scouting_import_support.sql
```

The migration creates:

- `users`, `user_profiles`, `roles`, `consents`
- `organizations`, `impact_profiles`, `activities`
- `employment_stats`, `products_services`, `financial_snapshots`
- `funding_requests`, `evidence_files`, `verification_reviews`
- `monthly_reports`, `generated_reports`, `inquiries`, `profile_access_logs`
- private `impact-evidence` bucket and public `public-impact-assets` bucket
- RLS policies for admin, reviewer, organization, donor/investor, company/CSR, and public visitors

### Link a remote Supabase project locally

Supabase remote linking requires a Supabase access token and project ref.

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

If you prefer environment variables:

```bash
SUPABASE_ACCESS_TOKEN=... npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

### GitHub Actions migration workflow

The repository includes:

```text
.github/workflows/supabase-migrations.yml
```

Add these GitHub repository secrets before running the workflow:

- `SUPABASE_ACCESS_TOKEN`: Supabase personal access token
- `SUPABASE_PROJECT_ID`: Supabase project ref, for example `abcdefghijklmnopqrst`
- `SUPABASE_DB_PASSWORD`: remote database password

The workflow installs Supabase CLI using `supabase/setup-cli@v1`, links the
project, and runs `supabase db push` when migrations change on `main` or when
manually triggered.

## Korea scouting seed import

The 50 organization seed list is treated as internal scouting data, not verified
partner data. Defaults:

- `public_visibility = admin_only`
- `deal_room_visibility = false`
- `verification_level = 1`
- `verification_status = Public-source only / Not field verified`
- `field_verified = false`
- `accountant_reviewed = false`

Dry run:

```bash
npm run seed:korea-scouting:dry
```

Import to Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run seed:korea-scouting
```

To use a different file path:

```bash
SEED_SOURCE_PATH="C:/path/to/value_to_impact_desk_seed_data_50_orgs.md" npm run seed:korea-scouting:dry
```

The script reads the `koreaImpactOrgSeedData` array from the markdown source,
upserts `organizations` and `impact_profiles`, and inserts an initial
`verification_reviews` row for each organization.

## Verification language rules

- AI does not verify claims.
- Actual organizations from public sources must show `Public Source`, `Not Field Verified`, and `Level 1`.
- Avoid "recommended", "verified investment", or direct investment solicitation language.
- Use `Request Introduction`, `Partnership Inquiry`, and `Due Diligence Required`.

## Key routes

- `/` landing
- `/profiles` profile list
- `/profiles/[slug]` profile detail
- `/apply` organization intake
- `/org` organization dashboard
- `/org/monthly-report` monthly report submission
- `/admin` review dashboard
- `/admin/organizations` admin organization table
- `/admin/scouting` Korea public-source scouting module
- `/deal-room` private opportunity listing
- `/sample-report` AI report preview
- `/login` Supabase magic link or demo role shortcuts
