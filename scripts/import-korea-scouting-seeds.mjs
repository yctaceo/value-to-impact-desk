#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_SEED_PATH = path.join(
  os.homedir(),
  "Downloads",
  "value_to_impact_desk_seed_data_50_orgs.md",
);

const TRUST_RISK_NOTE =
  "Public-source scouting record only. Not field verified. Financial data not reviewed. Do not present as recommended, certified, or investable.";

function slugify(input) {
  return input
    .toString()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-")
    .toLowerCase();
}

function contactPriority(score) {
  if (score >= 85) return "P1";
  if (score >= 75) return "P2";
  return "P3";
}

function categoryFromSeed(seed) {
  const raw = `${seed.legal_type ?? ""} ${(seed.category_tags ?? []).join(" ")}`;
  if (raw.includes("비영리") || raw.includes("NGO") || raw.includes("복지시설")) {
    return "nonprofit";
  }
  if (raw.includes("BAM") || raw.includes("Faith")) return "bam";
  if (raw.includes("소셜벤처")) return "impact_venture";
  if (raw.includes("사회적기업")) return "social_enterprise";
  return "other";
}

function fitSummary(seed, fit) {
  return seed.fit_types?.includes(fit)
    ? `${seed.name_ko} has ${fit.replaceAll("_", " ")} fit based on public-source scouting. Requires direct confirmation.`
    : null;
}

function extractSeedArray(markdown) {
  const match = markdown.match(
    /export const koreaImpactOrgSeedData\s*=\s*(\[[\s\S]*?\])\s*```/,
  );

  if (!match) {
    throw new Error("Could not find koreaImpactOrgSeedData array in markdown.");
  }

  const script = `const koreaImpactOrgSeedData = ${match[1]}; return koreaImpactOrgSeedData;`;
  return Function(script)();
}

function buildRows(seed) {
  const activityScore = Number(seed.activity_index_score ?? 0);
  const slug = slugify(seed.name_en || seed.name_ko);
  const sourceUrls = seed.source_urls ?? [];
  const primaryUrl = seed.primary_url ?? sourceUrls[0] ?? null;

  const organization = {
    seed_rank: seed.seed_rank,
    name_ko: seed.name_ko,
    name_en: seed.name_en,
    slug,
    category: categoryFromSeed(seed),
    legal_type: seed.legal_type,
    country: seed.country ?? "KR",
    region: seed.region,
    location: seed.region,
    primary_url: primaryUrl,
    website: primaryUrl,
    primary_url_confidence: seed.primary_url_confidence ?? "low",
    source_type: "public_web",
    source_url: sourceUrls[0] ?? primaryUrl,
    source_urls: sourceUrls,
    search_queries: seed.search_queries ?? [],
    category_tags: seed.category_tags ?? [],
    fit_types: seed.fit_types ?? [],
    activity_index_score: activityScore,
    recommended_action: seed.recommended_action,
    contact_priority: contactPriority(activityScore),
    homepage_verification_needed: Boolean(seed.homepage_verification_needed),
    verification_status: undefined,
    field_verified: false,
    accountant_reviewed: false,
    risk_note: TRUST_RISK_NOTE,
    public_visibility: "admin_only",
    deal_room_visibility: false,
    profile_status: "seeded_public_source",
  };

  const impactProfile = {
    visibility: "private",
    review_status: "new",
    verification_level: 1,
    verification_status: "Public-source only / Not field verified",
    one_line_ko: seed.core_value_summary_ko,
    summary_ko: seed.core_value_summary_ko,
    mission_ko: seed.core_value_summary_ko,
    core_value_summary_ko: seed.core_value_summary_ko,
    social_problem: seed.social_problem_ko,
    social_problem_ko: seed.social_problem_ko,
    beneficiaries: seed.primary_beneficiaries_ko,
    primary_beneficiaries_ko: seed.primary_beneficiaries_ko,
    business_model: seed.products_services_summary_ko,
    business_model_summary_ko: seed.products_services_summary_ko,
    products_services_summary_ko: seed.products_services_summary_ko,
    donation_fit_summary_ko: fitSummary(seed, "donation"),
    procurement_fit_summary_ko: fitSummary(seed, "corporate_procurement"),
    impact_investment_fit_summary_ko: fitSummary(seed, "impact_investment"),
    research_note_ko:
      "Public-source scouting data for internal review and future consent-based profile development.",
    financial_summary: "Financial data not reviewed.",
    risk_notes: [TRUST_RISK_NOTE],
    tags: seed.category_tags ?? [],
  };

  const review = {
    review_type: "initial_public_source_scouting",
    level: 1,
    verifier_type: "system_seed",
    review_status: "not_field_verified",
    reviewer_name: "System Seed",
    notes:
      "Seeded from public-source scouting list. Requires direct contact, evidence submission, and admin review before public use.",
    risk_notes: TRUST_RISK_NOTE,
  };

  return { organization, impactProfile, review };
}

async function upsertSeed(supabase, seed, dryRun) {
  const { organization, impactProfile, review } = buildRows(seed);

  if (dryRun) {
    return { slug: organization.slug, action: "dry_run" };
  }

  delete organization.verification_status;

  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .upsert(organization, { onConflict: "slug" })
    .select("id, slug")
    .single();

  if (orgError) throw orgError;

  const { error: profileError } = await supabase
    .from("impact_profiles")
    .upsert(
      {
        organization_id: org.id,
        ...impactProfile,
      },
      { onConflict: "organization_id" },
    );

  if (profileError) throw profileError;

  const { error: reviewError } = await supabase.from("verification_reviews").insert({
    organization_id: org.id,
    ...review,
  });

  if (reviewError) throw reviewError;

  return { slug: org.slug, action: "upserted" };
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const dryRun = args.has("--dry-run");
  const seedPath =
    process.env.SEED_SOURCE_PATH ||
    process.argv.find((arg) => arg.endsWith(".md")) ||
    DEFAULT_SEED_PATH;

  const markdown = fs.readFileSync(seedPath, "utf8");
  const seeds = extractSeedArray(markdown);

  console.log(`Loaded ${seeds.length} scouting seeds from ${seedPath}`);

  if (dryRun) {
    console.table(
      seeds.slice(0, 10).map((seed) => ({
        rank: seed.seed_rank,
        name: seed.name_ko,
        score: seed.activity_index_score,
        priority: contactPriority(seed.activity_index_score),
        action: seed.recommended_action,
      })),
    );
    console.log("Dry run complete. No database writes performed.");
    return;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL/SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const results = [];
  for (const seed of seeds) {
    results.push(await upsertSeed(supabase, seed, dryRun));
  }

  console.table(results);
  console.log(`Imported ${results.length} Korea public-source scouting records.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
