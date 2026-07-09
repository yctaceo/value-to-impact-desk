import { notFound } from "next/navigation";
import { PageShell } from "@/components/site-shell";
import { ProfileEvidenceBox, VerificationBadge } from "@/components/profile-card";
import { ButtonLink, StatCard } from "@/components/ui";
import { getProfile, profiles } from "@/lib/seed-data";
import { moneyLabel } from "@/lib/utils";

export function generateStaticParams() {
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getProfile(slug);

  if (!profile) {
    notFound();
  }

  return (
    <PageShell>
      <section className="border-b border-[var(--line)] bg-white">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="eyebrow">{profile.category.replaceAll("_", " ")}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              {profile.nameKo}
            </h1>
            <p className="mt-2 text-xl text-[var(--muted)]">{profile.nameEn}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {profile.oneLine}
            </p>
            <div className="mt-6">
              <VerificationBadge
                level={profile.verificationLevel}
                status={profile.verificationStatus}
              />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request Introduction</ButtonLink>
              <ButtonLink href="/sample-report" variant="secondary">
                Report Preview
              </ButtonLink>
            </div>
          </div>
          <ProfileEvidenceBox profile={profile} />
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_330px]">
        <div className="space-y-8">
          <div className="panel p-6">
            <h2 className="text-2xl font-semibold">Impact Thesis</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">Mission</p>
                <p className="mt-2 leading-7 text-[var(--muted)]">
                  {profile.missionKo}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  Social Problem
                </p>
                <p className="mt-2 leading-7 text-[var(--muted)]">
                  {profile.socialProblem}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  Beneficiaries
                </p>
                <p className="mt-2 leading-7 text-[var(--muted)]">
                  {profile.beneficiaries}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  Financial Snapshot
                </p>
                <p className="mt-2 leading-7 text-[var(--muted)]">
                  {profile.financialSnapshot}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <StatCard label="Employment" value={profile.employmentTotal ?? "TBC"} />
            <StatCard
              label="Vulnerable Employment"
              value={profile.vulnerableEmployment ?? "TBC"}
            />
            <StatCard label="Location" value={profile.location} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="panel p-6">
              <h2 className="font-semibold">Activities</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                {profile.activities.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <h2 className="font-semibold">Products / Services</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                {profile.productsServices.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="font-semibold">Monthly Performance Updates</h2>
            <div className="mt-5 space-y-4">
              {profile.monthlyUpdates.map((update) => (
                <div key={update.month} className="rounded-md bg-[#f7f8f4] p-4">
                  <p className="font-semibold">{update.month}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {update.activities}
                  </p>
                  <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                    <p>Employment: {update.employmentChange}</p>
                    <p>Revenue: {update.revenueNote}</p>
                  </div>
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    Evidence: {update.evidence.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="panel p-5">
            <h2 className="font-semibold">Current Requests</h2>
            <div className="mt-4 space-y-4">
              {profile.currentNeeds.map((need) => (
                <div key={need.label} className="rounded-md bg-[#f7f8f4] p-4">
                  <p className="text-xs font-semibold uppercase text-[var(--accent)]">
                    {need.type}
                  </p>
                  <p className="mt-2 font-semibold">{need.label}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {moneyLabel(need.amount)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {need.expectedImpact}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-5">
            <h2 className="font-semibold">Risks / Due Diligence</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
              {profile.risks.map((risk) => (
                <li key={risk}>- {risk}</li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <h2 className="font-semibold">Investor / CSR Fit</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.investorFit.map((fit) => (
                <span key={fit} className="rounded-full bg-[#edf2ec] px-3 py-1 text-xs">
                  {fit}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
